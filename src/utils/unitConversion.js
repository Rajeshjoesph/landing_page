// Single source of truth for units. Geometry is always built in millimetres;
// the 3D scene applies MM_TO_WORLD once on the root group (1 world unit = 100 mm).
export const MM_TO_WORLD = 0.01;
export const MIN_DIM_MM = 30;
export const MAX_DIM_MM = 3000;

export const UNITS = {
  mm: { label: 'mm', toMm: 1, decimals: 1 },
  cm: { label: 'cm', toMm: 10, decimals: 2 },
  in: { label: 'in', toMm: 25.4, decimals: 3 },
};

export const toMm = (value, unit) => value * UNITS[unit].toMm;
export const fromMm = (mm, unit) => mm / UNITS[unit].toMm;
export const roundTo = (v, d) => Math.round(v * 10 ** d) / 10 ** d;

export const convertValue = (value, from, to) =>
  from === to ? value : roundTo(fromMm(toMm(value, from), to), 4);

// Formats a millimetre value for display in the chosen unit, e.g. "300 mm".
export const formatValue = (mm, unit, decimals) =>
  `${roundTo(fromMm(mm, unit), decimals ?? UNITS[unit].decimals)} ${unit}`;

export function parseDimension(text, unit) {
  const raw = String(text).trim().replace(',', '.');
  if (raw === '') return { error: 'Enter a value.' };
  const value = Number(raw);
  if (!Number.isFinite(value)) return { error: 'Enter a number.' };
  const mm = toMm(value, unit);
  if (mm < MIN_DIM_MM || mm > MAX_DIM_MM) {
    return {
      error: `Use ${roundTo(fromMm(MIN_DIM_MM, unit), 2)}–${roundTo(fromMm(MAX_DIM_MM, unit), 2)} ${unit}.`,
    };
  }
  return { value };
}
