import { useState } from "react";

export interface JsonTreeProps {
  data: unknown;
  label?: string;
  isLast?: boolean;
}

/**
 * Renders a single JSON value (primitive or object/array) with collapsible nodes.
 * Single responsibility: JSON tree visualization only.
 */
export function JsonTree({ data, label, isLast = true }: JsonTreeProps) {
  const [collapsed, setCollapsed] = useState(false);
  const type = typeof data;
  const isObject = data !== null && type === "object";
  const isArray = Array.isArray(data);

  if (!isObject) {
    return (
      <div className="flex gap-2 py-0.5 font-mono text-xs">
        {label != null && <span className="text-blue-500">&quot;{label}&quot;:</span>}
        <span
          className={
            type === "string"
              ? "text-green-500"
              : type === "number"
                ? "text-orange-500"
                : type === "boolean"
                  ? "text-purple-500"
                  : "text-slate-400"
          }
        >
          {type === "string" ? `"${data}"` : String(data)}
        </span>
        {!isLast && <span className="text-slate-400">,</span>}
      </div>
    );
  }

  const keys = Object.keys(data as object);

  return (
    <div className="py-0.5 font-mono text-xs">
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className={`w-4 h-4 flex items-center justify-center transition-transform ${collapsed ? "-rotate-90" : ""}`}
          aria-expanded={!collapsed}
        >
          <svg className="w-2 h-2 text-slate-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.8-10h11.6z" />
          </svg>
        </button>
        {label != null && <span className="text-blue-500">&quot;{label}&quot;:</span>}
        <span className="text-slate-400">{isArray ? "[" : "{"}</span>
        {collapsed && (
          <span className="text-slate-500 italic text-[10px] ml-1">
            ...{keys.length} items...
          </span>
        )}
        {collapsed && (
          <span className="text-slate-400">
            {isArray ? "]" : "}"}
            {!isLast ? "," : ""}
          </span>
        )}
      </div>

      {!collapsed && (
        <div className="pl-4 border-l border-slate-200 dark:border-slate-800 ml-2 mt-0.5">
          {keys.map((key, i) => (
            <JsonTree
              key={key}
              data={(data as Record<string, unknown>)[key]}
              label={isArray ? undefined : key}
              isLast={i === keys.length - 1}
            />
          ))}
        </div>
      )}

      {!collapsed && (
        <div className="text-slate-400 ml-4">
          {isArray ? "]" : "}"}
          {!isLast ? "," : ""}
        </div>
      )}
    </div>
  );
}
