// Mascot colours for the X3D model (Blender's X3D export leaves every material
// grey). Colours follow the DREAMZ sheet in the 26/27 charter. Parts are found by
// the object names in the file; the screen is the flat front panel of the head.
import * as THREE from "three";

export const DREAMZ_COLORS = {
  Cube: "#86B1EA",       // head
  screen: "#6865F2",     // screen panel inside the bezel
  Cube_003: "#DAFF77",   // face: arched eyes and smile
  Cube_001: "#86B1EA",   // ears
  Cube_004: "#F1FFC8",   // ear insides
  Cube_002: "#86B1EA",   // shield emblem on top of the head (outside)
  shieldInner: "#DAFF77",// recessed inside of the shield
  Plane: "#FF8849",      // lightning bolt
  Torus_002: "#FF8849",  // rings
  Cylinder: "#6F9BDB",   // stand
};
const GLOW = { Cube_003: 0.5, shieldInner: 0.5 }; // the face glows a little, like a lit screen

function recolor(base, hex, name) {
  const m = base.clone();
  m.name = name;
  m.color.set(hex);
  if (GLOW[name]) { m.emissive.set(hex); m.emissiveIntensity = GLOW[name]; }
  return m;
}

/** Splits a mesh into two material groups: triangles matching `pick` first. */
function splitBy(mesh, root, pick) {
  const g = mesh.geometry, pos = g.getAttribute("position"), nrm = g.getAttribute("normal"), uv = g.getAttribute("uv");
  const toRoot = new THREE.Matrix4().copy(root.matrixWorld).invert().multiply(mesh.matrixWorld);
  const nMat = new THREE.Matrix3().getNormalMatrix(toRoot);
  const c = new THREE.Vector3(), n = new THREE.Vector3(), v = new THREE.Vector3();
  const screen = [], rest = [];
  for (let t = 0; t < pos.count / 3; t++) {
    c.set(0, 0, 0);
    for (let j = 0; j < 3; j++) c.add(v.fromBufferAttribute(pos, t * 3 + j).applyMatrix4(toRoot));
    c.divideScalar(3);
    n.fromBufferAttribute(nrm, t * 3).applyMatrix3(nMat).normalize();
    (pick(c, n, t) ? screen : rest).push(t);
  }
  const order = [...screen, ...rest];
  const remap = (attr) => {
    if (!attr) return null;
    const s = attr.itemSize, out = new Float32Array(attr.array.length);
    order.forEach((t, i) => out.set(attr.array.subarray(t * 3 * s, t * 3 * s + 3 * s), i * 3 * s));
    return new THREE.BufferAttribute(out, s);
  };
  const ng = new THREE.BufferGeometry();
  ng.setAttribute("position", remap(pos));
  ng.setAttribute("normal", remap(nrm));
  if (uv) ng.setAttribute("uv", remap(uv));
  ng.addGroup(0, screen.length * 3, 0);
  ng.addGroup(screen.length * 3, rest.length * 3, 1);
  mesh.geometry = ng;
  g.dispose();
}

/**
 * Triangles of one smooth surface region: starts from the triangle matching
 * `seed` and spreads across shared edges while neighbouring faces stay within
 * ~45° of each other, so it stops at the sharp walls around a recess.
 */
function region(mesh, root, seed) {
  const pos = mesh.geometry.getAttribute("position");
  const toRoot = new THREE.Matrix4().copy(root.matrixWorld).invert().multiply(mesh.matrixWorld);
  const nMat = new THREE.Matrix3().getNormalMatrix(toRoot);
  const T = pos.count / 3, v = new THREE.Vector3();
  const normals = [], centers = [], edges = new Map();
  const key = (i) => { v.fromBufferAttribute(pos, i); return `${v.x.toFixed(4)},${v.y.toFixed(4)},${v.z.toFixed(4)}`; };
  for (let t = 0; t < T; t++) {
    const a = new THREE.Vector3().fromBufferAttribute(pos, t * 3).applyMatrix4(toRoot);
    const b = new THREE.Vector3().fromBufferAttribute(pos, t * 3 + 1).applyMatrix4(toRoot);
    const c = new THREE.Vector3().fromBufferAttribute(pos, t * 3 + 2).applyMatrix4(toRoot);
    normals.push(new THREE.Vector3().subVectors(c, b).cross(new THREE.Vector3().subVectors(a, b)).normalize());
    centers.push(a.add(b).add(c).divideScalar(3));
    const k = [key(t * 3), key(t * 3 + 1), key(t * 3 + 2)];
    for (let e = 0; e < 3; e++) {
      const ek = [k[e], k[(e + 1) % 3]].sort().join("|");
      if (!edges.has(ek)) edges.set(ek, []);
      edges.get(ek).push(t);
    }
  }
  const tri = new Map();
  for (const list of edges.values()) for (const t of list) { if (!tri.has(t)) tri.set(t, []); tri.get(t).push(...list.filter((u) => u !== t)); }
  // make normals face the viewer (the file's faces are double-sided, winding varies)
  normals.forEach((n) => { if (n.z < 0) n.negate(); });
  let start = -1, best = Infinity;
  for (let t = 0; t < T; t++) if (seed(centers[t], normals[t])) { const d = Math.abs(centers[t].x); if (d < best) { best = d; start = t; } }
  const out = new Set();
  if (start < 0) return out;
  const stack = [start];
  out.add(start);
  while (stack.length) {
    const t = stack.pop();
    for (const u of tri.get(t) || []) if (!out.has(u) && normals[u].dot(normals[t]) > 0.7) { out.add(u); stack.push(u); }
  }
  return out;
}

/** Gives each part of the loaded X3D its mascot colour. */
export function colorDreamz(root) {
  root.updateMatrixWorld(true);
  root.traverse((o) => {
    if (!o.isMesh) return;
    const hex = DREAMZ_COLORS[o.name];
    if (!hex) return;
    const base = o.material;
    if (o.name === "Cube") {
      // the screen: flat front panel inside the bezel
      splitBy(o, root, (c, n) => n.z > 0.9 && Math.abs(c.x) < 0.72 && Math.abs(c.y) < 0.72);
      o.material = [recolor(base, DREAMZ_COLORS.screen, "screen"), recolor(base, hex, "Cube")];
    } else if (o.name === "Cube_002") {
      // the shield's recessed inside panel
      const inner = region(o, root, (c, n) => n.z > 0.95 && c.z < 1.385 && c.y > 0.86 && c.y < 1.0);
      splitBy(o, root, (c, n, t) => inner.has(t));
      o.material = [recolor(base, DREAMZ_COLORS.shieldInner, "shieldInner"), recolor(base, hex, "Cube_002")];
    } else {
      o.material = recolor(base, hex, o.name);
    }
  });
}
