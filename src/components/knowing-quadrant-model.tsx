import { Grid2X2Icon } from "lucide-react";

import {
  knowingAxes,
  knowingModelIntro,
  knowingQuadrants,
  knowingSummary,
  knowingTransitions,
  type KnowingQuadrant,
} from "@/data/knowing-model";

const quadrantStyles: Record<KnowingQuadrant["id"], string> = {
  usable: "border-emerald-600/25 bg-emerald-600/8",
  hollow: "border-rose-600/25 bg-rose-600/8",
  mute: "border-amber-600/25 bg-amber-600/8",
  blank: "border-sky-600/25 bg-sky-600/8",
};

function coordinateLabel(quadrant: KnowingQuadrant) {
  return `${quadrant.grip === "high" ? "高把握" : "低把握"} · ${
    quadrant.evidence === "high" ? "有依据" : "无依据"
  }`;
}

function QuadrantSummary({ quadrant }: { quadrant: KnowingQuadrant }) {
  return (
    <div
      className={`min-h-32 rounded-lg border p-3 ${quadrantStyles[quadrant.id]}`}
    >
      <p className="text-sm font-semibold text-foreground">{quadrant.name}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">
        {coordinateLabel(quadrant)}
      </p>
      <p className="mt-2 text-xs leading-5 text-foreground/75">
        {quadrant.reminder}
      </p>
    </div>
  );
}

export function KnowingQuadrantModel() {
  const byCoordinate = new Map(
    knowingQuadrants.map((quadrant) => [
      `${quadrant.grip}-${quadrant.evidence}`,
      quadrant,
    ]),
  );

  return (
    <section className="space-y-5">
      <h3 className="flex items-center gap-2 text-base font-semibold tracking-wide text-foreground">
        <Grid2X2Icon className="size-4 text-primary" />
        认知四象限：把握 × 依据
      </h3>

      <blockquote className="space-y-3 rounded-lg bg-primary/7 px-4 py-3 text-sm leading-7 text-foreground ring-1 ring-primary/15">
        {knowingModelIntro.split(/\n\n+/).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </blockquote>

      <div className="grid gap-3 sm:grid-cols-2">
        {Object.values(knowingAxes).map((axis) => (
          <div key={axis.name} className="rounded-lg bg-muted/55 px-3.5 py-3">
            <p className="text-sm font-medium text-foreground">{axis.name}</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {axis.description}
            </p>
          </div>
        ))}
      </div>

      <div
        className="grid grid-cols-[3.25rem_minmax(0,1fr)_minmax(0,1fr)] gap-2"
        aria-label="把握感与依据四象限"
      >
        <div />
        <p className="self-end text-center text-[11px] text-muted-foreground">
          无依据
        </p>
        <p className="self-end text-center text-[11px] text-muted-foreground">
          有依据 →
        </p>

        <p className="flex items-center justify-center text-center text-[11px] leading-4 text-muted-foreground">
          把握高
          <br />↑
        </p>
        <QuadrantSummary quadrant={byCoordinate.get("high-low")!} />
        <QuadrantSummary quadrant={byCoordinate.get("high-high")!} />

        <p className="flex items-center justify-center text-center text-[11px] leading-4 text-muted-foreground">
          把握低
        </p>
        <QuadrantSummary quadrant={byCoordinate.get("low-low")!} />
        <QuadrantSummary quadrant={byCoordinate.get("low-high")!} />
      </div>

      <div className="space-y-4">
        {knowingQuadrants.map((quadrant, index) => (
          <article
            key={quadrant.id}
            className={`rounded-xl border p-4 ${quadrantStyles[quadrant.id]}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="font-semibold text-foreground">
                {index + 1}. {quadrant.name}
              </h4>
              <span className="text-xs text-muted-foreground">
                {coordinateLabel(quadrant)}
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
          {knowingTransitions.map((transition) => (
            <li key={transition}>{transition}</li>
          ))}
        </ul>
      </div>

      <blockquote className="rounded-lg bg-foreground px-4 py-3 text-sm leading-7 text-background">
        {knowingSummary}
      </blockquote>
    </section>
  );
}
