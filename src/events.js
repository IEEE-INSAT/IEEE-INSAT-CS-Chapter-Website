// Events page: the Time Portal's events hub (without challenges), in the charter.
// Pick an event from the tile row (click, hover, arrow keys); the artwork behind
// the page, the accent colour and the panel follow. Shareable: /events.html?event=ains
import "@fontsource/zalando-sans-expanded/latin-400.css";
import "@fontsource/zalando-sans-expanded/latin-700.css";
import "@fontsource/zalando-sans-expanded/latin-900.css";
import "@fontsource/zalando-sans/latin-400.css";
import "@fontsource/zalando-sans/latin-600.css";
import "./style.css";
import "./events.css";
import * as C from "./content.js";
import { navHTML, footerHTML, initChrome, head, img, corners, pad, reducedMotion } from "./chrome.js";
import { glyphSvg } from "./glyphs.js";
import { eventArt, animateArt } from "./event-art.js";
import { mountChat } from "./chat.js";

const EV = C.hubEvents;
const N = EV.length;
const HOVER_INTENT_MS = 110;
const accentVars = (ev) => `--ev-accent:${ev.theme.accent};--ev-accent-2:${ev.theme.accent2}`;

function title(ev) {
  const at = ev.highlight ? ev.name.indexOf(ev.highlight) : -1;
  if (at < 0) return ev.name;
  return `${ev.name.slice(0, at)}<span class="title-accent">${ev.highlight}</span>${ev.name.slice(at + ev.highlight.length)}`;
}

function heroHTML(ev) {
  const primary = ev.link
    ? `<a class="btn ev-primary" id="ev-primary" href="${ev.link.href}" target="_blank" rel="noopener">${ev.link.label} <span aria-hidden="true">↗</span></a>`
    : `<button type="button" class="btn ev-primary" id="ev-primary" data-details>▶ Details</button>`;
  return `
    <div class="ev-hero">
      <div class="ev-hero-text">
        <span class="ev-kicker">▶ ${ev.kicker}</span>
        <h2 class="ev-title">${title(ev)}</h2>
        <p class="ev-tagline">${ev.tagline}</p>
        <ul class="ev-meta">${ev.meta.map((m) => `<li>${m}</li>`).join("")}</ul>
        <div class="ev-actions">
          ${primary}
          ${ev.link ? `<button type="button" class="btn btn-line" data-details>▶ Details</button>` : ""}
        </div>
      </div>
      <p class="ev-hints" aria-hidden="true"><span><kbd>◀</kbd><kbd>▶</kbd> Browse</span><span><kbd>Enter</kbd> Open</span></p>
    </div>`;
}

function moreHTML(ev) {
  return `
    <div class="ev-details" id="event-details">
      <article class="ev-card ev-card-wide"><span class="ev-card-tag">About</span><p class="ev-card-text">${ev.about}</p></article>
      ${ev.highlights.map((h) => `<article class="ev-card"><span class="ev-card-tag">${h.label}</span><p class="ev-card-value">${h.value}</p></article>`).join("")}
    </div>
    ${ev.photos ? `
    <section class="ev-gallery" aria-labelledby="ev-gallery-title">
      <header class="ev-gallery-head">
        <h3 class="ev-gallery-title" id="ev-gallery-title"><span aria-hidden="true">▶</span> Moments from ${ev.name}</h3>
        <p class="ev-gallery-meta"><span>${pad(ev.photos)} photos</span><span class="ev-gallery-hint">Click a photo to enlarge</span></p>
      </header>
      <ul class="ev-mosaic" data-count="${ev.photos}">
        ${Array.from({ length: ev.photos }, (_, k) => `
          <li>
            <button type="button" class="ev-shot" data-shot="${k}" aria-label="Open photo ${k + 1} of ${ev.photos}">
              ${img(`hub/${ev.slug}-${k + 1}`, `${ev.name} — photo ${k + 1}`, 1600, 1067)}
              <span class="ev-shot-n" aria-hidden="true">${pad(k + 1)}</span>
              <span class="ev-shot-zoom" aria-hidden="true">⤢</span>
              ${corners}
            </button>
          </li>`).join("")}
      </ul>
    </section>` : ""}`;
}

/* ---------- full-screen photo viewer ---------- */
const viewer = document.createElement("dialog");
viewer.className = "ev-viewer";
viewer.setAttribute("aria-label", "Photo viewer");
viewer.innerHTML = `
  <figure class="ev-viewer-fig">
    <img id="viewer-img" alt="">
    <figcaption><span id="viewer-cap"></span><span id="viewer-n"></span></figcaption>
  </figure>
  <button type="button" class="ev-viewer-btn ev-viewer-prev" data-step="-1" aria-label="Previous photo">◀</button>
  <button type="button" class="ev-viewer-btn ev-viewer-next" data-step="1" aria-label="Next photo">▶</button>
  <button type="button" class="ev-viewer-close" aria-label="Close photo viewer">×</button>`;
document.body.appendChild(viewer);
let shot = { ev: null, i: 0 };
function showShot(i) {
  const n = shot.ev.photos;
  shot.i = (i + n) % n;
  const im = viewer.querySelector("#viewer-img");
  im.src = `/img/hub/${shot.ev.slug}-${shot.i + 1}.webp`;
  im.alt = `${shot.ev.name} — photo ${shot.i + 1}`;
  viewer.querySelector("#viewer-cap").textContent = shot.ev.name;
  viewer.querySelector("#viewer-n").textContent = `${pad(shot.i + 1)} / ${pad(n)}`;
}
function openViewer(ev, i) {
  shot.ev = ev;
  viewer.style.setProperty("--ev-accent", ev.theme.accent);
  showShot(i);
  viewer.showModal();
}
viewer.addEventListener("click", (e) => {
  const step = e.target.closest("[data-step]");
  if (step) return showShot(shot.i + Number(step.dataset.step));
  if (e.target.closest(".ev-viewer-close") || e.target === viewer) viewer.close();
});
viewer.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") { e.preventDefault(); showShot(shot.i + 1); }
  if (e.key === "ArrowLeft") { e.preventDefault(); showShot(shot.i - 1); }
});
let lastShot = null;
viewer.addEventListener("close", () => lastShot?.focus());

const params = new URLSearchParams(window.location.search);
let index = Math.max(0, EV.findIndex((e) => e.slug === params.get("event")));

document.getElementById("app").innerHTML = `
${navHTML("events")}
<main id="main">
  <div class="ev-backdrop" aria-hidden="true">
    ${EV.map((ev, i) => `<div class="ev-layer" data-i="${i}" style="${accentVars(ev)}">${eventArt(ev)}</div>`).join("")}
    <div class="ev-scrim"></div>
  </div>

  <div class="ev-hub" id="hub" style="${accentVars(EV[index])}">
    <div class="ev-head">
      <div>
        <span class="ev-badge">Event hub</span>
        <h1 class="ev-heading">Events</h1>
      </div>
      <div class="ev-hud" aria-hidden="true">
        <span>Event <b id="hud-n">01</b>/${pad(N)}</span>
        <span class="ev-segs">${EV.map(() => "<i></i>").join("")}</span>
      </div>
    </div>

    <div class="ev-rail" id="rail" role="tablist" aria-label="Events">
      ${EV.map((ev, i) => `
        <button type="button" role="tab" class="ev-tab" id="event-tab-${ev.slug}" data-i="${i}" aria-controls="event-panel event-more" style="${accentVars(ev)}">
          <span class="ev-tile">${glyphSvg(ev.slug, ev.theme)}<span class="ev-mark">${ev.mark}</span></span>
          <span class="ev-tab-label"><span>${ev.name}</span></span>
        </button>`).join("")}
    </div>


    <section class="ev-panel" id="event-panel" role="tabpanel" aria-live="polite"></section>

    <section class="ev-more" id="event-more" aria-live="polite"></section>
  </div>

  <section class="archive ink" id="archive">
    <div class="wrap">
      ${head("+", "More events", "From the archive")}
      <ul class="archive-grid">
        ${C.archiveEvents.map((e, i) => `
          <li class="arc reveal" style="--d:${i % 3}">
            <figure class="bbox">${img("events/" + e.img, "", 900, 600)}${corners}</figure>
            <h3>${e.title}</h3>
            <p>${e.text}</p>
          </li>`).join("")}
      </ul>
    </div>
  </section>
</main>
${footerHTML("events")}`;

initChrome("events");
mountChat();

const hub = document.getElementById("hub");
const panel = document.getElementById("event-panel");
const more = document.getElementById("event-more");
more.addEventListener("click", (e) => {
  const b = e.target.closest(".ev-shot");
  if (!b) return;
  lastShot = b;
  openViewer(EV[index], Number(b.dataset.shot));
});
const tabs = [...document.querySelectorAll(".ev-tab")];
const layers = [...document.querySelectorAll(".ev-layer")];
const segs = [...document.querySelectorAll(".ev-segs i")];
const hudN = document.getElementById("hud-n");
animateArt(layers, EV, () => index, reducedMotion);

function render(focusTab) {
  const ev = EV[index];
  hub.setAttribute("style", accentVars(ev));
  tabs.forEach((t, i) => {
    const on = i === index;
    t.toggleAttribute("data-active", on);
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
  });
  layers.forEach((l, i) => l.toggleAttribute("data-active", i === index));
  segs.forEach((s, i) => s.classList.toggle("on", i === index));
  hudN.textContent = pad(index + 1);
  panel.setAttribute("aria-labelledby", `event-tab-${ev.slug}`);
  panel.innerHTML = heroHTML(ev);
  more.innerHTML = moreHTML(ev);
  more.setAttribute("aria-label", `${ev.name} details`);
  panel.classList.remove("swap");
  void panel.offsetWidth;
  if (!reducedMotion) panel.classList.add("swap");
  panel.querySelectorAll("[data-details]").forEach((b) => b.addEventListener("click", () =>
    document.getElementById("event-details").scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" })));
  if (focusTab) {
    tabs[index].focus({ preventScroll: true });
    tabs[index].scrollIntoView({ block: "nearest", inline: "nearest" });
  }
  const url = new URL(window.location.href);
  if (url.searchParams.get("event") !== ev.slug) {
    url.searchParams.set("event", ev.slug);
    window.history.replaceState(window.history.state, "", url);
  }
}

function select(next, focus) {
  const i = Math.min(N - 1, Math.max(0, next));
  if (i === index) { if (focus) tabs[i].focus(); return; }
  index = i;
  render(focus);
}

let hoverTimer, hoverTarget = null;
tabs.forEach((t, i) => {
  t.addEventListener("click", (e) => {
    // Enter/Space on the selected tile jumps to its main action.
    if (i === index && e.detail === 0) document.getElementById("ev-primary")?.focus();
    else select(i, true);
  });
  // pointermove, not pointerenter: a cursor resting where a tile appears on load
  // must not override a shared ?event= link.
  t.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse" || hoverTarget === i) return;
    hoverTarget = i;
    clearTimeout(hoverTimer);
    hoverTimer = setTimeout(() => select(i, false), HOVER_INTENT_MS);
  });
  t.addEventListener("pointerleave", () => { hoverTarget = null; clearTimeout(hoverTimer); });
});

document.getElementById("rail").addEventListener("keydown", (e) => {
  const keys = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: N - 1 };
  if (!(e.key in keys)) return;
  e.preventDefault();
  select(keys[e.key], true);
});
// Arrow keys browse the row even before anything is focused.
document.addEventListener("keydown", (e) => {
  if (document.activeElement && document.activeElement !== document.body) return;
  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
  e.preventDefault();
  select(index + (e.key === "ArrowRight" ? 1 : -1), true);
});

render(false);
