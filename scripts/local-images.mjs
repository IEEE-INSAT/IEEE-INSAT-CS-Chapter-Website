// Builds the site's photos from the folder the chapter provided ("CS WEBSITE").
// Run: npm run images:local -- "C:/path/to/CS WEBSITE"
// Outputs small WebP files to public/img/{team,hub,collage}. Existing outputs are
// skipped, so delete a file to regenerate it.
import sharp from "sharp";
import { readFile, mkdir, access } from "node:fs/promises";
import path from "node:path";

const SRC = process.argv[2];
if (!SRC) {
  console.error('Usage: npm run images:local -- "<path to the CS WEBSITE folder>"');
  process.exit(1);
}
const OUT = path.resolve("public/img");
const ROTATE = { 3: 180, 6: 90, 8: 270 };

// Canon .CR2 is TIFF-based: IFD0 points at a full-size JPEG preview.
function fromCr2(buf) {
  const le = buf.toString("latin1", 0, 2) === "II";
  const u16 = (o) => (le ? buf.readUInt16LE(o) : buf.readUInt16BE(o));
  const u32 = (o) => (le ? buf.readUInt32LE(o) : buf.readUInt32BE(o));
  const ifd = u32(4);
  let off, len, orient = 1;
  for (let i = 0, n = u16(ifd); i < n; i++) {
    const e = ifd + 2 + i * 12, tag = u16(e);
    if (tag === 0x111) off = u32(e + 8);
    if (tag === 0x117) len = u32(e + 8);
    if (tag === 0x112) orient = u16(e + 8);
  }
  return { input: buf.subarray(off, off + len), angle: ROTATE[orient] || 0 };
}

async function load(rel) {
  const buf = await readFile(path.join(SRC, rel));
  if (/\.cr2$/i.test(rel)) return fromCr2(buf);
  return { input: buf, angle: null }; // null = use the file's own EXIF orientation
}

const jobs = [];
const job = (src, out, w, h, opts = {}) => jobs.push({ src, out, w, h, ...opts });

// Board 26/27 — portrait 4:5
const team = {
  marwen: "MARWEN_AGREBI_CHAIR.CR2",
  kmar: "KMAR_BEN_AYED_VCTA.jpg",
  achref: "ACHREF_ANTAR_VCMA.jpg",
  ghayth: "GHAYTH_ABIDLI_TREASURER.jpg",
  roudaina: "ROUDAINA_LINOUBLI_GENERAL_SECRETARY.CR2",
  ines: "INES_FAKHFEKH_MEDIA_MANAGER.png",
};
for (const [k, f] of Object.entries(team)) job(f, `team/${k}`, 640, 800, { position: "attention" });

// Events page: gallery photos
const X = "EVENTS/IEEEXTREME/", D = "EVENTS/DO/", A = "EVENTS/AINS 4.0/";
const DO = [
  "645654792_1571335408328680_4317137261310161064_n.jpg",
  "646009221_1571350218327199_9136298488681186835_n.jpg",
  "647149881_1572297264899161_3680370508422588958_n.jpg",
  "648312829_1573147161480838_1782339720327427230_n.jpg",
];
const hub = {
  ieeextreme: { gallery: ["Comp 1_00012.png", "Comp 1_00054.png", "Comp 1_00057.png", "Comp 1_00059.png"].map((f) => X + f) },
  dataoverflow: { gallery: DO.map((f) => D + f) },
  ains: { gallery: ["DSC05751.JPG", "DSC07274.JPG", "DSC07476.JPG", "DSC07582.JPG"].map((f) => A + f) },
};
for (const [slug, h] of Object.entries(hub)) {
  // large and uncropped: the gallery crops with CSS, the photo viewer shows the whole image
  h.gallery.forEach((g, i) => job(g, `hub/${slug}-${i + 1}`, 1600, 1600, { fit: "inside", quality: 76 }));
}

// Facts collage
[A + "DSC07582.JPG", D + DO[2], X + "Comp 1_00012.png", A + "DSC05751.JPG", D + DO[3]].forEach((f, i) =>
  job(f, `collage/${i + 1}`, 560, 420, { position: "attention" }),
);

let fail = 0;
for (const j of jobs) {
  const out = path.join(OUT, j.out + ".webp");
  try { await access(out); continue; } catch {}
  try {
    await mkdir(path.dirname(out), { recursive: true });
    const { input, angle } = await load(j.src);
    let img = sharp(input, { limitInputPixels: false });
    img = angle === null ? img.rotate() : img.rotate(angle);
    await img
      .resize({ width: j.w, height: j.h, fit: j.fit || "cover", position: j.position || "centre", withoutEnlargement: true })
      .webp({ quality: j.quality || 78 })
      .toFile(out);
    console.log("ok", j.out);
  } catch (e) {
    fail++;
    console.error("FAIL", j.out, e.message);
  }
}
console.log(fail ? `${fail} failed` : "all done");
