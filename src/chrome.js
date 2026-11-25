// Shared page chrome (nav, footer, helpers) for the home page and the events page.
import * as C from "./content.js";

export const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const pad = (n) => String(n).padStart(2, "0");
export const img = (src, alt, w, h, cls = "") =>
  `<img class="${cls}" src="/img/${src}.webp" alt="${alt}" width="${w}" height="${h}" loading="lazy" decoding="async">`;
export const head = (n, kicker, title, sub = "") => `
  <header class="sec-head reveal">
    <p class="kicker"><span class="idx">${n}</span>${kicker}</p>
    <h2>${title}</h2>
    ${sub ? `<p class="sec-sub">${sub}</p>` : ""}
  </header>`;
export const dis = (color, dir) => `<canvas class="dis" data-color="${color}" data-dir="${dir}" aria-hidden="true"></canvas>`;
export const corners = "<i></i><i></i><i></i><i></i>";

// page: "home" | "events" | "activities". Off the home page, section links point back home.
const NAV = [["about", "About"], ["events", "Events"], ["activities", "Activities"], ["team", "Team"], ["contact", "Contact"]];
const PAGES = { events: "/events.html", activities: "/activities.html" };
const href = (id, page) => PAGES[id] || (page === "home" ? `#${id}` : `/#${id}`);

export function navHTML(page) {
  return `
<header class="nav" id="nav">
  <a class="brand" href="${page === "home" ? "#top" : "/"}" aria-label="IEEE INSAT Computer Society — home">
    <img src="/img/logo-white.webp" alt="" width="640" height="250">
  </a>
  <nav aria-label="Primary" class="nav-links" id="nav-links">
    ${NAV.map(([id, l]) => `<a href="${href(id, page)}"${page === id ? ' aria-current="page"' : ""}>${l}</a>`).join("")}
  </nav>
  <button class="menu-btn" id="menu-btn" aria-expanded="false" aria-controls="nav-links"><span class="sr">Menu</span><i></i><i></i></button>
</header>`;
}

export function footerHTML(page) {
  return `
<footer class="footer ink" data-pose="end">
  <div class="wrap footer-grid">
    <div>
      <img class="footer-logo" src="/img/logo-white.webp" alt="IEEE INSAT Computer Society" width="640" height="250" loading="lazy">
      <p>We are a team of enthusiastic engineers having a common interest: our love for INSAT and the IEEE community.</p>
    </div>
    <nav aria-label="Footer">
      <h2>Useful links</h2>
      <ul>
        <li><a href="${href("contact", page)}">Contact us</a></li>
        <li><a href="/events.html">Events</a></li>
        <li><a href="${href("activities", page)}">Activities</a></li>
        <li><a href="${href("team", page)}">Our team</a></li>
      </ul>
    </nav>
    <div>
      <h2>Visit us</h2>
      <ul>
        ${C.contact.socials.map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.name}</a></li>`).join("")}
        <li><a href="${C.contact.maps}" target="_blank" rel="noopener">Find INSAT on the map</a></li>
      </ul>
    </div>
  </div>
  <p class="copy wrap">© ${new Date().getFullYear()} IEEE Computer Society INSAT Student Branch Chapter</p>
</footer>`;
}

/* ---------- pixel disintegration edges (charter) ---------- */
function mulberry(a) { return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function drawDis() {
  document.querySelectorAll("canvas.dis").forEach((c, n) => {
    const w = c.clientWidth, cell = w < 700 ? 14 : 22, rows = 6;
    const cols = Math.ceil(w / cell);
    c.width = cols; c.height = rows;
    c.style.height = rows * cell + "px";
    const ctx = c.getContext("2d");
    ctx.fillStyle = c.dataset.color;
    const rnd = mulberry(7 + n * 13);
    const up = c.dataset.dir === "up";
    for (let x = 0; x < cols; x++) {
      const col = 1 + Math.floor(rnd() * 3);
      for (let y = 0; y < rows; y++) {
        const d = up ? rows - 1 - y : y;
        if (d < col || rnd() < 0.42 * Math.pow(1 - d / rows, 2.2)) ctx.fillRect(x, y, 1, 1);
      }
    }
  });
}

/** Nav menu, scroll spy (home), reveals, pixel edges. */
export function initChrome(page) {
  const root = document.documentElement;
  drawDis();
  let disW = window.innerWidth;
  window.addEventListener("resize", () => { if (window.innerWidth !== disW) { disW = window.innerWidth; drawDis(); } });

  if (reducedMotion || !("IntersectionObserver" in window)) {
    root.classList.add("no-motion");
  } else {
    root.classList.add("motion");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }

  const menuBtn = document.getElementById("menu-btn");
  const nav = document.getElementById("nav");
  const setMenu = (open) => {
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("lock", open);
  };
  menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  nav.querySelectorAll(".nav-links a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  if (page === "home" && "IntersectionObserver" in window) {
    const links = [...nav.querySelectorAll(".nav-links a")];
    const spy = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) links.forEach((a) => a.toggleAttribute("aria-current", a.hash === "#" + e.target.id));
    }, { rootMargin: "-45% 0px -50% 0px" });
    NAV.forEach(([id]) => { const el = document.getElementById(id); if (el && !PAGES[id]) spy.observe(el); });
  }
}
