<script>
  let input = '';
  let results = {};
  let copied = '';
  let isHashing = false;

  const algorithms = ['SHA-256', 'SHA-384', 'SHA-512', 'SHA-1'];

  async function hashText(algorithm, text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async function generateHashes() {
    if (!input.trim()) {
      results = {};
      return;
    }
    
    isHashing = true;
    const newResults = {};
    
    for (const algo of algorithms) {
      try {
        newResults[algo] = await hashText(algo, input);
      } catch (e) {
        newResults[algo] = 'Error: ' + e.message;
      }
    }
    
    results = newResults;
    isHashing = false;
  }

  async function copyHash(algo) {
    if (results[algo]) {
      await navigator.clipboard.writeText(results[algo]);
      copied = algo;
      setTimeout(() => copied = '', 2000);
    }
  }

  $: if (input !== undefined) {
    generateHashes();
  }
</script>

<div class="tool-card">
  <div class="flex items-center gap-3 mb-6">
    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg">
      <span class="text-2xl">🔒</span>
    </div>
    <div>
      <h3 class="text-xl font-bold text-slate-800 dark:text-white">Hash Generator</h3>
      <p class="text-sm text-slate-500 dark:text-slate-400">Generate SHA hashes from text</p>
    </div>
  </div>

  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        Input Text
      </label>
      <textarea
        bind:value={input}
        placeholder="Enter text to hash..."
        class="tool-textarea h-24"
      ></textarea>
    </div>

    {#if Object.keys(results).length > 0}
      <div class="space-y-3 animate-fade-in">
        {#each algorithms as algo}
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 group">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {algo}
              </span>
              <button
                on:click={() => copyHash(algo)}
                class="text-xs px-2 py-1 rounded-lg transition-all opacity-0 group-hover:opacity-100 {copied === algo 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 opacity-100' 
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}"
              >
                {copied === algo ? '✓ Copied' : '📋 Copy'}
              </button>
            </div>
            <code class="text-xs font-mono text-slate-700 dark:text-slate-300 break-all block">
              {results[algo] || '—'}
            </code>
          </div>
        {/each}
      </div>
    {:else}
      <div class="text-center py-8 text-slate-400 dark:text-slate-500">
        <div class="text-4xl mb-2">🔒</div>
        <p class="text-sm">Enter text to generate hashes</p>
      </div>
    {/if}

    <div class="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
      <p class="text-xs text-amber-700 dark:text-amber-400 flex items-start gap-2">
        <span>⚠️</span>
        <span>For security, use SHA-256 or higher. SHA-1 is shown for compatibility but is considered weak.</span>
      </p>
    </div>
  </div>
</div>
