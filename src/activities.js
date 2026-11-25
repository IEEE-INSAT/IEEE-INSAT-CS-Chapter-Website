// Activities page: every session the chapter has held, grouped by year.
import "@fontsource/zalando-sans-expanded/latin-400.css";
import "@fontsource/zalando-sans-expanded/latin-700.css";
import "@fontsource/zalando-sans-expanded/latin-900.css";
import "@fontsource/zalando-sans/latin-400.css";
import "@fontsource/zalando-sans/latin-600.css";
import "./style.css";
import * as C from "./content.js";
import { navHTML, footerHTML, initChrome, img } from "./chrome.js";
import { mountChat } from "./chat.js";

const years = [...new Set(C.activities.map((a) => a.year))];
const count = C.activities.length;

document.getElementById("app").innerHTML = `
${navHTML("activities")}
<main id="main">
  <section class="activities ink page-top" id="activities">
    <div class="wrap">
      <header class="sec-head">
        <p class="kicker"><span class="idx">${String(count).padStart(2, "0")}</span>Activities</p>
        <h1 class="page-title">Sessions &amp; workshops</h1>
        <p class="sec-sub">Every session we have held at INSAT, newest first. Open a row for the details and photos.</p>
      </header>
      <nav class="year-jump" aria-label="Jump to year">
        ${years.map((y) => `<a href="#y${y}">${y}</a>`).join("")}
      </nav>
      ${years.map((y) => `
        <h2 class="year" id="y${y}">${y}</h2>
        <div class="acts">
          ${C.activities.filter((a) => a.year === y).map((a) => `
            <details class="act reveal">
              <summary>
                <span class="act-date">${a.date}</span>
                <span class="act-title">${a.title}</span>
                <span class="act-place">INSAT</span>
                <span class="act-plus" aria-hidden="true"></span>
              </summary>
              <div class="act-body">
                <p>${a.text}</p>
                ${a.photos ? `<div class="act-photos">${Array.from({ length: a.photos }, (_, i) => img(`activities/${a.slug}-${i + 1}`, `${a.title} — photo ${i + 1}`, 900, 600)).join("")}</div>` : ""}
              </div>
            </details>`).join("")}
        </div>`).join("")}
    </div>
  </section>
</main>
${footerHTML("activities")}`;

initChrome("activities");
mountChat();
