// The fixed WebGL stage:
//  - a Bayer-dithered mesh-gradient background (charter: dithering);
//  - DREAMZ, loaded as-is from the chapter's X3D model (public/models/dreamz.x3d),
//    posed by scroll position. Between
//    poses it breaks into voxel cubes and reassembles (charter: pixel disintegration).
import * as THREE from "three";
import { loadX3D } from "./x3d-loader.js";
import { colorDreamz } from "./dreamz-colors.js";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";

THREE.ColorManagement.enabled = true;
const TAU = Math.PI * 2;

// x / y: -1..1 across the viewport. s: mascot height as a fraction of viewport height.
// ry / rx: rotation (radians). dim: 1 = full colour, 0 = ghosted into the background.
// spin: extra turns added while scrolling through a long section.
const POSES = {
  desktop: {
    hero:     { x: 0.5,   y: -0.02, s: 0.66, ry: -0.45,          rx: 0.06,  dim: 1 },
    about:    { x: -0.52, y: 0.0,   s: 0.56, ry: 0.6,            rx: 0.0,   dim: 1 },
    mission:  { x: 0.52,  y: 0.0,   s: 0.5,  ry: TAU - 0.65,     rx: 0.12,  dim: 1 },
    plan:     { x: -0.55, y: 0.0,   s: 0.5,  ry: TAU + 0.7,      rx: -0.1,  dim: 1 },
    vision:   { x: 0.52,  y: 0.0,   s: 0.58, ry: 2 * TAU - 0.4,  rx: 0.0,   dim: 1 },
    facts:    { x: 0,     y: 0,     s: 0.3,  ry: 2.5 * TAU,      rx: 0.0,   dim: 1 },
    events:   { x: -0.55, y: -0.02, s: 0.46, ry: 3 * TAU + 0.45, rx: 0.06,  dim: 1 },
    ghost:    { x: 0.55,  y: -0.1,  s: 1.15, ry: 4 * TAU + 0.5,  rx: 0.0,   dim: 0.26, spin: 0.25 },
    contact:  { x: 0.52,  y: 0.02,  s: 0.6,  ry: 5 * TAU - 0.35, rx: 0.05,  dim: 1 },
    end:      { x: 0.52,  y: 0.5,   s: 0.6,  ry: 5 * TAU,        rx: 0.0,   dim: 0.6 },
  },
  mobile: {
    hero:     { x: 0,     y: 0.44,  s: 0.25, ry: -0.35,          rx: 0.06,  dim: 1 },
    about:    { x: 0.45,  y: 0.55,  s: 0.3,  ry: 0.6,            rx: 0.0,   dim: 0.5 },
    mission:  { x: -0.4,  y: 0.5,   s: 0.34, ry: TAU - 0.65,     rx: 0.12,  dim: 0.45 },
    plan:     { x: 0.45,  y: -0.5,  s: 0.34, ry: TAU + 0.7,      rx: -0.1,  dim: 0.45 },
    vision:   { x: -0.4,  y: 0.5,   s: 0.36, ry: 2 * TAU - 0.4,  rx: 0.0,   dim: 0.45 },
    facts:    { x: 0,     y: 0,     s: 0.25, ry: 2.5 * TAU,      rx: 0.0,   dim: 1 },
    events:   { x: 0.45,  y: 0.5,   s: 0.3,  ry: 3 * TAU + 0.45, rx: 0.06,  dim: 0.45 },
    ghost:    { x: 0.3,   y: -0.1,  s: 0.7,  ry: 4 * TAU + 0.5,  rx: 0.0,   dim: 0.3, spin: 0.25 },
    contact:  { x: 0,     y: 0.3,   s: 0.4,  ry: 5 * TAU - 0.35, rx: 0.05,  dim: 0.3 },
    end:      { x: 0,     y: 0.5,   s: 0.4,  ry: 5 * TAU,        rx: 0.0,   dim: 0.3 },
  },
};

const BG_FRAG = /* glsl */ `
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform float uScroll; uniform float uCell;
float bayer2(vec2 a){ a = floor(a); return fract(a.x / 2. + a.y * a.y * .75); }
float bayer4(vec2 a){ return bayer2(.5 * a) * .25 + bayer2(a); }
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float bloom(vec2 d, float r){ return exp(-dot(d, d) / (r * r)); }
const vec3 INK = vec3(.098, .051, .106);
const vec3 CREAM = vec3(.945, 1., .784);
vec3 ramp(float i){
  if (i < .5) return INK;                         // #190D1B ink
  if (i < 1.5) return vec3(.137, .086, .286);     // deep indigo
  if (i < 2.5) return vec3(.224, .180, .604);     // indigo
  if (i < 3.5) return vec3(.408, .396, .949);     // #6865F2 violet
  if (i < 4.5) return vec3(.525, .694, .918);     // #86B1EA sky
  if (i < 5.5) return vec3(.855, 1., .467);       // #DAFF77 lime
  return CREAM;                                   // #F1FFC8 cream
}
vec3 warmRamp(float i){
  if (i < .5) return INK;
  if (i < 1.5) return vec3(.36, .13, .19);
  if (i < 2.5) return vec3(.70, .31, .19);
  return vec3(1., .533, .286);                    // #FF8849 orange
}
void main(){
  vec2 cell = floor(gl_FragCoord.xy / uCell);
  vec2 uv = (cell * uCell + uCell * .5) / uRes;
  float asp = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * asp, uv.y);
  float t = uTime * .06;
  float s = uScroll;
  float lift = .55 * (1. - cos(s * 6.2831)) * .5;   // lime blooms leave mid-page, return at the end
  float lum = 0.;
  lum += .78 * bloom(p - vec2(asp * (.10 + .05 * sin(t * 1.3)), 1.12 + lift), .36);
  lum += .70 * bloom(p - vec2(asp * (.93 + .04 * cos(t)), 1.16 + lift), .32);
  lum += .25 * bloom(p - vec2(asp * (.5 + .28 * sin(t * .7 + s * 5.)), .5 + .22 * cos(t * .9 + s * 4.)), .62);
  lum += .10 * (sin(p.x * 2.4 + t * 2. + s * 9.) * .5 + .5) * (sin(p.y * 3.1 - t * 1.4 + s * 5.) * .5 + .5);
  lum += .035;
  float warm = bloom(p - vec2(0., -.1 + .1 * sin(s * 6.2831)), .46) + bloom(p - vec2(asp, -.12), .5);
  float th = bayer4(cell) + .03;
  float v = clamp(lum, 0., 1.) * 6.;
  vec3 col = ramp(floor(v) + step(th, fract(v)));
  float w = clamp(warm, 0., 1.) * 3.;
  float th2 = bayer4(cell + vec2(2., 1.)) + .03;
  if (warm * 1.1 > th2 && lum < .34) col = warmRamp(floor(w) + step(th, fract(w)));

  gl_FragColor = vec4(col, 1.);
}`;

const VOX_VERT = /* glsl */ `
attribute vec3 aBase; attribute vec3 aDir; attribute vec3 aColor; attribute float aRand;
uniform float uBurst; uniform float uSize;
varying vec3 vColor; varying vec3 vN;
void main(){
  float b = clamp(uBurst * 1.3 - aRand * .3, 0., 1.);
  float e = b * b * (3. - 2. * b);
  float sc = uSize * (.55 + aRand * .9) * smoothstep(0., .18, uBurst);
  vec3 p = aBase + aDir * e + position * sc;
  vN = normalize(normalMatrix * normal);
  vColor = aColor;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.);
}`;
const VOX_FRAG = /* glsl */ `
uniform float uDim; varying vec3 vColor; varying vec3 vN;
void main(){
  float l = .62 + .38 * max(dot(normalize(vN), normalize(vec3(.35, .6, .7))), 0.);
  gl_FragColor = vec4(vColor * l * uDim, 1.);
}`;

const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smoothstep = (a, b, v) => smooth(clamp01((v - a) / (b - a)));

export function createStage({ canvas, box, boxLabel, reducedMotion }) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.autoClear = false;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.0;

  // Background --------------------------------------------------------
  const U = {
    uRes: { value: new THREE.Vector2(1, 1) }, uTime: { value: 0 }, uScroll: { value: 0 }, uCell: { value: 4 },
  };
  const bgScene = new THREE.Scene();
  const bgCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const bgMat = new THREE.ShaderMaterial({
    uniforms: U,
    vertexShader: "void main(){ gl_Position = vec4(position.xy, 0., 1.); }",
    fragmentShader: BG_FRAG,
    depthTest: false, depthWrite: false, toneMapped: false,
  });
  bgScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMat));

  // Mascot --------------------------------------------------------------
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
  camera.position.z = 6;
  // Neutral white light only, so the model shows its own materials; the X3D
  // file's PointLight is added with the model.
  const ambient = new THREE.AmbientLight(0xffffff, 1.0); scene.add(ambient);
  const key = new THREE.DirectionalLight(0xffffff, 1.7); key.position.set(2.5, 3, 4); scene.add(key);
  let fileLight = null;

  const pivot = new THREE.Group();
  pivot.visible = false;
  scene.add(pivot);
  const materials = [];   // { m, base, em }
  let modelAspect = 0.92;
  const dissolve = { value: 0 };
  let voxMat = null;

  // Ordered-dither discard so the mesh dissolves pixel by pixel while the voxels fly out.
  const addDissolve = (m) => {
    m.onBeforeCompile = (sh) => {
      sh.uniforms.uDissolve = dissolve;
      sh.fragmentShader = sh.fragmentShader.replace("void main() {", `uniform float uDissolve;
float dz2(vec2 a){ a = floor(a); return fract(a.x / 2. + a.y * a.y * .75); }
float dz4(vec2 a){ return dz2(.5 * a) * .25 + dz2(a); }
void main() {
  if (dz4(floor(gl_FragCoord.xy / 3.)) + .001 < uDissolve) discard;`);
    };
    m.needsUpdate = true;
  };

  // Texture pixels for colour lookups (small copy, read once per texture).
  const texCache = new Map();
  function texPixels(map) {
    if (!map?.image) return null;
    if (texCache.has(map)) return texCache.get(map);
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(map.image, 0, 0, 256, 256);
    const px = ctx.getImageData(0, 0, 256, 256).data;
    texCache.set(map, px);
    return px;
  }
  const wrapUV = (v) => { const f = v - Math.floor(v); return Math.floor(v) % 2 ? 1 - f : f; };   // mirrored repeat

  // Voxel cubes sampled over every part's surface, in the part's paint.
  function buildVoxels(model, meshes, hgt) {
    const total = window.innerWidth < 860 ? 900 : 1800;
    model.updateMatrixWorld(true);
    const inv = new THREE.Matrix4().copy(model.matrixWorld).invert();
    const areaOf = (g) => {
      const pos = g.getAttribute("position"), idx = g.index, t = new THREE.Triangle();
      let A = 0;
      const tri = idx ? idx.count / 3 : pos.count / 3;
      for (let i = 0; i < tri; i++) {
        const [i0, i1, i2] = idx ? [idx.getX(3 * i), idx.getX(3 * i + 1), idx.getX(3 * i + 2)] : [3 * i, 3 * i + 1, 3 * i + 2];
        t.setFromAttributeAndIndices(pos, i0, i1, i2);
        A += t.getArea();
      }
      return A;
    };
    const parts = meshes.map((mesh) => {
      const rel = new THREE.Matrix4().multiplyMatrices(inv, mesh.matrixWorld);
      const scale = new THREE.Vector3().setFromMatrixScale(rel);
      return { mesh, rel, nm: new THREE.Matrix3().getNormalMatrix(rel), area: areaOf(mesh.geometry) * scale.x * scale.y,
        col: new THREE.Color().copy([].concat(mesh.material).at(-1).color).convertLinearToSRGB(), px: texPixels([].concat(mesh.material).at(-1).map) };
    });
    const sum = parts.reduce((a, p) => a + p.area, 0);
    const base = [], dir = [], col = [], rnd = [];
    const p = new THREE.Vector3(), nrm = new THREE.Vector3(), d = new THREE.Vector3(), uv = new THREE.Vector2();
    for (const part of parts) {
      const n = Math.max(6, Math.round((part.area / sum) * total));
      const sampler = new MeshSurfaceSampler(part.mesh).build();
      for (let i = 0; i < n; i++) {
        sampler.sample(p, nrm, undefined, uv);
        p.applyMatrix4(part.rel);
        nrm.applyMatrix3(part.nm).normalize();
        base.push(p.x, p.y, p.z);
        d.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize().multiplyScalar(0.75).addScaledVector(nrm, 0.55).normalize()
          .multiplyScalar(hgt * (0.1 + Math.random() * 0.4));
        dir.push(d.x, d.y, d.z);
        if (part.px) {
          const x = Math.min(255, Math.floor(wrapUV(uv.x) * 256)), y = Math.min(255, Math.floor(wrapUV(uv.y) * 256)), k = (y * 256 + x) * 4;
          col.push(part.px[k] / 255, part.px[k + 1] / 255, part.px[k + 2] / 255);
        } else col.push(part.col.r, part.col.g, part.col.b);
        rnd.push(Math.random());
      }
    }
    const cube = new THREE.BoxGeometry(1, 1, 1);
    const ig = new THREE.InstancedBufferGeometry();
    ig.index = cube.index;
    ig.setAttribute("position", cube.getAttribute("position"));
    ig.setAttribute("normal", cube.getAttribute("normal"));
    ig.setAttribute("aBase", new THREE.InstancedBufferAttribute(new Float32Array(base), 3));
    ig.setAttribute("aDir", new THREE.InstancedBufferAttribute(new Float32Array(dir), 3));
    ig.setAttribute("aColor", new THREE.InstancedBufferAttribute(new Float32Array(col), 3));
    ig.setAttribute("aRand", new THREE.InstancedBufferAttribute(new Float32Array(rnd), 1));
    ig.instanceCount = rnd.length;
    voxMat = new THREE.ShaderMaterial({
      uniforms: { uBurst: { value: 0 }, uSize: { value: hgt * 0.02 }, uDim: { value: 1 } },
      vertexShader: VOX_VERT, fragmentShader: VOX_FRAG, toneMapped: false,
    });
    const vox = new THREE.Mesh(ig, voxMat);
    vox.frustumCulled = false;
    model.add(vox);
  }

  loadX3D("/models/dreamz.x3d").then((x3d) => {
    // X3D from Blender faces -Z; turn it to face the page (+Z).
    const model = new THREE.Group();
    x3d.rotation.y = Math.PI;
    model.add(x3d);
    model.updateMatrixWorld(true);
    colorDreamz(model);
    const meshes = [];
    x3d.traverse((o) => { if (o.isMesh) meshes.push(o); if (o.isPointLight) fileLight = o; });
    const bb = new THREE.Box3();
    meshes.forEach((m) => bb.expandByObject(m));
    const size = bb.getSize(new THREE.Vector3());
    const center = bb.getCenter(new THREE.Vector3());
    model.position.sub(center);
    const wrap = new THREE.Group();
    wrap.add(model);
    wrap.scale.setScalar(1 / size.y);        // normalise: mascot is 1 unit tall
    modelAspect = size.x / size.y;
    const seen = new Set();
    meshes.forEach((o) => {
      for (const mt of [].concat(o.material)) {
        if (seen.has(mt)) continue;
        seen.add(mt);
        materials.push({ m: mt, base: mt.color.clone(), em: mt.emissive ? mt.emissive.clone() : null });
        if (!reducedMotion) addDissolve(mt);
      }
    });
    if (!reducedMotion) {
      try { buildVoxels(model, meshes, size.y); } catch (e) { console.warn("voxel burst unavailable", e); }
    }
    pivot.add(wrap);
    pivot.visible = true;
    canvas.classList.add("has-logo");
    needsRender = true;
  }).catch((err) => console.warn("3D mascot failed to load", err));

  // Scroll-driven pose --------------------------------------------------
  let stops = [];
  let mobile = false;
  let W = 1, H = 1;
  const cur = { x: 0.5, y: 0, s: 0.01, ry: -2.2, rx: 0, dim: 1, burst: reducedMotion ? 0 : 1 };
  const target = { ...cur, burst: 0 };
  let activeName = "hero";
  const pointer = { x: 0, y: 0 };
  let needsRender = true;

  function measure() {
    mobile = window.innerWidth < 860;
    const set = POSES[mobile ? "mobile" : "desktop"];
    const vh = window.innerHeight;
    const els = [...document.querySelectorAll("[data-pose]")].filter((el) => el.getBoundingClientRect().height > 0);
    // a section whose children carry their own poses defers to them
    const own = els.filter((el) => !els.some((o) => o !== el && el.contains(o)));
    stops = own.map((el) => {
      const r = el.getBoundingClientRect();
      const top = r.top + window.scrollY, bottom = top + r.height;
      const mid = (top + bottom) / 2;
      const a = Math.min(mid, top + vh * 0.4), b = Math.max(mid, bottom - vh * 0.4);
      const name = el.dataset.pose;
      return { name, pose: set[name], a, b };
    }).filter((s) => s.pose);
  }

  function computeTarget() {
    if (!stops.length) return;
    const c = window.scrollY + window.innerHeight / 2;
    let i = 0;
    while (i < stops.length - 1 && c > stops[i].b) i++;
    const s = stops[i];
    let from = s.pose, to = s.pose, t = 0, name = s.name, burst = 0;
    let spinFrom = (s.pose.spin || 0) * TAU, spinTo = spinFrom;
    if (c < s.a && i > 0) {
      const p = stops[i - 1];
      from = p.pose; to = s.pose;
      const raw = clamp01((c - p.b) / Math.max(1, s.a - p.b));
      t = smooth(raw);
      burst = Math.sin(Math.PI * raw) * 0.85 * Math.min(1, Math.max(from.dim, to.dim));
      spinFrom = (p.pose.spin || 0) * TAU; spinTo = 0;
      name = t > 0.5 ? s.name : p.name;
    } else {
      const k = clamp01((c - s.a) / Math.max(1, s.b - s.a));
      spinFrom = spinTo = k * (s.pose.spin || 0) * TAU;
    }
    for (const kx of ["x", "y", "s", "rx", "dim"]) target[kx] = lerp(from[kx], to[kx], t);
    target.ry = lerp(from.ry + spinFrom, to.ry + spinTo, t);
    target.burst = reducedMotion ? 0 : burst;
    activeName = name;
  }

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    W = w; H = h;
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    U.uRes.value.set(w * dpr, h * dpr);
    U.uCell.value = Math.round((w < 700 ? 3 : 4) * dpr);
    measure(); computeTarget();
    needsRender = true;
  }

  const onScroll = () => { computeTarget(); needsRender = true; };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", resize);
  new ResizeObserver(() => { measure(); computeTarget(); needsRender = true; }).observe(document.body);
  if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("pointermove", (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });
  }

  let last = performance.now();
  let time = 0, running = true, first = true;

  function frame() {
    if (!running) return;
    requestAnimationFrame(frame);
    const now = performance.now();
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (reducedMotion) {
      if (!needsRender) return;
      Object.assign(cur, target);
    } else {
      time += dt;
      const k = first ? 1 - Math.exp(-dt * 2.2) : 1 - Math.exp(-dt * 5.5);
      for (const kx in cur) cur[kx] = lerp(cur[kx], target[kx], kx === "burst" && !first ? 1 - Math.exp(-dt * 9) : k);
      if (first && Math.abs(cur.s - target.s) < 0.01 && cur.burst < 0.02) first = false;
    }
    needsRender = false;

    const max = document.documentElement.scrollHeight - window.innerHeight;
    U.uTime.value = time;
    U.uScroll.value = max > 0 ? window.scrollY / max : 0;

    // pose -> world
    const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    const halfW = halfH * camera.aspect;
    let h = cur.s * 2 * halfH;
    const maxW = 2 * halfW * (mobile ? 0.9 : 0.6) * (cur.dim < 0.3 ? 2 : 1);
    if (h * modelAspect > maxW) h = maxW / modelAspect;
    const sway = reducedMotion ? 0 : Math.sin(time * 0.6) * 0.14;
    const bob = reducedMotion ? 0 : Math.sin(time * 0.9) * 0.012;
    pivot.position.set(cur.x * halfW, (cur.y + bob) * halfH, 0);
    pivot.scale.setScalar(h);
    pivot.rotation.set(cur.rx + pointer.y * 0.12, cur.ry + sway + pointer.x * 0.22, 0);
    const lin = Math.max(0.02, Math.pow(cur.dim, 2.2));   // dim is perceptual, colour is linear
    for (const { m, base, em } of materials) {
      m.color.copy(base).multiplyScalar(lin);
      if (em) m.emissive.copy(em).multiplyScalar(lin);
    }
    key.intensity = 1.7 * cur.dim; ambient.intensity = 1.0 * cur.dim; if (fileLight) fileLight.intensity = 1.2 * cur.dim;
    const b = cur.burst < 0.004 ? 0 : cur.burst;
    dissolve.value = smoothstep(0.04, 0.78, b);
    if (voxMat) { voxMat.uniforms.uBurst.value = b; voxMat.uniforms.uDim.value = cur.dim; }

    renderer.clear();
    renderer.render(bgScene, bgCam);
    renderer.clearDepth();
    renderer.render(scene, camera);

    // bounding box that tracks the mascot (charter: bounding boxes)
    if (box) {
      const pxh = (h / (2 * halfH)) * H;
      const bw = pxh * modelAspect + 28, bh = pxh + 28;
      const cx = (cur.x * 0.5 + 0.5) * W, cy = (0.5 - (cur.y + bob) * 0.5) * H;
      box.style.transform = `translate3d(${(cx - bw / 2).toFixed(1)}px, ${(cy - bh / 2).toFixed(1)}px, 0)`;
      box.style.width = bw.toFixed(1) + "px";
      box.style.height = bh.toFixed(1) + "px";
      box.style.opacity = pivot.visible ? clamp01((cur.dim - 0.35) * 2.5 - b * 1.4).toFixed(2) : 0;
      const deg = ((((cur.ry + sway) * 180) / Math.PI) % 360 + 360) % 360;
      boxLabel.textContent = `${activeName} · ry ${String(Math.round(deg)).padStart(3, "0")}°`;
    }
  }

  document.addEventListener("visibilitychange", () => {
    const was = running;
    running = !document.hidden;
    if (running && !was) { last = performance.now(); frame(); }
  });

  resize();
  frame();
  const api = { refresh: () => { measure(); computeTarget(); needsRender = true; } };
  // Dev only: jump the animation to its resting state (used for screenshots).
  if (import.meta.env.DEV) api.snap = (burst) => { computeTarget(); Object.assign(cur, target); if (burst !== undefined) cur.burst = target.burst = burst; first = false; needsRender = true; return { cur: { ...cur }, mobile, stops: stops.map((x) => [x.name, Math.round(x.a), Math.round(x.b)]) }; };
  return api;
}
