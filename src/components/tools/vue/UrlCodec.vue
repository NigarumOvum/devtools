<template>
  <div class="tool-card">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center shadow-lg">
        <span class="text-2xl">🔗</span>
      </div>
      <div>
        <h3 class="text-xl font-bold text-slate-800 dark:text-white">URL Codec</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400">Encode, decode & parse URLs</p>
      </div>
    </div>

    <div class="space-y-4">
      <!-- Mode Toggle -->
      <div class="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
        <button
          @click="mode = 'encode'"
          :class="['flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all',
            mode === 'encode' 
              ? 'bg-white dark:bg-slate-700 shadow-sm text-accent-600 dark:text-accent-400' 
              : 'text-slate-600 dark:text-slate-400']"
        >
          <span class="mr-2">📤</span>Encode
        </button>
        <button
          @click="mode = 'decode'"
          :class="['flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all',
            mode === 'decode' 
              ? 'bg-white dark:bg-slate-700 shadow-sm text-accent-600 dark:text-accent-400' 
              : 'text-slate-600 dark:text-slate-400']"
        >
          <span class="mr-2">📥</span>Decode
        </button>
        <button
          @click="mode = 'parse'"
          :class="['flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all',
            mode === 'parse' 
              ? 'bg-white dark:bg-slate-700 shadow-sm text-accent-600 dark:text-accent-400' 
              : 'text-slate-600 dark:text-slate-400']"
        >
          <span class="mr-2">🔍</span>Parse
        </button>
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          {{ mode === 'encode' ? 'Plain Text / URL' : mode === 'decode' ? 'Encoded URL' : 'Full URL' }}
        </label>
        <textarea
          v-model="input"
          :placeholder="placeholders[mode]"
          class="tool-textarea h-24"
        ></textarea>
      </div>

      <!-- Encode/Decode Output -->
      <div v-if="(mode === 'encode' || mode === 'decode') && output" class="animate-fade-in">
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-medium text-slate-700 dark:text-slate-300">Result</label>
          <button
            @click="copyOutput"
            :class="['text-xs px-3 py-1 rounded-lg transition-all',
              copied 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600']"
          >
            {{ copied ? '✓ Copied!' : '📋 Copy' }}
          </button>
        </div>
        <div class="result-display">{{ output }}</div>
      </div>

      <!-- URL Parse Results -->
      <div v-if="mode === 'parse' && parsed" class="space-y-3 animate-fade-in">
        <div v-for="(value, key) in parsed" :key="key" class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <span class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{{ key }}</span>
          <p class="font-mono text-sm text-slate-800 dark:text-white mt-1 break-all">{{ value || '—' }}</p>
        </div>

        <div v-if="parsedParams.length > 0" class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <span class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Query Parameters</span>
          <div class="mt-2 space-y-2">
            <div v-for="[key, val] in parsedParams" :key="key" class="flex items-center gap-2 text-sm">
              <span class="font-medium text-accent-600 dark:text-accent-400">{{ key }}</span>
              <span class="text-slate-400">=</span>
              <span class="font-mono text-slate-700 dark:text-slate-300 break-all">{{ val }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="error" class="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm animate-fade-in">
        <span class="mr-2">❌</span>{{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const mode = ref('encode');
const input = ref('');
const copied = ref(false);
const error = ref('');

const placeholders = {
  encode: 'Hello World! Special chars: @#$%^&*()',
  decode: 'Hello%20World%21%20Special%20chars%3A%20%40%23%24%25%5E%26%2A%28%29',
  parse: 'https://example.com/path?name=John&age=30#section'
};

const output = computed(() => {
  if (!input.value.trim()) return '';
  error.value = '';
  
  try {
    if (mode.value === 'encode') {
      return encodeURIComponent(input.value);
    } else if (mode.value === 'decode') {
      return decodeURIComponent(input.value);
    }
  } catch (e) {
    error.value = `Failed to ${mode.value}: ${e.message}`;
  }
  return '';
});

const parsed = computed(() => {
  if (mode.value !== 'parse' || !input.value.trim()) return null;
  
  try {
    const url = new URL(input.value);
    error.value = '';
    return {
      protocol: url.protocol,
      host: url.host,
      hostname: url.hostname,
      port: url.port,
      pathname: url.pathname,
      search: url.search,
      hash: url.hash,
      origin: url.origin
    };
  } catch (e) {
    error.value = 'Invalid URL format';
    return null;
  }
});

const parsedParams = computed(() => {
  if (!parsed.value || !input.value) return [];
  try {
    const url = new URL(input.value);
    return Array.from(url.searchParams.entries());
  } catch {
    return [];
  }
});

const copyOutput = async () => {
  if (output.value) {
    await navigator.clipboard.writeText(output.value);
    copied.value = true;
    setTimeout(() => copied.value = false, 2000);
  }
};

watch(mode, () => {
  error.value = '';
});
</script>
