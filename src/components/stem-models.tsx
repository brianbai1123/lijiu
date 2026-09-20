import { LightbulbIcon } from "lucide-react";

import type { StemBlock, StemSection } from "@/data/stem-models";

function StemArticle({ block }: { block: StemBlock }) {
  const paragraphs = block.body.split(/\n\n+/).filter(Boolean);

  return (
    <article className="space-y-3 rounded-xl border border-border bg-muted/40 p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="font-semibold text-foreground">{block.title}</h4>
        <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground">
          {block.field}
        </span>
      </div>

      <p className="overflow-x-auto rounded-lg bg-background/70 px-3.5 py-2.5 font-mono text-[0.9375rem] tracking-wide text-foreground ring-1 ring-border">
        {block.formula}
      </p>

      {block.symbols ? (
        <dl className="space-y-2">
          {block.symbols.map((item) => (
            <div key={item.symbol} className="flex gap-3 text-sm leading-7">
              <dt className="w-16 shrink-0 font-mono font-medium text-foreground">
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

      {block.table ? (
        <div className="space-y-2">
          <div className="overflow-x-auto rounded-lg ring-1 ring-border">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">{block.title}对照</caption>
              <thead className="bg-muted/80 text-xs tracking-wide text-muted-foreground">
                <tr>
                  {block.table.head.map((cell) => (
                    <th key={cell} className="px-3 py-2 font-medium">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.table.rows.map(([left, right]) => (
                  <tr key={left} className="border-t border-border/80">
                    <td className="px-3 py-2 align-top text-foreground">{left}</td>
                    <td className="px-3 py-2 align-top text-muted-foreground">
                      {right}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.table.note ? (
            <p className="text-xs leading-6 text-muted-foreground">
              {block.table.note}
            </p>
          ) : null}
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

export function StemModels({ section }: { section: StemSection }) {
  return (
    <section className="space-y-5">
      <h3 className="flex items-center gap-2 text-base font-semibold tracking-wide text-foreground">
        <LightbulbIcon className="size-4 text-primary" />
        {section.heading}
      </h3>
      <p className="text-[0.9375rem] leading-7 text-muted-foreground">
        {section.intro}
      </p>
      <div className="space-y-4">
        {section.blocks.map((block) => (
          <StemArticle key={block.id} block={block} />
        ))}
      </div>
      <blockquote className="rounded-lg bg-foreground px-4 py-3 text-sm leading-7 text-background">
        {section.close}
      </blockquote>
    </section>
  );
}
