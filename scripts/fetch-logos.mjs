// Downloads official partner logos (Wikimedia Commons or the company's own site),
// keeps the originals in assets/logos/ and writes web versions to public/img/sponsors/.
// Run: node scripts/fetch-logos.mjs
// "local:<file>" entries are already saved in assets/logos/ and are only converted.
// Logos not listed here (Asteelflash, TuNur, Yellowsys, CSF, Invest Jobs, Innov'i
// and the unnamed partner) are still crops of the partners image; Novo Nordisk keeps the old site's logo (s9).
import sharp from "sharp";
import { mkdir, writeFile, readFile, access } from "node:fs/promises";
import path from "node:path";

const LOGOS = {
  kia: "https://upload.wikimedia.org/wikipedia/commons/b/b6/KIA_logo3.svg",
  hutchinson: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Hutchinson_%28Unternehmen%29_logo.svg",
  draexlmaier: "https://upload.wikimedia.org/wikipedia/commons/1/1a/DR%C3%84XLMAIER_Group_Logo.svg",
  orange: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Orange_logo.svg",
  "mitsubishi-electric": "https://upload.wikimedia.org/wikipedia/commons/1/10/Mitsubishi_Electric_logo.svg",
  stb: "https://upload.wikimedia.org/wikipedia/commons/0/06/Logo_STB.png",
  talan: "https://www.talan.com/images/talan-logo-v2-3.svg",
  sofrecom: "https://www.sofrecom.com/media/images/logos/cache/sofrecom_logo_final_rvb_couleurs-1-1-250x9999.png",
  "banque-zitouna": "https://www.banquezitouna.com/themes/custom/particuliers/logo.svg",
  "amen-bank": "https://www.amenbank.com.tn/img/logo.jpg",
  ubci: "https://www.ubci.tn/wp-content/themes/ubci/img/logo-banque-ubci.png",
  "gat-assurances": "https://www.gat.com.tn/_next/static/media/gat-logo.0nox-vdyisnj4.png",
  sopal: "https://www.sopal.com/assets/images/logo.png",
  "integration-objects": "https://integrationobjects.com/images/logos/logo-io@3x.webp",
  telnet: "https://groupe-telnet.com/wp-content/uploads/2020/03/logo.png",
  "institut-francais": "https://www.institutfrancais-tunisie.com/wp-content/themes/ift/assets/images/logo.png",
  bako: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Bako_Motors%2C_logo.jpg",
  // header SVG copied from instadeep.com, white wordmark recoloured dark so it shows on a light tile
  instadeep: "local:instadeep.svg",
  vectors: "https://support.covectors.io/images/362c07a0-e0de-4dcc-8975-ec5b320284a6",
  "cooperation-allemande": "https://cdnfr.africanmanager.com/wp-content/uploads/2026/02/gur.jpg",
};

const ORIG = path.resolve("assets/logos"), OUT = path.resolve("public/img/sponsors");
await mkdir(ORIG, { recursive: true });
await mkdir(OUT, { recursive: true });

let fail = 0;
for (const [name, url] of Object.entries(LOGOS)) {
  try {
    const local = url.startsWith("local:");
    const ext = (path.extname(local ? url.slice(6) : new URL(url).pathname) || ".png").toLowerCase();
    const orig = path.join(ORIG, name + ext);
    let buf;
    try { await access(orig); buf = await readFile(orig); } catch {
      if (local) throw new Error("missing " + orig);
      const res = await fetch(url, { headers: { "User-Agent": "cs-showcase-logo-fetch/1.0" } });
      if (!res.ok) throw new Error(res.status);
      buf = Buffer.from(await res.arrayBuffer());
      await writeFile(orig, buf);
    }
    // vector logos are rasterised large; everything is flattened on white and trimmed
    const img = ext === ".svg" ? sharp(buf, { density: 300, limitInputPixels: false }) : sharp(buf);
    const meta = await img.metadata();
    await img
      .flatten({ background: "#ffffff" })
      .trim({ background: "#ffffff", threshold: 12 })
      .resize({ height: 200, width: 640, fit: "inside", withoutEnlargement: ext !== ".svg" })
      .webp({ quality: 92 })
      .toFile(path.join(OUT, name + ".webp"));
    console.log("ok", name, `${meta.width}x${meta.height}`, ext);
  } catch (e) {
    fail++;
    console.error("FAIL", name, e.message);
  }
}
console.log(fail ? `${fail} failed` : "all done");
