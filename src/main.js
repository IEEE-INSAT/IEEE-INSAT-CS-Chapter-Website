import "@fontsource/zalando-sans-expanded/latin-400.css";
import "@fontsource/zalando-sans-expanded/latin-700.css";
import "@fontsource/zalando-sans-expanded/latin-900.css";
import "@fontsource/zalando-sans/latin-400.css";
import "@fontsource/zalando-sans/latin-600.css";
import "./style.css";
import * as C from "./content.js";
import { glyphSvg } from "./glyphs.js";
import { navHTML, footerHTML, initChrome, head, img, dis, corners, reducedMotion } from "./chrome.js";
import { mountChat } from "./chat.js";
import { builderHTML, initBuilder } from "./builder.js";

const EV = C.hubEvents;

document.getElementById("app").innerHTML = `
${navHTML("home")}
<main id="main">
  <section class="hero" id="top" data-pose="hero">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <p class="kicker rise" style="--d:0"><span class="idx">00</span>INSAT Student Branch Chapter</p>
        <h1 class="rise" style="--d:1"><span class="h1-top">IEEE INSAT</span>Computer<br>Society</h1>
        <p class="lede rise" style="--d:2">The home of INSAT’s computer science community: workshops, competitions and people who build things together.</p>
        <div class="cta rise" style="--d:3">
          <a class="btn btn-lime" href="#events">Explore our events</a>
          <a class="btn btn-line" href="#contact">Contact us</a>
        </div>
      </div>
    </div>
    <div class="hero-bar wrap rise" style="--d:4">
      <span>Since March 2015</span><i aria-hidden="true"></i><span>INSAT, Tunis</span><i aria-hidden="true"></i>
      <a class="hero-down" href="#about" aria-label="Scroll to About us"><span aria-hidden="true">↓</span></a>
    </div>
  </section>

  <section class="about" id="about" data-pose="about">
    <div class="wrap side right">
      <div class="panel">
        ${head("01", "About us", "Who we are")}
        ${C.about.map((p) => `<p class="body reveal">${p}</p>`).join("")}
      </div>
    </div>
  </section>

  <section class="pillar" id="mission" data-pose="mission">
    <div class="wrap side left">
      <div class="panel">
        ${head("02", "Our mission", "Show the world the beauty of computer science")}
        <p class="body reveal">${C.pillars.mission}</p>
      </div>
    </div>
  </section>

  <section class="pillar" id="vision" data-pose="vision">
    <div class="wrap side right">
      <div class="panel">
        ${head("03", "Our vision", "Where students meet the real world")}
        <p class="body reveal">${C.pillars.vision}</p>
      </div>
    </div>
  </section>

  <section class="pillar" id="plan" data-pose="plan">
    <div class="wrap side left">
      <div class="panel">
        ${head("04", "The game plan", C.game.title)}
        ${builderHTML(C.game)}
      </div>
    </div>
  </section>

  ${dis("#F1FFC8", "up")}
  <section class="facts cream" id="facts" data-pose="facts">
    <div class="wrap">
      ${head("05", "Facts", "Since March 2015")}
      <p class="body facts-intro reveal">${C.facts.intro}</p>
      <dl class="stats">
        ${C.facts.stats.map((s, i) => `
          <div class="stat reveal" style="--d:${i}">
            <dd><span class="plus">+</span><span class="count" data-to="${s.value}">${s.value}</span></dd>
            <dt>${s.label}</dt>
          </div>`).join("")}
      </dl>
    </div>
    <div class="collage" id="collage" aria-label="Moments from our events">
      ${[1, 2, 3, 4, 5].map((n) => `<figure class="shot bbox" style="--i:${n}">${img("collage/" + n, "", 560, 420)}${corners}</figure>`).join("")}
    </div>
  </section>
  ${dis("#F1FFC8", "down")}

  <section class="teaser" id="events" data-pose="events">
    <div class="wrap side right">
      <div class="panel">
        ${head("06", "Events", "Our flagship events", "Four events we build every year, plus workshops all year round.")}
        <ul class="teaser-list">
          ${EV.map((ev, i) => `
            <li class="reveal" style="--d:${i};--ev-accent:${ev.theme.accent}">
              <a href="/events.html?event=${ev.slug}">
                <span class="teaser-tile">${glyphSvg(ev.slug, ev.theme)}</span>
                <span class="teaser-text"><b>${ev.name}</b><span>${ev.kicker}</span></span>
                <span class="teaser-go" aria-hidden="true">▶</span>
              </a>
            </li>`).join("")}
        </ul>
        <div class="cta reveal">
          <a class="btn btn-lime" href="/events.html">Open the events hub</a>
          <a class="btn btn-line" href="/activities.html">See all ${C.activities.length} workshops</a>
        </div>
      </div>
    </div>
  </section>

  <section class="portal" id="portal" data-pose="ghost">
    <div class="wrap">
      ${head("07", "Our platform", C.portal.name, C.portal.tagline)}
      <div class="portal-grid">
        <div class="portal-copy">
          <p class="body reveal">${C.portal.intro}</p>
          <ul class="portal-feats">
            ${C.portal.features.map((f, i) => `
              <li class="reveal" style="--d:${i}"><span class="portal-n" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span><div><h3>${f.t}</h3><p>${f.d}</p></div></li>`).join("")}
          </ul>
        </div>
        <div class="portal-shots reveal" aria-label="Screens from the Time Portal">
          ${[
            ["dashboard", "Dashboard", "The Time Portal dashboard showing rank, points, solved and active challenges", 800, 418],
            ["challenges", "Challenge catalogue", "The Time Portal challenge catalogue grouped by category", 650, 395],
            ["events", "Events hub", "The Time Portal events hub showing AINS", 740, 335],
            ["submissions", "My submissions", "A solution accepted by the Time Portal judge", 645, 225],
          ].map(([f, label, alt, w, h], i) => `
          <figure class="pshot pshot-${i + 1}">
            <div class="pshot-bar" aria-hidden="true"><i></i><i></i><i></i><span>${label}</span></div>
            ${img("portal/" + f, alt, w, h)}
          </figure>`).join("")}
        </div>
      </div>
    </div>
  </section>

  <section class="team" id="team" data-pose="ghost">
    <div class="wrap">
      ${head("08", "Our team", "The 26/27 board", "Meet our exceptionally talented team of digital natives.")}
      <ul class="team-grid">
        ${C.team.map((t, i) => `
          <li class="member reveal" style="--d:${i % 3}">
            <figure class="bbox">${img("team/" + t.img, `Portrait of ${t.name}`, 640, 800)}${corners}</figure>
            <p class="role">${t.role}</p>
            <h3>${t.name}</h3>
          </li>`).join("")}
      </ul>
    </div>
  </section>

  ${dis("#F1FFC8", "up")}
  <section class="sponsors cream" id="sponsors">
    <div class="wrap">
      ${head("09", "Our partners", "They trusted us", `${C.sponsors.length} companies and institutions have supported our events.`)}
      <ul class="sponsor-grid">
        ${C.sponsors.map((s) => `<li class="reveal${s.dark ? " dark" : ""}">${img("sponsors/" + s.img, s.name, 360, 160)}</li>`).join("")}
      </ul>
    </div>
  </section>
  ${dis("#F1FFC8", "down")}

  <section class="contact" id="contact" data-pose="contact">
    <div class="wrap side left">
      <div class="panel">
        ${head("10", "Contact us", "Say hello")}
        <dl class="contact-list reveal">
          <div><dt>Address</dt><dd><a href="${C.contact.maps}" target="_blank" rel="noopener">${C.contact.address}</a></dd></div>
          <div><dt>Phone</dt><dd><a href="tel:${C.contact.phone.replace(/\s/g, "")}">${C.contact.phone}</a></dd></div>
          <div><dt>Email</dt><dd><a href="mailto:${C.contact.email}">${C.contact.email}</a></dd></div>
        </dl>
        <form class="form reveal" id="contact-form" novalidate>
          <div class="field"><label for="f-name">Your name</label><input id="f-name" name="from_name" autocomplete="name" required></div>
          <div class="field"><label for="f-email">Your email</label><input id="f-email" name="email" type="email" autocomplete="email" inputmode="email" required></div>
          <div class="field full"><label for="f-subject">Subject</label><input id="f-subject" name="subject" required></div>
          <div class="field full"><label for="f-message">Message</label><textarea id="f-message" name="message" rows="5" required></textarea></div>
          <p class="form-note full" id="form-note" role="status">Opens your email app with the message ready to send.</p>
          <button class="btn btn-lime full" type="submit">Send message</button>
        </form>
      </div>
    </div>
  </section>
</main>
${footerHTML("home")}`;

const root = document.documentElement;
initChrome("home");
mountChat();
initBuilder(C.game);

/* ---------- partner logos: pass each logo's real aspect ratio to CSS so they get equal visual weight ---------- */
document.querySelectorAll(".sponsor-grid img").forEach((im) => {
  const set = () => im.naturalWidth && im.style.setProperty("--ar", (im.naturalWidth / im.naturalHeight).toFixed(3));
  if (im.complete) set(); else im.addEventListener("load", set, { once: true });
});

/* ---------- counters ---------- */
if (!reducedMotion && "IntersectionObserver" in window) {
  const counters = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      counters.unobserve(e.target);
      const to = +e.target.dataset.to, t0 = performance.now(), dur = 1400;
      const tick = (now) => {
        const k = Math.min(1, (now - t0) / dur);
        e.target.textContent = Math.round(to * (1 - Math.pow(1 - k, 4)));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }, { threshold: 0.6 });
  document.querySelectorAll(".count").forEach((el) => counters.observe(el));
}

/* ---------- collage parallax (light, transform only) ---------- */
const collage = document.getElementById("collage");
if (!reducedMotion && collage) {
  let cRaf = 0;
  const parallax = () => {
    cRaf = 0;
    const r = collage.getBoundingClientRect();
    const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight; // -1..1 around centre
    collage.style.setProperty("--p", Math.max(-1.2, Math.min(1.2, p)).toFixed(3));
  };
  window.addEventListener("scroll", () => { if (!cRaf) cRaf = requestAnimationFrame(parallax); }, { passive: true });
  parallax();
}

/* ---------- contact form: composes an email, no backend ---------- */
const form = document.getElementById("contact-form");
const note = document.getElementById("form-note");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const bad = [...form.elements].find((el) => el.willValidate && !el.checkValidity());
  form.classList.add("tried");
  if (bad) {
    note.textContent = bad.type === "email" && bad.value ? "That email address doesn’t look right — check it and try again." : "Please fill in every field before sending.";
    note.classList.add("err");
    bad.focus();
    return;
  }
  const d = new FormData(form);
  const body = `${d.get("message")}\n\n— ${d.get("from_name")} (${d.get("email")})`;
  window.location.href = `mailto:${C.contact.email}?subject=${encodeURIComponent(d.get("subject"))}&body=${encodeURIComponent(body)}`;
  note.classList.remove("err");
  note.textContent = "Your email app should now be open with the message ready. If nothing happened, write to us directly at " + C.contact.email + ".";
});
/* ---------- 3D stage (loaded after first paint) ---------- */
const canvas = document.getElementById("stage");
const start = () => import("./scene.js").then(({ createStage }) => {
  try {
    const stage = createStage({
      canvas,
      box: document.getElementById("logo-box"),
      boxLabel: document.getElementById("logo-box-label"),
      reducedMotion,
    });
    window.addEventListener("load", stage.refresh);
    root.classList.add("webgl");
    if (import.meta.env.DEV) window.__stage = stage;
  } catch (err) {
    console.warn("WebGL unavailable, using static background", err);
    root.classList.add("no-webgl");
  }
}).catch(() => root.classList.add("no-webgl"));
if ("requestIdleCallback" in window) requestIdleCallback(start, { timeout: 600 }); else setTimeout(start, 60);
