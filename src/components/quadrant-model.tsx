import { Grid2X2Icon } from "lucide-react";

import type { Quadrant, QuadrantModel } from "@/data/quadrant-models";

const quadrantTone = [
  "border-emerald-600/25 bg-emerald-600/8",
  "border-rose-600/25 bg-rose-600/8",
  "border-amber-600/25 bg-amber-600/8",
  "border-sky-600/25 bg-sky-600/8",
];

function QuadrantCell({
  quadrant,
  model,
  tone,
}: {
  quadrant: Quadrant;
  model: QuadrantModel;
  tone: string;
}) {
  const label = `${model.yAxis.ends[quadrant.y === "high" ? 1 : 0]} · ${
    model.xAxis.ends[quadrant.x === "high" ? 1 : 0]
  }`;

  return (
    <div className={`min-h-32 rounded-lg border p-3 ${tone}`}>
      <p className="text-sm font-semibold text-foreground">{quadrant.name}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-2 text-xs leading-5 text-foreground/75">
        {quadrant.reminder}
      </p>
    </div>
  );
}

export function QuadrantModelSection({ model }: { model: QuadrantModel }) {
  const toneById = new Map(
    model.quadrants.map((quadrant, index) => [
      quadrant.id,
      quadrantTone[index % quadrantTone.length],
    ]),
  );
  const byCoordinate = new Map(
    model.quadrants.map((quadrant) => [`${quadrant.y}-${quadrant.x}`, quadrant]),
  );

  const cell = (coordinate: string) => {
    const quadrant = byCoordinate.get(coordinate);
    if (!quadrant) return <div />;
    return (
      <QuadrantCell
        quadrant={quadrant}
        model={model}
        tone={toneById.get(quadrant.id)!}
      />
    );
  };

  return (
    <section className="space-y-5">
      <h3 className="flex items-center gap-2 text-base font-semibold tracking-wide text-foreground">
        <Grid2X2Icon className="size-4 text-primary" />
        {model.heading}
      </h3>

      <blockquote className="space-y-3 rounded-lg bg-primary/7 px-4 py-3 text-sm leading-7 text-foreground ring-1 ring-primary/15">
        {model.intro.split(/\n\n+/).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </blockquote>

      <div className="grid gap-3 sm:grid-cols-2">
        {[model.yAxis, model.xAxis].map((axis) => (
          <div key={axis.name} className="rounded-lg bg-muted/55 px-3.5 py-3">
            <p className="text-sm font-medium text-foreground">{axis.name}</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {axis.description}
            </p>
          </div>
        ))}
      </div>

      <div
        className="grid grid-cols-[3.75rem_minmax(0,1fr)_minmax(0,1fr)] gap-2"
        aria-label={`${model.yAxis.name}与${model.xAxis.name}四象限`}
      >
        <div />
        <p className="self-end text-center text-[11px] text-muted-foreground">
          {model.xAxis.ends[0]}
        </p>
        <p className="self-end text-center text-[11px] text-muted-foreground">
          {model.xAxis.ends[1]} →
        </p>

        <p className="flex items-center justify-center text-center text-[11px] leading-4 text-muted-foreground">
          {model.yAxis.ends[1]}
          <br />↑
        </p>
        {cell("high-low")}
        {cell("high-high")}

        <p className="flex items-center justify-center text-center text-[11px] leading-4 text-muted-foreground">
          {model.yAxis.ends[0]}
        </p>
        {cell("low-low")}
        {cell("low-high")}
      </div>

      <div className="space-y-4">
        {model.quadrants.map((quadrant, index) => (
          <article
            key={quadrant.id}
            className={`rounded-xl border p-4 ${toneById.get(quadrant.id)}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="font-semibold text-foreground">
                {index + 1}. {quadrant.name}
              </h4>
              <span className="text-xs text-muted-foreground">
                {model.yAxis.ends[quadrant.y === "high" ? 1 : 0]} ×{" "}
                {model.xAxis.ends[quadrant.x === "high" ? 1 : 0]}
              </span>
            </div>
            <p className="mt-2 text-sm leading-7 text-foreground/85">
              {quadrant.definition}
            </p>

            {quadrant.vignette ? (
              <p className="mt-3 rounded-lg bg-background/60 px-3 py-2 text-sm leading-6 text-foreground ring-1 ring-border">
                {quadrant.vignette}
              </p>
            ) : null}

            <div className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground">
              <div>
                <h5 className="font-medium text-foreground">逻辑维度</h5>
                <p>{quadrant.logic}</p>
              </div>
              <div>
                <h5 className="font-medium text-foreground">典型情境</h5>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  {quadrant.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-foreground">容易出现的问题</h5>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  {quadrant.problems.map((problem) => (
                    <li key={problem}>{problem}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-foreground">应对方法</h5>
                <ol className="mt-1 list-decimal space-y-1 pl-5">
                  {quadrant.responses.map((response) => (
                    <li key={response}>{response}</li>
                  ))}
                </ol>
              </div>
            </div>

            <p className="mt-3 border-l-2 border-primary/35 pl-3 text-sm leading-6 font-medium text-foreground">
              {quadrant.reminder}
            </p>
          </article>
        ))}
      </div>

      <div className="space-y-2 rounded-xl border border-border p-4">
        <h4 className="font-semibold text-foreground">迁移路径</h4>
        <ul className="space-y-1 text-sm leading-7 text-muted-foreground">
          {model.transitions.map((transition) => (
            <li key={transition}>{transition}</li>
          ))}
        </ul>
      </div>

      <blockquote className="rounded-lg bg-foreground px-4 py-3 text-sm leading-7 text-background">
        {model.summary}
      </blockquote>
    </section>
  );
}
