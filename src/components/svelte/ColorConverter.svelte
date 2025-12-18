<script>
  let hex = '#a855f7';
  let rgb = { r: 168, g: 85, b: 247 };
  let hsl = { h: 271, s: 91, l: 65 };
  let copied = '';

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
      const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  function hslToRgb(h, s, l) {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  }

  function updateFromHex() {
    const newRgb = hexToRgb(hex);
    if (newRgb) {
      rgb = newRgb;
      hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    }
  }

  function updateFromRgb() {
    hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  }

  function updateFromHsl() {
    rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
    hex = rgbToHex(rgb.r, rgb.g, rgb.b);
  }

  function handleColorPicker(e) {
    hex = e.target.value;
    updateFromHex();
  }

  async function copyValue(format, value) {
    await navigator.clipboard.writeText(value);
    copied = format;
    setTimeout(() => copied = '', 2000);
  }

  $: rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  $: hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
</script>

<div class="tool-card">
  <div class="flex items-center gap-3 mb-6">
    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
      <span class="text-2xl">🎨</span>
    </div>
    <div>
      <h3 class="text-xl font-bold text-slate-800 dark:text-white">Color Converter</h3>
      <p class="text-sm text-slate-500 dark:text-slate-400">Convert between HEX, RGB & HSL</p>
    </div>
  </div>

  <div class="space-y-4">
    <!-- Color Preview -->
    <div class="flex gap-4 items-center">
      <div 
        class="w-20 h-20 rounded-2xl shadow-lg border-4 border-white dark:border-slate-700 transition-colors"
        style="background-color: {hex}"
      ></div>
      <div class="flex-1">
        <input
          type="color"
          value={hex}
          on:input={handleColorPicker}
          class="w-full h-12 rounded-xl cursor-pointer"
        />
      </div>
    </div>

    <!-- HEX Input -->
    <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 group">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">HEX</span>
        <button
          on:click={() => copyValue('hex', hex)}
          class="text-xs px-2 py-1 rounded-lg transition-all opacity-0 group-hover:opacity-100 {copied === 'hex' 
            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 opacity-100' 
            : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}"
        >
          {copied === 'hex' ? '✓' : '📋'}
        </button>
      </div>
      <input
        type="text"
        bind:value={hex}
        on:input={updateFromHex}
        class="w-full bg-transparent font-mono text-lg text-slate-800 dark:text-white focus:outline-none"
        maxlength="7"
      />
    </div>

    <!-- RGB Inputs -->
    <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 group">
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">RGB</span>
        <button
          on:click={() => copyValue('rgb', rgbString)}
          class="text-xs px-2 py-1 rounded-lg transition-all opacity-0 group-hover:opacity-100 {copied === 'rgb' 
            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 opacity-100' 
            : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}"
        >
          {copied === 'rgb' ? '✓' : '📋'}
        </button>
      </div>
      <div class="grid grid-cols-3 gap-3">
        <div>
          <label class="text-xs text-red-500 font-medium">R</label>
          <input
            type="number"
            min="0"
            max="255"
            bind:value={rgb.r}
            on:input={updateFromRgb}
            class="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 text-center font-mono text-slate-800 dark:text-white focus:outline-none focus:border-accent-500"
          />
        </div>
        <div>
          <label class="text-xs text-green-500 font-medium">G</label>
          <input
            type="number"
            min="0"
            max="255"
            bind:value={rgb.g}
            on:input={updateFromRgb}
            class="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 text-center font-mono text-slate-800 dark:text-white focus:outline-none focus:border-accent-500"
          />
        </div>
        <div>
          <label class="text-xs text-blue-500 font-medium">B</label>
          <input
            type="number"
            min="0"
            max="255"
            bind:value={rgb.b}
            on:input={updateFromRgb}
            class="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 text-center font-mono text-slate-800 dark:text-white focus:outline-none focus:border-accent-500"
          />
        </div>
      </div>
    </div>

    <!-- HSL Inputs -->
    <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 group">
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">HSL</span>
        <button
          on:click={() => copyValue('hsl', hslString)}
          class="text-xs px-2 py-1 rounded-lg transition-all opacity-0 group-hover:opacity-100 {copied === 'hsl' 
            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 opacity-100' 
            : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}"
        >
          {copied === 'hsl' ? '✓' : '📋'}
        </button>
      </div>
      <div class="grid grid-cols-3 gap-3">
        <div>
          <label class="text-xs text-slate-500 dark:text-slate-400 font-medium">H°</label>
          <input
            type="number"
            min="0"
            max="360"
            bind:value={hsl.h}
            on:input={updateFromHsl}
            class="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 text-center font-mono text-slate-800 dark:text-white focus:outline-none focus:border-accent-500"
          />
        </div>
        <div>
          <label class="text-xs text-slate-500 dark:text-slate-400 font-medium">S%</label>
          <input
            type="number"
            min="0"
            max="100"
            bind:value={hsl.s}
            on:input={updateFromHsl}
            class="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 text-center font-mono text-slate-800 dark:text-white focus:outline-none focus:border-accent-500"
          />
        </div>
        <div>
          <label class="text-xs text-slate-500 dark:text-slate-400 font-medium">L%</label>
          <input
            type="number"
            min="0"
            max="100"
            bind:value={hsl.l}
            on:input={updateFromHsl}
            class="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 text-center font-mono text-slate-800 dark:text-white focus:outline-none focus:border-accent-500"
          />
        </div>
      </div>
    </div>
  </div>
</div>
