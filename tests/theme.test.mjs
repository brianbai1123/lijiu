import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

import { JSDOM } from "jsdom";
import React, { act } from "react";
import { createRoot } from "react-dom/client";

import { CATEGORY_DOT } from "../src/lib/workspace.ts";

const SHARED_THEME_CORE = {
  ":root": {
    "--background": "#f3efe6",
    "--foreground": "#1c1916",
    "--pine": "#1c3d36",
    "--pine-soft": "#e5f0eb",
    "--clay": "#8a4b32",
    "--band": "#efe4d2",
    "--line": "#e0d5c4",
    "--muted": "#5c554c",
    "--paper": "#f7f3eb",
    "--ink": "#1c1916",
    "--on-pine": "#f7f3eb",
    "--selection": "#d7ebe3",
  },
  ':root[data-theme="celadon"]': {
    "--background": "#e5ede9",
    "--foreground": "#16201d",
    "--pine": "#1d4a5c",
    "--pine-soft": "#dcebf0",
    "--clay": "#9c5236",
    "--band": "#d6e4de",
    "--line": "#c3d4cc",
    "--muted": "#4c5b55",
    "--paper": "#f1f6f3",
    "--ink": "#14201c",
    "--on-pine": "#f1f6f3",
    "--selection": "#c7dfe8",
  },
  ':root[data-theme="night"]': {
    "--background": "#161412",
    "--foreground": "#e9e2d5",
    "--pine": "#8fc7b0",
    "--pine-soft": "#1f2e29",
    "--clay": "#e0a07c",
    "--band": "#2a251f",
    "--line": "#38322a",
    "--muted": "#a69d90",
    "--paper": "#1f1c18",
    "--ink": "#efe8db",
    "--on-pine": "#13201c",
    "--selection": "#2f4a40",
  },
};

const projectFile = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

function cssBlock(css, selector) {
  const start = css.indexOf(`${selector} {`);
  assert.notEqual(start, -1, `${selector} must exist`);
  const end = css.indexOf("}", start);
  return css.slice(start, end);
}

function cssVariable(block, name) {
  const match = block.match(new RegExp(`${name.replaceAll("-", "\\-")}\\s*:\\s*([^;]+)`));
  assert.ok(match, `${name} must exist`);
  return match[1].trim();
}

function resolvedCssColor(block, name, seen = new Set()) {
  assert.ok(!seen.has(name), `${name} must not form a variable cycle`);
  seen.add(name);
  const value = cssVariable(block, name);
  const reference = value.match(/^var\((--[^)]+)\)$/);
  if (reference) return resolvedCssColor(block, reference[1], seen);
  assert.match(value, /^#[\da-f]{6}$/i, `${name} must resolve to a hex color`);
  return value;
}

function rgb(hex) {
  return hex
    .slice(1)
    .match(/../g)
    .map((channel) => Number.parseInt(channel, 16));
}

function composite(foreground, background, alpha) {
  const fg = rgb(foreground);
  const bg = rgb(background);
  return fg.map((channel, index) =>
    Math.round(channel * alpha + bg[index] * (1 - alpha)),
  );
}

function relativeLuminance(color) {
  const channels = (Array.isArray(color) ? color : rgb(color)).map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(foreground, background) {
  const values = [
    relativeLuminance(foreground),
    relativeLuminance(background),
  ].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

async function loadThemeContract() {
  assert.ok(
    existsSync(new URL("../src/lib/theme.ts", import.meta.url)),
    "src/lib/theme.ts must define the shared theme contract",
  );
  return import("../src/lib/theme.ts");
}

function executeBootstrap(script, { url = "https://lijiu.test/", stored = null, throws = false } = {}) {
  const attributes = new Map();
  const writes = [];
  const localStorage = {
    getItem(key) {
      if (throws) throw new Error("storage denied");
      return key === "lijiu:theme" ? stored : null;
    },
    setItem(key, value) {
      if (throws) throw new Error("storage denied");
      writes.push([key, value]);
    },
  };
  const documentElement = {
    setAttribute(name, value) {
      attributes.set(name, value);
    },
    removeAttribute(name) {
      attributes.delete(name);
    },
    getAttribute(name) {
      return attributes.get(name) ?? null;
    },
  };

  vm.runInNewContext(script, {
    URLSearchParams,
    document: { documentElement },
    localStorage,
    location: new URL(url),
  });

  return { documentElement, writes };
}

test("theme resolution follows query, stored, then paper priority", async () => {
  const { resolveTheme } = await loadThemeContract();

  assert.equal(resolveTheme("night", "celadon"), "night");
  assert.equal(resolveTheme(null, "celadon"), "celadon");
  assert.equal(resolveTheme("invalid", "night"), "night");
  assert.equal(resolveTheme(null, "invalid"), "paper");
});

test("theme contract exposes only the three shared themes and Lijiu identifiers", async () => {
  const { THEMES, THEME_CHANGE_EVENT, THEME_KEY } = await loadThemeContract();

  assert.deepEqual(THEMES, [
    { id: "paper", name: "宣纸", swatch: ["#f3efe6", "#1c3d36"] },
    { id: "celadon", name: "青瓷", swatch: ["#e5ede9", "#1d4a5c"] },
    { id: "night", name: "夜读", swatch: ["#161412", "#8fc7b0"] },
  ]);
  assert.equal(THEME_KEY, "lijiu:theme");
  assert.equal(THEME_CHANGE_EVENT, "lijiu-theme-change");
});

test("bootstrap defaults to paper without persisting an absent preference", async () => {
  const { THEME_BOOTSTRAP_SCRIPT } = await loadThemeContract();
  const result = executeBootstrap(THEME_BOOTSTRAP_SCRIPT);

  assert.equal(result.documentElement.getAttribute("data-theme"), null);
  assert.deepEqual(result.writes, []);
});

test("bootstrap gives a valid URL theme priority and persists it", async () => {
  const { THEME_BOOTSTRAP_SCRIPT } = await loadThemeContract();
  const result = executeBootstrap(THEME_BOOTSTRAP_SCRIPT, {
    url: "https://lijiu.test/?theme=night",
    stored: "celadon",
  });

  assert.equal(result.documentElement.getAttribute("data-theme"), "night");
  assert.deepEqual(result.writes, [["lijiu:theme", "night"]]);
});

test("bootstrap applies a valid stored theme when the URL has no theme", async () => {
  const { THEME_BOOTSTRAP_SCRIPT } = await loadThemeContract();
  const result = executeBootstrap(THEME_BOOTSTRAP_SCRIPT, { stored: "celadon" });

  assert.equal(result.documentElement.getAttribute("data-theme"), "celadon");
  assert.deepEqual(result.writes, []);
});

test("bootstrap ignores an invalid URL theme and keeps valid stored state", async () => {
  const { THEME_BOOTSTRAP_SCRIPT } = await loadThemeContract();
  const result = executeBootstrap(THEME_BOOTSTRAP_SCRIPT, {
    url: "https://lijiu.test/?theme=sepia",
    stored: "night",
  });

  assert.equal(result.documentElement.getAttribute("data-theme"), "night");
  assert.deepEqual(result.writes, []);
});

test("bootstrap remains safe when storage throws", async () => {
  const { THEME_BOOTSTRAP_SCRIPT } = await loadThemeContract();

  assert.doesNotThrow(() => executeBootstrap(THEME_BOOTSTRAP_SCRIPT, { throws: true }));
  const fromQuery = executeBootstrap(THEME_BOOTSTRAP_SCRIPT, {
    url: "https://lijiu.test/?theme=celadon",
    throws: true,
  });
  assert.equal(fromQuery.documentElement.getAttribute("data-theme"), "celadon");
});

test("all three rendered radio buttons apply, persist, and announce their theme", async () => {
  const dom = new JSDOM("<!doctype html><html><body><div id='root'></div></body></html>", {
    url: "https://lijiu.test/",
  });
  const previousGlobals = new Map();
  for (const [key, value] of Object.entries({
    window: dom.window,
    document: dom.window.document,
    localStorage: dom.window.localStorage,
    Event: dom.window.Event,
    HTMLElement: dom.window.HTMLElement,
    IS_REACT_ACT_ENVIRONMENT: true,
  })) {
    previousGlobals.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, {
      configurable: true,
      value,
      writable: true,
    });
  }

  const root = createRoot(dom.window.document.querySelector("#root"));
  try {
    const { ThemeToggle } = await import("../src/components/theme-toggle.tsx");
    const { THEME_CHANGE_EVENT } = await loadThemeContract();
    let eventCount = 0;
    dom.window.addEventListener(THEME_CHANGE_EVENT, () => eventCount++);
    dom.window.localStorage.setItem("lijiu:theme", "night");

    await act(async () => root.render(React.createElement(ThemeToggle)));
    const radios = [...dom.window.document.querySelectorAll('[role="radio"]')];
    assert.equal(radios.length, 3);
    assert.deepEqual(
      radios.map((radio) => radio.textContent.trim()),
      ["宣纸", "青瓷", "夜读"],
    );
    assert.equal(dom.window.document.documentElement.dataset.theme, "night");
    assert.equal(radios[2].getAttribute("aria-checked"), "true");
    eventCount = 0;

    for (const [index, expected] of ["paper", "celadon", "night"].entries()) {
      await act(async () => radios[index].click());
      assert.equal(
        dom.window.document.documentElement.getAttribute("data-theme"),
        expected === "paper" ? null : expected,
      );
      assert.equal(dom.window.localStorage.getItem("lijiu:theme"), expected);
      assert.deepEqual(
        radios.map((radio) => radio.getAttribute("aria-checked")),
        ["paper", "celadon", "night"].map((theme) =>
          theme === expected ? "true" : "false",
        ),
      );
    }
    assert.equal(eventCount, 3);
  } finally {
    await act(async () => root.unmount());
    dom.window.close();
    for (const [key, descriptor] of previousGlobals) {
      if (descriptor === undefined) delete globalThis[key];
      else Object.defineProperty(globalThis, key, descriptor);
    }
  }
});

test("layout bootstraps before hydration without next-themes", () => {
  const layout = projectFile("src/app/layout.tsx");
  const packageJson = JSON.parse(projectFile("package.json"));
  const bootstrapExpression =
    '<script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />';
  const headStart = layout.indexOf("<head>");
  const headEnd = layout.indexOf("</head>");
  const bootstrap = layout.indexOf(bootstrapExpression);
  const body = layout.indexOf("<body");

  assert.match(layout, /<html[^>]*suppressHydrationWarning/);
  assert.ok(headStart !== -1 && headStart < bootstrap);
  assert.ok(bootstrap < headEnd && headEnd < body);
  assert.doesNotMatch(layout, /ThemeProvider|next-themes/);
  assert.equal(packageJson.dependencies["next-themes"], undefined);
  assert.equal(
    existsSync(new URL("../src/components/theme-provider.tsx", import.meta.url)),
    false,
  );
});

test("shared controls contain no class-based dark-mode branch", () => {
  const legacySources = [
    "src/components/theme-toggle.tsx",
    "src/components/ui/badge.tsx",
    "src/components/ui/button.tsx",
    "src/components/ui/input.tsx",
  ].map(projectFile);

  for (const source of legacySources) {
    assert.doesNotMatch(source, /\bdark:/);
    assert.doesNotMatch(source, /next-themes/);
  }
});

test("each theme explicitly defines readable shadcn and workspace semantics", () => {
  const css = projectFile("src/app/globals.css");
  const selectors = [":root", ':root[data-theme="celadon"]', ':root[data-theme="night"]'];
  const required = [
    "--background",
    "--foreground",
    "--card",
    "--card-foreground",
    "--popover",
    "--popover-foreground",
    "--primary",
    "--primary-foreground",
    "--secondary",
    "--secondary-foreground",
    "--muted",
    "--surface-muted",
    "--muted-foreground",
    "--accent",
    "--accent-foreground",
    "--destructive",
    "--border",
    "--input",
    "--ring",
    "--chart-1",
    "--chart-2",
    "--chart-3",
    "--chart-4",
    "--chart-5",
    "--sidebar",
    "--sidebar-foreground",
    "--sidebar-primary",
    "--sidebar-primary-foreground",
    "--sidebar-accent",
    "--sidebar-accent-foreground",
    "--sidebar-border",
    "--sidebar-ring",
    "--mint",
    "--sky",
    "--ws-sidebar",
    "--ws-callout",
    "--ws-amber",
    "--ws-quote",
    "--ws-src",
    "--ws-label",
    "--ws-body",
  ];

  for (const selector of selectors) {
    const block = cssBlock(css, selector);
    for (const variable of required) {
      assert.match(block, new RegExp(`${variable.replaceAll("-", "\\-")}\\s*:`), `${selector} ${variable}`);
    }
  }
  assert.equal(cssVariable(cssBlock(css, ":root"), "--radius"), "0.75rem");
  assert.match(css, /--color-muted:\s*var\(--surface-muted\)/);
  assert.doesNotMatch(css, /(?:^|\s)\.dark\b/m);
  assert.doesNotMatch(css, /@custom-variant\s+dark/);
});

test("all themes exactly reuse the shared homepage core palette", () => {
  const css = projectFile("src/app/globals.css");

  for (const [selector, expected] of Object.entries(SHARED_THEME_CORE)) {
    const block = cssBlock(css, selector);
    for (const [name, value] of Object.entries(expected)) {
      assert.equal(cssVariable(block, name), value, `${selector} ${name}`);
    }
  }
});

test("derived text surfaces remain readable in all three themes", () => {
  const css = projectFile("src/app/globals.css");
  const pairs = [
    ["--foreground", "--background"],
    ["--card-foreground", "--card"],
    ["--popover-foreground", "--popover"],
    ["--primary-foreground", "--primary"],
    ["--secondary-foreground", "--secondary"],
    ["--muted-foreground", "--surface-muted"],
    ["--accent-foreground", "--accent"],
    ["--sidebar-foreground", "--sidebar"],
    ["--sidebar-primary-foreground", "--sidebar-primary"],
    ["--sidebar-accent-foreground", "--sidebar-accent"],
    ["--ws-body", "--card"],
    ["--ws-label", "--card"],
    ["--ws-quote", "--ws-callout"],
    ["--ws-src", "--ws-callout"],
  ];

  for (const selector of Object.keys(SHARED_THEME_CORE)) {
    const block = cssBlock(css, selector);
    for (const [foregroundName, backgroundName] of pairs) {
      const foreground = resolvedCssColor(block, foregroundName);
      const background = resolvedCssColor(block, backgroundName);
      assert.ok(
        contrast(foreground, background) >= 4.5,
        `${selector} ${foregroundName} on ${backgroundName} must reach 4.5:1`,
      );
    }
  }
});

test("workspace category chip text stays readable over every dot in every theme", () => {
  const css = projectFile("src/app/globals.css");
  const workspace = projectFile("src/components/workspace-spread.tsx");
  const themes = [":root", ':root[data-theme="celadon"]', ':root[data-theme="night"]'];

  assert.doesNotMatch(workspace, /color:\s*dot/);
  assert.match(workspace, /borderColor:\s*`\$\{dot\}80`/);
  assert.equal(cssVariable(cssBlock(css, ".ws-chip"), "color"), "var(--foreground)");

  for (const selector of themes) {
    const block = cssBlock(css, selector);
    const foreground = resolvedCssColor(block, "--foreground");
    const card = resolvedCssColor(block, "--card");
    for (const dot of new Set(Object.values(CATEGORY_DOT))) {
      const chipBackground = composite(dot, card, 0x1a / 255);
      assert.ok(
        contrast(foreground, chipBackground) >= 4.5,
        `${selector} ${dot} category text must reach 4.5:1`,
      );
    }
  }
});

test("font contract adds numerals and kai while preserving local Lishu", () => {
  const layout = projectFile("src/app/layout.tsx");
  const css = projectFile("src/app/globals.css");
  const page = projectFile("src/app/page.tsx");
  const workspace = projectFile("src/components/workspace-spread.tsx");
  const designs = projectFile("src/app/designs/page.tsx");
  const packageJson = JSON.parse(projectFile("package.json"));

  assert.match(
    layout,
    /Noto_Sans_SC\(\{[\s\S]*?weight: \["400", "600", "700"\]/,
  );
  assert.match(
    layout,
    /Noto_Serif_SC\(\{[\s\S]*?weight: \["600", "700", "900"\]/,
  );
  assert.match(layout, /Cormorant_Garamond/);
  assert.match(layout, /lxgw-wenkai-screen-web/);
  assert.match(css, /\.font-kai/);
  assert.match(css, /\.font-num/);
  assert.doesNotMatch(css, /--font-numerals:\s*var\(--font-numerals\)/);
  assert.match(page, /className="brand-seal font-kai"/);
  assert.match(page, /<dd className="[^"]*\bfont-num\b[^"]*"/);
  assert.match(page, /品牌用楷体，数字用 Cormorant Garamond/);
  assert.match(workspace, /className="ws-chip ghost font-num"/);
  assert.doesNotMatch(cssBlock(css, ".brand-seal"), /font-family/);
  assert.match(designs, /TW-MOE-Li\.ttf/);
  assert.equal(packageJson.dependencies["lxgw-wenkai-screen-web"], "^1.522.0");
});
