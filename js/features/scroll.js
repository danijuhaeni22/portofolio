export function go(sel) {
  const el = document.querySelector(sel);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function scrollToTop() {
  try {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  } catch {}

  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  setTimeout(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } catch {
      window.scrollTo(0, 0);
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, 0);
}

export function initBackToTopCapture() {
  document.addEventListener(
    "click",
    (e) => {
      const btn = e.target?.closest?.("#fabTop");
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      scrollToTop();
    },
    true
  );
}
