import { Grid2X2Icon } from "lucide-react";

import {
  anxietyAxes,
  anxietyDispositionSummary,
  anxietyModelIntro,
  anxietyQuadrants,
  type AnxietyQuadrant,
} from "@/data/anxiety-model";

const quadrantStyles: Record<AnxietyQuadrant["id"], string> = {
  responsibility: "border-emerald-600/25 bg-emerald-600/8",
  anxiety: "border-amber-600/25 bg-amber-600/8",
  neglect: "border-rose-600/25 bg-rose-600/8",
  release: "border-sky-600/25 bg-sky-600/8",
};

function QuadrantSummary({ quadrant }: { quadrant: AnxietyQuadrant }) {
  return (
    <div
      className={`min-h-32 rounded-lg border p-3 ${quadrantStyles[quadrant.id]}`}
    >
      <p className="text-sm font-semibold text-foreground">{quadrant.name}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">
        {quadrant.concern === "high" ? "高在乎" : "低在乎"} ·{" "}
        {quadrant.influence === "high" ? "高影响" : "低影响"}
      </p>
      <p className="mt-2 text-xs leading-5 text-foreground/75">
        {quadrant.reminder}
      </p>
    </div>
  );
}

export function AnxietyDispositionModel() {
  const byCoordinate = new Map(
    anxietyQuadrants.map((quadrant) => [
      `${quadrant.concern}-${quadrant.influence}`,
      quadrant,
    ]),
  );

  return (
    <section className="space-y-5">
      <h3 className="flex items-center gap-2 text-sm font-semibold tracking-wide text-foreground">
        <Grid2X2Icon className="size-4 text-primary" />
        焦虑处置模型
      </h3>

      <blockquote className="rounded-lg bg-primary/7 px-4 py-3 text-sm leading-7 text-foreground ring-1 ring-primary/15">
        {anxietyModelIntro}
      </blockquote>

      <div className="grid gap-3 sm:grid-cols-2">
        {Object.values(anxietyAxes).map((axis) => (
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
        aria-label="在乎程度与影响程度四象限"
      >
        <div />
        <p className="self-end text-center text-[11px] text-muted-foreground">
          影响低
        </p>
        <p className="self-end text-center text-[11px] text-muted-foreground">
          影响高 →
        </p>

        <p className="flex items-center justify-center text-center text-[11px] leading-4 text-muted-foreground">
          在乎高
          <br />↑
        </p>
        <QuadrantSummary quadrant={byCoordinate.get("high-low")!} />
        <QuadrantSummary quadrant={byCoordinate.get("high-high")!} />

        <p className="flex items-center justify-center text-center text-[11px] leading-4 text-muted-foreground">
          在乎低
        </p>
        <QuadrantSummary quadrant={byCoordinate.get("low-low")!} />
        <QuadrantSummary quadrant={byCoordinate.get("low-high")!} />
      </div>

      <div className="space-y-4">
        {anxietyQuadrants.map((quadrant, index) => (
          <article
            key={quadrant.id}
            className={`rounded-xl border p-4 ${quadrantStyles[quadrant.id]}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="font-semibold text-foreground">
                {index + 1}. {quadrant.name}
              </h4>
              <span className="text-xs text-muted-foreground">
                {quadrant.concern === "high" ? "高在乎" : "低在乎"} ×{" "}
                {quadrant.influence === "high" ? "高影响" : "低影响"}
              </span>
            </div>
            <p className="mt-2 text-sm leading-7 text-foreground/85">
              {quadrant.definition}
            </p>

            <div className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground">
              <div>
                <h5 className="font-medium text-foreground">逻辑维度</h5>
                <p>{quadrant.logic}</p>
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

      <p className="rounded-lg bg-foreground px-4 py-3 text-sm leading-7 text-background">
        {anxietyDispositionSummary}
      </p>
    </section>
  );
}
