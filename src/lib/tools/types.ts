/**
 * Tool runtime type: which framework renders the tool.
 * Keeps routing and registry open for extension (Open/Closed).
 */
export type ToolRuntime = "react" | "svelte" | "vue";

/**
 * Minimal tool descriptor for routing and display.
 * Pages depend on this abstraction, not on concrete components (Dependency Inversion).
 */
export interface ToolMeta {
  id: string;
  title: string;
  type: ToolRuntime;
}
