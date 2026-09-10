import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { Evidence } from "@/data/audit";

type LightboxProps = {
  items: Evidence[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
  title?: string;
};

export function Lightbox({ items, index, onIndexChange, title }: LightboxProps) {
  const [zoomed, setZoomed] = useState(false);
  const open = index !== null;
  const current = open ? items[index] : undefined;

  useEffect(() => {
    setZoomed(false);
  }, [index]);

  const go = useCallback(
    (delta: number) => {
      if (index === null || items.length === 0) return;
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onIndexChange(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/85 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out" />
        <Dialog.Content className="fixed inset-0 z-50 flex flex-col p-4 focus:outline-none data-[state=open]:animate-in data-[state=open]:zoom-in-95">
          <Dialog.Title className="sr-only">
            {title ? `${title} — evidence preview` : "Evidence preview"}
          </Dialog.Title>

          <div className="flex items-center justify-between gap-4 text-primary-foreground">
            <p className="truncate text-sm font-medium">{title}</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomed((z) => !z)}
                aria-label={zoomed ? "Fit to screen" : "Zoom in"}
                className="rounded-full border border-primary-foreground/25 p-2 text-primary-foreground transition hover:bg-primary-foreground/15"
              >
                {zoomed ? <ZoomOut className="size-4" /> : <ZoomIn className="size-4" />}
              </button>
              <Dialog.Close
                aria-label="Close preview"
                className="rounded-full border border-primary-foreground/25 p-2 text-primary-foreground transition hover:bg-primary-foreground/15"
              >
                <X className="size-4" />
              </Dialog.Close>
            </div>
          </div>

          <div className="relative mt-3 flex min-h-0 flex-1 items-center justify-center">
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous image"
                className="absolute left-0 z-10 rounded-full bg-card/90 p-2.5 text-foreground shadow-lg transition hover:bg-card"
              >
                <ChevronLeft className="size-5" />
              </button>
            )}

            <div
              className={
                zoomed
                  ? "size-full overflow-auto rounded-xl bg-card"
                  : "flex size-full items-center justify-center"
              }
            >
              {current && (
                <img
                  src={current.url}
                  alt={current.caption}
                  onClick={() => setZoomed((z) => !z)}
                  className={
                    zoomed
                      ? "w-auto max-w-none cursor-zoom-out"
                      : "max-h-full max-w-full cursor-zoom-in rounded-xl bg-card object-contain shadow-2xl"
                  }
                />
              )}
            </div>

            {items.length > 1 && (
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next image"
                className="absolute right-0 z-10 rounded-full bg-card/90 p-2.5 text-foreground shadow-lg transition hover:bg-card"
              >
                <ChevronRight className="size-5" />
              </button>
            )}
          </div>

          <div className="mt-3 text-center text-primary-foreground">
            <p className="text-sm">{current?.caption}</p>
            {items.length > 1 && index !== null && (
              <p className="mt-1 text-xs opacity-60">
                {index + 1} of {items.length}
              </p>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
