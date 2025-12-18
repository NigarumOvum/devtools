<script lang="ts">
    let expression = "";
    let description = "";
    let nextRuns: string[] = [];
    let error = "";
    let copied = false;

    const presets = [
        { label: "Every minute", value: "* * * * *" },
        { label: "Every hour", value: "0 * * * *" },
        { label: "Daily at midnight", value: "0 0 * * *" },
        { label: "Weekly on Sunday", value: "0 0 * * 0" },
        { label: "Monthly", value: "0 0 1 * *" },
        { label: "Every weekday 9am", value: "0 9 * * 1-5" },
    ];

    const fieldNames = [
        "minute",
        "hour",
        "day of month",
        "month",
        "day of week",
    ];
    const monthNames = [
        "",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    function parseField(field: string, type: number): string {
        if (field === "*") {
            return `every ${fieldNames[type]}`;
        }

        if (field.includes("/")) {
            const [, step] = field.split("/");
            return `every ${step} ${fieldNames[type]}${parseInt(step) > 1 ? "s" : ""}`;
        }

        if (field.includes("-")) {
            const [start, end] = field.split("-");
            if (type === 4) {
                // day of week
                return `${dayNames[parseInt(start)]} through ${dayNames[parseInt(end)]}`;
            }
            return `${start} through ${end}`;
        }

        if (field.includes(",")) {
            const values = field.split(",");
            if (type === 4) {
                // day of week
                return values.map((v) => dayNames[parseInt(v)]).join(", ");
            }
            if (type === 3) {
                // month
                return values.map((v) => monthNames[parseInt(v)]).join(", ");
            }
            return values.join(", ");
        }

        // Single value
        if (type === 4) {
            // day of week
            return `on ${dayNames[parseInt(field)]}`;
        }
        if (type === 3) {
            // month
            return `in ${monthNames[parseInt(field)]}`;
        }

        return field;
    }

    function parseCron(expr: string): string {
        const parts = expr.trim().split(/\s+/);

        if (parts.length !== 5) {
            throw new Error("Cron expression must have exactly 5 fields");
        }

        const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
        const descriptions: string[] = [];

        // Common patterns
        if (expr === "* * * * *") return "Every minute";
        if (expr === "0 * * * *") return "Every hour, on the hour";
        if (expr === "0 0 * * *") return "Every day at midnight";
        if (expr === "0 0 * * 0") return "Every Sunday at midnight";
        if (expr === "0 0 1 * *") return "First day of every month at midnight";

        // Build description
        if (minute === "0" && hour !== "*") {
            const hourParsed = parseField(hour, 1);
            descriptions.push(
                `At ${hourParsed.includes("every") ? hourParsed : `${hour}:00`}`,
            );
        } else if (minute !== "*" || hour !== "*") {
            if (minute !== "*") descriptions.push(`At minute ${minute}`);
            if (hour !== "*") descriptions.push(`past hour ${hour}`);
        }

        if (dayOfMonth !== "*") {
            descriptions.push(`on day ${dayOfMonth} of the month`);
        }

        if (month !== "*") {
            descriptions.push(parseField(month, 3));
        }

        if (dayOfWeek !== "*") {
            descriptions.push(parseField(dayOfWeek, 4));
        }

        if (descriptions.length === 0) {
            return "Every minute";
        }

        return descriptions.join(" ");
    }

    function getNextRuns(expr: string, count: number = 5): string[] {
        const parts = expr.trim().split(/\s+/);
        if (parts.length !== 5) return [];

        const runs: string[] = [];
        const now = new Date();
        let current = new Date(now);
        current.setSeconds(0);
        current.setMilliseconds(0);

        // Simple next run calculation for common cases
        for (let i = 0; i < 1000 && runs.length < count; i++) {
            current = new Date(current.getTime() + 60000); // Add 1 minute

            const minute = current.getMinutes();
            const hour = current.getHours();
            const dayOfMonth = current.getDate();
            const month = current.getMonth() + 1;
            const dayOfWeek = current.getDay();

            const [minExpr, hourExpr, domExpr, monthExpr, dowExpr] = parts;

            if (!matchField(minExpr, minute, 0, 59)) continue;
            if (!matchField(hourExpr, hour, 0, 23)) continue;
            if (!matchField(domExpr, dayOfMonth, 1, 31)) continue;
            if (!matchField(monthExpr, month, 1, 12)) continue;
            if (!matchField(dowExpr, dayOfWeek, 0, 6)) continue;

            runs.push(current.toLocaleString());
        }

        return runs;
    }

    function matchField(
        expr: string,
        value: number,
        min: number,
        max: number,
    ): boolean {
        if (expr === "*") return true;

        if (expr.includes("/")) {
            const [range, step] = expr.split("/");
            const stepNum = parseInt(step);
            if (range === "*") return value % stepNum === 0;
        }

        if (expr.includes("-")) {
            const [start, end] = expr.split("-").map(Number);
            return value >= start && value <= end;
        }

        if (expr.includes(",")) {
            return expr.split(",").map(Number).includes(value);
        }

        return parseInt(expr) === value;
    }

    function parse() {
        try {
            description = parseCron(expression);
            nextRuns = getNextRuns(expression);
            error = "";
        } catch (e) {
            error = (e as Error).message;
            description = "";
            nextRuns = [];
        }
    }

    function loadPreset(value: string) {
        expression = value;
        parse();
    }

    async function copyExpression() {
        if (expression) {
            await navigator.clipboard.writeText(expression);
            copied = true;
            setTimeout(() => (copied = false), 2000);
        }
    }

    $: if (expression) parse();
</script>

<div class="tool-card">
    <div class="flex items-center gap-3 mb-6">
        <div
            class="w-12 h-12 rounded-xl bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center shadow-lg"
        >
            <span class="text-2xl">⏰</span>
        </div>
        <div>
            <h3 class="text-xl font-bold text-slate-800 dark:text-white">
                Cron Expression Parser
            </h3>
            <p class="text-sm text-slate-500 dark:text-slate-400">
                Parse cron expressions to human-readable text
            </p>
        </div>
    </div>

    <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
            {#each presets as preset}
                <button
                    on:click={() => loadPreset(preset.value)}
                    class="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                    {preset.label}
                </button>
            {/each}
        </div>

        <div>
            <label
                class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block"
                >Cron Expression</label
            >
            <div class="flex gap-2">
                <input
                    type="text"
                    bind:value={expression}
                    placeholder="* * * * *"
                    class="tool-input font-mono text-center text-lg tracking-widest"
                />
                <button
                    on:click={copyExpression}
                    class="tool-btn-secondary px-4 {copied
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : ''}"
                >
                    {copied ? "✓" : "📋"}
                </button>
            </div>
        </div>

        <div
            class="grid grid-cols-5 gap-2 text-center text-xs text-slate-500 dark:text-slate-400"
        >
            <div class="p-2 rounded bg-slate-50 dark:bg-slate-800/50">
                <div class="font-semibold">MIN</div>
                <div>0-59</div>
            </div>
            <div class="p-2 rounded bg-slate-50 dark:bg-slate-800/50">
                <div class="font-semibold">HOUR</div>
                <div>0-23</div>
            </div>
            <div class="p-2 rounded bg-slate-50 dark:bg-slate-800/50">
                <div class="font-semibold">DOM</div>
                <div>1-31</div>
            </div>
            <div class="p-2 rounded bg-slate-50 dark:bg-slate-800/50">
                <div class="font-semibold">MON</div>
                <div>1-12</div>
            </div>
            <div class="p-2 rounded bg-slate-50 dark:bg-slate-800/50">
                <div class="font-semibold">DOW</div>
                <div>0-6</div>
            </div>
        </div>

        {#if error}
            <div
                class="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm"
            >
                <div class="flex items-center gap-2">
                    <span>❌</span>
                    <span class="font-medium">{error}</span>
                </div>
            </div>
        {/if}

        {#if description}
            <div
                class="p-4 rounded-xl bg-gradient-to-r from-accent-500/10 to-primary-500/10 border border-accent-500/20"
            >
                <div
                    class="text-lg font-semibold text-slate-800 dark:text-white mb-1"
                >
                    📅 {description}
                </div>
            </div>
        {/if}

        {#if nextRuns.length > 0}
            <div>
                <label
                    class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block"
                    >Next 5 Runs</label
                >
                <div class="space-y-1">
                    {#each nextRuns as run, i}
                        <div
                            class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 p-2 rounded bg-slate-50 dark:bg-slate-800/50"
                        >
                            <span
                                class="w-6 h-6 rounded-full bg-accent-500/20 text-accent-600 dark:text-accent-400 flex items-center justify-center text-xs font-bold"
                            >
                                {i + 1}
                            </span>
                            <span class="font-mono">{run}</span>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>
