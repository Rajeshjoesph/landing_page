import { formatValue, roundTo } from '../../utils/unitConversion';

const Row = ({ label, value }) => (
  <div className="flex justify-between gap-3 border-b border-neutral-100 py-1.5 text-sm last:border-0">
    <dt className="text-neutral-600">{label}</dt>
    <dd className="text-right font-medium text-neutral-900">{value}</dd>
  </div>
);

export default function MeasurementSummary({ design, results }) {
  const { unit } = design;
  const { dimsMm: d, external: e, blank } = results;
  const f = (mm) => formatValue(mm, unit);
  const cm3 = results.volumeLitres * 1000;
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-neutral-900">Measurements</h2>
      <h3 className="mt-3 text-xs font-semibold text-neutral-500">Inside (L × W × H)</h3>
      <dl>
        <Row label="Length" value={f(d.L)} />
        <Row label="Width" value={f(d.W)} />
        <Row label="Height" value={f(d.H)} />
        <Row label="Volume" value={`${roundTo(results.volumeLitres, 2)} L (${roundTo(cm3 / 16.387064, 1)} in³)`} />
      </dl>
      <h3 className="mt-3 text-xs font-semibold text-neutral-500">Outside, closed (estimate)</h3>
      <dl>
        <Row label="Length" value={f(e.length)} />
        <Row label="Width" value={f(e.width)} />
        <Row label="Height" value={f(e.height)} />
      </dl>
      <h3 className="mt-3 text-xs font-semibold text-neutral-500">Blank &amp; material (estimate)</h3>
      <dl>
        <Row label="Blank size" value={`${f(blank.width)} × ${f(blank.height)}`} />
        <Row label="Board area" value={`${roundTo(results.netAreaM2, 3)} m²`} />
        <Row label="Sheet utilisation" value={`${Math.round(results.utilization * 100)}%`} />
        <Row label="Weight" value={`≈ ${roundTo(results.weightKg, 3)} kg`} />
        <Row label="Board" value={`${results.boardLabel}, ${design.fluteType === 'custom' ? 'custom' : `${design.fluteType} flute`}, ${design.boardThickness} mm`} />
      </dl>
      {results.warnings.map((w) => <p key={w} className="mt-3 rounded-lg bg-amber-50 p-2 text-xs text-amber-900">{w}</p>)}
      <ul className="mt-3 list-disc space-y-1 pl-4 text-xs text-neutral-500">
        {results.notes.map((n) => <li key={n}>{n}</li>)}
        <li>Weight assumes a nominal board basis weight for the selected construction.</li>
      </ul>
    </section>
  );
}
