import { toMm } from './unitConversion';

export const DEG = Math.PI / 180;

export const DEFAULT_OPTIONS = { divX: 1, divZ: 1, lidDepthPct: 30, frontHeightPct: 40 };

export const DEFAULT_DESIGN = {
  style: 'RSC',
  dimensions: { length: 300, width: 200, height: 150 },
  unit: 'mm',
  boardType: 'single-wall',
  fluteType: 'B',
  boardThickness: 3,
  isOpen: false,
  showDimensions: true,
  options: DEFAULT_OPTIONS,
  appearance: { preset: 'kraft', color: '#b98b5a', showPrint: false, printText: 'GRACE PACKAGING' },
};

export const BOX_STYLES = [
  { id: 'RSC', name: 'Regular Slotted Container', short: 'RSC', thumb: 'flaps', description: 'Four top and four bottom flaps; outer flaps meet in the middle.', options: [] },
  { id: 'HSC', name: 'Half-Slotted Container', short: 'HSC', thumb: 'open', description: 'Flaps on the bottom only; open top for easy loading.', options: [] },
  { id: 'FOL', name: 'Full Overlap Container', short: 'FOL', thumb: 'fol', description: 'Outer flaps overlap fully for extra strength and stacking.', options: [] },
  { id: 'FTB', name: 'Full Telescope Box', short: 'FTB', thumb: 'tele', description: 'Separate lid slides fully over the base.', options: [] },
  { id: 'HTB', name: 'Half Telescope Box', short: 'HTB', thumb: 'tele-half', description: 'Shallow lid covers only the top part of the base.',
    options: [{ key: 'lidDepthPct', label: 'Lid depth (% of height)', min: 15, max: 60, step: 5 }] },
  { id: 'MAILER', name: 'Die-Cut Mailer Box', short: 'Mailer', thumb: 'lid', description: 'One piece with a hinged lid and an inner tuck flap.', options: [] },
  { id: 'OPF', name: 'One-Piece Folder', short: 'OPF', thumb: 'lid', description: 'Self-folding box with an attached lid and short front lip.', options: [] },
  { id: 'FPF', name: 'Five-Panel Folder', short: 'FPF', thumb: 'lid-wrap', description: 'Lid wraps down over the front panel.', options: [] },
  { id: 'TRAY', name: 'Corrugated Tray', short: 'Tray', thumb: 'tray', description: 'Open tray with folded, glued corner tabs.', options: [] },
  { id: 'DISPLAY', name: 'Display Box', short: 'Display', thumb: 'display', description: 'Tray with a sloped front for retail shelves.',
    options: [{ key: 'frontHeightPct', label: 'Front height (% of height)', min: 15, max: 70, step: 5 }] },
  { id: 'PARTITION', name: 'Partition / Divider Box', short: 'Divider', thumb: 'partition', description: 'RSC with interlocking dividers inside.',
    options: [
      { key: 'divX', label: 'Dividers across length', min: 0, max: 8, step: 1 },
      { key: 'divZ', label: 'Dividers across width', min: 0, max: 8, step: 1 },
    ] },
];

export const getStyle = (id) => BOX_STYLES.find((s) => s.id === id) ?? BOX_STYLES[0];

export function getDims(design) {
  const { dimensions, unit, boardThickness } = design;
  return {
    L: toMm(dimensions.length, unit),
    W: toMm(dimensions.width, unit),
    H: toMm(dimensions.height, unit),
    t: boardThickness,
  };
}

// Merge a saved/untrusted design with defaults so the app never crashes on bad data.
export function mergeDesign(saved) {
  const d = DEFAULT_DESIGN;
  const num = (v, f) => (Number.isFinite(v) && v > 0 ? v : f);
  const s = saved && typeof saved === 'object' ? saved : {};
  const dim = s.dimensions ?? {};
  return {
    ...d,
    ...s,
    style: BOX_STYLES.some((x) => x.id === s.style) ? s.style : d.style,
    unit: ['mm', 'cm', 'in'].includes(s.unit) ? s.unit : d.unit,
    dimensions: {
      length: num(dim.length, d.dimensions.length),
      width: num(dim.width, d.dimensions.width),
      height: num(dim.height, d.dimensions.height),
    },
    boardThickness: num(s.boardThickness, d.boardThickness),
    options: { ...d.options, ...(s.options ?? {}) },
    appearance: { ...d.appearance, ...(s.appearance ?? {}) },
  };
}

const box = (id, size, position) => ({ id, kind: 'box', size, position });

const floorPanel = ({ L, W, t }) => box('floor', [L + 2 * t, t, W + 2 * t], [0, -t / 2, 0]);

function wallPanels({ L, W, t }, h) {
  const { front, back, left, right } = h;
  return [
    box('wall-front', [L + 2 * t, front, t], [0, front / 2, W / 2 + t / 2]),
    box('wall-back', [L + 2 * t, back, t], [0, back / 2, -(W / 2 + t / 2)]),
    box('wall-left', [t, left, W], [-(L / 2 + t / 2), left / 2, 0]),
    box('wall-right', [t, right, W], [L / 2 + t / 2, right / 2, 0]),
  ];
}

const pivotFor = (side, y, { L, W, t }) => ({
  front: [0, y, W / 2 + t / 2],
  back: [0, y, -(W / 2 + t / 2)],
  left: [-(L / 2 + t / 2), y, 0],
  right: [L / 2 + t / 2, y, 0],
}[side]);

// Slotted containers: flaps hinged on wall edges. Top flaps animate; bottom flaps stay closed.
function slottedModel(d, o, opts = {}) {
  const { L, W, H, t } = d;
  const gap = Math.min(6, W / 10);
  const half = (W + t) / 2 - gap / 2;
  const majorDepth = o.full ? W + t - gap : half;
  const flaps = [];
  [o.top && 'top', o.bottom && 'bottom'].filter(Boolean).forEach((edge) => {
    const y = edge === 'top' ? H : 0;
    const add = (side, length, depth, layer, open) =>
      flaps.push({ id: `${edge}-${side}`, side, edge, length, depth, layer, open, animated: edge === 'top', pivot: pivotFor(side, y, d) });
    add('left', W - 1, half, 0, 100 * DEG);
    add('right', W - 1, half, 0, 100 * DEG);
    add('front', L + 2 * t, majorDepth, 1, 118 * DEG);
    add('back', L + 2 * t, majorDepth, o.full ? 2 : 1, 125 * DEG);
  });
  const statics = wallPanels(d, { front: H, back: H, left: H, right: H });
  (opts.dividers ?? []).forEach((p) => statics.push(p));
  return {
    statics, flaps, lift: null, hinge: null, extraBounds: [],
    decal: { target: 'root', position: [0, H / 2, W / 2 + t + 0.3], size: [Math.min(L * 0.8, 400), H * 0.6] },
    canOpen: !!o.top, openLabel: 'Flaps',
  };
}

function partitionModel(d, o) {
  const { L, W, H, t } = d;
  const hd = H - 2;
  const dividers = [];
  const nx = Math.round(o.divX), nz = Math.round(o.divZ);
  for (let i = 1; i <= nx; i++) dividers.push(box(`div-x-${i}`, [t, hd, W], [-L / 2 + (L * i) / (nx + 1), hd / 2, 0]));
  for (let j = 1; j <= nz; j++) dividers.push(box(`div-z-${j}`, [L, hd, t], [0, hd / 2, -W / 2 + (W * j) / (nz + 1)]));
  return slottedModel(d, { top: true, bottom: true }, { dividers });
}

function telescopeModel(d, o, full) {
  const { L, W, H, t } = d;
  const lidDepth = full ? H + t : Math.max(2 * t, (H * o.lidDepthPct) / 100);
  const Li = L + 2 * t + 1, Wi = W + 2 * t + 1;
  const closedY = H - lidDepth;
  const parts = [
    box('lid-top', [Li + 2 * t, t, Wi + 2 * t], [0, lidDepth + t / 2, 0]),
    box('lid-front', [Li + 2 * t, lidDepth, t], [0, lidDepth / 2, Wi / 2 + t / 2]),
    box('lid-back', [Li + 2 * t, lidDepth, t], [0, lidDepth / 2, -(Wi / 2 + t / 2)]),
    box('lid-left', [t, lidDepth, Wi], [-(Li / 2 + t / 2), lidDepth / 2, 0]),
    box('lid-right', [t, lidDepth, Wi], [Li / 2 + t / 2, lidDepth / 2, 0]),
  ];
  return {
    statics: [floorPanel(d), ...wallPanels(d, { front: H, back: H, left: H, right: H })],
    flaps: [], hinge: null, extraBounds: [],
    lift: { parts, closedY, rise: lidDepth + H * 0.6 + 30 },
    decal: { target: 'lift', position: [0, lidDepth / 2, Wi / 2 + t + 0.3], size: [Li * 0.6, lidDepth * 0.6] },
    canOpen: true, openLabel: 'Lid',
  };
}

function hingedModel(d, kind) {
  const { L, W, H, t } = d;
  const lenZ = W + 1.5 * t;
  const hinge = {
    pivot: [0, H, -(W / 2 + t / 2)],
    open: 115 * DEG,
    panels: [{ id: 'lid', size: [L + 2 * t, t, lenZ], position: [0, t / 2, lenZ / 2] }],
    children: [],
  };
  const extraBounds = [];
  let decalZ = W / 2 + t + 0.3;
  if (kind === 'MAILER') {
    const tuck = Math.min(H * 0.7, 40);
    hinge.children.push({ id: 'tuck', pivot: [0, 0, W], rotX: 90 * DEG, panels: [{ id: 'tuck-p', size: [L - 2, t, tuck], position: [0, 0, tuck / 2] }] });
  } else {
    const depth = kind === 'FPF' ? H * 0.92 : H * 0.3;
    hinge.children.push({ id: 'lip', pivot: [0, 0, lenZ], rotX: 90 * DEG, panels: [{ id: 'lip-p', size: [L + 2 * t, t, depth], position: [0, t / 2, depth / 2] }] });
    extraBounds.push({ size: [L + 2 * t, depth, t], position: [0, H - depth / 2, W / 2 + 1.5 * t] });
    if (kind === 'FPF') decalZ = W / 2 + 2 * t + 0.3;
  }
  return {
    statics: [floorPanel(d), ...wallPanels(d, { front: H, back: H, left: H, right: H })],
    flaps: [], lift: null, hinge, extraBounds,
    decal: { target: 'root', position: [0, H / 2, decalZ], size: [Math.min(L * 0.8, 400), H * 0.6] },
    canOpen: true, openLabel: 'Lid',
  };
}

function trayModel(d) {
  const { L, W, H, t } = d;
  return {
    statics: [floorPanel(d), ...wallPanels(d, { front: H, back: H, left: H, right: H })],
    flaps: [], lift: null, hinge: null, extraBounds: [],
    decal: { target: 'root', position: [0, H / 2, W / 2 + t + 0.3], size: [Math.min(L * 0.8, 400), H * 0.6] },
    canOpen: false, openLabel: '',
  };
}

function displayModel(d, o) {
  const { L, W, H, t } = d;
  const fh = Math.max(2 * t, (H * o.frontHeightPct) / 100);
  const h = W / 2 + t;
  // Shape u axis = -z so the mesh can be rotated 90° about Y and extruded along +x.
  const points = [[-h, 0], [h, 0], [h, H], [-h, fh]];
  const side = (id, x0) => ({ id, kind: 'extrude', points, depth: t, x0, size: [t, H, 2 * h], position: [x0 + t / 2, H / 2, 0] });
  return {
    statics: [
      floorPanel(d),
      box('wall-back', [L + 2 * t, H, t], [0, H / 2, -(W / 2 + t / 2)]),
      box('wall-front', [L + 2 * t, fh, t], [0, fh / 2, W / 2 + t / 2]),
      side('side-left', -L / 2 - t),
      side('side-right', L / 2),
    ],
    flaps: [], lift: null, hinge: null, extraBounds: [],
    decal: { target: 'root', position: [0, fh / 2, W / 2 + t + 0.3], size: [Math.min(L * 0.8, 400), fh * 0.6] },
    canOpen: false, openLabel: '',
  };
}

function flapClosedBox(f, t) {
  const y = (f.edge === 'top' ? 1 : -1) * (f.layer + 0.5) * t;
  const [px, py, pz] = f.pivot;
  if (f.side === 'front') return { size: [f.length, t, f.depth], position: [px, py + y, pz - f.depth / 2] };
  if (f.side === 'back') return { size: [f.length, t, f.depth], position: [px, py + y, pz + f.depth / 2] };
  if (f.side === 'left') return { size: [f.depth, t, f.length], position: [px + f.depth / 2, py + y, pz] };
  return { size: [f.depth, t, f.length], position: [px - f.depth / 2, py + y, pz] };
}

// Bounds of the closed model in mm (used for camera, arrows and external dimensions).
function computeBounds(m, t) {
  const b = { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity, minZ: Infinity, maxZ: -Infinity };
  const add = (size, pos) => {
    b.minX = Math.min(b.minX, pos[0] - size[0] / 2); b.maxX = Math.max(b.maxX, pos[0] + size[0] / 2);
    b.minY = Math.min(b.minY, pos[1] - size[1] / 2); b.maxY = Math.max(b.maxY, pos[1] + size[1] / 2);
    b.minZ = Math.min(b.minZ, pos[2] - size[2] / 2); b.maxZ = Math.max(b.maxZ, pos[2] + size[2] / 2);
  };
  m.statics.forEach((s) => add(s.size, s.position));
  m.flaps.forEach((f) => { const c = flapClosedBox(f, t); add(c.size, c.position); });
  m.lift?.parts.forEach((p) => add(p.size, [p.position[0], p.position[1] + m.lift.closedY, p.position[2]]));
  m.hinge?.panels.forEach((p) => add(p.size, [p.position[0] + m.hinge.pivot[0], p.position[1] + m.hinge.pivot[1], p.position[2] + m.hinge.pivot[2]]));
  m.extraBounds.forEach((e) => add(e.size, e.position));
  return b;
}

export function buildBoxModel(design) {
  const d = getDims(design);
  const o = { ...DEFAULT_OPTIONS, ...design.options };
  let m;
  switch (design.style) {
    case 'HSC': m = slottedModel(d, { top: false, bottom: true }); break;
    case 'FOL': m = slottedModel(d, { top: true, bottom: true, full: true }); break;
    case 'FTB': m = telescopeModel(d, o, true); break;
    case 'HTB': m = telescopeModel(d, o, false); break;
    case 'MAILER': case 'OPF': case 'FPF': m = hingedModel(d, design.style); break;
    case 'TRAY': m = trayModel(d); break;
    case 'DISPLAY': m = displayModel(d, o); break;
    case 'PARTITION': m = partitionModel(d, o); break;
    default: m = slottedModel(d, { top: true, bottom: true });
  }
  return { ...m, dims: d, bounds: computeBounds(m, d.t) };
}
