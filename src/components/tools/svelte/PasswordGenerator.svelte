<script lang="ts">
    let length = 16;
    let includeUppercase = true;
    let includeLowercase = true;
    let includeNumbers = true;
    let includeSymbols = true;
    let excludeAmbiguous = false;
    let password = "";
    let strength = 0;
    let strengthLabel = "";
    let copied = false;
    let history: string[] = [];

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const ambiguousChars = "il1Lo0O";

    function generatePassword() {
        let chars = "";

        if (includeUppercase) chars += uppercaseChars;
        if (includeLowercase) chars += lowercaseChars;
        if (includeNumbers) chars += numberChars;
        if (includeSymbols) chars += symbolChars;

        if (excludeAmbiguous) {
            chars = chars
                .split("")
                .filter((c) => !ambiguousChars.includes(c))
                .join("");
        }

        if (!chars) {
            password = "";
            return;
        }

        let result = "";
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);

        for (let i = 0; i < length; i++) {
            result += chars[array[i] % chars.length];
        }

        password = result;
        calculateStrength();

        // Add to history
        if (password && !history.includes(password)) {
            history = [password, ...history.slice(0, 4)];
        }
    }

    function calculateStrength() {
        let score = 0;

        // Length contribution
        if (length >= 8) score += 1;
        if (length >= 12) score += 1;
        if (length >= 16) score += 1;
        if (length >= 20) score += 1;

        // Character variety contribution
        let variety = 0;
        if (includeUppercase) variety++;
        if (includeLowercase) variety++;
        if (includeNumbers) variety++;
        if (includeSymbols) variety++;

        score += variety;

        // Entropy estimation
        const charsetSize =
            (includeUppercase ? 26 : 0) +
            (includeLowercase ? 26 : 0) +
            (includeNumbers ? 10 : 0) +
            (includeSymbols ? 26 : 0);

        const entropy = length * Math.log2(charsetSize);
        if (entropy >= 60) score += 1;
        if (entropy >= 80) score += 1;
        if (entropy >= 100) score += 1;

        strength = Math.min(score, 10);

        if (strength <= 3) strengthLabel = "Weak";
        else if (strength <= 5) strengthLabel = "Fair";
        else if (strength <= 7) strengthLabel = "Good";
        else strengthLabel = "Strong";
    }

    function getStrengthColor(): string {
        if (strength <= 3) return "bg-red-500";
        if (strength <= 5) return "bg-yellow-500";
        if (strength <= 7) return "bg-blue-500";
        return "bg-green-500";
    }

    async function copyPassword() {
        if (password) {
            await navigator.clipboard.writeText(password);
            copied = true;
            setTimeout(() => (copied = false), 2000);
        }
    }

    async function copyFromHistory(pwd: string) {
        await navigator.clipboard.writeText(pwd);
    }

    // Generate initial password
    generatePassword();
</script>

<div class="tool-card">
    <div class="flex items-center gap-3 mb-6">
        <div
            class="w-12 h-12 rounded-xl bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center shadow-lg"
        >
            <span class="text-2xl">🔑</span>
        </div>
        <div>
            <h3 class="text-xl font-bold text-slate-800 dark:text-white">
                Password Generator
            </h3>
            <p class="text-sm text-slate-500 dark:text-slate-400">
                Generate secure random passwords
            </p>
        </div>
    </div>

    <div class="space-y-4">
        <!-- Generated Password -->
        <div class="relative">
            <input
                type="text"
                readonly
                bind:value={password}
                class="tool-input font-mono text-lg tracking-wide pr-20"
            />
            <div class="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <button
                    on:click={generatePassword}
                    class="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    title="Generate new"
                >
                    🔄
                </button>
                <button
                    on:click={copyPassword}
                    class="p-2 rounded-lg transition-colors {copied
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'}"
                    title="Copy"
                >
                    {copied ? "✓" : "📋"}
                </button>
            </div>
        </div>

        <!-- Strength Meter -->
        <div>
            <div class="flex justify-between text-sm mb-1">
                <span class="text-slate-600 dark:text-slate-400">Strength</span>
                <span
                    class="font-medium {strength <= 3
                        ? 'text-red-500'
                        : strength <= 5
                          ? 'text-yellow-500'
                          : strength <= 7
                            ? 'text-blue-500'
                            : 'text-green-500'}"
                >
                    {strengthLabel}
                </span>
            </div>
            <div
                class="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"
            >
                <div
                    class="h-full transition-all duration-300 {getStrengthColor()}"
                    style="width: {strength * 10}%"
                ></div>
            </div>
        </div>

        <!-- Length Slider -->
        <div>
            <div class="flex justify-between text-sm mb-2">
                <label class="text-slate-700 dark:text-slate-300 font-medium"
                    >Length</label
                >
                <span class="font-mono text-slate-600 dark:text-slate-400"
                    >{length}</span
                >
            </div>
            <input
                type="range"
                min="4"
                max="64"
                bind:value={length}
                on:input={generatePassword}
                class="w-full accent-accent-500"
            />
        </div>

        <!-- Options -->
        <div class="grid grid-cols-2 gap-3">
            <label
                class="flex items-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
                <input
                    type="checkbox"
                    bind:checked={includeUppercase}
                    on:change={generatePassword}
                    class="w-4 h-4 accent-accent-500"
                />
                <span class="text-sm text-slate-700 dark:text-slate-300"
                    >Uppercase (A-Z)</span
                >
            </label>
            <label
                class="flex items-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
                <input
                    type="checkbox"
                    bind:checked={includeLowercase}
                    on:change={generatePassword}
                    class="w-4 h-4 accent-accent-500"
                />
                <span class="text-sm text-slate-700 dark:text-slate-300"
                    >Lowercase (a-z)</span
                >
            </label>
            <label
                class="flex items-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
                <input
                    type="checkbox"
                    bind:checked={includeNumbers}
                    on:change={generatePassword}
                    class="w-4 h-4 accent-accent-500"
                />
                <span class="text-sm text-slate-700 dark:text-slate-300"
                    >Numbers (0-9)</span
                >
            </label>
            <label
                class="flex items-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
                <input
                    type="checkbox"
                    bind:checked={includeSymbols}
                    on:change={generatePassword}
                    class="w-4 h-4 accent-accent-500"
                />
                <span class="text-sm text-slate-700 dark:text-slate-300"
                    >Symbols (!@#$)</span
                >
            </label>
        </div>

        <label
            class="flex items-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
            <input
                type="checkbox"
                bind:checked={excludeAmbiguous}
                on:change={generatePassword}
                class="w-4 h-4 accent-accent-500"
            />
            <span class="text-sm text-slate-700 dark:text-slate-300"
                >Exclude ambiguous characters (i, l, 1, L, o, 0, O)</span
            >
        </label>

        <button on:click={generatePassword} class="tool-btn-primary w-full">
            <span class="mr-2">⚡</span>Generate New Password
        </button>

        <!-- History -->
        {#if history.length > 1}
            <div>
                <label
                    class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block"
                    >Recent Passwords</label
                >
                <div class="space-y-1">
                    {#each history.slice(1) as pwd}
                        <div
                            class="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-sm font-mono text-slate-600 dark:text-slate-400 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            on:click={() => copyFromHistory(pwd)}
                            on:keydown={(e) =>
                                e.key === "Enter" && copyFromHistory(pwd)}
                            role="button"
                            tabindex="0"
                        >
                            <span class="truncate">{pwd}</span>
                            <span class="text-xs text-slate-400"
                                >Click to copy</span
                            >
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>
