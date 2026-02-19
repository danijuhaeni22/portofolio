import { $ } from "../lib/dom.js";

export function initLightbox() {
  const lb = $("#lightbox");
  const img = $("#lightboxImg");
  const cap = $("#lightboxCap");
  if (!lb || !img || !cap) return;

  const open = (src, caption = "") => {
    if (!src) return;
    img.src = src;
    cap.textContent = caption || "";
    lb.classList.add("show");
    lb.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  };

  const close = () => {
    lb.classList.remove("show");
    lb.setAttribute("aria-hidden", "true");
    img.src = "";
    cap.textContent = "";
    document.body.classList.remove("no-scroll");
  };

  lb.addEventListener("click", (e) => {
    const t = e.target;
    if (t && (t.matches("[data-lb-close]") || t.closest("[data-lb-close]"))) {
      close();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lb.classList.contains("show")) close();
  });

  window.__openLightbox = open;
}
