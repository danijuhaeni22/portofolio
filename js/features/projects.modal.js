import { $, $$ } from "../lib/dom.js";
import { copyText } from "./clipboard.js";
import { PROJECTS } from "./projects.data.js";
import { renderCaseStudy } from "./projects.render.js";

function initCaseGallery(modalBody) {
  if (!modalBody) return;

  modalBody.addEventListener("click", (e) => {
    const btn = e.target?.closest?.(".js-shot");
    if (btn) {
      const src = btn.getAttribute("data-src");
      const heroImg = $("#caseHeroImg", modalBody);
      if (!src || !heroImg) return;

      heroImg.src = src;

      $$(".js-shot", modalBody).forEach((x) => x.classList.remove("is-active"));
      btn.classList.add("is-active");
      return;
    }

    const imgEl = e.target?.closest?.("img");
    if (!imgEl) return;

    const isHero = imgEl.id === "caseHeroImg";
    const isArch = imgEl.matches(".arch img");
    if (!isHero && !isArch) return;

    const src = imgEl.getAttribute("src");
    const caption = isHero ? "Screenshot preview" : "Architecture diagram";
    window.__openLightbox?.(src, caption);
  });
}

export function initProjectsModal() {
  const modal = $("#modal");
  const closeBtn = $("#modalClose");
  const body = $("#modalBody");
  const title = $("#modalTitle");
  const subtitle = $("#modalSubtitle");
  const demo = $("#modalDemo");
  const repo = $("#modalRepo");
  const copy = $("#modalCopy");

  if (!modal || !closeBtn || !body || !title || !subtitle || !demo || !repo || !copy) return;

  initCaseGallery(body);

  let activeKey = null;

  const open = (key) => {
    const p = PROJECTS[key];
    if (!p) return;
    activeKey = key;

    title.textContent = p.title || "Project";
    subtitle.textContent = p.subtitle || "";
    body.innerHTML = renderCaseStudy(p);

    demo.href = p.demo || "#";
    repo.href = p.repo || "#";

    demo.style.display = p.demo && p.demo !== "#" ? "inline-flex" : "none";
    repo.style.display = p.repo && p.repo !== "#" ? "inline-flex" : "none";

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    closeBtn.focus();
  };

  const close = () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    activeKey = null;
    body.innerHTML = "";
  };

  $$(".proj").forEach((btn) =>
    btn.addEventListener("click", () => open(btn.getAttribute("data-project")))
  );

  closeBtn.addEventListener("click", close);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) close();
  });

  copy.addEventListener("click", () => {
    if (!activeKey) return;
    const p = PROJECTS[activeKey];
    copyText((p.stack || []).join(", "));
  });
}
