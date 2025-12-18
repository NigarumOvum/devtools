<script>
  let paragraphs = 3;
  let output = '';
  let copied = false;

  const words = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'vitae', 'elementum',
    'curabitur', 'gravida', 'arcu', 'ac', 'tortor', 'dignissim', 'convallis',
    'tellus', 'rutrum', 'pellentesque', 'habitant', 'morbi', 'tristique', 'senectus',
    'netus', 'malesuada', 'fames', 'turpis', 'egestas', 'integer', 'feugiat',
    'scelerisque', 'varius', 'nunc', 'vel', 'risus', 'commodo', 'viverra', 'maecenas'
  ];

  function randomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function generateSentence() {
    const length = 8 + Math.floor(Math.random() * 12);
    const sentence = Array.from({ length }, randomWord);
    sentence[0] = capitalize(sentence[0]);
    return sentence.join(' ') + '.';
  }

  function generateParagraph() {
    const sentenceCount = 4 + Math.floor(Math.random() * 4);
    return Array.from({ length: sentenceCount }, generateSentence).join(' ');
  }

  function generate() {
    output = Array.from({ length: paragraphs }, generateParagraph).join('\n\n');
  }

  async function copyOutput() {
    if (output) {
      await navigator.clipboard.writeText(output);
      copied = true;
      setTimeout(() => copied = false, 2000);
    }
  }

  // Generate initial content
  generate();
</script>

<div class="tool-card">
  <div class="flex items-center gap-3 mb-6">
    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center shadow-lg">
      <span class="text-2xl">📝</span>
    </div>
    <div>
      <h3 class="text-xl font-bold text-slate-800 dark:text-white">Lorem Ipsum</h3>
      <p class="text-sm text-slate-500 dark:text-slate-400">Generate placeholder text</p>
    </div>
  </div>

  <div class="space-y-4">
    <div class="flex items-center gap-4">
      <div class="flex-1">
        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Paragraphs
        </label>
        <div class="flex items-center gap-2">
          <button
            on:click={() => { paragraphs = Math.max(1, paragraphs - 1); generate(); }}
            class="tool-btn-secondary w-10 h-10 flex items-center justify-center"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            max="20"
            bind:value={paragraphs}
            on:change={generate}
            class="tool-input text-center w-20"
          />
          <button
            on:click={() => { paragraphs = Math.min(20, paragraphs + 1); generate(); }}
            class="tool-btn-secondary w-10 h-10 flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>
      <div class="flex-1">
        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          &nbsp;
        </label>
        <button on:click={generate} class="tool-btn-primary w-full">
          <span class="mr-2">🔄</span>Regenerate
        </button>
      </div>
    </div>

    <div>
      <div class="flex items-center justify-between mb-2">
        <label class="text-sm font-medium text-slate-700 dark:text-slate-300">Generated Text</label>
        <button
          on:click={copyOutput}
          class="text-xs px-3 py-1 rounded-lg transition-all {copied 
            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}"
        >
          {copied ? '✓ Copied!' : '📋 Copy All'}
        </button>
      </div>
      <div class="result-display h-48 overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed">
        {output}
      </div>
    </div>

    <div class="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
      <span>{paragraphs} paragraphs</span>
      <span>{output.split(' ').length} words</span>
      <span>{output.length} characters</span>
    </div>
  </div>
</div>
