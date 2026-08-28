import { Explorer } from "@/components/explorer";
import { ThemeToggle } from "@/components/theme-toggle";
import { categories, principles } from "@/data/principles";

const oldest = Math.max(...principles.map((p) => p.ageYears));

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <div className="flex items-baseline gap-2.5">
            <span className="font-serif text-lg font-semibold">历久</span>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              经时间检验的人生原则
            </span>
          </div>
          <div className="flex items-center gap-1">
            <a
              href="#all"
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              全部 {principles.length} 条
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-5 pt-16 pb-14 sm:pt-24">
          <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
            {principles.length} principles · {categories.length} domains ·{" "}
            {oldest}+ years
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.15] font-semibold text-balance sm:text-6xl">
            哪些道理，
            <br className="hidden sm:block" />
            真的扛住了时间
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
            这里收录的每一条，都满足同一个标准：它被至少两个互不相通的文明或学科{" "}
            <em className="not-italic text-foreground">各自独立地</em>
            得出过，并且在此后数百上千年里没有被推翻。
          </p>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
            但真理不是口号。所以每条原则除了出处和实践方法，还写清了两件很少有人讲的事——
            它最常被怎样误读，以及它在什么情况下会失效。
          </p>

          <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {[
              { k: "收录原则", v: String(principles.length), u: "条" },
              { k: "覆盖领域", v: String(categories.length), u: "个" },
              { k: "最早可追溯", v: oldest.toLocaleString("zh-CN"), u: "年前" },
              { k: "标注失效边界", v: "100", u: "%" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="text-xs text-muted-foreground">{s.k}</dt>
                <dd className="mt-1 font-serif text-3xl font-semibold">
                  {s.v}
                  <span className="ml-1 text-sm font-normal text-muted-foreground">
                    {s.u}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <Explorer />
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl space-y-3 px-5 py-10 text-sm leading-7 text-muted-foreground">
          <p className="font-serif text-foreground">关于这份清单</p>
          <p className="max-w-3xl">
            入选标准有三条：有可考的原始出处；在互不相通的文明或学科中被独立提出过；到今天仍能被证伪、也仍未被证伪。
            引文尽量注明篇目，转述与流传语则标明「归于」「常引作」。
          </p>
          <p className="max-w-3xl">
            这些原则彼此并不总是相容——「知足」和「复利」拉向相反的方向，「先活下来」和「做难而正确的事」也是。
            这不是清单的缺陷，恰恰是它诚实的地方：能用一条原则解决的人生，还没开始。
          </p>
        </div>
      </footer>
    </>
  );
}
