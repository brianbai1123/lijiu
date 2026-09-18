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
            <span className="text-lg font-semibold">歷久</span>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              經時間檢驗的人生原則
            </span>
          </div>
          <div className="flex items-center gap-1">
            <a
              href="#all"
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              全部 {principles.length} 條
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
            真的扛住了時間
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
            這裡收錄的每一條，都滿足同一個標準：它被至少兩個互不相通的文明或學科{" "}
            <em className="not-italic text-foreground">各自獨立地</em>
            得出過，並且在此後數百上千年裡沒有被推翻。
          </p>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
            原則的本質是一道檢視問題，不是一句口號。每條都以「何時想起」和第一人稱問題開場，方便在具體情境裡被大腦認出；
            此外還有出處、實踐方法、最常見的誤讀，以及它在什麼情況下會失效。
          </p>

          <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {[
              { k: "收錄原則", v: String(principles.length), u: "條" },
              { k: "覆蓋領域", v: String(categories.length), u: "個" },
              { k: "最早可追溯", v: oldest.toLocaleString("zh-Hant"), u: "年前" },
              { k: "標註失效邊界", v: "100", u: "%" },
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
          <p className="font-medium text-foreground">關於這份清單</p>
          <p className="max-w-3xl">
            入選標準有三條：有可考的原始出處；在互不相通的文明或學科中被獨立提出過；到今天仍能被證偽、也仍未被證偽。
            每條原則的主表達是一道檢視問題——附觸發情境——而不是抽象命題；另有背後邏輯（從進化、科學或人性做第一性原理推導），以及正反兩面的歷史故事。
            引文儘量註明篇目，轉述與流傳語則標明「歸於」「常引作」。
          </p>
          <p className="max-w-3xl">
            這些原則彼此並不總是相容——「知足」和「複利」拉向相反的方向，「先活下來」和「做難而正確的事」也是。
            這不是清單的缺陷，恰恰是它誠實的地方：能用一條原則解決的人生，還沒開始。
          </p>
          <p className="max-w-3xl text-xs">
            卡片字型為教育部隸書；其餘為思源宋體（Noto Serif TC）。教育部隸書由中華民國教育部以創用 CC「姓名標示—禁止改作」3.0 臺灣版授權。
          </p>
        </div>
      </footer>
    </>
  );
}
