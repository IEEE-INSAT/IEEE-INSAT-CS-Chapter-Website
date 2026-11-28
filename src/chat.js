// "Ask Dreamz": a small, fully local FAQ chatbot. No server and no AI model.
// Everything it knows comes from content.js, so editing the site's content updates
// its answers too. A question is answered, in this order, by:
//   1. a board member's name or role ("who is the treasurer?", "kmar's linkedin")
//   2. a partner's name ("is Talan a sponsor?")
//   3. a named activity or event ("what was Wevioo?", "CSTAM 3.0")
//   4. a topic, matched by keywords in English and French (typos of one letter are forgiven)
//   5. a search through every text on the site, quoting the best passage
// To teach Dreamz something new, add it to content.js, or add a topic to TOPICS below
// (w = how much its keywords weigh: event names high, generic words low).
import * as C from "./content.js";

const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’']/g, " ").replace(/[^a-z0-9.+ ]/g, " ");
const link = (href, text, ext) => `<a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ""}>${text}</a>`;
const ev = (slug) => `/events.html?event=${slug}`;
const list = (xs) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);
const SENT = /[^]*?[.!?](?=\s+[A-Z“"(]|\s*$)/g;
const sentences = (s, n = 2) => (s.match(SENT) || [s]).slice(0, n).join(" ").replace(/\s+/g, " ").trim();
const mail = link(`mailto:${C.contact.email}`, C.contact.email);

const STOP = new Set("the a an to of and or in on at for with what whats is are was were how who when where why which about tell me us your you do does did can could would should i we it its this that there any some have has had be been from by as my our more please know info information de la le les des du et en est sont quoi quel quels quelle quelles vos votre nos notre pour avec sur une un au aux ce cette qui que comment quand ou je tu il elle on nous vous ils mon ma mes ton ta tes son sa ses dans par pas plus".split(" "));
const tokens = (s) => norm(s).split(/\s+/).filter((w) => w.length > 1 && !STOP.has(w));

// edit distance up to 1, so "xtrem", "hackaton" or "sponser" still match
function near(a, b) {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1 || Math.min(a.length, b.length) < 5) return false;
  let i = 0, j = 0, edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++edits > 1) return false;
    if (a.length > b.length) i++; else if (b.length > a.length) j++; else { i++; j++; }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

/* ---------- facts built from content.js ---------- */

const ACTS = C.activities;
const actLine = (a) => `<b>${a.title}</b> (${a.date})`;
const WIN = /\b(1st|2nd|3rd|first|second|third) place\b|top 10|finals|winner|award|pioneer/i;

// past editions of a flagship event, read from the activities list
const EDITIONS = {
  ieeextreme: (a) => /ieeextreme/i.test(a.title),
  dataoverflow: (a) => /dataquest|data overflow/i.test(a.title),
  ains: (a) => /\bains\b/i.test(a.title),
  bioit: (a) => /bioit/i.test(a.title),
};
const HUB_KEYS = {
  ieeextreme: ["xtreme", "ieeextreme", "extreme", "ieee xtreme", "24 hour", "24h", "competitive programming", "programmation competitive", "cp"],
  dataoverflow: ["data overflow", "dataoverflow", "dataquest", "data science", "acm", "hackathon data"],
  bioit: ["bioit", "bio it", "biology", "biologie", "embs", "medicine", "medecine", "bioinformatics"],
  ains: ["ains", "summit", "national summit", "ai summit", "ai national summit"],
};
// the event's short tags (dates, place, edition), minus anything the highlights already say
const MONTH = /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\b|edition/i;
const extraMeta = (e, facts) => (e.meta || []).filter((x) => MONTH.test(x) && !norm(facts.join(" ")).includes(norm(x).trim()));

function hubAnswer(e) {
  const eds = ACTS.filter(EDITIONS[e.slug] || (() => false)).map(actLine);
  const facts = e.highlights.filter((h) => !/to be announced/i.test(h.value)).map((h) => `${h.label}: ${h.value}`);
  return `${link(ev(e.slug), `<b>${e.name}</b>`)} (${e.kicker}). ${sentences(e.about, 2)}`
    + (facts.length ? `<br>${facts.join(" · ")}.` : "")
    + ((m) => (m.length ? ` <i>${m.join(" · ")}</i>.` : ""))(extraMeta(e, facts))
    + (eds.length ? `<br>Our editions so far: ${list(eds)}.` : "")
    + (e.link ? ` ${link(e.link.href, e.link.label, true)}.` : "");
}

const gameItems = C.game.items.filter((it) => it.slot !== "door");
const board = C.team.map((t) => `${t.name} (${t.role})`);

function memberAnswer(t) {
  const ways = [t.linkedin && link(t.linkedin, "LinkedIn", true), t.email && link(`mailto:${t.email}`, t.email)].filter(Boolean);
  return `<b>${t.name}</b> is our ${t.role}.${ways.length ? ` Reach them on ${ways.join(" or by email at ")}.` : ""} Their card is in the ${link("/#team", "team section")}.`;
}

/* ---------- topics ---------- */

const TOPICS = [
  {
    id: "hello", keys: ["hi", "hello", "hey", "salut", "bonjour", "salam", "aslema", "ahla", "who are you", "qui es tu", "dreamz", "your name"],
    a: () => "Hi, I’m <b>Dreamz</b>, the IEEE CS INSAT mascot. Ask me about our events, workshops, wins, the team, our partners, or how to join and reach us.",
  },
  {
    id: "about", w: 0.6, keys: ["about", "chapter", "who are", "computer society", "cs insat", "ieee insat", "founded", "history", "a propos", "presentation", "since when", "created"],
    a: () => `${C.about[0]} ${sentences(C.facts.intro, 1)} More on the ${link("/#about", "home page")}.`,
  },
  {
    id: "mission", w: 1.2, keys: ["mission", "goal", "goals", "purpose", "objectif", "objectifs", "but", "aim"],
    a: () => `${C.pillars.mission} ${link("/#mission", "Read it on the home page")}.`,
  },
  {
    id: "vision", w: 1.2, keys: ["vision", "dream", "future", "avenir", "real world", "industry"],
    a: () => `${C.pillars.vision} ${link("/#vision", "Read it on the home page")}.`,
  },
  {
    id: "game", w: 1.2, keys: ["game plan", "plan", "character", "build your character", "values", "valeurs", "items", "inventory", "curiosity", "craft", "teamwork", "grit", "connections"],
    a: () => `Our plan is a game: on the home page you ${link("/#plan", "build your character")} with five items, each something the chapter gives you: ${list(gameItems.map((it) => `<b>${it.word}</b> (from ${it.from})`))}. And you leave your fear of failing at the door.`,
  },
  {
    id: "stats", keys: ["how many", "members", "numbers", "stats", "statistics", "combien", "membres", "size", "big"],
    a: () => `Since March 2015 we’ve grown to ${list(C.facts.stats.map((s) => `${s.value}+ ${s.label.toLowerCase()}`))}.`,
  },
  {
    id: "events", w: 0.9, keys: ["event", "events", "evenement", "evenements", "competition", "competitions", "next event", "upcoming", "prochain", "flagship"],
    a: () => `Our flagship events are ${list(C.hubEvents.map((e) => link(ev(e.slug), e.name)))}. We also run or join ${list(C.archiveEvents.map((e) => e.title))}. Browse them all on the ${link("/events.html", "events page")}.`,
  },
  ...C.hubEvents.map((e) => ({ id: e.slug, w: 1.6, keys: HUB_KEYS[e.slug] || [norm(e.name)], a: () => hubAnswer(e) })),
  {
    id: "summer", w: 1.4, keys: ["summer school", "summer", "ecole d ete", "beginner", "beginners", "debutant", "debutants", "newcomer"],
    a: () => {
      const ss = C.archiveEvents.find((e) => /summer school/i.test(e.title));
      const sessions = ACTS.filter((a) => /summer school/i.test(a.title)).slice(0, 4).map(actLine);
      return `${ss ? sentences(ss.text, 2) : "Summer School is our weekend of beginner workshops."} Our recent Summer School sessions: ${list(sessions)}. See them on the ${link("/activities.html", "activities page")}.`;
    },
  },
  {
    id: "activities", w: 0.9, keys: ["workshop", "workshops", "training", "trainings", "session", "sessions", "atelier", "ateliers", "formation", "formations", "learn", "course", "courses", "activities", "activites", "cours"],
    a: () => `We’ve run ${ACTS.length} sessions and activities so far, from competitive programming and data structures to AI, NLP, computer vision, cloud and web development. The latest: ${list(ACTS.slice(0, 4).map(actLine))}. All of them are on the ${link("/activities.html", "activities page")}.`,
  },
  {
    id: "latest", w: 1.2, keys: ["latest", "recent", "recently", "news", "new", "last", "nouveau", "nouveautes", "dernier", "derniers", "actualites", "what s new", "lately"],
    a: () => `Our latest activities: ${list(ACTS.slice(0, 4).map(actLine))}. ${link("/activities.html", "See them all")}.`,
  },
  {
    id: "wins", w: 1.3, keys: ["award", "awards", "won", "win", "wins", "winner", "prize", "prizes", "achievement", "achievements", "ranking", "place", "victoire", "prix", "gagne", "results", "resultats", "trophy"],
    a: () => {
      const wins = ACTS.filter((a) => WIN.test(`${a.title} ${a.text}`)).slice(0, 5);
      return wins.length ? `Some of our recent wins: ${list(wins.map(actLine))}. Ask me about any of them, or see the ${link("/activities.html", "activities page")}.` : `Have a look at the ${link("/activities.html", "activities page")} for our latest competitions.`;
    },
  },
  {
    id: "join", w: 1.3, keys: ["join", "membership", "member", "register", "sign up", "signup", "rejoindre", "adherer", "adhesion", "inscription", "inscrire", "become a member", "devenir membre", "participate", "participer", "volunteer"],
    a: () => `Come to one of our sessions at INSAT: everyone is welcome. To be a full member and enter IEEE competitions like IEEEXtreme, get an IEEE student membership at ${link("https://www.ieee.org/membership/join/", "ieee.org", true)}. For anything else, write to ${mail}.`,
  },
  {
    id: "team", keys: ["team", "board", "bureau", "equipe", "who runs", "leader", "leaders", "staff", "officers", "comite", "committee"],
    a: () => `The 26/27 board: ${list(board)}. Ask me about any of them, or meet them in the ${link("/#team", "team section")}.`,
  },
  {
    id: "contact", keys: ["contact", "email", "mail", "phone", "phone number", "numero", "call", "telephone", "tel", "joindre", "reach", "write", "ecrire", "facebook", "instagram", "linkedin", "social", "socials", "reseaux"],
    a: () => `Email ${mail} · Phone ${link(`tel:${C.contact.phone.replace(/\s/g, "")}`, C.contact.phone)}. Follow us on ${list(C.contact.socials.map((s) => link(s.url, s.name, true)))}. You can also use the ${link("/#contact", "contact form")}.`,
  },
  {
    id: "where", keys: ["where", "address", "location", "adresse", "located", "map", "maps", "ou se trouve", "situe", "find you"],
    w: 0.8,
    a: () => `We’re based at INSAT: ${link(C.contact.maps, C.contact.address, true)}. Most of our workshops happen there.`,
  },
  {
    id: "portal", w: 1.5, keys: ["time portal", "portal", "platform", "plateforme", "submit", "submission", "judge", "leaderboard", "points", "rank", "challenges", "challenge", "dashboard"],
    a: () => `${C.portal.intro} It has ${list(C.portal.features.map((f) => `<b>${f.t.charAt(0).toLowerCase() + f.t.slice(1)}</b>`))}. See it in the ${link("/#portal", "Time Portal section")}.`,
  },
  {
    id: "sponsor", w: 1.3, keys: ["sponsor", "sponsors", "partner", "partners", "partnership", "partenaire", "partenaires", "sponsoring", "company", "companies", "entreprise", "support", "supporters"],
    a: () => `${C.sponsors.length} companies and institutions have supported our events, including ${list(C.sponsors.filter((s) => s.name !== "Partner").slice(0, 8).map((s) => s.name))}. See them all in the ${link("/#sponsors", "partners section")}. To sponsor an event, write to ${mail}.`,
  },
  {
    id: "thanks", w: 1, keys: ["thanks", "thank you", "thank", "thx", "merci", "cool", "great", "nice", "super", "awesome", "parfait", "perfect"],
    a: () => "You’re welcome! Anything else you’d like to know about the chapter?",
  },
  {
    id: "bye", w: 1, keys: ["bye", "goodbye", "see you", "ciao", "au revoir", "bslema", "a plus", "later"],
    a: () => "See you soon! Follow us on social media so you don’t miss the next event.",
  },
];

const CHIPS = [["events", "Our events"], ["wins", "Our wins"], ["join", "How do I join?"], ["team", "The team"]];

function topicScore(t, qs) {
  let best = null, score = 0;
  for (const topic of TOPICS) {
    let s = 0;
    for (const k of topic.keys) {
      // whole phrase, a long keyword at the start of a word ("sponsor" in "sponsors"), or a one-letter typo
      const hit = t.includes(` ${k} `) || (k.length > 4 && !k.includes(" ") && (t.includes(` ${k}`) || qs.some((x) => !topic.keys.includes(x) && near(x, k))));
      if (hit) s += k.split(" ").length + (k.length > 6 ? 1 : 0);
    }
    s *= topic.w ?? 1;
    if (s > score) { score = s; best = topic; }
  }
  return { best, score };
}

/* ---------- named activities and events ---------- */

const ITEMS = [
  ...ACTS.map((a) => ({ title: a.title, date: a.date, text: a.text, href: "/activities.html" })),
  ...C.archiveEvents.map((e) => ({ title: e.title, date: "", text: e.text, href: "/events.html#archive" })),
].map((it) => ({ ...it, words: [...new Set(tokens(it.title).filter((w) => w.length > 2 && !["workshop", "session", "with", "acm", "insat", "2025", "2026", "intro", "introduction"].includes(w)))] }));

// words that name a single activity (e.g. "tsyp13", "wevioo") count double
const DF = new Map();
ITEMS.forEach((it) => it.words.forEach((w) => DF.set(w, (DF.get(w) || 0) + 1)));

function itemScore(qs) {
  let best = null, score = 0;
  for (const it of ITEMS) {
    if (!it.words.length) continue;
    const hits = it.words.filter((w) => qs.some((x) => x === w || near(x, w) || (x.length >= 4 && (w.startsWith(x) || x.startsWith(w)))));
    if (!hits.length) continue;
    const s = hits.reduce((n, w) => n + (DF.get(w) === 1 ? 2.4 : 1.2), 0) + (hits.length / it.words.length) * 2;
    if (s > score) { score = s; best = it; }
  }
  return { best, score };
}

/* ---------- people and partners ---------- */

const ROLE_WORDS = [
  [/\b(vice (chair|president|presidente)|vp)\b.*\b(tech|technical|technique)/, "Vice Chair Technical Activities"],
  [/\b(vice (chair|president|presidente)|vp)\b.*\b(member|membership|membres?)/, "Vice Chair Membership Activities"],
  [/\b(treasurer|tresorier|tresoriere|finance|money)\b/, "Treasurer"],
  [/\b(secretary|secretaire|general secretary|sg)\b/, "General Secretary"],
  [/\b(media manager|media|communication|social media manager)\b/, "Media Manager"],
  [/\b(chair|chairman|chairwoman|president|presidente|head|leader)\b/, "Chair"],
];
function person(t, qs) {
  for (const m of C.team) {
    const parts = tokens(m.name).filter((w) => w.length > 2);
    if (parts.some((p) => qs.some((x) => x === p || near(x, p)))) return m;
  }
  if (/\bvice\b/.test(t) && !/\b(tech|technical|technique|member|membership|membres?)\b/.test(t)) return null;
  for (const [re, role] of ROLE_WORDS) if (re.test(t)) return C.team.find((m) => m.role === role) || null;
  return null;
}

const SPONSORS = C.sponsors.filter((s) => s.name !== "Partner").map((s) => ({ ...s, n: ` ${norm(s.name).replace(/\s+/g, " ").trim()} ` }));
const sponsorIn = (t) => SPONSORS.find((s) => s.n.trim().length > 2 && t.includes(s.n));

/* ---------- search through every text on the site ---------- */

const PASSAGES = [
  ...C.about.map((x) => ({ title: "About us", text: x, href: "/#about" })),
  { title: "Our mission", text: C.pillars.mission, href: "/#mission" },
  { title: "Our vision", text: C.pillars.vision, href: "/#vision" },
  { title: "Facts", text: C.facts.intro, href: "/#facts" },
  ...C.hubEvents.flatMap((e) => [
    { title: e.name, text: `${e.tagline} ${e.about}`, href: ev(e.slug) },
    { title: e.name, text: e.highlights.map((h) => `${h.label}: ${h.value}.`).join(" "), href: ev(e.slug) },
  ]),
  ...C.archiveEvents.map((e) => ({ title: e.title, text: e.text, href: "/events.html#archive" })),
  ...ACTS.map((a) => ({ title: `${a.title} (${a.date})`, text: a.text, href: "/activities.html" })),
  { title: C.portal.name, text: C.portal.intro, href: "/#portal" },
  ...C.portal.features.map((f) => ({ title: `${C.portal.name}: ${f.t}`, text: f.d, href: "/#portal" })),
  ...gameItems.map((it) => ({ title: `The game plan: ${it.name}`, text: `${it.word}. ${it.flavor} You earn it from ${it.from}.`, href: "/#plan" })),
].map((p) => ({ ...p, words: new Set(tokens(`${p.title} ${p.text}`)) }));
const PDF = new Map();
PASSAGES.forEach((p) => p.words.forEach((w) => PDF.set(w, (PDF.get(w) || 0) + 1)));
const idf = (w) => Math.log(1 + PASSAGES.length / (PDF.get(w) || PASSAGES.length));

function search(qs) {
  const words = [...new Set(qs.filter((w) => w.length > 2))];
  if (!words.length) return null;
  let best = null, score = 0;
  for (const p of PASSAGES) {
    let s = 0;
    for (const x of words) {
      if (p.words.has(x)) s += idf(x);
      else if (x.length >= 5) for (const w of p.words) if (w.startsWith(x) || near(x, w)) { s += idf(w) * 0.8; break; }
    }
    if (s > score) { score = s; best = p; }
  }
  if (!best || score < 2.2) return null;
  // quote the sentences that mention the question's words
  const parts = best.text.match(SENT) || [best.text];
  const ranked = parts.map((s, i) => ({ s: s.trim(), i, n: words.filter((x) => norm(s).includes(x)).length })).sort((a, b) => b.n - a.n || a.i - b.i);
  const quote = ranked.slice(0, 2).sort((a, b) => a.i - b.i).map((r) => r.s).join(" ");
  return `From <b>${best.title}</b>: ${quote} ${link(best.href, "See it on the site")}.`;
}

/* ---------- answer ---------- */

export function answer(q) {
  const t = ` ${norm(q)} `, qs = tokens(q);
  const m = person(t, qs);
  if (m) return memberAnswer(m);

  const topic = topicScore(t, qs), item = itemScore(qs);
  const sp = sponsorIn(t);
  if (sp && (topic.best?.id === "sponsor" || topic.score < 2) && !(item.score >= 4)) {
    return `Yes, <b>${sp.name}</b> is one of the ${C.sponsors.length} partners that have supported our events. See them all in the ${link("/#sponsors", "partners section")}.`;
  }
  // a named activity wins over generic topics, but not over a flagship event's own answer
  if (item.best && item.score > topic.score && (item.score >= 2.5 || (topic.score === 0 && item.score >= 1.5))) {
    const it = item.best;
    return `<b>${it.title}</b>${it.date ? ` (${it.date})` : ""}: ${it.text} ${link(it.href, "See it on the site")}.`;
  }
  if (topic.best && topic.score >= 1) return topic.best.a();
  const found = search(qs);
  if (found) return found;
  return `I’m not sure about that one. Try asking about our events, workshops, wins, the team or how to join, or write to the humans at ${mail}.`;
}

// Dreamz as a pixel icon: s = sky, v = violet screen, l = lime face, o = orange bolt
const FACE = [
  "........o.....",
  ".......oo.....",
  "..ssssssssss..",
  "s.svvvvvvvvs.s",
  "sssvlvvvvlvsss",
  "s.svvvvvvvvs.s",
  "..svvvllvvvs..",
  "..svvvvvvvvs..",
  "..ssssssssss..",
  ".....ssss.....",
  "....ssssss....",
];
const COL = { s: "#86B1EA", v: "#6865F2", l: "#DAFF77", o: "#FF8849" };
const avatar = (cls) => `<svg class="${cls}" viewBox="0 0 14 11" shape-rendering="crispEdges" aria-hidden="true">${FACE.flatMap((r, y) => [...r].map((c, x) => (COL[c] ? `<rect x="${x}" y="${y}" width="1" height="1" fill="${COL[c]}"/>` : ""))).join("")}</svg>`;

export function mountChat() {
  const wrap = document.createElement("div");
  wrap.className = "chat";
  wrap.innerHTML = `
    <button type="button" class="chat-fab" id="chat-fab" aria-expanded="false" aria-controls="chat-panel">
      ${avatar("chat-fab-icon")}<span class="chat-fab-label">Ask Dreamz</span>
    </button>
    <section class="chat-panel" id="chat-panel" role="dialog" aria-label="Chat with Dreamz" hidden>
      <header class="chat-head">
        <span class="chat-head-avatar">${avatar("chat-head-icon")}</span>
        <div class="chat-head-text"><p class="chat-name">Dreamz</p><p class="chat-sub"><i aria-hidden="true"></i>CS INSAT mascot</p></div>
        <button type="button" class="chat-close" id="chat-close" aria-label="Close chat">×</button>
      </header>
      <div class="chat-log" id="chat-log" role="log" aria-live="polite"></div>
      <div class="chat-chips" id="chat-chips">${CHIPS.map(([id, l]) => `<button type="button" data-topic="${id}">${l}</button>`).join("")}</div>
      <form class="chat-form" id="chat-form">
        <label class="sr" for="chat-input">Message Dreamz</label>
        <input id="chat-input" autocomplete="off" maxlength="200" placeholder="Ask about events, workshops…">
        <button type="submit" aria-label="Send">▶</button>
      </form>
    </section>`;
  document.body.appendChild(wrap);

  const fab = wrap.querySelector("#chat-fab"), panel = wrap.querySelector("#chat-panel"), log = wrap.querySelector("#chat-log");
  const form = wrap.querySelector("#chat-form"), input = wrap.querySelector("#chat-input");
  let greeted = false;

  // one row per message: Dreamz's answers sit beside a small avatar, yours on the right
  const row = (who, html, extra = "") => {
    const r = document.createElement("div");
    r.className = `chat-row chat-row-${who}`;
    r.innerHTML = `${who === "bot" ? `<span class="chat-avatar" aria-hidden="true">${avatar("chat-avatar-icon")}</span>` : ""}<p class="chat-msg chat-${who}${extra}">${html}</p>`;
    log.appendChild(r);
    log.scrollTop = log.scrollHeight;
    return r;
  };
  const say = (html, who) => row(who, html);
  const reply = (html) => {
    const typing = row("bot", "<span></span><span></span><span></span>", " chat-typing");
    typing.setAttribute("aria-hidden", "true");
    setTimeout(() => { typing.remove(); say(html, "bot"); }, 420);
  };

  const open = (on) => {
    panel.hidden = !on;
    fab.setAttribute("aria-expanded", String(on));
    wrap.classList.toggle("is-open", on);
    if (on) {
      if (!greeted) { greeted = true; say(TOPICS[0].a(), "bot"); }
      input.focus();
    } else fab.focus();
  };
  fab.addEventListener("click", () => open(panel.hidden));
  wrap.querySelector("#chat-close").addEventListener("click", () => open(false));
  panel.addEventListener("keydown", (e) => { if (e.key === "Escape") open(false); });
  wrap.querySelector("#chat-chips").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-topic]");
    if (!b) return;
    say(esc(b.textContent), "me");
    reply(TOPICS.find((t) => t.id === b.dataset.topic).a());
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    input.value = "";
    say(esc(q), "me");
    reply(answer(q));
  });
}
