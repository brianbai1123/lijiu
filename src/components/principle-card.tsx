"use client";

import { categoryById, type Principle } from "@/data/principles";
import { cn } from "@/lib/utils";

export function PrincipleCard({
  principle,
  index,
  onOpen,
}: {
  principle: Principle;
  index: number;
  onOpen: () => void;
}) {
  const category = categoryById.get(principle.category);

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group flex h-full flex-col gap-3 rounded-xl bg-card p-5 text-left font-serif ring-1 ring-foreground/10 transition-all",
        "hover:-translate-y-0.5 hover:ring-primary/45 hover:shadow-[0_8px_24px_-12px_var(--color-primary)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-muted-foreground/70">
          {String(index).padStart(2, "0")}
        </span>
        <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground">
          {principle.trigger}
        </span>
      </div>

      {/* 主表达：检视问题，不是抽象标题 */}
      <h3 className="font-serif text-lg leading-8 font-semibold text-balance text-foreground transition-colors group-hover:text-primary sm:text-xl">
        {principle.check}
      </h3>

      <p className="mt-auto flex items-center justify-between gap-3 border-t border-border/70 pt-3 text-xs text-muted-foreground">
        <span className="line-clamp-1">{principle.title}</span>
        <span className="shrink-0">{category?.name}</span>
      </p>
    </button>
  );
}
