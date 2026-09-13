"use client";

import {
  ArrowRightLeftIcon,
  BookOpenIcon,
  CheckCircle2Icon,
  GlobeIcon,
  LightbulbIcon,
  QuoteIcon,
  ScaleIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  TriangleAlertIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  categoryById,
  principleById,
  type HistoricalStory,
  type Principle,
} from "@/data/principles";

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2.5">
      <h3 className="flex items-center gap-2 text-sm font-semibold tracking-wide text-foreground">
        <Icon className="size-4 text-primary" />
        {title}
      </h3>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-4 text-[0.9375rem] leading-7 text-muted-foreground before:absolute before:top-[0.8125rem] before:left-0 before:size-1.5 before:rounded-full before:bg-primary/45"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function StoryList({
  stories,
  tone,
}: {
  stories: HistoricalStory[];
  tone: "positive" | "negative";
}) {
  const Icon = tone === "positive" ? ThumbsUpIcon : ThumbsDownIcon;
  const label = tone === "positive" ? "正面：遵循而受益" : "反面：违背而代价";

  return (
    <div className="space-y-3">
      <p className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground">
        <Icon className="size-3.5 text-primary" />
        {label}
      </p>
      <ul className="space-y-3">
        {stories.map((s) => (
          <li
            key={s.title}
            className="rounded-lg bg-muted/50 px-3.5 py-3 ring-1 ring-border"
          >
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="text-sm font-medium text-foreground">
                {s.title}
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">
                {s.era}
              </span>
            </div>
            <p className="mt-1.5 text-sm leading-7 text-muted-foreground">
              {s.summary}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PrincipleDetail({
  principle,
  onSelect,
}: {
  principle: Principle;
  onSelect: (id: string) => void;
}) {
  const category = categoryById.get(principle.category);
  const tensions = (principle.tensions ?? [])
    .map((id) => principleById.get(id))
    .filter((p): p is Principle => Boolean(p));

  return (
    <div className="space-y-7">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{category?.name}</Badge>
          <Badge variant="outline">{principle.trigger}</Badge>
          <Badge variant="outline">
            已被检验约 {principle.ageYears.toLocaleString("zh-CN")} 年
          </Badge>
        </div>
        <p className="text-[0.9375rem] leading-7 text-muted-foreground">
          <span className="font-medium text-foreground/90">{principle.title}</span>
          {" · "}
          {principle.essence}
        </p>
      </header>

      <Separator />

      <Section icon={QuoteIcon} title="原典">
        <div className="space-y-4">
          {principle.quotes.map((quote) => (
            <figure
              key={quote.source}
              className="border-l-2 border-primary/35 py-0.5 pl-4"
            >
              <blockquote className="font-serif text-[0.9375rem] leading-8 text-foreground/85">
                {quote.text}
              </blockquote>
              <figcaption className="mt-1.5 text-xs text-muted-foreground">
                {quote.source} · {quote.era}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section icon={LightbulbIcon} title="背后逻辑">
        <p className="text-[0.9375rem] leading-7 text-muted-foreground">
          {principle.logic}
        </p>
      </Section>

      <Section icon={BookOpenIcon} title="历史故事">
        <p className="text-sm leading-7 text-muted-foreground">
          正面是遵循这条原则后受益的经典案例；反面是违背它——或把它推到极端——后付出代价的教训。
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          <StoryList stories={principle.stories.positive} tone="positive" />
          <StoryList stories={principle.stories.negative} tone="negative" />
        </div>
      </Section>

      <Section icon={CheckCircle2Icon} title="它为什么没有被时间淘汰">
        <p className="text-[0.9375rem] leading-7 text-muted-foreground">
          {principle.why}
        </p>
      </Section>

      <Section icon={GlobeIcon} title="独立来源的印证">
        <Bullets items={principle.corroborations} />
      </Section>

      <Section icon={ScaleIcon} title="可以今天就开始做的">
        <Bullets items={principle.practices} />
      </Section>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-muted/60 p-4 ring-1 ring-border">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <TriangleAlertIcon className="size-4 text-primary" />
            常见误读
          </h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {principle.misreading}
          </p>
        </div>
        <div className="rounded-lg bg-muted/60 p-4 ring-1 ring-border">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <TriangleAlertIcon className="size-4 text-primary" />
            它在什么时候失效
          </h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {principle.limits}
          </p>
        </div>
      </div>

      {tensions.length > 0 && (
        <Section icon={ArrowRightLeftIcon} title="与它互相制衡的原则">
          <p className="text-sm leading-7 text-muted-foreground">
            任何一条原则单独推到极致都会出问题。下面这些和它拉扯的方向相反，需要一起读。
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {tensions.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onSelect(t.id)}
                className="rounded-full bg-secondary px-3 py-1.5 text-sm text-secondary-foreground ring-1 ring-border transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {t.title}
              </button>
            ))}
          </div>
        </Section>
      )}

      <div className="flex flex-wrap gap-1.5 pt-1">
        {principle.tags.map((tag) => (
          <Badge key={tag} variant="ghost" className="text-muted-foreground">
            #{tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
