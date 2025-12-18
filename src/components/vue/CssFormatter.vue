<template>
  <div class="tool-card">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
        <span class="text-2xl">🎨</span>
      </div>
      <div>
        <h3 class="text-xl font-bold text-slate-800 dark:text-white">CSS Formatter</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400">Beautify & minify CSS code</p>
      </div>
    </div>

    <div class="space-y-4">
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-medium text-slate-700 dark:text-slate-300">Input CSS</label>
          <button
            @click="loadSample"
            class="text-xs text-accent-500 hover:text-accent-600 transition-colors"
          >
            Load sample
          </button>
        </div>
        <textarea
          v-model="input"
          placeholder=".selector { property: value; }"
          class="tool-textarea h-32"
        ></textarea>
      </div>

      <div class="flex flex-wrap gap-2">
        <button @click="beautify" class="tool-btn-primary flex-1">
          <span class="mr-2">✨</span>Beautify
        </button>
        <button @click="minify" class="tool-btn-secondary flex-1">
          <span class="mr-2">📦</span>Minify
        </button>
        <button @click="clear" class="tool-btn-secondary">
          <span class="mr-2">🗑️</span>Clear
        </button>
      </div>

      <div v-if="error" class="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm animate-fade-in">
        <div class="flex items-center gap-2">
          <span>❌</span>
          <span class="font-medium">Error:</span>
        </div>
        <p class="mt-1 font-mono text-xs">{{ error }}</p>
      </div>

      <div v-if="output" class="animate-fade-in">
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-medium text-slate-700 dark:text-slate-300">Output</label>
          <div class="flex gap-2 items-center">
            <span class="text-xs text-slate-500">
              {{ originalSize }}B → {{ newSize }}B ({{ compressionRatio }})
            </span>
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
        </div>
        <pre class="code-block overflow-auto max-h-48">{{ output }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const input = ref('');
const output = ref('');
const error = ref('');
const copied = ref(false);

const sampleCss = `.container{display:flex;flex-direction:column;gap:1rem;padding:20px}.header{background-color:#333;color:white;padding:10px 20px}.button{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border:none;border-radius:8px;padding:12px 24px;cursor:pointer}.button:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,0.15)}`;

const originalSize = computed(() => input.value.length);
const newSize = computed(() => output.value.length);
const compressionRatio = computed(() => {
  if (!originalSize.value) return '0%';
  const ratio = ((originalSize.value - newSize.value) / originalSize.value * 100);
  return ratio > 0 ? `-${ratio.toFixed(1)}%` : `+${Math.abs(ratio).toFixed(1)}%`;
});

function beautify() {
  try {
    let css = input.value.trim();
    
    // Add newlines after { and ;
    css = css.replace(/\{/g, ' {\n  ');
    css = css.replace(/;/g, ';\n  ');
    css = css.replace(/\}/g, '\n}\n\n');
    
    // Clean up extra spaces and newlines
    css = css.replace(/\n\s+\n/g, '\n');
    css = css.replace(/\n\n+/g, '\n\n');
    css = css.replace(/\s+\{/g, ' {');
    css = css.replace(/:\s*/g, ': ');
    css = css.replace(/  +/g, '  ');
    
    // Handle nested selectors better
    const lines = css.split('\n');
    const formatted: string[] = [];
    let indent = 0;
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      
      if (trimmed.endsWith('}')) {
        indent = Math.max(0, indent - 1);
      }
      
      formatted.push('  '.repeat(indent) + trimmed);
      
      if (trimmed.endsWith('{')) {
        indent++;
      }
    }
    
    output.value = formatted.join('\n').trim();
    error.value = '';
  } catch (e) {
    error.value = (e as Error).message;
    output.value = '';
  }
}

function minify() {
  try {
    let css = input.value.trim();
    
    // Remove comments
    css = css.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Remove whitespace
    css = css.replace(/\s+/g, ' ');
    css = css.replace(/\s*{\s*/g, '{');
    css = css.replace(/\s*}\s*/g, '}');
    css = css.replace(/\s*;\s*/g, ';');
    css = css.replace(/\s*:\s*/g, ':');
    css = css.replace(/\s*,\s*/g, ',');
    
    // Remove last semicolon before closing brace
    css = css.replace(/;}/g, '}');
    
    output.value = css.trim();
    error.value = '';
  } catch (e) {
    error.value = (e as Error).message;
    output.value = '';
  }
}

function loadSample() {
  input.value = sampleCss;
}

function clear() {
  input.value = '';
  output.value = '';
  error.value = '';
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
</script>
