<template>
  <div class="tool-card">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center shadow-lg">
        <span class="text-2xl">⏰</span>
      </div>
      <div>
        <h3 class="text-xl font-bold text-slate-800 dark:text-white">Timestamp Converter</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400">Convert between Unix timestamps and dates</p>
      </div>
    </div>

    <div class="space-y-4">
      <!-- Current Time Reference -->
      <div class="p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-500/20">
        <div class="flex items-center justify-between">
          <span class="text-sm text-slate-600 dark:text-slate-400">Current Unix Time</span>
          <button 
            @click="useCurrentTime"
            class="text-xs px-2 py-1 rounded-lg bg-white/50 dark:bg-slate-700/50 text-indigo-600 dark:text-indigo-400 hover:bg-white dark:hover:bg-slate-700 transition-colors"
          >
            Use Now
          </button>
        </div>
        <p class="text-2xl font-bold font-mono text-slate-800 dark:text-white mt-1">{{ currentTimestamp }}</p>
      </div>

      <!-- Mode Toggle -->
      <div class="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
        <button
          @click="mode = 'toDate'"
          :class="['flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all', 
            mode === 'toDate' 
              ? 'bg-white dark:bg-slate-700 shadow-sm text-accent-600 dark:text-accent-400' 
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200']"
        >
          <span class="mr-2">📅</span>Timestamp → Date
        </button>
        <button
          @click="mode = 'toTimestamp'"
          :class="['flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all',
            mode === 'toTimestamp' 
              ? 'bg-white dark:bg-slate-700 shadow-sm text-accent-600 dark:text-accent-400' 
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200']"
        >
          <span class="mr-2">🔢</span>Date → Timestamp
        </button>
      </div>

      <!-- Timestamp to Date -->
      <div v-if="mode === 'toDate'" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Unix Timestamp
          </label>
          <div class="flex gap-2">
            <input
              v-model="timestamp"
              type="number"
              placeholder="1702915200"
              class="tool-input font-mono"
            />
            <select 
              v-model="timestampUnit"
              class="tool-input w-32"
            >
              <option value="s">Seconds</option>
              <option value="ms">Milliseconds</option>
            </select>
          </div>
        </div>

        <div v-if="convertedDate" class="space-y-3 animate-fade-in">
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <span class="text-xs text-slate-500 dark:text-slate-400 block mb-1">Local Time</span>
            <p class="font-medium text-slate-800 dark:text-white">{{ convertedDate.local }}</p>
          </div>
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <span class="text-xs text-slate-500 dark:text-slate-400 block mb-1">UTC / ISO 8601</span>
            <p class="font-mono text-sm text-slate-800 dark:text-white">{{ convertedDate.iso }}</p>
          </div>
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <span class="text-xs text-slate-500 dark:text-slate-400 block mb-1">Relative</span>
            <p class="font-medium text-slate-800 dark:text-white">{{ convertedDate.relative }}</p>
          </div>
        </div>
      </div>

      <!-- Date to Timestamp -->
      <div v-if="mode === 'toTimestamp'" class="space-y-4">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Date</label>
            <input
              v-model="dateInput"
              type="date"
              class="tool-input"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Time</label>
            <input
              v-model="timeInput"
              type="time"
              class="tool-input"
            />
          </div>
        </div>

        <div v-if="convertedTimestamp" class="space-y-3 animate-fade-in">
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div class="flex items-center justify-between">
              <span class="text-xs text-slate-500 dark:text-slate-400">Unix Timestamp (seconds)</span>
              <button 
                @click="copyTimestamp(convertedTimestamp.seconds)"
                class="text-xs px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                📋 Copy
              </button>
            </div>
            <p class="font-mono text-lg font-bold text-slate-800 dark:text-white mt-1">{{ convertedTimestamp.seconds }}</p>
          </div>
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div class="flex items-center justify-between">
              <span class="text-xs text-slate-500 dark:text-slate-400">Unix Timestamp (milliseconds)</span>
              <button 
                @click="copyTimestamp(convertedTimestamp.milliseconds)"
                class="text-xs px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                📋 Copy
              </button>
            </div>
            <p class="font-mono text-lg font-bold text-slate-800 dark:text-white mt-1">{{ convertedTimestamp.milliseconds }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const mode = ref('toDate');
const timestamp = ref('');
const timestampUnit = ref('s');
const dateInput = ref('');
const timeInput = ref('00:00');
const currentTimestamp = ref(Math.floor(Date.now() / 1000));

let interval;

onMounted(() => {
  interval = setInterval(() => {
    currentTimestamp.value = Math.floor(Date.now() / 1000);
  }, 1000);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});

const useCurrentTime = () => {
  timestamp.value = currentTimestamp.value.toString();
};

const convertedDate = computed(() => {
  if (!timestamp.value) return null;
  
  try {
    const ts = parseInt(timestamp.value);
    const ms = timestampUnit.value === 'ms' ? ts : ts * 1000;
    const date = new Date(ms);
    
    if (isNaN(date.getTime())) return null;
    
    const now = Date.now();
    const diff = ms - now;
    const absDiff = Math.abs(diff);
    
    let relative;
    if (absDiff < 60000) relative = 'Just now';
    else if (absDiff < 3600000) relative = `${Math.round(absDiff / 60000)} minutes ${diff > 0 ? 'from now' : 'ago'}`;
    else if (absDiff < 86400000) relative = `${Math.round(absDiff / 3600000)} hours ${diff > 0 ? 'from now' : 'ago'}`;
    else relative = `${Math.round(absDiff / 86400000)} days ${diff > 0 ? 'from now' : 'ago'}`;
    
    return {
      local: date.toLocaleString(),
      iso: date.toISOString(),
      relative
    };
  } catch {
    return null;
  }
});

const convertedTimestamp = computed(() => {
  if (!dateInput.value) return null;
  
  try {
    const [year, month, day] = dateInput.value.split('-').map(Number);
    const [hours, minutes] = timeInput.value.split(':').map(Number);
    const date = new Date(year, month - 1, day, hours, minutes);
    
    const seconds = Math.floor(date.getTime() / 1000);
    
    return {
      seconds,
      milliseconds: seconds * 1000
    };
  } catch {
    return null;
  }
});

const copyTimestamp = async (value) => {
  await navigator.clipboard.writeText(value.toString());
};
</script>
