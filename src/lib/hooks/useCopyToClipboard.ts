import { useState, useCallback } from "react";
import { toast } from "sonner";

const RESET_DELAY_MS = 2000;

/**
 * Single responsibility: handle copy-to-clipboard with feedback.
 * Reusable across tool components (Interface Segregation: small, focused API).
 */
export function useCopyToClipboard(successMessage = "Copied to clipboard!") {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success(successMessage);
        setTimeout(() => setCopied(false), RESET_DELAY_MS);
      } catch {
        toast.error("Failed to copy");
      }
    },
    [successMessage]
  );

  return { copied, copy };
}
