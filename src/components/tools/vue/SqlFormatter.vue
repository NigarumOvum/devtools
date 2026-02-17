<template>
  <div class="tool-card">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
        <span class="text-2xl">🗃️</span>
      </div>
      <div>
        <h3 class="text-xl font-bold text-slate-800 dark:text-white">SQL Formatter</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400">Format & beautify SQL queries</p>
      </div>
    </div>

    <div class="space-y-4">
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-medium text-slate-700 dark:text-slate-300">SQL Query</label>
          <button
            @click="loadSample"
            class="text-xs text-accent-500 hover:text-accent-600 transition-colors"
          >
            Load sample
          </button>
        </div>
        <textarea
          v-model="input"
          placeholder="SELECT * FROM users WHERE id = 1"
          class="tool-textarea h-32"
        ></textarea>
      </div>

      <div class="flex flex-wrap gap-2">
        <button @click="format" class="tool-btn-primary flex-1">
          <span class="mr-2">✨</span>Format
        </button>
        <button @click="minify" class="tool-btn-secondary flex-1">
          <span class="mr-2">📦</span>Minify
        </button>
        <button @click="uppercase" class="tool-btn-secondary">
          <span class="mr-2">🔠</span>UPPERCASE
        </button>
        <button @click="clear" class="tool-btn-secondary">
          <span class="mr-2">🗑️</span>Clear
        </button>
      </div>

      <div v-if="output" class="animate-fade-in">
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-medium text-slate-700 dark:text-slate-300">Formatted SQL</label>
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
        <pre class="code-block overflow-auto max-h-64 text-sm">{{ output }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const input = ref('');
const output = ref('');
const copied = ref(false);

const sampleSql = `SELECT u.id, u.name, u.email, COUNT(o.id) as order_count, SUM(o.total) as total_spent FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.created_at > '2024-01-01' AND u.status = 'active' GROUP BY u.id, u.name, u.email HAVING COUNT(o.id) > 0 ORDER BY total_spent DESC LIMIT 10`;

const keywords = [
  'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'IN', 'LIKE', 'BETWEEN',
  'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN', 'FULL JOIN',
  'ON', 'AS', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET',
  'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM',
  'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE', 'CREATE INDEX',
  'UNION', 'UNION ALL', 'EXCEPT', 'INTERSECT',
  'CASE', 'WHEN', 'THEN', 'ELSE', 'END',
  'NULL', 'IS NULL', 'IS NOT NULL',
  'ASC', 'DESC', 'DISTINCT', 'ALL', 'EXISTS',
  'COUNT', 'SUM', 'AVG', 'MIN', 'MAX'
];

const newlineKeywords = [
  'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 'HAVING',
  'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN', 'FULL JOIN', 'JOIN',
  'LIMIT', 'OFFSET', 'UNION', 'UNION ALL', 'INSERT INTO', 'VALUES',
  'UPDATE', 'SET', 'DELETE FROM'
];

function format() {
  let sql = input.value.trim();
  
  // Normalize whitespace
  sql = sql.replace(/\s+/g, ' ');
  
  // Uppercase keywords
  for (const keyword of keywords) {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    sql = sql.replace(regex, keyword);
  }
  
  // Add newlines before major keywords
  for (const keyword of newlineKeywords) {
    const regex = new RegExp(`\\s+${keyword}\\b`, 'g');
    sql = sql.replace(regex, `\n${keyword}`);
  }
  
  // Indent after SELECT, FROM (for columns), SET, VALUES
  const lines = sql.split('\n');
  const formatted: string[] = [];
  let indent = 0;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    
    if (line.startsWith('FROM') || line.startsWith('WHERE') || line.startsWith('GROUP BY') || 
        line.startsWith('ORDER BY') || line.startsWith('HAVING') || line.startsWith('LIMIT')) {
      indent = 0;
    }
    
    if (line.startsWith('AND') || line.startsWith('OR')) {
      indent = 1;
    }
    
    formatted.push('  '.repeat(indent) + line);
    
    if (line.startsWith('SELECT')) {
      indent = 1;
    }
  }
  
  output.value = formatted.join('\n');
}

function minify() {
  let sql = input.value.trim();
  // Remove extra whitespace
  sql = sql.replace(/\s+/g, ' ');
  // Remove spaces around punctuation
  sql = sql.replace(/\s*,\s*/g, ',');
  sql = sql.replace(/\s*\(\s*/g, '(');
  sql = sql.replace(/\s*\)\s*/g, ')');
  output.value = sql.trim();
}

function uppercase() {
  let sql = input.value.trim();
  for (const keyword of keywords) {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    sql = sql.replace(regex, keyword);
  }
  output.value = sql;
}

function loadSample() {
  input.value = sampleSql;
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
</script>
