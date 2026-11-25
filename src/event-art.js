// Full-screen artwork behind each event (ported from the Time Portal's EventArt):
// deterministic SVG in the event's two brand colours, brought to life by animateArt().
const INK = "#190D1B";

function seeded(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const px = (n) => Math.round(n / 4) * 4;
const round = (n) => Math.round(n * 10) / 10;

/** IEEEXtreme: circuit traces around a 24-hour clock dial. */
function circuit(a, b, id) {
  const rand = seeded(24), G = 40;
  const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  let out = "";
  for (let n = 0; n < 46; n++) {
    let x = 600 + Math.floor(rand() * 26) * G, y = 20 + Math.floor(rand() * 22) * G, dir = Math.floor(rand() * 4);
    const pts = [[x, y]];
    const segs = 2 + Math.floor(rand() * 3);
    for (let k = 0; k < segs; k++) {
      const len = (1 + Math.floor(rand() * 4)) * G, d = dirs[dir];
      x += d[0] * len; y += d[1] * len; pts.push([x, y]);
      dir = (dir + (rand() < 0.5 ? 1 : 3)) % 4;
    }
    const hot = rand() < 0.16, o = round(0.12 + rand() * 0.3), end = pts[pts.length - 1];
    out += `<path d="M${pts.map(([px_, py]) => `${px_} ${py}`).join(" L")}" fill="none" stroke="${hot ? b : a}" stroke-width="${hot ? 2.5 : 1.5}" stroke-opacity="${hot ? 0.9 : o}" stroke-linejoin="round"/>`;
    out += `<circle cx="${end[0]}" cy="${end[1]}" r="${hot ? 5 : 3.5}" fill="${hot ? b : a}" fill-opacity="${hot ? 1 : o + 0.2}"/>`;
  }
  const cx = 1180, cy = 430, R = 250, circ = round(2 * Math.PI * (R - 22));
  out += `<circle cx="${cx}" cy="${cy}" r="${R + 40}" fill="url(#${id}-glow)"/>`;
  out += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${a}" stroke-opacity="0.35" stroke-width="2"/>`;
  for (let i = 0; i < 24; i++) {
    const ang = (i / 24) * Math.PI * 2 - Math.PI / 2, major = i % 6 === 0, r1 = R - (major ? 34 : 18);
    out += `<line x1="${round(cx + Math.cos(ang) * r1)}" y1="${round(cy + Math.sin(ang) * r1)}" x2="${round(cx + Math.cos(ang) * (R - 4))}" y2="${round(cy + Math.sin(ang) * (R - 4))}" stroke="${major ? "#F1FFC8" : a}" stroke-opacity="${major ? 0.9 : 0.5}" stroke-width="${major ? 4 : 2}" stroke-linecap="round"/>`;
  }
  out += `<g class="sweep" data-cx="${cx}" data-cy="${cy}"><circle cx="${cx}" cy="${cy}" r="${R - 22}" fill="none" stroke="${b}" stroke-width="6" stroke-linecap="round" stroke-dasharray="${round(circ * 0.72)} ${circ}" transform="rotate(-90 ${cx} ${cy})"/></g>`;
  out += `<text class="count" x="${cx}" y="${cy + 40}" text-anchor="middle" font-family="'PP NeueBit', monospace" font-weight="700" font-size="150" fill="#F1FFC8">24</text>`;
  return `<g shape-rendering="geometricPrecision">${out}</g>`;
}

/** Data Overflow: "data is the new water" - streams of liquid light in pixels. */
function data(a, b, id) {
  const CELL = 14;
  const streams = [
    { cx: 860, amp: 70, freq: 0.006, phase: 0.4, width: 2 },
    { cx: 1150, amp: 110, freq: 0.0045, phase: 2.1, width: 3 },
    { cx: 1450, amp: 80, freq: 0.0055, phase: 4.0, width: 2 },
  ];
  const rand = seeded(11);
  let out = `<circle cx="1150" cy="450" r="460" fill="url(#${id}-glow)"/>`;
  for (const st of streams) {
    out += `<g class="stream">`;
    for (let row = 0; row < Math.ceil(900 / CELL); row++) {
      const y = row * CELL, x = px(st.cx + st.amp * Math.sin(y * st.freq + st.phase));
      for (let k = 0; k < st.width * 2 + 1; k++) {
        const off = k - st.width, core = off === 0;
        out += `<rect x="${x + off * CELL}" y="${y}" width="${CELL - 2}" height="${CELL - 2}" fill="${core ? "#F1FFC8" : Math.abs(off) === 1 ? a : b}" fill-opacity="${core ? 0.9 : round(0.85 - Math.abs(off) * 0.22)}"/>`;
      }
    }
    out += `</g>`;
  }
  for (let i = 0; i < 34; i++) {
    const x = px(640 + rand() * 940), y = px(rand() * 880), size = rand() < 0.3 ? 8 : 4, o = round(0.25 + rand() * 0.6);
    out += `<rect class="drop" x="${x}" y="${y}" width="${size}" height="${size}" fill="${a}" fill-opacity="${o}"/>`;
  }
  return out;
}

/** BioIT: a pixel DNA double helix. */
function helix(a, b) {
  const pts = Array.from({ length: 44 }, (_, i) => {
    const t = i * 0.36;
    return { x: 600 + i * 24, y1: px(450 + 200 * Math.sin(t)), y2: px(450 - 200 * Math.sin(t)), front: Math.cos(t) > 0 };
  });
  let out = "";
  pts.forEach((p, i) => {
    if (i % 2 === 0) out += `<rect class="rung" data-i="${i}" x="${p.x + 6}" y="${Math.min(p.y1, p.y2)}" width="4" height="${Math.abs(p.y1 - p.y2)}" fill="${a}" fill-opacity="0.22"/>`;
  });
  pts.forEach((p) => {
    out += `<rect class="s1" x="${p.x}" y="${p.y1 - 8}" width="16" height="16" fill="${a}" fill-opacity="${p.front ? 1 : 0.45}" stroke="${INK}" stroke-width="3"/>`;
    out += `<rect class="s2" x="${p.x}" y="${p.y2 - 8}" width="16" height="16" fill="${b}" fill-opacity="${p.front ? 0.45 : 1}" stroke="${INK}" stroke-width="3"/>`;
  });
  return out;
}

/** AINS: a layered network with one highlighted path. */
function neural(a, b) {
  const rand = seeded(3);
  const xs = [780, 960, 1140, 1320, 1500], counts = [4, 6, 8, 6, 3], hot = [1, 3, 5, 2, 1];
  const layers = xs.map((x, li) => Array.from({ length: counts[li] }, (_, j) => ({ x, y: px(450 + (j - (counts[li] - 1) / 2) * 92) })));
  let out = "";
  for (let li = 0; li < layers.length - 1; li++) {
    layers[li].forEach((nd, j) => layers[li + 1].forEach((m, k) => {
      const h = hot[li] === j && hot[li + 1] === k, o = Math.round((0.06 + rand() * 0.2) * 100) / 100;
      out += `<line data-l="${li}" data-j="${j}" data-k="${k}" data-o="${o}" x1="${nd.x}" y1="${nd.y}" x2="${m.x}" y2="${m.y}" stroke="${h ? b : a}" stroke-opacity="${h ? 0.95 : o}" stroke-width="${h ? 5 : 2}"/>`;
    }));
  }
  layers.forEach((layer, li) => layer.forEach((nd, j) => {
    const isHot = hot[li] === j, size = isHot ? 30 : 22;
    out += `<rect data-l="${li}" data-j="${j}" x="${nd.x - size / 2}" y="${nd.y - size / 2}" width="${size}" height="${size}" fill="${isHot ? b : "#241530"}" stroke="${isHot ? INK : a}" stroke-width="4"/>`;
  }));
  return out;
}

const ART = { ieeextreme: circuit, dataoverflow: data, bioit: helix, ains: neural };

export function eventArt(ev) {
  const art = ART[ev.slug];
  if (!art) return "";
  const id = `ev-${ev.slug}`, { accent: a, accent2: b } = ev.theme;
  return `<svg class="art" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" shape-rendering="crispEdges" aria-hidden="true">
    <defs><radialGradient id="${id}-glow"><stop offset="0%" stop-color="${a}" stop-opacity="0.28"/><stop offset="100%" stop-color="${a}" stop-opacity="0"/></radialGradient></defs>
    ${art(a, b, id)}
  </svg>`;
}

/* ---------- motion ---------- */
// Each animator gets the event's <svg> and returns tick(seconds). Only the visible
// event is animated, the loop stops while the tab is hidden, and nothing moves
// under prefers-reduced-motion (the static art above is shown instead).

const ANIM = {
  /** IEEEXtreme: the arc sweeps slowly round the dial (once every 2 minutes) while
   *  the "24" becomes a 24-hour countdown, ticking down once a second. */
  ieeextreme(svg) {
    const g = svg.querySelector(".sweep"), cx = g.dataset.cx, cy = g.dataset.cy, txt = svg.querySelector(".count");
    const two = (n) => String(n).padStart(2, "0");
    txt.setAttribute("font-size", "128");
    txt.setAttribute("y", +cy + 34);
    let shown = "";
    return (t) => {
      g.setAttribute("transform", `rotate(${round((t * 3) % 360)} ${cx} ${cy})`);
      const left = 24 * 3600 - (Math.floor(t) % (24 * 3600));
      const label = `${two(Math.floor(left / 3600) % 25)}:${two(Math.floor(left / 60) % 60)}:${two(left % 60)}`;
      if (label !== shown) txt.textContent = shown = label;
    };
  },

  /** Data Overflow: the streams ripple downwards like running water and the droplets fall. */
  dataoverflow(svg) {
    const CELL = 14;
    const streams = [
      { cx: 860, amp: 70, freq: 0.006, phase: 0.4, width: 2, speed: 1.1 },
      { cx: 1150, amp: 110, freq: 0.0045, phase: 2.1, width: 3, speed: 0.8 },
      { cx: 1450, amp: 80, freq: 0.0055, phase: 4.0, width: 2, speed: 1.3 },
    ];
    const groups = [...svg.querySelectorAll(".stream")].map((g) => [...g.children]);
    const drops = [...svg.querySelectorAll(".drop")].map((el) => ({ el, y: +el.getAttribute("y"), v: 30 + Math.random() * 60 }));
    const rows = Math.ceil(900 / CELL);
    return (t, dt) => {
      streams.forEach((st, si) => {
        const rects = groups[si], n = st.width * 2 + 1;
        const pulse = (t * 9 * st.speed) % 26; // a bright packet of data travelling down the stream
        for (let row = 0; row < rows; row++) {
          const y = row * CELL, x = px(st.cx + st.amp * Math.sin(y * st.freq + st.phase - t * st.speed));
          const glow = Math.max(0, 1 - Math.abs(row % 26 - pulse) / 2.5);
          for (let k = 0; k < n; k++) {
            const off = k - st.width, r = rects[row * n + k];
            r.setAttribute("x", x + off * CELL);
            if (off !== 0) r.setAttribute("fill-opacity", round(Math.min(1, 0.85 - Math.abs(off) * 0.22 + glow * 0.4)));
          }
        }
      });
      drops.forEach((d) => {
        d.y += d.v * dt;
        if (d.y > 900) d.y -= 900;
        d.el.setAttribute("y", px(d.y));
      });
    };
  },

  /** BioIT: the double helix turns, so it travels forward along its axis. */
  bioit(svg) {
    const s1 = [...svg.querySelectorAll(".s1")], s2 = [...svg.querySelectorAll(".s2")], rungs = [...svg.querySelectorAll(".rung")];
    return (t) => {
      const ys = s1.map((r1, i) => {
        const th = i * 0.36 - t * 0.5, y1 = px(450 + 200 * Math.sin(th)), y2 = px(450 - 200 * Math.sin(th)), front = Math.cos(th) > 0;
        r1.setAttribute("y", y1 - 8); r1.setAttribute("fill-opacity", front ? 1 : 0.45);
        s2[i].setAttribute("y", y2 - 8); s2[i].setAttribute("fill-opacity", front ? 0.45 : 1);
        return [y1, y2];
      });
      rungs.forEach((r) => {
        const [y1, y2] = ys[+r.dataset.i];
        r.setAttribute("y", Math.min(y1, y2)); r.setAttribute("height", Math.abs(y1 - y2));
      });
    };
  },

  /** AINS: one calm signal at a time. A path lights up layer by layer from input to
   *  output, then fades out from the input side, and after a short pause the next one
   *  starts. The path lit in the static art starts fading on the first frame, so the
   *  artwork moves as soon as the event is opened. */
  ains(svg, ev) {
    const a = ev.theme.accent, b = ev.theme.accent2, counts = [4, 6, 8, 6, 3];
    const STEP = 0.14, TRAIL = 8, PAUSE = 1.1, FIRST = 0.7;
    const node = (l, j) => svg.querySelector(`rect[data-l="${l}"][data-j="${j}"]`);
    const edge = (l, j, k) => svg.querySelector(`line[data-l="${l}"][data-j="${j}"][data-k="${k}"]`);
    const setNode = (el, on) => {
      const cx = +el.getAttribute("x") + +el.getAttribute("width") / 2, cy = +el.getAttribute("y") + +el.getAttribute("height") / 2, size = on ? 30 : 22;
      el.setAttribute("x", cx - size / 2); el.setAttribute("y", cy - size / 2); el.setAttribute("width", size); el.setAttribute("height", size);
      el.setAttribute("fill", on ? b : "#241530"); el.setAttribute("stroke", on ? INK : a);
    };
    const setEdge = (el, on) => {
      el.setAttribute("stroke", on ? b : a); el.setAttribute("stroke-opacity", on ? 0.95 : el.dataset.o); el.setAttribute("stroke-width", on ? 5 : 2);
    };
    const set = (el, on) => (el.tagName === "rect" ? setNode(el, on) : setEdge(el, on));
    // stay in the middle of each layer: never the top or bottom nodes
    const pick = () => counts.map((c) => { const lo = Math.max(1, Math.floor(c / 4)); return lo + Math.floor(Math.random() * (c - 2 * lo)); });
    const parts = (p) => p.flatMap((j, l) => (l < p.length - 1 ? [node(l, j), edge(l, j, p[l + 1])] : [node(l, j)]));

    // the static art starts with [1, 3, 5, 2, 1] lit: carry it on as a signal already in flight
    let lit = new Set(parts([1, 3, 5, 2, 1]));
    let pulses = [{ parts: [...lit], head: lit.size - 1 }], spawn = FIRST;
    return (t, dt) => {
      spawn -= dt;
      if (spawn <= 0) { const p = parts(pick()); pulses.push({ parts: p, head: 0 }); spawn = (p.length + TRAIL) * STEP + PAUSE; }
      const want = new Set();
      pulses = pulses.filter((p) => {
        p.head += dt / STEP;
        const h = Math.floor(p.head);
        for (let i = Math.max(0, h - TRAIL); i <= Math.min(h, p.parts.length - 1); i++) want.add(p.parts[i]);
        return h - TRAIL < p.parts.length;
      });
      lit.forEach((el) => { if (!want.has(el)) set(el, false); });
      want.forEach((el) => { if (!lit.has(el)) set(el, true); });
      lit = want;
    };
  },
};

/** Run the artwork of whichever layer is active; `active()` returns its index. */
export function animateArt(layers, events, active, reduced) {
  if (reduced) return;
  const made = new Map();
  const FPS = 24; // pixel art: a few steps a second looks right and keeps the work small
  let last = 0, prev = 0;
  const frame = (now) => {
    requestAnimationFrame(frame);
    if (now - last < 1000 / FPS) return;
    const dt = Math.min(0.1, (now - (prev || now)) / 1000);
    last = prev = now;
    const i = active(), ev = events[i], make = ANIM[ev.slug];
    if (!make) return;
    if (!made.has(i)) made.set(i, { tick: make(layers[i].querySelector("svg"), ev), t: 0 });
    const m = made.get(i);
    m.t += dt;
    m.tick(m.t, dt);
  };
  requestAnimationFrame(frame);
}
