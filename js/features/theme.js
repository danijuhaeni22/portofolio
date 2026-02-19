import { $ } from "../lib/dom.js";

export function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  const iconA = $("#themeBtn .icon");
  const iconB = $("#themeBtnMobile .icon");
  const glyph = theme === "light" ? "☼" : "☾";

  if (iconA) iconA.textContent = glyph;
  if (iconB) iconB.textContent = glyph;
}

export function getTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;

  const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)")?.matches;
  return prefersLight ? "light" : "dark";
}

export function bindThemeButtons() {
  $("#themeBtn")?.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(cur === "dark" ? "light" : "dark");
  });

  $("#themeBtnMobile")?.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(cur === "dark" ? "light" : "dark");
  });
}
