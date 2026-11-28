// Team cards: each member's LinkedIn and email as two tiles under their name.
// Clicking Email opens the visitor's email app when they have one, and also copies
// the address, so people who use webmail in the browser can paste it.

// 7x7 pixel icons, same drawing style as the game plan's items.
const ICONS = {
  linkedin: ["#......", ".......", "#.#.##.", "#.##..#", "#.#...#", "#.#...#", "#.#...#"],
  email: ["#######", "##...##", "#.#.#.#", "#..#..#", "#.....#", "#.....#", "#######"],
};
const icon = (k) =>
  `<svg class="ct-ico" viewBox="0 0 7 7" aria-hidden="true">${ICONS[k]
    .flatMap((row, y) => [...row].map((c, x) => (c === "#" ? `<rect x="${x}" y="${y}" width="1" height="1"/>` : "")))
    .join("")}</svg>`;

const SAY_HELLO = "Say hello ↗";

/** The contact tiles for one member, or "" when they have no public contact. */
export function contactHTML(t) {
  const links = [];
  if (t.linkedin) links.push(`<a class="ct-link ct-in" href="${t.linkedin}" target="_blank" rel="noopener" aria-label="${t.name} on LinkedIn">
    <span class="ct-ic">${icon("linkedin")}</span><span class="ct-tx"><span class="ct-k">LinkedIn</span><span class="ct-s">Connect ↗</span></span></a>`);
  if (t.email) links.push(`<a class="ct-link ct-mail" href="mailto:${t.email}" data-email="${t.email}" aria-label="Email ${t.name} (also copies the address)">
    <span class="ct-ic">${icon("email")}</span><span class="ct-tx"><span class="ct-k">Email</span><span class="ct-s">${SAY_HELLO}</span></span></a>`);
  if (!links.length) return "";
  return `<div class="ct-links${links.length === 1 ? " one" : ""}">${links.join("")}</div><span class="sr" role="status"></span>`;
}

export function initContacts() {
  document.addEventListener("click", (e) => {
    const a = e.target.closest(".ct-mail[data-email]");
    if (!a) return;
    const sub = a.querySelector(".ct-s"), live = a.parentElement.nextElementSibling;
    copy(a.dataset.email).then((ok) => {
      if (!ok) return;
      sub.textContent = "Copied!";
      a.classList.add("copied");
      live.textContent = `${a.dataset.email} copied to the clipboard`;
      clearTimeout(a._t);
      a._t = setTimeout(() => { sub.textContent = SAY_HELLO; a.classList.remove("copied"); live.textContent = ""; }, 2400);
    });
  });
}

async function copy(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch {}
  const ta = Object.assign(document.createElement("textarea"), { value: text });
  ta.setAttribute("readonly", ""); ta.style.cssText = "position:absolute;left:-9999px";
  document.body.append(ta); ta.select();
  let ok = false;
  try { ok = document.execCommand("copy"); } catch {}
  ta.remove();
  return ok;
}
