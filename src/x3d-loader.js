// Minimal X3D (XML) loader for three.js, covering what Blender's X3D exporter
// writes: Transform (translation / rotation / scale), Group, Shape, Appearance,
// Material (with DEF/USE), IndexedFaceSet + Coordinate + TextureCoordinate, and
// PointLight. The model is reproduced as authored: same geometry, same transforms,
// same material values, faceted like X3D's default creaseAngle of 0.
import * as THREE from "three";

const nums = (s) => (s || "").trim().split(/[\s,]+/).filter(Boolean).map(Number);
const vec3 = (s, d) => { const v = nums(s); return v.length >= 3 ? new THREE.Vector3(v[0], v[1], v[2]) : d.clone(); };
const rgb = (s, d) => { const v = nums(s); return v.length >= 3 ? new THREE.Color().setRGB(v[0], v[1], v[2], THREE.SRGBColorSpace) : d.clone(); };

function material(el, defs) {
  const use = el.getAttribute("USE");
  if (use && defs.has(use)) return defs.get(use);
  const transparency = parseFloat(el.getAttribute("transparency") || "0");
  const m = new THREE.MeshPhongMaterial({
    color: rgb(el.getAttribute("diffuseColor"), new THREE.Color(0.8, 0.8, 0.8)),
    specular: rgb(el.getAttribute("specularColor"), new THREE.Color(0, 0, 0)),
    emissive: rgb(el.getAttribute("emissiveColor"), new THREE.Color(0, 0, 0)),
    shininess: parseFloat(el.getAttribute("shininess") || "0.2") * 128,  // X3D 0..1 -> Phong exponent
    transparent: transparency > 0,
    opacity: 1 - transparency,
    side: THREE.DoubleSide,
    flatShading: true,
  });
  m.name = el.getAttribute("DEF") || "";
  if (m.name) defs.set(m.name, m);
  return m;
}

function faceSet(el) {
  const pts = nums(el.querySelector("Coordinate")?.getAttribute("point"));
  const tc = nums(el.querySelector("TextureCoordinate")?.getAttribute("point"));
  const ci = nums(el.getAttribute("coordIndex"));
  const ti = nums(el.getAttribute("texCoordIndex"));
  const pos = [], uv = [];
  let face = [], tface = [];
  const flush = () => {
    for (let k = 1; k + 1 < face.length; k++) {            // fan-triangulate each polygon
      for (const j of [0, k, k + 1]) {
        const a = face[j] * 3;
        pos.push(pts[a], pts[a + 1], pts[a + 2]);
        if (tc.length) { const t = (tface.length ? tface[j] : face[j]) * 2; uv.push(tc[t], tc[t + 1]); }
      }
    }
    face = []; tface = [];
  };
  for (let i = 0; i < ci.length; i++) {
    if (ci[i] < 0) { flush(); continue; }
    face.push(ci[i]);
    if (ti.length) tface.push(ti[i]);
  }
  flush();
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  if (uv.length) g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.computeVertexNormals();   // non-indexed: one normal per face (faceted)
  return g;
}

function build(el, parent, defs) {
  for (const c of el.children) {
    switch (c.tagName) {
      case "Transform": {
        const g = new THREE.Group();
        g.name = c.getAttribute("DEF") || "";
        g.position.copy(vec3(c.getAttribute("translation"), new THREE.Vector3()));
        g.scale.copy(vec3(c.getAttribute("scale"), new THREE.Vector3(1, 1, 1)));
        const r = nums(c.getAttribute("rotation"));
        if (r.length === 4 && r[3]) g.quaternion.setFromAxisAngle(new THREE.Vector3(r[0], r[1], r[2]).normalize(), r[3]);
        parent.add(g);
        build(c, g, defs);
        break;
      }
      case "Group":
        build(c, parent, defs);
        break;
      case "Shape": {
        const ifs = c.querySelector("IndexedFaceSet");
        if (!ifs) break;
        const matEl = c.querySelector("Appearance > Material");
        const mesh = new THREE.Mesh(faceSet(ifs), matEl ? material(matEl, defs) : new THREE.MeshPhongMaterial({ color: 0xcccccc, side: THREE.DoubleSide, flatShading: true }));
        mesh.name = parent.name.replace(/_ifs_TRANSFORM$|_TRANSFORM$/, "");
        parent.add(mesh);
        break;
      }
      case "PointLight": {
        const v = nums(c.getAttribute("color"));
        const light = new THREE.PointLight(new THREE.Color(v[0] ?? 1, v[1] ?? 1, v[2] ?? 1), parseFloat(c.getAttribute("intensity") || "1"), parseFloat(c.getAttribute("radius") || "0"), 0);
        light.position.copy(vec3(c.getAttribute("location"), new THREE.Vector3()));
        light.name = "x3d-light";
        parent.add(light);
        break;
      }
      default: break; // Viewpoint, Background, NavigationInfo: the page supplies its own
    }
  }
}

export async function loadX3D(url) {
  const text = await (await fetch(url)).text();
  const doc = new DOMParser().parseFromString(text, "application/xml");
  const scene = doc.querySelector("Scene");
  if (!scene) throw new Error("not an X3D file: " + url);
  const root = new THREE.Group();
  root.name = "x3d";
  build(scene, root, new Map());
  return root;
}
