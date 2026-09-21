"use client";

import * as React from "react";

import { categoryById, type Principle } from "@/data/principles";
import { CATEGORY_DOT, type WorkspaceGroup } from "@/lib/workspace";

export function WorkspaceSpread({
  groups,
  selected,
  visibleCount,
  totalCount,
  onSelect,
  onOpenFull,
}: {
  groups: WorkspaceGroup[];
  selected: Principle;
  visibleCount: number;
  totalCount: number;
  onSelect: (id: string) => void;
  onOpenFull: () => void;
}) {
  const sideRef = React.useRef<HTMLElement>(null);
  const mainRef = React.useRef<HTMLElement>(null);
  const category = categoryById.get(selected.category);
  const quote = selected.quotes[0];
  const dot = CATEGORY_DOT[selected.category];

  React.useEffect(() => {
    const active = sideRef.current?.querySelector<HTMLElement>(
      `[data-principle-id="${selected.id}"]`,
    );
    active?.scrollIntoView({ block: "nearest" });
    mainRef.current?.scrollTo({ top: 0 });
  }, [selected.id]);

  return (
    <div className="workspace">
      <aside ref={sideRef} className="ws-side" aria-label="原则目录">
        <div className="ws-side-head">目录</div>
        {groups.map((group) => (
          <div key={group.category.id} className="ws-group">
            <p className="ws-cat">{group.category.name}</p>
            {group.items.map((item) => (
              <button
                key={item.id}
                type="button"
                data-principle-id={item.id}
                aria-pressed={selected.id === item.id}
                onClick={() => onSelect(item.id)}
              >
                <span
                  className="ws-dot"
                  style={{ background: CATEGORY_DOT[item.category] }}
                  aria-hidden="true"
                />
                <span className="ws-t">{item.title}</span>
              </button>
            ))}
          </div>
        ))}
        <p className="ws-side-foot">
          {visibleCount === totalCount
            ? `${totalCount} 条原则`
            : `显示 ${visibleCount} / ${totalCount} 条`}
        </p>
      </aside>

      <article
        ref={mainRef}
        className="ws-main"
        aria-labelledby="ws-check-heading"
      >
        <div className="ws-chips">
          <span
            className="ws-chip"
            style={{
              background: `${dot}1a`,
              color: dot,
            }}
          >
            {category?.name}
          </span>
          <span className="ws-chip ghost">{selected.trigger}</span>
          <span className="ws-chip ghost">约 {selected.ageYears} 年</span>
        </div>

        <h2 id="ws-check-heading">{selected.check}</h2>

        <div className="ws-block">
          <p className="ws-label">释义</p>
          <p className="ws-body">{selected.essence}</p>
        </div>

        {quote && (
          <div className="ws-block">
            <p className="ws-label">原典</p>
            <div className="ws-callout">
              <p className="ws-quote">{quote.text}</p>
              <p className="ws-src">
                {quote.source} · {quote.era}
              </p>
            </div>
          </div>
        )}

        <div className="ws-tags">
          {selected.tags.map((tag) => (
            <span key={tag}># {tag}</span>
          ))}
        </div>

        <button type="button" className="ws-more" onClick={onOpenFull}>
          展开完整解读 →
        </button>
      </article>
    </div>
  );
}
