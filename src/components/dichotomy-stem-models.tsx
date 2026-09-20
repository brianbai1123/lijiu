import {
  BookOpenIcon,
  LightbulbIcon,
  QuoteIcon,
  ScaleIcon,
} from "lucide-react";

import {
  dichotomyStemBlocks,
  dichotomyStemClose,
  dichotomyStemIntro,
  type StemBlock,
} from "@/data/dichotomy-stem";

const fieldIcon: Record<StemBlock["id"], typeof LightbulbIcon> = {
  math: LightbulbIcon,
  epictetus: QuoteIcon,
  physics: ScaleIcon,
  chemistry: BookOpenIcon,
};

function Formula({ text }: { text: string }) {
  return (
    <p className="overflow-x-auto rounded-lg bg-background/70 px-3.5 py-2.5 font-mono text-[0.9375rem] tracking-wide text-foreground ring-1 ring-border">
      {text}
    </p>
  );
}

function StemArticle({ block }: { block: StemBlock }) {
  const Icon = fieldIcon[block.id];
  const paragraphs = block.body.split(/\n\n+/).filter(Boolean);

  return (
    <article className="space-y-3 rounded-xl border border-border bg-muted/40 p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="flex items-center gap-2 font-semibold text-foreground">
          <Icon className="size-4 text-primary" />
          {block.title}
        </h4>
        <span className="text-xs tracking-wide text-muted-foreground">
          {block.field}
        </span>
      </div>

      <Formula text={block.formula} />

      {block.symbols ? (
        <dl className="space-y-2">
          {block.symbols.map((item) => (
            <div key={item.symbol} className="flex gap-3 text-sm leading-7">
              <dt className="w-8 shrink-0 font-mono font-medium text-foreground">
                {item.symbol}
              </dt>
              <dd className="text-muted-foreground">{item.meaning}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="space-y-3">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-sm leading-7 text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>

      {block.mapping ? (
        <div className="overflow-x-auto rounded-lg ring-1 ring-border">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">第一卡与控制论的对照</caption>
            <thead className="bg-muted/80 text-xs tracking-wide text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">第一卡</th>
                <th className="px-3 py-2 font-medium">控制论</th>
              </tr>
            </thead>
            <tbody>
              {block.mapping.map((row) => (
                <tr key={row.card} className="border-t border-border/80">
                  <td className="px-3 py-2 align-top text-foreground">{row.card}</td>
                  <td className="px-3 py-2 align-top text-muted-foreground">
                    {row.model}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {block.close ? (
        <p className="border-l-2 border-primary/35 pl-3 text-sm leading-6 font-medium text-foreground">
          {block.close}
        </p>
      ) : null}
    </article>
  );
}

export function DichotomyStemModels() {
  return (
    <section className="space-y-5">
      <h3 className="flex items-center gap-2 text-sm font-semibold tracking-wide text-foreground">
        <LightbulbIcon className="size-4 text-primary" />
        模型：你只能选一部分自变量
      </h3>
      <p className="text-[0.9375rem] leading-7 text-muted-foreground">
        {dichotomyStemIntro}
      </p>
      <div className="space-y-4">
        {dichotomyStemBlocks.map((block) => (
          <StemArticle key={block.id} block={block} />
        ))}
      </div>
      <blockquote className="rounded-lg bg-foreground px-4 py-3 text-sm leading-7 text-background">
        {dichotomyStemClose}
      </blockquote>
    </section>
  );
}
