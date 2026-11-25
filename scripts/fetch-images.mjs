// Pulls the older photos (activities, archive events, sponsors) from the current
// live site, plus the 2D logo from a local file, as small WebP copies in public/img.
// The new board and flagship-event photos come from scripts/local-images.mjs.
// Run: npm run images:remote
import sharp from "sharp";
import { mkdir, readFile, access } from "node:fs/promises";
import path from "node:path";

const BASE = "https://cs-insat.ieee.tn/static/media/";
const OUT = path.resolve("public/img");

const events = {
  "xtreme-19": "xtreme-19.b2775e61.png", "summer-school-2025": "summer-school.a662f53d.png", ains: "ains.50e8630a.png",
  orbit: "orbit.e0db21bb.png", dataquest: "data-overflow.ab86c4ee.png", "summer-school": "summerSchool.16485f16.webp",
  xtreme: "xtreem.921681be.webp", "do-workshops": "do.87a61ac6.webp", hoc: "hoc.954d64f9.webp", bioit: "biot.db59a9c9.webp",
  cstc: "grandTech.90522177.webp", "do-hackathon": "doHack.8673c059.webp", trainings: "training.41715bce.webp",
};
const sponsors = {
  s1: "3b1df013-4f40-4171-95be-c8a479f00ace%201.87f7cba3.png", s2: "5fe5587d-6be9-43a7-a4c6-229d498d7cf2%202.74919999.png",
  s3: "68a344f978911bbeeda903f6_3487b4d6a931b25e51c333486600a08a_TC-Logo-Main%201.0ddc28b9.png",
  s4: "68a344f978911bbeeda903f6_3487b4d6a931b25e51c333486600a08a_TC-Logo-Main%202.2d641bc6.png",
  s5: "daylin.09a87f6a.webp", s6: "globalnet.6fa30870.webp", s7: "Group%20206.12672452.png", s8: "logo-4%201.0fe130b1.png",
  s9: "nordisk.7a526a4a.webp", s10: "stb.fae4a0a7.webp", s11: "talan-logo%202.f344b6b7.png",
};
// activity slug -> photos (same grouping as the live carousels)
const activities = {
  "data-structures": ["image1.0b8e8a61.png", "image2.bfa11bf9.png", "image3.1f893662.png"],
  "ai-se": ["image1.9afe7a82.png", "image2.283f292a.png"],
  "intro-it": ["image1.426fbd62.png", "image2.a5e0041d.png"],
  dataquest: ["image2.71eccb8a.png", "image3.07a130e3.png", "image5.b92cff70.png"],
  nvidia: ["image1.5f181d34.png", "image2.8dddc087.png", "image3.ae855861.png"],
  "intro-cv": ["image1.e5ff3f2b.png", "image2.5da51c70.png", "image3.93e92736.png"],
  "intro-ml": ["image1.0b1ace6e.png", "image2.e9da9226.png", "image3.ba711b06.png"],
  "advancing-ai": ["photo.8a4f3b98.jpg"],
  "webdev-2": ["image6.c5388bf9.jpg", "image5.aa5a1aa7.jpg", "image1.cfd71e16.jpg"],
  "webdev-1": ["image5.bcce0f7e.jpg", "image1.66624461.jpg", "image2.8f8916a0.jpg"],
  "xtreme-15": ["image5.46eebaf2.jpg", "image1.18a189f9.jpg", "image3.c322ae6e.jpg"],
  "ss-cp": ["image1.77e17e7b.jpg", "image2.a90535c3.jpg", "image3.176e8003.jpg"],
  "ss-flutter": ["image1.49b5fba2.jpg", "image2.17fdbb88.jpg", "image3.a82e511a.jpg"],
};

const jobs = [];
const add = (dir, name, file, opts) => jobs.push({ dir, name, src: BASE + file, ...opts });
for (const [n, f] of Object.entries(events)) add("events", n, f, { w: 900, h: 600, fit: "cover" });
for (const [n, f] of Object.entries(sponsors)) add("sponsors", n, f, { w: 360, h: 160, fit: "inside" });
for (const [n, fs] of Object.entries(activities)) fs.forEach((f, i) => add("activities", `${n}-${i + 1}`, f, { w: 900, h: 600, fit: "cover" }));

const LOGO = process.env.CS_LOGO || "C:/Users/USER/Desktop/CS/cs blanc.png";

async function run(job) {
  const dir = path.join(OUT, job.dir);
  await mkdir(dir, { recursive: true });
  const out = path.join(dir, job.name + ".webp");
  try { await access(out); return "skip"; } catch {}
  const res = await fetch(job.src);
  if (!res.ok) throw new Error(`${res.status} ${job.src}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await sharp(buf, { limitInputPixels: false })
    .rotate()
    .resize({ width: job.w, height: job.h, fit: job.fit, position: "attention", withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(out);
  return "ok";
}

let fail = 0;
const queue = [...jobs];
await Promise.all(Array.from({ length: 4 }, async () => {
  while (queue.length) {
    const j = queue.shift();
    try { console.log(await run(j), j.dir + "/" + j.name); }
    catch (e) { fail++; console.error("FAIL", j.dir + "/" + j.name, e.message); }
  }
}));

try {
  const logo = await readFile(LOGO);
  await sharp(logo).trim().resize({ width: 640 }).webp({ lossless: true }).toFile(path.join(OUT, "logo-white.webp"));
  console.log("ok logo");
} catch (e) { console.error("FAIL logo", e.message); fail++; }
console.log(fail ? `${fail} failed` : "all done");
