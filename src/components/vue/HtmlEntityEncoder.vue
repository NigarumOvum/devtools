<template>
  <div class="tool-card">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg">
        <span class="text-2xl">🔤</span>
      </div>
      <div>
        <h3 class="text-xl font-bold text-slate-800 dark:text-white">HTML Entity Encoder</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400">Encode & decode HTML entities</p>
      </div>
    </div>

    <div class="space-y-4">
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-medium text-slate-700 dark:text-slate-300">Input</label>
          <div class="flex gap-1">
            <button
              v-for="sample in samples"
              :key="sample.label"
              @click="input = sample.value"
              class="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              {{ sample.label }}
            </button>
          </div>
        </div>
        <textarea
          v-model="input"
          placeholder="Enter text with special characters or HTML entities..."
          class="tool-textarea h-24"
        ></textarea>
      </div>

      <div class="flex flex-wrap gap-2">
        <button @click="encode" class="tool-btn-primary flex-1">
          <span class="mr-2">🔒</span>Encode
        </button>
        <button @click="decode" class="tool-btn-secondary flex-1">
          <span class="mr-2">🔓</span>Decode
        </button>
        <button @click="clear" class="tool-btn-secondary">
          <span class="mr-2">🗑️</span>Clear
        </button>
      </div>

      <div v-if="output" class="animate-fade-in">
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-medium text-slate-700 dark:text-slate-300">Output</label>
          <button
            @click="copyOutput"
            :class="[
              'text-xs px-3 py-1 rounded-lg transition-all',
              copied
                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            ]"
          >
            {{ copied ? '✓ Copied!' : '📋 Copy' }}
          </button>
        </div>
        <pre class="code-block overflow-auto max-h-32 whitespace-pre-wrap break-all">{{ output }}</pre>
      </div>

      <!-- Quick Reference -->
      <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
        <h4 class="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Common Entities</h4>
        <div class="grid grid-cols-4 gap-2 text-xs font-mono">
          <div v-for="entity in commonEntities" :key="entity.char" 
               class="flex items-center justify-between p-2 rounded bg-white dark:bg-slate-800 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
               @click="copyEntity(entity.encoded)">
            <span class="text-lg">{{ entity.char }}</span>
            <span class="text-slate-500 dark:text-slate-400">{{ entity.encoded }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const input = ref('');
const output = ref('');
const copied = ref(false);

const samples = [
  { label: 'HTML', value: '<div class="container">Hello & Welcome!</div>' },
  { label: 'Symbols', value: '© 2024 DevTools™ — Pro Edition • €99' },
  { label: 'Encoded', value: '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;' },
];

const commonEntities = [
  { char: '<', encoded: '&lt;' },
  { char: '>', encoded: '&gt;' },
  { char: '&', encoded: '&amp;' },
  { char: '"', encoded: '&quot;' },
  { char: "'", encoded: '&#39;' },
  { char: '©', encoded: '&copy;' },
  { char: '®', encoded: '&reg;' },
  { char: '™', encoded: '&trade;' },
];

const entityMap: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
  '©': '&copy;',
  '®': '&reg;',
  '™': '&trade;',
  '€': '&euro;',
  '£': '&pound;',
  '¥': '&yen;',
  '•': '&bull;',
  '—': '&mdash;',
  '–': '&ndash;',
  '…': '&hellip;',
  ' ': '&nbsp;',
};

const reverseEntityMap: Record<string, string> = Object.fromEntries(
  Object.entries(entityMap).map(([k, v]) => [v, k])
);

function encode() {
  let result = input.value;
  
  // Replace characters with their entity equivalents
  for (const [char, entity] of Object.entries(entityMap)) {
    if (char !== ' ') { // Don't replace regular spaces
      result = result.split(char).join(entity);
    }
  }
  
  // Also encode any remaining non-ASCII characters
  result = result.replace(/[^\x00-\x7F]/g, (char) => {
    return `&#${char.charCodeAt(0)};`;
  });
  
  output.value = result;
}

function decode() {
  let result = input.value;
  
  // Replace named entities
  for (const [entity, char] of Object.entries(reverseEntityMap)) {
    result = result.split(entity).join(char);
  }
  
  // Replace numeric entities (decimal)
  result = result.replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)));
  
  // Replace numeric entities (hex)
  result = result.replace(/&#x([a-fA-F0-9]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  
  output.value = result;
}

function clear() {
  input.value = '';
  output.value = '';
}

async function copyOutput() {
  if (output.value) {
    await navigator.clipboard.writeText(output.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  }
}

async function copyEntity(entity: string) {
  await navigator.clipboard.writeText(entity);
}
</script>
