/**
 * Error reporting utility — forwards boundary-caught React errors
 * to the runtime window hook if present (no-op in production).
 */
export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const message =
    error instanceof Response
      ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`
      : error instanceof Error
        ? error.message
        : String(error);

  const stack = error instanceof Error ? error.stack : undefined;

  // Console fallback so errors are never silently swallowed
  console.error("[error-reporting]", message, { stack, context });
}
