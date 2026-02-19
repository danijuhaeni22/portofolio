import { escHtml } from "../lib/escape.js";

export function renderCaseStudy(p) {
  const shots = (p.shots || []).filter(Boolean);
  const hero = shots[0];
  const thumbs = shots.slice(1, 3);

  const impact = (p.impact || [])
    .map(
      (x) => `
      <div class="impact">
        <div class="impact__num">${escHtml(x.num)}</div>
        <div class="impact__label">${escHtml(x.label)}</div>
      </div>
    `
    )
    .join("");

  const feats = (p.features || []).map((x) => `<li>${escHtml(x)}</li>`).join("");

  const stack = (p.stack || [])
    .map((s) => `<span class="mini liquid">${escHtml(s)}</span>`)
    .join("");

  const thumbsHtml = thumbs
    .map(
      (src, idx) => `
        <button class="case__thumb js-shot ${idx === 0 ? "is-active" : ""}" type="button" data-src="${escHtml(
        src
      )}" aria-label="Preview screenshot ${idx + 2}">
          <img class="zoomable" src="${escHtml(src)}" alt="${escHtml(p.title)} screenshot ${
        idx + 2
      }" loading="lazy" />
        </button>
      `
    )
    .join("");

  const archHtml =
    p.arch && p.arch !== "#"
      ? `
        <div class="case__card">
          <h4>ARCHITECTURE</h4>
          <p>${escHtml(p.archCaption || "Ringkasan arsitektur & alur data.")}</p>
          <div class="arch" style="margin-top:10px;">
            <img class="zoomable" src="${escHtml(p.arch)}" alt="${escHtml(
          p.title
        )} architecture diagram" loading="lazy" />
          </div>
        </div>
      `
      : "";

  return `
    <div class="case" data-case="1">
      <div class="case__gallery">
        <div class="case__hero">
          ${
            hero
              ? `<img id="caseHeroImg" class="zoomable" src="${escHtml(hero)}" alt="${escHtml(
                  p.title
                )} screenshot" loading="lazy" />`
              : `<div style="padding:16px;" class="muted">Add screenshot: assets/img/projects/...</div>`
          }
          <div class="case__heroHint">Klik thumbnail untuk ganti preview</div>
        </div>

        <div class="case__thumbs" aria-label="Screenshot thumbnails">
          ${
            thumbsHtml ||
            `<div class="muted" style="padding:12px;">Tambahkan minimal 2 screenshot agar gallery aktif.</div>`
          }
        </div>
      </div>

      <div class="case__impact">${impact}</div>

      <div class="case__grid">
        <div class="case__card">
          <h4>PROBLEM</h4>
          <p>${escHtml(p.problem)}</p>
        </div>

        <div class="case__card">
          <h4>SOLUTION</h4>
          <p>${escHtml(p.solution)}</p>
        </div>

        <div class="case__card">
          <h4>ROLE</h4>
          <p>${escHtml(p.role)}</p>
          <div class="case__chips">${stack}</div>
        </div>

        <div class="case__card">
          <h4>KEY FEATURES</h4>
          <ul class="case__list">${feats}</ul>
        </div>

        ${archHtml}
      </div>
    </div>
  `;
}
