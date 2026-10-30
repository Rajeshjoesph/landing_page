import { formatValue } from '../../utils/unitConversion';

const FILL = { panel: '#ecd9b8', flap: '#f6ead3', glue: '#cfe3f2' };
const CUT = '#c0262d', FOLD = '#1d6fb8';

// Pure SVG component; also rendered to a string for SVG / print export.
export function DielineSvg({ dieline, unit, title }) {
  const { width, height, items, folds, cuts } = dieline;
  const m = Math.max(width, height);
  const fs = Math.max(8, m / 55);
  const pad = fs * 4;
  const legendH = fs * 5;
  const vbW = width + pad * 2, vbH = height + pad * 2 + legendH;
  const bb = (pts) => {
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) };
  };
  const ly = pad + height + pad * 0.9;
  const legend = [[CUT, '', 'Cut line'], [FOLD, `${fs} ${fs * 0.6}`, 'Crease / fold'], [FILL.glue, 'fill', 'Glue flap'], [FILL.panel, 'fill', 'Panel'], [FILL.flap, 'fill', 'Flap / tab']];
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${vbW} ${vbH}`} width="100%" role="img" aria-label={title ?? '2D dieline'} style={{ background: '#fff', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <g transform={`translate(${pad} ${pad})`}>
        {items.map((it) => (
          <polygon key={it.id} points={it.points.map((p) => p.join(',')).join(' ')} fill={FILL[it.type]} stroke="none" />
        ))}
        {items.filter((it) => it.type !== 'glue').map((it) => {
          const b = bb(it.points);
          const w = b.x1 - b.x0, h = b.y1 - b.y0;
          if (Math.min(w, h) < fs * 3) return null;
          return (
            <text key={`l-${it.id}`} x={(b.x0 + b.x1) / 2} y={(b.y0 + b.y1) / 2} fontSize={fs * 0.85} textAnchor="middle" fill="#3a2a1a">
              <tspan x={(b.x0 + b.x1) / 2} dy={-fs * 0.1}>{it.label}</tspan>
              <tspan x={(b.x0 + b.x1) / 2} dy={fs}>{`${formatValue(w, unit)} × ${formatValue(h, unit)}`}</tspan>
            </text>
          );
        })}
        {cuts.map((c, i) => <line key={`c${i}`} x1={c[0]} y1={c[1]} x2={c[2]} y2={c[3]} stroke={CUT} strokeWidth={fs * 0.12} strokeLinecap="round" />)}
        {folds.map((f, i) => <line key={`f${i}`} x1={f[0]} y1={f[1]} x2={f[2]} y2={f[3]} stroke={FOLD} strokeWidth={fs * 0.12} strokeDasharray={`${fs * 0.7} ${fs * 0.4}`} />)}
        <g stroke="#333" strokeWidth={fs * 0.08} fill="#333" fontSize={fs}>
          <line x1={0} y1={-fs * 1.8} x2={width} y2={-fs * 1.8} />
          <line x1={0} y1={-fs * 2.4} x2={0} y2={-fs * 1.2} /><line x1={width} y1={-fs * 2.4} x2={width} y2={-fs * 1.2} />
          <text x={width / 2} y={-fs * 2.3} textAnchor="middle" stroke="none">{`Blank width ${formatValue(width, unit)}`}</text>
          <line x1={-fs * 1.8} y1={0} x2={-fs * 1.8} y2={height} />
          <line x1={-fs * 2.4} y1={0} x2={-fs * 1.2} y2={0} /><line x1={-fs * 2.4} y1={height} x2={-fs * 1.2} y2={height} />
          <text transform={`translate(${-fs * 2.4} ${height / 2}) rotate(-90)`} textAnchor="middle" stroke="none">{`Blank height ${formatValue(height, unit)}`}</text>
        </g>
      </g>
      <g transform={`translate(${pad} ${ly})`} fontSize={fs * 0.9} fill="#333">
        {legend.map(([color, dash, label], i) => (
          <g key={label} transform={`translate(${i * (vbW - pad * 2) / 5} 0)`}>
            {dash === 'fill' ? <rect width={fs * 1.6} height={fs} fill={color} stroke="#999" strokeWidth={fs * 0.05} />
              : <line x1={0} y1={fs / 2} x2={fs * 1.6} y2={fs / 2} stroke={color} strokeWidth={fs * 0.15} strokeDasharray={dash || undefined} />}
            <text x={fs * 2} y={fs * 0.85}>{label}</text>
          </g>
        ))}
        <text y={fs * 2.6} fontSize={fs * 0.85} fill="#8a1c1c">Approximate dieline: verify allowances and tooling before manufacture.</text>
      </g>
    </svg>
  );
}

export default function Dieline2D({ dieline, unit, styleName }) {
  return (
    <div className="h-full w-full overflow-auto bg-white p-3">
      <h3 className="mb-2 text-sm font-semibold text-neutral-800">2D dieline: {styleName}</h3>
      <div className="mx-auto max-w-[1100px]"><DielineSvg dieline={dieline} unit={unit} title={`Dieline for ${styleName}`} /></div>
    </div>
  );
}
