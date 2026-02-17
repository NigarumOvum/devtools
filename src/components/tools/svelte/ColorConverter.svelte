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

  // Palette Generation
  $: palette = [
    { name: 'Complementary', colors: [hex, rgbToHex(...Object.values(hslToRgb((hsl.h + 180) % 360, hsl.s, hsl.l)))] },
    { name: 'Analogous', colors: [
        rgbToHex(...Object.values(hslToRgb((hsl.h + 330) % 360, hsl.s, hsl.l))),
        hex,
        rgbToHex(...Object.values(hslToRgb((hsl.h + 30) % 360, hsl.s, hsl.l)))
    ]},
    { name: 'Monochromatic', colors: [
        rgbToHex(...Object.values(hslToRgb(hsl.h, hsl.s, Math.max(0, hsl.l - 20)))),
        hex,
        rgbToHex(...Object.values(hslToRgb(hsl.h, hsl.s, Math.min(100, hsl.l + 20))))
    ]}
  ];
</script>

<div class="tool-card overflow-hidden">
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
    <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-xl text-white">
            <span class="text-2xl font-bold">🎨</span>
        </div>
        <div>
            <h3 class="text-xl font-black text-slate-800 dark:text-white">Color Studio</h3>
            <p class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Master your palette</p>
        </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div class="space-y-4">
        <div class="flex gap-4 items-center">
            <div 
              class="w-24 h-24 rounded-3xl shadow-2xl border-4 border-white dark:border-slate-800 transition-all duration-300"
              style="background-color: {hex}"
            ></div>
            <div class="flex-1">
              <input
                type="color"
                value={hex}
                on:input={handleColorPicker}
                class="w-full h-14 rounded-2xl cursor-pointer bg-transparent border-0"
              />
            </div>
        </div>

        <div class="grid grid-cols-1 gap-3">
            <!-- HEX -->
            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between group">
                <div>
                    <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">HEX</span>
                    <input type="text" bind:value={hex} on:input={updateFromHex} class="bg-transparent font-mono text-lg font-bold text-slate-800 dark:text-white focus:outline-none w-28" />
                </div>
                <button on:click={() => copyValue('hex', hex)} class="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all {copied === 'hex' ? 'bg-green-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-400 shadow-sm'}">
                    {copied === 'hex' ? 'Copied' : 'Copy'}
                </button>
            </div>

            <!-- RGB -->
            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between group">
                <div>
                    <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">RGB</span>
                    <span class="font-mono text-sm font-bold text-slate-700 dark:text-slate-200">{rgbString}</span>
                </div>
                <button on:click={() => copyValue('rgb', rgbString)} class="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all {copied === 'rgb' ? 'bg-green-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-400 shadow-sm'}">
                    {copied === 'rgb' ? 'Copied' : 'Copy'}
                </button>
            </div>

            <!-- HSL -->
            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between group">
                <div>
                    <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">HSL</span>
                    <span class="font-mono text-sm font-bold text-slate-700 dark:text-slate-200">{hslString}</span>
                </div>
                <button on:click={() => copyValue('hsl', hslString)} class="px-3 py-1.5 rounded-xl text-[10px) font-black uppercase transition-all {copied === 'hsl' ? 'bg-green-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-400 shadow-sm'}">
                    {copied === 'hsl' ? 'Copied' : 'Copy'}
                </button>
            </div>
        </div>
    </div>

    <div class="space-y-6">
        <h4 class="text-xs font-black text-slate-500 uppercase tracking-widest">Smart Palettes</h4>
        <div class="space-y-4">
            {#each palette as scheme}
                <div class="space-y-2">
                    <span class="text-[10px] font-bold text-slate-400 uppercase">{scheme.name}</span>
                    <div class="flex h-12 rounded-xl overflow-hidden shadow-lg">
                        {#each scheme.colors as color}
                            <button 
                                class="flex-1 transition-transform hover:scale-105"
                                style="background-color: {color}"
                                title={color}
                                on:click={() => { hex = color; updateFromHex(); }}
                            ></button>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>
  </div>
</div>

<style>
    input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 0;
    }
    input[type="color"]::-webkit-color-swatch {
        border: none;
        border-radius: 12px;
    }
</style>
