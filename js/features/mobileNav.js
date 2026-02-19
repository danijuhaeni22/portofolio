import { $, $$ } from "../lib/dom.js";
import { copyText } from "./clipboard.js";
import { EMAIL } from "../config.js";

export function initMobileNav() {
  const wrap = $("#mobileMenu");
  const btn = $("#burgerBtn");
  const closeBtn = $("#mnavClose");
  const copyBtn = $("#mnavCopyEmail");
  if (!wrap || !btn || !closeBtn) return;

  const open = () => {
    wrap.classList.add("show");
    wrap.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");
    btn.classList.add("is-open");
    document.body.classList.add("no-scroll");
  };

  const close = () => {
    wrap.classList.remove("show");
    wrap.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");
    btn.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
  };

  btn.addEventListener("click", () => {
    const isOpen = wrap.classList.contains("show");
    isOpen ? close() : open();
  });

  closeBtn.addEventListener("click", close);

  wrap.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.matches("[data-close]")) close();
  });

  $$(".mnav__link").forEach((a) => a.addEventListener("click", close));
  copyBtn?.addEventListener("click", () => copyText(EMAIL));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && wrap.classList.contains("show")) close();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760 && wrap.classList.contains("show")) close();
  });
}
