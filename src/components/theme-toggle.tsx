"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import {
  resolveTheme,
  THEMES,
  THEME_CHANGE_EVENT,
  THEME_KEY,
  type ThemeId,
} from "@/lib/theme";

function applyTheme(theme: ThemeId) {
  if (theme === "paper") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
}

function getThemeSnapshot() {
  return resolveTheme(document.documentElement.dataset.theme ?? null, null);
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, () => "paper");

  useLayoutEffect(() => {
    const query = new URLSearchParams(window.location.search).get("theme");
    let stored = null;

    try {
      stored = window.localStorage.getItem(THEME_KEY);
    } catch {}

    const initialTheme = resolveTheme(query, stored);
    if (query === initialTheme) {
      try {
        window.localStorage.setItem(THEME_KEY, initialTheme);
      } catch {}
    }

    applyTheme(initialTheme);
    window.dispatchEvent(new window.Event(THEME_CHANGE_EVENT));
  }, []);

  function selectTheme(nextTheme: ThemeId) {
    applyTheme(nextTheme);
    window.dispatchEvent(new window.Event(THEME_CHANGE_EVENT));

    try {
      window.localStorage.setItem(THEME_KEY, nextTheme);
    } catch {}
  }

  return (
    <div
      role="radiogroup"
      aria-label="主题颜色"
      className="inline-flex items-center rounded-full border border-border bg-card p-1"
    >
      {THEMES.map((option) => (
        <button
          key={option.id}
          type="button"
          role="radio"
          aria-checked={theme === option.id}
          aria-label={option.name}
          title={option.name}
          onClick={() => selectTheme(option.id)}
          className={`flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium transition-colors ${
            theme === option.id
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <span
            aria-hidden
            className="size-2.5 rounded-full border border-border"
            style={{
              background: `linear-gradient(135deg, ${option.swatch[0]} 50%, ${option.swatch[1]} 50%)`,
            }}
          />
          <span className="hidden sm:inline">{option.name}</span>
        </button>
      ))}
    </div>
  );
}
