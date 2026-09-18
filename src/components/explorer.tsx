"use client";

import * as React from "react";
import { SearchIcon, ShuffleIcon, SparklesIcon, XIcon } from "lucide-react";

import { PrincipleCard } from "@/components/principle-card";
import { PrincipleDetail } from "@/components/principle-detail";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  categories,
  principleById,
  principles,
  type CategoryId,
} from "@/data/principles";
import { cn } from "@/lib/utils";

type Filter = CategoryId | "all";

/** 把一條原則的所有文本拼起來，讓搜索也能命中引文、印證和標籤 */
function haystack(id: string) {
  const p = principleById.get(id)!;
  return [
    p.title,
    p.trigger,
    p.check,
    p.essence,
    p.why,
    p.logic,
    p.misreading,
    p.limits,
    ...p.tags,
    ...p.practices,
    ...p.corroborations,
    ...p.quotes.flatMap((q) => [q.text, q.source, q.era]),
    ...p.stories.positive.flatMap((s) => [s.title, s.era, s.summary]),
    ...p.stories.negative.flatMap((s) => [s.title, s.era, s.summary]),
  ]
    .join(" ")
    .toLowerCase();
}

const searchIndex = new Map(principles.map((p) => [p.id, haystack(p.id)]));

/** 靜態導出下按「今天」取一則；服務端快照固定，避免水合不一致 */
function useDailyId() {
  return React.useSyncExternalStore(
    () => () => {},
    () => {
      const dayNumber = Math.floor(Date.now() / 86_400_000);
      return principles[dayNumber % principles.length].id;
    },
    () => principles[0].id
  );
}

export function Explorer() {
  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState<Filter>("all");
  const [openId, setOpenId] = React.useState<string | null>(null);
  const dailyId = useDailyId();

  const daily = principleById.get(dailyId) ?? principles[0];

  const visible = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return principles.filter((p) => {
      if (filter !== "all" && p.category !== filter) return false;
      if (!q) return true;
      return searchIndex.get(p.id)!.includes(q);
    });
  }, [query, filter]);

  const counts = React.useMemo(() => {
    const map = new Map<Filter, number>([["all", principles.length]]);
    for (const c of categories) {
      map.set(
        c.id,
        principles.filter((p) => p.category === c.id).length
      );
    }
    return map;
  }, []);

  const openRandom = () => {
    const pool = visible.length > 0 ? visible : principles;
    setOpenId(pool[Math.floor(Math.random() * pool.length)].id);
  };

  const open = openId ? principleById.get(openId) : null;

  return (
    <>
      {/* ── 今日一則 ───────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-14">
          <div className="mb-3 flex items-center gap-2 text-xs tracking-widest text-muted-foreground uppercase">
          <SparklesIcon className="size-3.5 text-primary" />
          今日一則
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] normal-case tracking-normal text-secondary-foreground">
            {daily.trigger}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setOpenId(daily.id)}
          className="group block w-full rounded-2xl bg-card p-6 text-left ring-1 ring-foreground/10 transition-all hover:ring-primary/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-9"
        >
          <h2 className="font-serif text-2xl leading-snug font-semibold text-balance transition-colors group-hover:text-primary sm:text-3xl">
            {daily.check}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-[0.9375rem]">
            <span className="text-foreground/85">{daily.title}</span>
            {" · "}
            {daily.essence}
          </p>
          <figure className="mt-6 border-l-2 border-primary/35 pl-4">
            <blockquote className="font-serif text-[0.9375rem] leading-8 text-foreground/80">
              {daily.quotes[0].text}
            </blockquote>
            <figcaption className="mt-1.5 text-xs text-muted-foreground">
              {daily.quotes[0].source} · {daily.quotes[0].era}
            </figcaption>
          </figure>
          <span className="mt-6 inline-block text-sm text-primary">
            展開完整解讀 →
          </span>
        </button>
      </section>

      {/* ── 檢索與篩選 ─────────────────────────────────────── */}
      <section
        id="all"
        className="sticky top-0 z-20 border-y border-border bg-background/85 backdrop-blur-md"
      >
        <div className="mx-auto w-full max-w-6xl space-y-3 px-5 py-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索原則、出處、關鍵詞，比如「風險」「論語」「習慣」"
                className="pl-9"
                aria-label="搜索原則"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="清空搜索"
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <XIcon className="size-4" />
                </button>
              )}
            </div>
            <Button variant="outline" onClick={openRandom} className="shrink-0">
              <ShuffleIcon />
              <span className="hidden sm:inline">隨機一條</span>
            </Button>
          </div>

          <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
            {(
              [{ id: "all" as const, name: "全部" }, ...categories] as {
                id: Filter;
                name: string;
              }[]
            ).map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setFilter(c.id)}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-1.5 text-sm whitespace-nowrap transition-colors",
                  filter === c.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {c.name}
                <span className="ml-1.5 font-mono text-xs opacity-60">
                  {counts.get(c.id)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 列表 ───────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-6xl px-5 py-10">
        {filter !== "all" && (
          <p className="mb-6 font-serif text-lg text-muted-foreground">
            {categories.find((c) => c.id === filter)?.subtitle}
          </p>
        )}

        {visible.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border py-20 text-center">
            <p className="font-serif text-lg">沒有匹配「{query}」的原則</p>
            <p className="mt-2 text-sm text-muted-foreground">
              換個詞試試，或者直接抽一條來看。
            </p>
            <Button
              variant="outline"
              className="mt-5"
              onClick={() => {
                setQuery("");
                setFilter("all");
              }}
            >
              清空篩選
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <PrincipleCard
                key={p.id}
                principle={p}
                index={principles.indexOf(p) + 1}
                onOpen={() => setOpenId(p.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── 詳情 ───────────────────────────────────────────── */}
      <Dialog
        open={Boolean(open)}
        onOpenChange={(next) => !next && setOpenId(null)}
      >
        <DialogContent className="max-h-[88dvh] gap-0 overflow-y-auto sm:max-w-2xl">
          {open && (
            <>
              <DialogHeader className="pb-1">
                <DialogTitle className="font-serif text-xl leading-snug text-balance sm:text-2xl">
                  {open.check}
                </DialogTitle>
                <DialogDescription>
                  {open.trigger} · {open.title}
                </DialogDescription>
              </DialogHeader>
              <div className="pt-4">
                <PrincipleDetail principle={open} onSelect={setOpenId} />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
