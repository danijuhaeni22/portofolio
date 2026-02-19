import { $ } from "./lib/dom.js";
import { EMAIL } from "./config.js";

import { copyText } from "./features/clipboard.js";
import { getTheme, setTheme, bindThemeButtons } from "./features/theme.js";
import { initBackToTopCapture, scrollToTop } from "./features/scroll.js";
import { initReveal } from "./features/reveal.js";
import { initHeader } from "./features/header.js";
import { initMobileNav } from "./features/mobileNav.js";
import { initLightbox } from "./features/lightbox.js";
import { initProjectsModal } from "./features/projects.modal.js";
import { initPalette } from "./features/palette.js";
import { startTyping } from "./features/typing.js";

function initScrollSpy() {
  const links = [...document.querySelectorAll(".nav--desktop .nav__link")];
  if (!links.length) return;

  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach((a) => {
      a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`);
    });
  };

  links.forEach((a) => {
    a.addEventListener("click", () => {
      links.forEach((x) => x.classList.remove("is-active"));
      a.classList.add("is-active");
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id);
      }
    },
    { threshold: 0.5, rootMargin: "-80px 0px 0px 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

function initInteractions() {
  const y = $("#year");
  if (y) y.textContent = String(new Date().getFullYear());

  setTheme(getTheme());
  bindThemeButtons();

  $("#copyEmailBtn")?.addEventListener("click", () => copyText(EMAIL));
  $("#contactCopyBtn")?.addEventListener("click", () => copyText(EMAIL));

  $("#fabTop")?.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToTop();
  });
}

(function init() {
  initBackToTopCapture();
  initHeader();
  initReveal();
  initScrollSpy();
  initMobileNav();
  initLightbox();
  initProjectsModal();
  initPalette();
  initInteractions();
  startTyping();
})();
