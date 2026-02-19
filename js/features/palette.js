import { $, $$ } from "../lib/dom.js";
import { go } from "./scroll.js";
import { copyText } from "./clipboard.js";
import { setTheme } from "./theme.js";
import { EMAIL } from "../config.js";

export function initPalette() {
  const wrap = $("#palette");
  const input = $("#paletteInput");
  const list = $("#paletteList");
  const fab = $("#fabPalette");
  if (!wrap || !input || !list) return;

  const actions = [
    { label: "Go: About", key: "about", run: () => go("#about") },
    { label: "Go: Projects", key: "projects", run: () => go("#projects") },
    { label: "Go: Experience", key: "experience", run: () => go("#experience") },
    { label: "Go: Skills", key: "skills", run: () => go("#skills") },
    { label: "Go: Contact", key: "contact", run: () => go("#contact") },
    { label: "Copy: Email", key: "email", run: () => copyText(EMAIL) },
    {
      label: "Toggle: Theme",
      key: "theme",
      run: () =>
        setTheme(
          (document.documentElement.getAttribute("data-theme") || "dark") === "dark"
            ? "light"
            : "dark"
        ),
    },
  ];

  let filtered = actions.slice();
  let active = 0;

  const render = () => {
    list.innerHTML = filtered
      .map(
        (a, i) => `
        <li class="palette__item ${i === active ? "active" : ""}" data-i="${i}">
          <span>${a.label}</span>
          <span class="palette__kbd">⏎</span>
        </li>
      `
      )
      .join("");
  };

  const open = () => {
    wrap.classList.add("show");
    wrap.setAttribute("aria-hidden", "false");
    input.value = "";
    filtered = actions.slice();
    active = 0;
    render();
    input.focus();
  };

  const close = () => {
    wrap.classList.remove("show");
    wrap.setAttribute("aria-hidden", "true");
  };

  const applyFilter = (q) => {
    const s = q.trim().toLowerCase();
    filtered = !s
      ? actions.slice()
      : actions.filter((a) => a.label.toLowerCase().includes(s) || a.key.includes(s));
    active = 0;
    render();
  };

  document.addEventListener("keydown", (e) => {
    const isK = e.key.toLowerCase() === "k";
    if ((e.ctrlKey || e.metaKey) && isK) {
      e.preventDefault();
      open();
      return;
    }
    if (e.key === "Escape" && wrap.classList.contains("show")) close();
  });

  fab?.addEventListener("click", open);

  wrap.addEventListener("click", (e) => {
    if (e.target === wrap) close();
  });

  input.addEventListener("input", () => applyFilter(input.value));

  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      active = Math.min(active + 1, filtered.length - 1);
      render();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      active = Math.max(active - 1, 0);
      render();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[active];
      if (!item) return;
      close();
      item.run();
    }
  });

  list.addEventListener("click", (e) => {
    const li = e.target.closest(".palette__item");
    if (!li) return;
    const i = Number(li.getAttribute("data-i"));
    const item = filtered[i];
    if (!item) return;
    close();
    item.run();
  });
}
