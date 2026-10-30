import { buildBoxModel, getDims } from './boxGeometry';
import { buildDieline } from './dielineCalculations';

export const BOARD_TYPES = [
  { id: 'single-wall', label: 'Single-wall', weight: 480 },
  { id: 'double-wall', label: 'Double-wall', weight: 850 },
  { id: 'triple-wall', label: 'Triple-wall', weight: 1250 },
];

export const FLUTES = ['A', 'B', 'C', 'E', 'F', 'custom'];

// Nominal thickness in mm. Real values vary by supplier: always editable.
const THICKNESS = {
  'single-wall': { A: 4.8, B: 3.0, C: 4.0, E: 1.6, F: 0.8 },
  'double-wall': { A: 8.8, B: 6.5, C: 7.0, E: 4.6, F: 3.8 },
  'triple-wall': { A: 13, B: 10, C: 11, E: 7, F: 5.5 },
};

export const nominalThickness = (boardType, flute) => THICKNESS[boardType]?.[flute] ?? null;

export const internalVolumeLitres = ({ L, W, H }) => (L * W * H) / 1_000_000;

export function calculateAll(design) {
  const d = getDims(design);
  const model = buildBoxModel(design);
  const b = model.bounds;
  const dieline = buildDieline(design);
  const board = BOARD_TYPES.find((x) => x.id === design.boardType) ?? BOARD_TYPES[0];
  const netM2 = dieline.netArea / 1e6;
  const warnings = [];
  if (design.boardThickness * 8 > Math.min(d.L, d.W, d.H)) warnings.push('Board is very thick for the smallest dimension; check it is realistic.');
  return {
    dimsMm: d,
    volumeLitres: internalVolumeLitres(d),
    external: { length: b.maxX - b.minX, width: b.maxZ - b.minZ, height: b.maxY - b.minY },
    blank: { width: dieline.width, height: dieline.height },
    netAreaM2: netM2,
    boundingAreaM2: dieline.boundingArea / 1e6,
    utilization: dieline.netArea / dieline.boundingArea,
    weightKg: (netM2 * board.weight) / 1000,
    boardLabel: board.label,
    notes: dieline.notes,
    warnings,
  };
}
