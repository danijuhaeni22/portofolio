import { $ } from "../lib/dom.js";

export function initHeader() {
  const header = $("#header");
  if (!header) return;

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 6);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}
