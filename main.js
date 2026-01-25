const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const EMAIL = "danijuhaenimo@gmail.com";

// ---------- Toast ----------
function toast(msg) {
  const el = $("#toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), 1400);
}

// ---------- Clipboard ----------
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast("Copied ✅");
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      toast("Copied ✅");
    } catch {
      toast("Copy failed ❌");
    }
    ta.remove();
  }
}

// ---------- Theme ----------
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  const iconA = $("#themeBtn .icon");
  const iconB = $("#themeBtnMobile .icon");
  const glyph = theme === "light" ? "☼" : "☾";
  if (iconA) iconA.textContent = glyph;
  if (iconB) iconB.textContent = glyph;
}

function getTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)")?.matches;
  return prefersLight ? "light" : "dark";
}

// ---------- Smooth scroll ----------
function go(sel) {
  const el = document.querySelector(sel);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ✅ Back-to-top super robust (untuk kasus overlay/event aneh + browser beda)
function scrollToTop() {
  // coba smooth
  try {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  } catch {}

  // fallback paksa (kalau smooth gagal / scroll container beda)
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  // "double tap" (kadang dibutuhkan kalau ada layout reflow)
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

// ---------- Typing ----------
const TYPING = ["Frontend & Backend Engineer", "Dashboard • API • Systems", "Clean, Maintainable Code"];
function startTyping() {
  const out = $("#typing");
  if (!out) return;

  let i = 0,
    j = 0,
    dir = 1,
    pause = 0;

  const tick = () => {
    const text = TYPING[i];

    if (pause > 0) {
      pause--;
      setTimeout(tick, 30);
      return;
    }

    j += dir;
    out.textContent = text.slice(0, j);

    if (dir === 1 && j >= text.length) {
      pause = 26;
      dir = -1;
    } else if (dir === -1 && j <= 0) {
      dir = 1;
      i = (i + 1) % TYPING.length;
      pause = 8;
    }

    setTimeout(tick, dir === 1 ? 45 : 28);
  };

  tick();
}

// ---------- Reveal on scroll ----------
function initReveal() {
  const els = $$("[data-reveal]");
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
}

// ---------- Scrollspy ----------
function initScrollSpy() {
  const links = $$(".nav--desktop .nav__link");
  if (!links.length) return;

  const targets = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);

  const spy = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((x) => x.isIntersecting)
        .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
      if (!visible) return;

      const id = `#${visible.target.id}`;
      links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === id));
    },
    { threshold: [0.2, 0.35, 0.5], rootMargin: "-20% 0px -65% 0px" }
  );

  targets.forEach((t) => spy.observe(t));
}

// ---------- Header state ----------
function initHeader() {
  const header = $("#header");
  if (!header) return;
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 6);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// ---------- Mobile Nav ----------
function initMobileNav() {
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

// ---------- Projects modal ----------
const PROJECTS = {
  tirc: {
    title: "ISO8583 Dashboard (TiRC)",
    desc: "Realtime monitoring transaksi ISO-8583: ingest log per bank, pairing request/response, chart & tooltip untuk analisis operasional.",
    stack: ["Node.js", "Express", "Chart.js", "File ingest", "Cron/Automation"],
    link: "https://github.com/",
  },
  pos: {
    title: "POS & Inventory",
    desc: "POS dan inventory management: multi-lokasi stok, purchase/sales flow, movement, dan audit log.",
    stack: ["Next.js", "MongoDB", "Mongoose", "UI Components"],
    link: "https://github.com/",
  },
  expense: {
    title: "Expense Tracker",
    desc: "Dashboard pengeluaran mingguan/bulanan dengan input rupiah, pie chart, dan ringkasan.",
    stack: ["Vanilla JS", "Charts", "LocalStorage"],
    link: "https://github.com/",
  },
};

function initModal() {
  const modal = $("#modal");
  const closeBtn = $("#modalClose");
  const body = $("#modalBody");
  const title = $("#modalTitle");
  const link = $("#modalLink");
  const copy = $("#modalCopy");
  if (!modal || !closeBtn || !body || !title || !link || !copy) return;

  let activeKey = null;

  const open = (key) => {
    const p = PROJECTS[key];
    if (!p) return;
    activeKey = key;

    title.textContent = p.title;
    body.innerHTML = `
      <p>${p.desc}</p>
      <div style="margin-top:10px; display:flex; gap:10px; flex-wrap:wrap;">
        ${(p.stack || []).map((s) => `<span class="mini liquid">${s}</span>`).join("")}
      </div>
    `;
    link.href = p.link || "#";

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    closeBtn.focus();
  };

  const close = () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    activeKey = null;
  };

  $$(".proj").forEach((btn) => btn.addEventListener("click", () => open(btn.getAttribute("data-project"))));
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

// ---------- Command Palette ----------
function initPalette() {
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
        setTheme((document.documentElement.getAttribute("data-theme") || "dark") === "dark" ? "light" : "dark"),
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
    filtered = !s ? actions.slice() : actions.filter((a) => a.label.toLowerCase().includes(s) || a.key.includes(s));
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

// ---------- Interactions ----------
function initInteractions() {
  const y = $("#year");
  if (y) y.textContent = String(new Date().getFullYear());

  setTheme(getTheme());

  $("#themeBtn")?.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(cur === "dark" ? "light" : "dark");
  });

  $("#themeBtnMobile")?.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(cur === "dark" ? "light" : "dark");
  });

  $("#copyEmailBtn")?.addEventListener("click", () => copyText(EMAIL));
  $("#contactCopyBtn")?.addEventListener("click", () => copyText(EMAIL));

  $$("[data-scrollto]").forEach((b) => b.addEventListener("click", () => go(b.getAttribute("data-scrollto"))));

  // Binding normal (tetap)
  $("#fabTop")?.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToTop();
  });
}

/**
 * ✅ SUPER IMPORTANT:
 * Capture handler global supaya tombol tetap jalan walaupun ada layer/handler lain yang nahan event.
 * (Ini yang biasanya bikin “klik ga ada aksi”.)
 */
function initBackToTopCapture() {
  document.addEventListener(
    "click",
    (e) => {
      const btn = e.target?.closest?.("#fabTop");
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      scrollToTop();
    },
    true // <-- CAPTURE PHASE
  );
}

(function init() {
  initBackToTopCapture();
  initHeader();
  initReveal();
  initScrollSpy();
  initMobileNav();
  initModal();
  initPalette();
  initInteractions();
  startTyping();
})();
