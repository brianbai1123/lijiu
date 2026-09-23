"use client";

import * as React from "react";
import { SearchIcon, ShuffleIcon, SparklesIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WorkspaceSpread } from "@/components/workspace-spread";
import { groupPrinciples } from "@/lib/workspace";
import {
  categories,
  principleById,
  principles,
  type CategoryId,
} from "@/data/principles";
import { quadrantHaystack } from "@/data/quadrant-models";
import { stemHaystack } from "@/data/stem-models";
import { cn } from "@/lib/utils";

type Filter = CategoryId | "all";

/** 把一条原则的所有文本拼起来，让搜索也能命中引文、印证和标签 */
function haystack(id: string) {
  const p = principleById.get(id)!;
  return [
    p.title,
    p.trigger,
    p.check,
    p.essence,
    p.why,
    p.coda,
    p.logic,
    p.dalio,
    p.misreading,
    p.limits,
    ...(p.readings ?? []).flatMap((reading) => [reading.title, reading.body]),
    ...p.tags,
    ...p.practices,
    ...p.corroborations,
    ...p.quotes.flatMap((q) => [q.text, q.source, q.era]),
    ...p.stories.positive.flatMap((s) => [s.title, s.era, s.summary]),
    ...p.stories.negative.flatMap((s) => [s.title, s.era, s.summary]),
    ...(p.firstPrinciples
      ? [p.firstPrinciples.title, ...p.firstPrinciples.steps, p.firstPrinciples.conclusion]
      : []),
    ...(p.sourceNote ? [p.sourceNote.title, p.sourceNote.body] : []),
    stemHaystack(id),
    quadrantHaystack(id),
  ]
    .join(" ")
    .toLowerCase();
}

const searchIndex = new Map(principles.map((p) => [p.id, haystack(p.id)]));

/** 静态导出下按「今天」取一则；服务端快照固定，避免水合不一致 */
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
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
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

  const groups = React.useMemo(() => groupPrinciples(visible), [visible]);

  const selected = React.useMemo(() => {
    if (visible.length === 0) return null;
    if (selectedId && visible.some((p) => p.id === selectedId)) {
      return principleById.get(selectedId) ?? visible[0];
    }
    return visible.find((p) => p.id === dailyId) ?? visible[0];
  }, [visible, selectedId, dailyId]);

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

  const selectPrinciple = React.useCallback(
    (id: string) => {
      const p = principleById.get(id);
      if (!p) return;
      const q = query.trim().toLowerCase();
      const matchesFilter = filter === "all" || p.category === filter;
      const matchesQuery = !q || searchIndex.get(id)!.includes(q);
      if (!matchesFilter) setFilter("all");
      if (!matchesQuery) setQuery("");
      setSelectedId(id);
    },
    [filter, query],
  );

  const scrollToWorkspace = () => {
    document
      .getElementById("workspace")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openRandom = () => {
    const pool = visible.length > 0 ? visible : principles;
    selectPrinciple(pool[Math.floor(Math.random() * pool.length)].id);
    scrollToWorkspace();
  };

  return (
    <>
      {/* ── 今日一则 ───────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-10">
        <div className="mb-3 flex items-center gap-2 text-xs tracking-widest text-muted-foreground uppercase">
          <SparklesIcon className="size-3.5 text-[var(--ws-amber)]" />
          今日一则
          <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] normal-case tracking-normal text-secondary-foreground">
            {daily.trigger}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            setQuery("");
            setFilter("all");
            setSelectedId(daily.id);
            scrollToWorkspace();
          }}
          className="daily-card group block w-full bg-card p-6 text-left sm:p-8"
        >
          <h2 className="font-serif text-2xl leading-[1.45] text-balance sm:text-3xl">
            {daily.check}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-[0.9375rem]">
            <span className="text-foreground/85">{daily.title}</span>
            {" · "}
            {daily.essence}
          </p>
          <figure className="ws-callout mt-6">
            <blockquote className="ws-quote">{daily.quotes[0].text}</blockquote>
            <figcaption className="ws-src">
              {daily.quotes[0].source} · {daily.quotes[0].era}
            </figcaption>
          </figure>
          <span className="ws-more-inline">到右侧阅读 →</span>
        </button>
      </section>

      {/* ── 检索与筛选 ─────────────────────────────────────── */}
      <section id="all" className="border-y border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto w-full max-w-6xl space-y-3 px-5 py-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索原则、出处、关键词，比如「风险」「论语」「习惯」"
                className="h-10 rounded-lg bg-card pl-9"
                aria-label="搜索原则"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="清空搜索"
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <XIcon className="size-4" />
                </button>
              )}
            </div>
            <Button variant="outline" onClick={openRandom} className="h-10 shrink-0 rounded-lg">
              <ShuffleIcon />
              <span className="hidden sm:inline">随机一条</span>
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
                  "shrink-0 rounded-md px-3 py-1.5 text-sm whitespace-nowrap transition-colors",
                  filter === c.id
                    ? "bg-foreground text-background"
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

      {/* ── 工作台 ─────────────────────────────────────────── */}
      <section id="workspace" className="mx-auto w-full max-w-6xl px-5 py-8">
        {filter !== "all" && (
          <p className="mb-5 text-sm text-muted-foreground">
            {categories.find((c) => c.id === filter)?.subtitle}
          </p>
        )}

        {visible.length === 0 || !selected ? (
          <div className="rounded-xl border border-dashed border-border py-20 text-center">
            <p className="text-lg">没有匹配「{query}」的原则</p>
            <p className="mt-2 text-sm text-muted-foreground">
              换个词试试，或者直接抽一条来看。
            </p>
            <Button
              variant="outline"
              className="mt-5"
              onClick={() => {
                setQuery("");
                setFilter("all");
              }}
            >
              清空筛选
            </Button>
          </div>
        ) : (
          <WorkspaceSpread
            groups={groups}
            selected={selected}
            visibleCount={visible.length}
            totalCount={principles.length}
            onSelect={selectPrinciple}
          />
        )}
      </section>
    </>
  );
}
