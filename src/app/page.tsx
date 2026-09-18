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
            <span className="text-lg font-semibold">历久</span>
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
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.15] font-semibold text-balance sm:text-6xl">
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
            原则的本质是一道检视问题，不是一句口号。每条都以「何时想起」和第一人称问题开场，方便在具体情境里被大脑认出；
            此外还有出处、实践方法、最常见的误读，以及它在什么情况下会失效。
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
                <dd className="mt-1 text-3xl font-semibold">
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
          <p className="font-medium text-foreground">关于这份清单</p>
          <p className="max-w-3xl">
            入选标准有三条：有可考的原始出处；在互不相通的文明或学科中被独立提出过；到今天仍能被证伪、也仍未被证伪。
            每条原则的主表达是一道检视问题——附触发情境——而不是抽象命题；另有背后逻辑（从进化、科学或人性做第一性原理推导），以及正反两面的历史故事。
            引文尽量注明篇目，转述与流传语则标明「归于」「常引作」。
          </p>
          <p className="max-w-3xl">
            这些原则彼此并不总是相容——「知足」和「复利」拉向相反的方向，「先活下来」和「做难而正确的事」也是。
            这不是清单的缺陷，恰恰是它诚实的地方：能用一条原则解决的人生，还没开始。
          </p>
          <p className="max-w-3xl text-xs">
            卡片字型为教育部隶书；其余为思源黑体简体（Noto Sans SC）。教育部隶书由中华民国教育部以创用 CC「姓名标示—禁止改作」3.0 台湾版授权。
          </p>
        </div>
      </footer>
    </>
  );
}
