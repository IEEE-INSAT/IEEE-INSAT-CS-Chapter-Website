# IEEE INSAT Computer Society — showcase site

Redesign of cs-insat.ieee.tn following the 26/27 graphic charter. Three pages:

- `index.html` — the scrolling home page. DREAMZ, the chapter's 3D bot (its X3D model), follows the
  scroll, re-poses for each chapter and breaks into voxel cubes between chapters.
- `events.html` — the events hub (the Time Portal's events page, without challenges).
- `activities.html` — every session and workshop, by year.

Every page has **Ask Dreamz**, a small chatbot in the corner.

## Run

    npm install
    npm run dev        # http://localhost:5173
    npm run build      # static site in dist/
    npm run preview    # serve the build

## Pages

**Home:** Hero · About · Mission · S.M.A.R.T plan · Vision · Facts (+ photo collage) ·
Events teaser (links to the events page) · Team (26/27 board) · Sponsors · Contact.

**Events:** IEEEXtreme, Data Overflow, BioIT, AINS in the Time Portal layout: a row
of icon tiles, the event's artwork behind the page, kicker / title / tagline / chips,
then the About and detail cards, plus a photo gallery and the older events below.
Pick an event by clicking, hovering or with the arrow keys; links like
`/events.html?event=ains` open one directly.

**Ask Dreamz:** a local FAQ bot (no server, no AI model). It matches questions in
English or French against the topics in `src/chat.js` (events, IEEEXtreme history,
workshops, joining, team, contact, sponsors) and answers from `content.js`. Add a
topic there to teach it something new.

## Where things are

| What | Where |
| --- | --- |
| All text, events, activities, team, sponsors | `src/content.js` |
| Colours, type, layout | `src/style.css` (tokens at the top) |
| 3D scene, scroll poses, dithered background, voxel burst | `src/scene.js` (`POSES` table at the top) |
| Home page | `src/main.js` |
| Events page / its artwork / its styles | `src/events.js`, `src/event-art.js`, `src/events.css` |
| Activities page | `src/activities.js` |
| Nav, footer, shared helpers | `src/chrome.js` |
| Ask Dreamz chatbot | `src/chat.js` |
| Pixel icons on the event tiles | `src/glyphs.js` |
| Charter fonts (PP Mondwest, PP NeueBit) | `src/fonts/` |
| Photos (WebP) | `public/img/` |
| 3D model (X3D from Blender), its loader and colours | `public/models/dreamz.x3d`, `src/x3d-loader.js`, `src/dreamz-colors.js` |

## Photos

- `npm run images:local -- "C:/path/to/CS WEBSITE"` builds the board portraits, the
  event gallery photos and the facts collage from the folder the chapter provided
  (handles the raw `.CR2` portraits by extracting their full-size preview).
- `npm run images:remote` pulls the older photos (activities, archive events,
  sponsors) from the current live site.
- `node scripts/fetch-logos.mjs` downloads official partner logos (Wikimedia Commons or
  the company's own site), keeps the untouched originals in `assets/logos/` and writes
  trimmed web versions to `public/img/sponsors/`. Logos it doesn't list are still crops
  of the partners image the chapter shared.

All three skip files that already exist: delete a file to regenerate it.

## Charter mapping

- Palette: `#190D1B` ink, `#DAFF77` lime, `#6865F2` violet, `#86B1EA` sky, `#FF8849` orange, `#F1FFC8` cream.
  Each flagship event additionally keeps its own two brand colours (in `content.js`).
- Type: Zalando Sans / Zalando Sans Expanded, PP Mondwest (display), PP NeueBit (labels).
  The PP fonts are Pangram Pangram fonts: check the chapter's licence covers web use
  before publishing.
- Motifs: Bayer dithering (background shader, event photos), grids, bounding boxes
  with corner handles, pixel disintegration (section edges, the mascot's voxel burst),
  difference blending.

## The 3D model

DREAMZ is the chapter's X3D model, loaded as-is: `public/models/dreamz.x3d` is the
file exported from Blender, and `src/x3d-loader.js` builds it in three.js with the
same parts, transforms, material values (grey diffuse, specular, shininess) and
faceted shading, plus the file's own point light. Blender's X3D export leaves every
material grey, so `src/dreamz-colors.js` paints each part (by its object name in the
file) in the mascot sheet's colours: blue head and ears, violet screen, lime face,
blue shield with a lime inside, cream ear insides, orange bolt and rings. To update the mascot, replace
`dreamz.x3d` with a new export; keep the object names or update that colour table.

## Notes

- The contact form opens the visitor's email app with the message filled in. It has
  no backend; wire it to a mail service if you want in-page sending.
- Motion respects `prefers-reduced-motion` (no voxel burst, no parallax); without
  WebGL a static gradient is shown.
- In development, `window.__stage.snap()` jumps the 3D animation to its resting state.
