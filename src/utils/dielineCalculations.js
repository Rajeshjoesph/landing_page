import { getDims, DEFAULT_OPTIONS } from './boxGeometry';

const EPS = 0.01;
const R = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
const item = (id, type, label, points) => ({ id, type, label, points });

export function polygonArea(pts) {
  let a = 0;
  pts.forEach(([x1, y1], i) => { const [x2, y2] = pts[(i + 1) % pts.length]; a += x1 * y2 - x2 * y1; });
  return Math.abs(a) / 2;
}

// Subtract fold intervals from an edge so only true cut sections remain.
function subtract(lo, hi, covers) {
  let segs = [[lo, hi]];
  covers.forEach(([c0, c1]) => {
    segs = segs.flatMap(([a, b]) => {
      if (c1 <= a + EPS || c0 >= b - EPS) return [[a, b]];
      const out = [];
      if (c0 > a + EPS) out.push([a, c0]);
      if (c1 < b - EPS) out.push([c1, b]);
      return out;
    });
  });
  return segs;
}

function computeCuts(items, folds) {
  const cuts = [];
  items.forEach(({ points }) => {
    points.forEach(([x1, y1], i) => {
      const [x2, y2] = points[(i + 1) % points.length];
      if (Math.abs(y1 - y2) < EPS) {
        const covers = folds.filter((f) => Math.abs(f[1] - y1) < EPS && Math.abs(f[3] - y1) < EPS).map((f) => [Math.min(f[0], f[2]), Math.max(f[0], f[2])]);
        subtract(Math.min(x1, x2), Math.max(x1, x2), covers).forEach(([a, b]) => cuts.push([a, y1, b, y1]));
      } else if (Math.abs(x1 - x2) < EPS) {
        const covers = folds.filter((f) => Math.abs(f[0] - x1) < EPS && Math.abs(f[2] - x1) < EPS).map((f) => [Math.min(f[1], f[3]), Math.max(f[1], f[3])]);
        subtract(Math.min(y1, y2), Math.max(y1, y2), covers).forEach(([a, b]) => cuts.push([x1, a, x1, b]));
      } else cuts.push([x1, y1, x2, y2]);
    });
  });
  return cuts;
}

function slottedLayout(d, kind, o) {
  const { L, W, H, t } = d;
  const Lp = L + t, Wp = W + t, G = 35, slot = Math.min(6, W / 8);
  const hasTop = kind !== 'HSC';
  const minorD = Wp / 2;
  const majorD = kind === 'FOL' ? Wp : Wp / 2;
  const margin = hasTop ? Math.max(majorD, minorD) : 0;
  const y0 = margin;
  const panels = [{ w: Lp, name: 'Panel L1', major: true }, { w: Wp, name: 'Panel W1' }, { w: Lp, name: 'Panel L2', major: true }, { w: Wp, name: 'Panel W2' }];
  const items = [item('glue', 'glue', 'Glue flap', [[G, y0], [0, y0 + 8], [0, y0 + H - 8], [G, y0 + H]])];
  const folds = [[G, y0, G, y0 + H]];
  let x = G;
  panels.forEach((p, i) => {
    items.push(item(`p${i}`, 'panel', p.name, R(x, y0, p.w, H)));
    if (i < 3) folds.push([x + p.w, y0, x + p.w, y0 + H]);
    const depth = p.major ? majorD : minorD;
    if (hasTop) {
      items.push(item(`t${i}`, 'flap', 'Top flap', R(x + slot / 2, y0 - depth, p.w - slot, depth)));
      folds.push([x + slot / 2, y0, x + p.w - slot / 2, y0]);
    }
    items.push(item(`b${i}`, 'flap', 'Bottom flap', R(x + slot / 2, y0 + H, p.w - slot, depth)));
    folds.push([x + slot / 2, y0 + H, x + p.w - slot / 2, y0 + H]);
    x += p.w;
  });
  const notes = ['Panel size = inside dimension + 1 board thickness (score allowance); glue flap 35 mm; slot 6 mm.'];
  if (kind === 'PARTITION') {
    const hd = H - 2;
    let dx = G, dy = y0 + H + majorD + 20;
    for (let i = 0; i < Math.round(o.divX); i++) { items.push(item(`dx${i}`, 'panel', `Divider ${i + 1}`, R(dx, dy, Wp - 2, hd))); dx += Wp + 10; }
    for (let j = 0; j < Math.round(o.divZ); j++) { items.push(item(`dz${j}`, 'panel', `Divider ${Math.round(o.divX) + j + 1}`, R(dx, dy, Lp - 2, hd))); dx += Lp + 10; }
    notes.push('Dividers are separate parts; interlocking slots are not drawn.');
  }
  return { items, folds, notes };
}

// "Cross" layout: floor in the centre, walls on four sides.
function crossLayout(p, ox, oy, prefix = '') {
  const { L, W, H, t } = p;
  const Lp = L + t, Wp = W + t;
  const Hf = p.frontH ?? H, Hb = H;
  const cx = ox + H, cy = oy + Hf;
  const n = (s) => `${prefix}${s}`;
  const items = [
    item(n('floor'), 'panel', n(p.floorName ?? 'Floor'), R(cx, cy, Lp, Wp)),
    item(n('front'), 'panel', n('Front wall'), R(cx, cy - Hf, Lp, Hf)),
    item(n('back'), 'panel', n('Back wall'), R(cx, cy + Wp, Lp, Hb)),
  ];
  const folds = [[cx, cy, cx + Lp, cy], [cx, cy + Wp, cx + Lp, cy + Wp], [cx, cy, cx, cy + Wp], [cx + Lp, cy, cx + Lp, cy + Wp]];
  if (p.sloped) {
    items.push(item(n('left'), 'panel', n('Side wall'), [[cx, cy], [cx - Hf, cy], [cx - H, cy + Wp], [cx, cy + Wp]]));
    items.push(item(n('right'), 'panel', n('Side wall'), [[cx + Lp, cy], [cx + Lp + Hf, cy], [cx + Lp + H, cy + Wp], [cx + Lp, cy + Wp]]));
  } else {
    items.push(item(n('left'), 'panel', n('Side wall'), R(cx - H, cy, H, Wp)));
    items.push(item(n('right'), 'panel', n('Side wall'), R(cx + Lp, cy, H, Wp)));
  }
  if (p.tabs) {
    items.push(item(n('tab-tl'), 'flap', 'Corner tab', R(cx - H, cy - Hf, H, Hf)));
    items.push(item(n('tab-bl'), 'flap', 'Corner tab', R(cx - H, cy + Wp, H, Hb)));
    items.push(item(n('tab-tr'), 'flap', 'Corner tab', R(cx + Lp, cy - Hf, H, Hf)));
    items.push(item(n('tab-br'), 'flap', 'Corner tab', R(cx + Lp, cy + Wp, H, Hb)));
    folds.push([cx - H, cy, cx, cy], [cx - H, cy + Wp, cx, cy + Wp], [cx + Lp, cy, cx + Lp + H, cy], [cx + Lp, cy + Wp, cx + Lp + H, cy + Wp]);
  }
  if (p.lid) {
    const yl = cy + Wp + Hb;
    items.push(item(n('lid'), 'panel', 'Lid', R(cx, yl, Lp, Wp)));
    folds.push([cx, yl, cx + Lp, yl]);
    let yEnd = yl + Wp;
    if (p.lid.tuck) {
      items.push(item(n('tuck'), 'flap', 'Tuck flap', R(cx + 4, yEnd, Lp - 8, p.lid.tuck)));
      folds.push([cx + 4, yEnd, cx + Lp - 4, yEnd]);
    }
    if (p.lid.lip) {
      items.push(item(n('lip'), 'panel', p.lid.lipName, R(cx, yEnd, Lp, p.lid.lip)));
      folds.push([cx, yEnd, cx + Lp, yEnd]);
    }
    if (p.lid.dust) {
      const dd = H * 0.9;
      items.push(item(n('dust-l'), 'flap', 'Dust flap', [[cx, yl + 4], [cx - dd, yl + 10], [cx - dd, yl + Wp - 10], [cx, yl + Wp - 4]]));
      items.push(item(n('dust-r'), 'flap', 'Dust flap', [[cx + Lp, yl + 4], [cx + Lp + dd, yl + 10], [cx + Lp + dd, yl + Wp - 10], [cx + Lp, yl + Wp - 4]]));
      folds.push([cx, yl + 4, cx, yl + Wp - 4], [cx + Lp, yl + 4, cx + Lp, yl + Wp - 4]);
    }
  }
  return { items, folds };
}

const bbox = (items) => {
  const b = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
  items.forEach(({ points }) => points.forEach(([x, y]) => {
    b.minX = Math.min(b.minX, x); b.maxX = Math.max(b.maxX, x);
    b.minY = Math.min(b.minY, y); b.maxY = Math.max(b.maxY, y);
  }));
  return b;
};

export function buildDieline(design) {
  const d = getDims(design);
  const o = { ...DEFAULT_OPTIONS, ...design.options };
  const { style } = design;
  const crossNote = 'Panel size = inside dimension + 1 board thickness (score allowance).';
  let r;
  if (['RSC', 'HSC', 'FOL', 'PARTITION'].includes(style)) r = { ...slottedLayout(d, style, o) };
  else if (style === 'FTB' || style === 'HTB') {
    const lidDepth = style === 'FTB' ? d.H + d.t : Math.max(2 * d.t, (d.H * o.lidDepthPct) / 100);
    const base = crossLayout({ ...d, tabs: true, floorName: 'Base floor' }, 0, 0, 'Base ');
    const bb = bbox(base.items);
    const lid = crossLayout({ L: d.L + 2 * d.t + 1, W: d.W + 2 * d.t + 1, H: lidDepth, t: d.t, tabs: true, floorName: 'Lid top' }, bb.maxX + 25, 0, 'Lid ');
    r = { items: [...base.items, ...lid.items], folds: [...base.folds, ...lid.folds], notes: [crossNote, 'Two separate blanks: base and lid (lid inside = base outside + 1 mm clearance).'] };
  } else if (style === 'MAILER') {
    r = { ...crossLayout({ ...d, lid: { tuck: Math.min(d.H * 0.7, 40) + 6, dust: true } }, 0, 0), notes: [crossNote, 'Mailer locking tabs and cut-out details are not modelled.'] };
  } else if (style === 'OPF') {
    r = { ...crossLayout({ ...d, tabs: true, lid: { lip: d.H * 0.3, lipName: 'Front lip' } }, 0, 0), notes: [crossNote] };
  } else if (style === 'FPF') {
    r = { ...crossLayout({ ...d, tabs: true, lid: { lip: d.H * 0.92, lipName: 'Cover drop panel' } }, 0, 0), notes: [crossNote] };
  } else if (style === 'DISPLAY') {
    const fh = Math.max(2 * d.t, (d.H * o.frontHeightPct) / 100);
    r = { ...crossLayout({ ...d, frontH: fh, sloped: true }, 0, 0), notes: [crossNote, 'Locking tabs for the display box are not modelled.'] };
  } else r = { ...crossLayout({ ...d, tabs: true }, 0, 0), notes: [crossNote] };

  const b = bbox(r.items);
  const sh = ([x, y]) => [x - b.minX, y - b.minY];
  const items = r.items.map((i) => ({ ...i, points: i.points.map(sh) }));
  const folds = r.folds.map(([x1, y1, x2, y2]) => [x1 - b.minX, y1 - b.minY, x2 - b.minX, y2 - b.minY]);
  const width = b.maxX - b.minX, height = b.maxY - b.minY;
  const netArea = items.reduce((s, i) => s + polygonArea(i.points), 0);
  return {
    items, folds, cuts: computeCuts(items, folds), width, height, netArea, boundingArea: width * height,
    notes: [...r.notes, 'Approximate: verify manufacturer allowances and tooling before production.'],
  };
}
