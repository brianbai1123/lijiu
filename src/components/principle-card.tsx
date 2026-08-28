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
  const firstQuote = principle.quotes[0];

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group flex h-full flex-col gap-3 rounded-xl bg-card p-5 text-left ring-1 ring-foreground/10 transition-all",
        "hover:-translate-y-0.5 hover:ring-primary/45 hover:shadow-[0_8px_24px_-12px_var(--color-primary)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-muted-foreground/70">
          {String(index).padStart(2, "0")}
        </span>
        <span className="text-xs text-muted-foreground">{category?.name}</span>
      </div>

      <h3 className="font-serif text-xl leading-snug font-semibold text-foreground transition-colors group-hover:text-primary">
        {principle.title}
      </h3>

      <p className="flex-1 text-sm leading-7 text-muted-foreground">
        {principle.essence}
      </p>

      <div className="flex items-end justify-between gap-3 border-t border-border/70 pt-3">
        <span className="line-clamp-1 text-xs text-muted-foreground/85">
          {firstQuote.source}
        </span>
        <span className="shrink-0 font-mono text-xs whitespace-nowrap text-primary/75">
          {principle.ageYears.toLocaleString("zh-CN")} 年
        </span>
      </div>
    </button>
  );
}
