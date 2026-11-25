// "Ask Dreamz": a small, fully local FAQ chatbot. No server and no AI model:
// questions are matched against the topics below by keywords (English + French),
// and against the names of every activity and archive event in content.js.
// To teach Dreamz something new, add a topic to TOPICS (w = how much its keywords
// weigh: event names high, generic words low) or add an activity to content.js.
import * as C from "./content.js";

const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9.+ ]/g, " ");
const link = (href, text, ext) => `<a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ""}>${text}</a>`;
const ev = (slug) => `/events.html?event=${slug}`;

const TOPICS = [
  {
    id: "hello", keys: ["hi", "hello", "hey", "salut", "bonjour", "salam", "aslema", "who are you", "qui es tu", "dreamz"],
    a: () => "Hi, I’m <b>Dreamz</b>, the IEEE CS INSAT mascot. Ask me about our events, workshops, the team, or how to join and reach us.",
  },
  {
    id: "about", w: 0.6, keys: ["about", "chapter", "who are", "computer society", "cs insat", "founded", "history", "a propos", "mission", "vision"],
    a: () => `We’re the IEEE Computer Society Chapter of the INSAT Student Branch, founded in March 2015 by IEEE members with a passion for software and computer science. We run trainings, competitions and events for INSAT’s computer science community. More on the ${link("/#about", "home page")}.`,
  },
  {
    id: "stats", keys: ["how many", "members", "numbers", "stats", "combien", "membres", "followers"],
    a: () => `Today we count ${C.facts.stats.map((s) => `+${s.value} ${s.label.toLowerCase()}`).join(", ")}, and about 6.6K followers on Facebook.`,
  },
  {
    id: "events", w: 0.9, keys: ["event", "events", "evenement", "evenements", "competition", "hackathon", "next event", "upcoming", "prochain"],
    a: () => `Our flagship events are ${C.hubEvents.map((e) => link(ev(e.slug), e.name)).join(", ")}. We also take part in Summer School, Hour of Code, Orbit and more. Browse them all on the ${link("/events.html", "events page")}.`,
  },
  {
    id: "xtreme", w: 1.6, keys: ["xtreme", "ieeextreme", "extreme", "competitive programming", "programmation competitive"],
    a: () => `${link(ev("ieeextreme"), "IEEEXtreme")} is IEEE’s global 24-hour programming contest, for teams of up to 3 IEEE student members. We host the INSAT edition every year: 17.0 (Oct 2023), 18.0 “The ABDOU Verse” (Oct 2024), 19.0 (Oct 2025) and 20.0 (31 Oct 2026).`,
  },
  {
    id: "do", w: 1.6, keys: ["data overflow", "dataoverflow", "dataquest", "data science", "machine learning", "ml", "acm"],
    a: () => `${link(ev("dataoverflow"), "Data Overflow")} is our AI and data science event with ACM INSAT: workshop tracks, an AI day and DataQuest, a 10-hour hackathon on one real-world dataset. ${link("https://data-overflow.tn", "data-overflow.tn", true)}`,
  },
  {
    id: "bioit", w: 1.6, keys: ["bioit", "bio it", "biology", "biologie", "embs", "medicine"],
    a: () => `${link(ev("bioit"), "BioIT")} is organized with IEEE EMBS INSAT, where biology, medicine and IT meet. The next edition will be announced soon.`,
  },
  {
    id: "ains", w: 1.6, keys: ["ains", "summit", "national summit", "ai summit", "artificial intelligence", "ia", "intelligence artificielle"],
    a: () => `${link(ev("ains"), "AINS")}, the Artificial Intelligence National Summit, brings 500+ students together for three days of talks, workshops, competitions and a hackathon. AINS 3.0 was in Sousse (June 2025), AINS 4.0 in Hammamet (25–27 June). ${link("https://www.ai-national-summit.tech", "ai-national-summit.tech", true)}`,
  },
  {
    id: "summer", w: 1.4, keys: ["summer school", "summer", "ecole d ete", "beginner", "debutant"],
    a: () => "Summer School is the IEEE INSAT Student Branch’s weekend of introductory workshops, with beginner computer science tracks from us. The latest, Summer School 9.0 (26–27 September 2026), covered AI, IoT, bioinformatics, UAVs, satellites, energy and 3D printing; our chapter ran AI Engineering 101 with Kmar Ben Ayed and Introduction to IT with Emna Drihem. Earlier editions: Summer School 7 (Sep 2024) and 8 (Sep 2025). See the sessions on the <a href=\"/activities.html\">activities page</a>.",
  },
  {
    id: "activities", w: 0.9, keys: ["workshop", "workshops", "training", "trainings", "session", "sessions", "atelier", "ateliers", "formation", "formations", "learn", "course", "activities", "activites"],
    a: () => `We run sessions all year: data structures, competitive programming, AI, NLP, computer vision, machine learning, web development and more. See every session on the ${link("/activities.html", "activities page")}.`,
  },
  {
    id: "join", w: 1.3, keys: ["join", "membership", "register", "sign up", "rejoindre", "adherer", "inscription", "inscrire", "become a member", "devenir membre"],
    a: () => `Come to one of our sessions at INSAT: everyone is welcome. To be a full member and enter IEEE competitions like IEEEXtreme, get an IEEE student membership at ${link("https://www.ieee.org/membership/join/", "ieee.org", true)}. For anything else, write to ${link(`mailto:${C.contact.email}`, C.contact.email)}.`,
  },
  {
    id: "team", keys: ["team", "board", "chair", "president", "bureau", "equipe", "who runs", "leader"],
    a: () => `The 26/27 board: ${C.team.map((t) => `${t.name} (${t.role})`).join(", ")}. Meet them on the ${link("/#team", "home page")}.`,
  },
  {
    id: "contact", keys: ["contact", "email", "mail", "phone", "call", "address", "where", "location", "adresse", "telephone", "joindre", "facebook", "instagram", "linkedin", "social"],
    a: () => `Email ${link(`mailto:${C.contact.email}`, C.contact.email)} · Phone ${link(`tel:${C.contact.phone.replace(/\s/g, "")}`, C.contact.phone)} · ${C.contact.address}. Follow us on ${C.contact.socials.map((s) => link(s.url, s.name, true)).join(", ")}.`,
  },
  {
    id: "portal", w: 1.5, keys: ["time portal", "portal", "platform", "plateforme", "website", "site", "submit", "submission", "judge", "leaderboard", "points", "rank"],
    a: () => `${C.portal.intro} ${C.portal.features.map((f) => f.t).join(", ")}. See it on the ${link("/#portal", "home page")}.`,
  },
  {
    id: "sponsor", w: 1.3, keys: ["sponsor", "sponsors", "partner", "partnership", "partenaire", "sponsoring", "company", "entreprise"],
    a: () => `${C.sponsors.length} companies and institutions have supported our events, including ${C.sponsors.filter((s) => s.name !== "Partner").slice(0, 8).map((s) => s.name).join(", ")} and more. To sponsor an event, write to ${link(`mailto:${C.contact.email}`, C.contact.email)}.`,
  },
  {
    id: "latest", w: 1.2, keys: ["latest", "recent", "recently", "news", "new", "last", "nouveau", "nouveautes", "dernier", "derniers", "actualites", "what s new"],
    a: () => `Our latest activities: ${C.activities.slice(0, 4).map((a) => `<b>${a.title}</b> (${a.date})`).join(", ")}. All of them are on the ${link("/activities.html", "activities page")}.`,
  },
  {
    id: "wins", w: 1.3, keys: ["award", "awards", "won", "win", "wins", "prize", "achievement", "achievements", "ranking", "place", "victoire", "prix", "gagne"],
    a: () => {
      const wins = C.activities.filter((a) => /place|top 10|finals|winner/i.test(a.title + " " + a.text)).slice(0, 4);
      return wins.length ? `Some recent wins: ${wins.map((a) => `<b>${a.title}</b> (${a.date})`).join(", ")}. More on the ${link("/activities.html", "activities page")}.` : `Have a look at the ${link("/activities.html", "activities page")} for our latest competitions.`;
    },
  },
  {
    id: "thanks", w: 1, keys: ["thanks", "thank you", "thank", "thx", "merci", "cool", "great", "nice", "super", "awesome", "parfait"],
    a: () => "You’re welcome! Anything else you’d like to know about the chapter?",
  },
  {
    id: "bye", w: 1, keys: ["bye", "goodbye", "see you", "ciao", "au revoir", "bslema", "a plus"],
    a: () => "See you soon! Follow us on social media so you don’t miss the next event.",
  },
];

const CHIPS = [["events", "Our events"], ["join", "How do I join?"], ["activities", "Workshops"], ["contact", "Contact"]];

const STOP = new Set("the a an to of and or in on at for with what whats is are was were how who when where why which about tell me us your you do does did can could i we it its this that there any some de la le les des du et en est sont quoi quel quels quelle quelles vos votre pour avec sur une un au aux ce cette qui que comment quand ou".split(" "));
const tokens = (s) => norm(s).split(/\s+/).filter((w) => w.length > 1 && !STOP.has(w));

// Every activity and archive event Dreamz can answer about by name.
const ITEMS = [
  ...C.activities.map((a) => ({ title: a.title, date: a.date, text: a.text, href: "/activities.html" })),
  ...C.archiveEvents.map((e) => ({ title: e.title, date: "", text: e.text, href: "/events.html#archive" })),
].map((it) => ({ ...it, words: [...new Set(tokens(it.title).filter((w) => w.length > 2 && !["workshop", "session", "with", "acm", "insat", "2025", "2026", "intro", "introduction"].includes(w)))] }));

function topicScore(t) {
  let best = null, score = 0;
  for (const topic of TOPICS) {
    let s = 0;
    for (const k of topic.keys) {
      // whole phrase, or a single long keyword at the start of a word ("sponsor" in "sponsors")
      const hit = t.includes(` ${k} `) || (k.length > 4 && !k.includes(" ") && t.includes(` ${k}`));
      if (hit) s += k.split(" ").length + (k.length > 6 ? 1 : 0);
    }
    s *= topic.w ?? 1;
    if (s > score) { score = s; best = topic; }
  }
  return { best, score };
}

// words that name a single activity (e.g. "tsyp13", "wevioo") count double
const DF = new Map();
ITEMS.forEach((it) => it.words.forEach((w) => DF.set(w, (DF.get(w) || 0) + 1)));

function itemScore(q) {
  const qs = tokens(q);
  let best = null, score = 0;
  for (const it of ITEMS) {
    if (!it.words.length) continue;
    const hits = it.words.filter((w) => qs.some((x) => x === w || (x.length >= 4 && (w.startsWith(x) || x.startsWith(w)))));
    if (!hits.length) continue;
    const s = hits.reduce((n, w) => n + (DF.get(w) === 1 ? 2.4 : 1.2), 0) + (hits.length / it.words.length) * 2;
    if (s > score) { score = s; best = it; }
  }
  return { best, score };
}

function answer(q) {
  const t = ` ${norm(q)} `;
  const topic = topicScore(t);
  const item = itemScore(q);
  // a named activity wins over generic topics, but not over a flagship event's own answer
  if (item.best && item.score >= 2.5 && item.score > topic.score) {
    const it = item.best;
    return `<b>${it.title}</b>${it.date ? ` (${it.date})` : ""}: ${it.text} ${link(it.href, "See it on the site")}.`;
  }
  if (topic.best) return topic.best.a();
  return `I’m not sure about that one. Try asking about our events, workshops, the team or how to join, or write to the humans at ${link(`mailto:${C.contact.email}`, C.contact.email)}.`;
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
