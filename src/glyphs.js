// Pixel icons for the event tiles (ported from the Time Portal events hub).
// '#' = accent, '+' = accent2, 'w' = cream. All rows of an icon share a length.
const ICONS = {
  // IEEEXtreme: a 24-hour clock dial
  ieeextreme: [
    "...####...",
    ".##.w..++.",
    ".#..w...+.",
    "#...w....#",
    "#...ww...#",
    "#.....w..#",
    "#........#",
    ".#......#.",
    ".##....##.",
    "...####...",
  ],
  // Data Overflow: a drop of data
  dataoverflow: [
    "....#.....",
    "....#.....",
    "...###....",
    "...###....",
    "..##w##...",
    ".##w####..",
    ".#w#####..",
    ".#######..",
    "..+###+...",
    "...+++....",
  ],
  // BioIT: a DNA ladder
  bioit: [
    ".##wwww++.",
    "..##..++..",
    "...####...",
    "....++....",
    "...####...",
    "..++..##..",
    ".++wwww##.",
    "..++..##..",
    "...####...",
    "....##....",
  ],
  // AINS: a head in profile with the looping "brain" strokes
  ains: [
    ".....#........",
    ".....#.####...",
    "....##w....##.",
    "...#.#.www..#.",
    "..#..#w...w..#",
    "..#..#w...w..#",
    ".#...#.www.w.#",
    ".#...#..w.w..#",
    "#....#..ww...#",
    "#....#.w..w.#.",
    ".#...#w....w#.",
    ".#....#.wwww#.",
    ".#....#..w..#.",
    ".#....#..w..#.",
    ".######..w..#.",
    "......#..w..#.",
    ".......#.w....",
    "........#.....",
    ".........#....",
  ],
};

export function glyphSvg(slug, theme) {
  const rows = ICONS[slug];
  if (!rows) return "";
  const color = { "#": theme.accent, "+": theme.accent2, w: "#F1FFC8" };
  const w = rows[0].length, h = rows.length;
  let rects = "";
  rows.forEach((row, y) => [...row].forEach((ch, x) => {
    if (color[ch]) rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${color[ch]}"/>`;
  }));
  const tall = h > w ? " tall" : "";
  return `<svg class="glyph${tall}" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges" aria-hidden="true">${rects}</svg>`;
}
