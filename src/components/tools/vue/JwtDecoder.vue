<template>
  <div class="tool-card">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg">
        <span class="text-2xl">🎫</span>
      </div>
      <div>
        <h3 class="text-xl font-bold text-slate-800 dark:text-white">JWT Decoder</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400">Decode & inspect JWT tokens</p>
      </div>
    </div>

    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          JWT Token
        </label>
        <textarea
          v-model="token"
          placeholder="Paste your JWT token here..."
          class="tool-textarea h-24"
        ></textarea>
      </div>

      <div v-if="error" class="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm animate-fade-in">
        <span class="mr-2">❌</span>{{ error }}
      </div>

      <div v-if="decoded && !error" class="space-y-4 animate-fade-in">
        <!-- Header -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-red-500"></span>
              Header
            </span>
            <span class="text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
              {{ decoded.header?.alg || 'N/A' }}
            </span>
          </div>
          <pre class="code-block text-xs overflow-auto">{{ JSON.stringify(decoded.header, null, 2) }}</pre>
        </div>

        <!-- Payload -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-purple-500"></span>
              Payload
            </span>
            <div class="flex items-center gap-2">
              <span v-if="isExpired" class="text-xs px-2 py-1 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                Expired
              </span>
              <span v-else-if="expiresIn" class="text-xs px-2 py-1 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                {{ expiresIn }}
              </span>
            </div>
          </div>
          <pre class="code-block text-xs overflow-auto max-h-48">{{ JSON.stringify(decoded.payload, null, 2) }}</pre>
        </div>

        <!-- Token Info -->
        <div class="grid grid-cols-2 gap-3 text-xs">
          <div v-if="decoded.payload?.iat" class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <span class="text-slate-500 dark:text-slate-400">Issued At</span>
            <p class="font-medium text-slate-700 dark:text-slate-300 mt-1">{{ formatDate(decoded.payload.iat) }}</p>
          </div>
          <div v-if="decoded.payload?.exp" class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <span class="text-slate-500 dark:text-slate-400">Expires</span>
            <p class="font-medium text-slate-700 dark:text-slate-300 mt-1">{{ formatDate(decoded.payload.exp) }}</p>
          </div>
        </div>

        <!-- Signature -->
        <div>
          <span class="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-2">
            <span class="w-3 h-3 rounded-full bg-cyan-500"></span>
            Signature
          </span>
          <div class="result-display text-xs truncate">{{ decoded.signature }}</div>
        </div>
      </div>

      <div v-if="!token" class="text-center py-8 text-slate-400 dark:text-slate-500">
        <div class="text-4xl mb-2">🎫</div>
        <p class="text-sm">Paste a JWT token to decode it</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const token = ref('');
const error = ref('');

const decoded = computed(() => {
  if (!token.value.trim()) return null;
  
  try {
    const parts = token.value.trim().split('.');
    if (parts.length !== 3) {
      error.value = 'Invalid JWT format: expected 3 parts separated by dots';
      return null;
    }
    
    const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    const signature = parts[2];
    
    error.value = '';
    return { header, payload, signature };
  } catch (e) {
    error.value = 'Failed to decode JWT: ' + e.message;
    return null;
  }
});

const isExpired = computed(() => {
  if (!decoded.value?.payload?.exp) return false;
  return decoded.value.payload.exp * 1000 < Date.now();
});

const expiresIn = computed(() => {
  if (!decoded.value?.payload?.exp) return null;
  const diff = decoded.value.payload.exp * 1000 - Date.now();
  if (diff < 0) return null;
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}d ${hours % 24}h left`;
  if (hours > 0) return `${hours}h left`;
  return `${Math.floor(diff / (1000 * 60))}m left`;
});

const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleString();
};
</script>
