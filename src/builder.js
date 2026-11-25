// "The game plan" (home section 03): build a character by equipping items that stand for
// what the chapter gives its members. Drag an item onto its slot, or select it (click,
// tap, Enter) and then pick a slot. The cursed item can only be thrown out the door.
import { reducedMotion } from "./chrome.js";

const SLOTS = { head: "Head", hands: "Hands", chest: "Chest", feet: "Feet", back: "Back" };
const LEFT = ["head", "chest", "feet"], RIGHT = ["hands", "back"];

// 7x7 pixel icons, drawn as SVG squares.
const ICONS = {
  curiosity: ["..###..", ".#...#.", ".#...#.", ".#...#.", "..#.#..", "..###..", "..###.."],
  craft: ["#####..", "#####..", "#####..", "..#....", "..#....", "..#....", "..#...."],
  teamwork: ["#######", "#.....#", "#..#..#", "#.###.#", ".#.#.#.", "..#.#..", "...#..."],
  grit: ["..##...", "..##...", "..##...", "..##...", "..####.", "..#####", "..#####"],
  network: ["##...##", "##...##", "..#.#..", "...#...", "...#...", "..###..", "..###.."],
  fear: [".#####.", "#######", "#..#..#", "#######", ".##.##.", ".#####.", ".#.#.#."],
};
const icon = (id) =>
  `<svg class="cb-ico" viewBox="0 0 7 7" aria-hidden="true">${ICONS[id]
    .flatMap((row, y) => [...row].map((c, x) => (c === "#" ? `<rect x="${x}" y="${y}" width="1" height="1"/>` : "")))
    .join("")}</svg>`;

// The character: each equippable part carries data-slot so it can be a drop target too.
const FIGURE = `
<svg class="cb-fig" viewBox="0 0 100 130" aria-hidden="true">
  <rect class="cb-part" data-part="back" data-slot="back" x="24" y="40" width="52" height="66"/>
  <rect class="cb-skin" x="18" y="44" width="12" height="32"/><rect class="cb-skin" x="70" y="44" width="12" height="32"/>
  <rect class="cb-skin" x="36" y="84" width="12" height="26"/><rect class="cb-skin" x="52" y="84" width="12" height="26"/>
  <rect class="cb-part" data-part="chest" data-slot="chest" x="31" y="42" width="38" height="42"/>
  <rect class="cb-part" data-part="head" data-slot="head" x="33" y="6" width="34" height="32"/>
  <rect class="cb-face" x="41" y="18" width="5" height="8"/><rect class="cb-face" x="54" y="18" width="5" height="8"/><rect class="cb-face" x="45" y="30" width="10" height="3"/>
  <rect class="cb-part" data-part="hands" data-slot="hands" x="16" y="76" width="16" height="11"/><rect class="cb-part" data-part="hands" data-slot="hands" x="68" y="76" width="16" height="11"/>
  <rect class="cb-part" data-part="feet" data-slot="feet" x="32" y="110" width="18" height="10"/><rect class="cb-part" data-part="feet" data-slot="feet" x="50" y="110" width="18" height="10"/>
</svg>`;

const slotBtn = (s) =>
  `<button type="button" class="cb-slot" data-slot="${s}" aria-label="${SLOTS[s]} slot, empty"><span class="cb-slot-t">${SLOTS[s]}</span><span class="cb-slot-v"></span></button>`;

const itemCard = (it) =>
  `<span class="cb-item-ic">${icon(it.id)}</span><span class="cb-item-tx"><span class="cb-item-n">${it.name}</span><span class="cb-item-w">${it.word}</span></span>`;

export const builderHTML = (G) => `
<div class="cb reveal" data-builder>
  <p class="cb-player"><span>Player: <b>You</b></span><span>Class: <b data-cls>${G.classes[0]}</b></span><span>LV <b data-lv>1</b></span></p>
  <div class="cb-stage">
    <div class="cb-col">${LEFT.map(slotBtn).join("")}</div>
    ${FIGURE}
    <div class="cb-col">${RIGHT.map(slotBtn).join("")}
      <button type="button" class="cb-slot cb-door" data-slot="door" aria-label="The door: throw an item out"><span class="cb-slot-t">The door</span><span class="cb-slot-v">Drop fear</span></button>
    </div>
  </div>
  <ul class="cb-inv" aria-label="Inventory">
    ${G.items.map((it) => `<li><button type="button" class="cb-item c-${it.color}" data-id="${it.id}" aria-pressed="false">${itemCard(it)}</button></li>`).join("")}
  </ul>
  <p class="cb-log" role="status" aria-live="polite">Your inventory is full. Your character is empty. Drag each item into place, or tap an item and then its slot.</p>
  <button type="button" class="cb-reset" hidden>New game</button>
  <div class="cb-ghost" aria-hidden="true"></div>
</div>`;

export function initBuilder(G) {
  const root = document.querySelector("[data-builder]");
  if (!root) return;
  const $ = (s) => root.querySelector(s);
  const log = $(".cb-log"), ghost = $(".cb-ghost"), reset = $(".cb-reset");
  const byId = Object.fromEntries(G.items.map((it) => [it.id, it]));
  let selected = null, level = 0, drag = null;

  const say = (html) => { log.innerHTML = html; };
  const hint = (it) => `${it.flavor} <span class="cb-from">Earned from: ${it.from}.</span>`;
  const slotEls = (s) => root.querySelectorAll(`.cb-slot[data-slot="${s}"]`);

  function select(btn) {
    root.querySelectorAll(".cb-inv .cb-item[aria-pressed=true]").forEach((b) => b.setAttribute("aria-pressed", "false"));
    if (selected === btn.dataset.id) { selected = null; say("Pick an item, then the slot it belongs to."); return; }
    selected = btn.dataset.id;
    btn.setAttribute("aria-pressed", "true");
    const it = byId[selected];
    say(`<b>${it.name}</b>: ${hint(it)} Now pick its slot.`);
  }

  function shake(slot) {
    if (reducedMotion) return;
    slotEls(slot).forEach((el) => { el.classList.remove("bad"); void el.offsetWidth; el.classList.add("bad"); });
  }

  function equip(id, slot) {
    const it = byId[id], btn = $(`.cb-inv .cb-item[data-id="${id}"]`);
    if (!it || btn.disabled) return;
    if (it.slot !== slot) {
      shake(slot);
      say(it.slot === "door" ? "Cursed item: it can't be equipped. Try the door."
        : slot === "door" ? "No way. You'll need that one."
        : `Doesn't fit there. ${it.name} goes on the ${SLOTS[it.slot].toLowerCase()}.`);
      return;
    }
    btn.disabled = true;
    btn.setAttribute("aria-pressed", "false");
    selected = null;
    const box = $(`.cb-slot[data-slot="${slot}"]`);
    box.classList.add("full", `c-${it.color}`);
    if (slot === "door") {
      box.querySelector(".cb-slot-v").textContent = "+1 courage";
      box.setAttribute("aria-label", "The door: Fear of Failing thrown out");
      say("Left at the door. You feel lighter already.");
    } else {
      box.querySelector(".cb-slot-v").textContent = it.word;
      box.setAttribute("aria-label", `${SLOTS[slot]} slot: ${it.name}, ${it.word}`);
      root.querySelectorAll(`.cb-part[data-part="${slot}"]`).forEach((p) => p.classList.add("on", `c-${it.color}`));
      level++;
      $("[data-lv]").textContent = level + 1;
      $("[data-cls]").textContent = G.classes[Math.min(level, G.classes.length - 1)];
      say(level === 5 ? `<b class="cb-win">${G.done}</b>` : `Equipped <b>${it.name}</b>. ${hint(it)}`);
      if (level === 5) root.classList.add("won");
    }
    reset.hidden = false;
  }

  function newGame() {
    level = 0; selected = null;
    root.classList.remove("won");
    $("[data-lv]").textContent = 1;
    $("[data-cls]").textContent = G.classes[0];
    root.querySelectorAll(".cb-inv .cb-item").forEach((b) => { b.disabled = false; b.setAttribute("aria-pressed", "false"); });
    root.querySelectorAll(".cb-slot").forEach((s) => {
      s.className = s.className.split(" ").filter((c) => !/^c-|^full$/.test(c)).join(" ");
      s.querySelector(".cb-slot-v").textContent = s.dataset.slot === "door" ? "Drop fear" : "";
      s.setAttribute("aria-label", s.dataset.slot === "door" ? "The door: throw an item out" : `${SLOTS[s.dataset.slot]} slot, empty`);
    });
    root.querySelectorAll(".cb-part").forEach((p) => p.setAttribute("class", "cb-part"));
    reset.hidden = true;
    say("New game. Your inventory is full. Your character is empty.");
  }

  // Click / keyboard: pick an item, then a slot (the buttons or the figure's parts).
  root.addEventListener("click", (e) => {
    const target = e.target.closest("[data-slot]");
    if (target && selected) equip(selected, target.dataset.slot);
    else if (target && !e.target.closest(".cb-item")) say("Pick an item first, then its slot.");
  });
  reset.addEventListener("click", newGame);

  // Drag with the pointer (mouse, pen or touch). A press that doesn't move is a click.
  const slotAt = (x, y) => document.elementFromPoint(x, y)?.closest("[data-builder] [data-slot]")?.dataset.slot;
  const clearHot = () => root.querySelectorAll(".cb-slot.hot").forEach((s) => s.classList.remove("hot"));
  root.querySelectorAll(".cb-inv .cb-item").forEach((btn) => {
    btn.addEventListener("pointerdown", (e) => {
      if (btn.disabled || e.button > 0) return;
      drag = { id: btn.dataset.id, x: e.clientX, y: e.clientY, moved: false };
      btn.setPointerCapture(e.pointerId);
    });
    btn.addEventListener("pointermove", (e) => {
      if (!drag) return;
      if (!drag.moved && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 6) {
        drag.moved = true;
        ghost.className = `cb-ghost cb-item c-${byId[drag.id].color} show`;
        ghost.innerHTML = itemCard(byId[drag.id]);
        ghost.style.width = btn.offsetWidth + "px";
        btn.classList.add("lifted");
      }
      if (!drag.moved) return;
      const r = root.getBoundingClientRect();
      ghost.style.transform = `translate(${e.clientX - r.left - 24}px, ${e.clientY - r.top - 20}px)`;
      clearHot();
      const s = slotAt(e.clientX, e.clientY);
      if (s) slotEls(s).forEach((el) => el.classList.add("hot"));
    });
    const end = (e) => {
      if (!drag) return;
      const d = drag; drag = null;
      ghost.classList.remove("show");
      btn.classList.remove("lifted");
      clearHot();
      if (d.moved) {
        const s = e.type === "pointerup" && slotAt(e.clientX, e.clientY);
        if (s) equip(d.id, s);
      } else {
        select(btn);
      }
    };
    btn.addEventListener("pointerup", end);
    btn.addEventListener("pointercancel", end);
    // Keyboard activation (Enter / Space) fires click without pointer events.
    btn.addEventListener("click", (e) => { if (e.detail === 0) select(btn); e.stopPropagation(); });
  });
}
