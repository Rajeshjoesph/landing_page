import { BOX_STYLES } from '../../utils/boxGeometry';

const TOP = '#d9b27c', LEFT = '#b98b5a', RIGHT = '#9c6f45', DARK = '#6e4a2a', IN = '#7a5330';

// Schematic thumbnails drawn as SVG (no dependency on image content).
function Thumb({ kind }) {
  const cube = (h = 22) => (
    <>
      <polygon points="40,10 66,22 40,34 14,22" fill={TOP} />
      <polygon points={`14,22 40,34 40,${34 + h} 14,${22 + h}`} fill={LEFT} />
      <polygon points={`40,34 66,22 66,${22 + h} 40,${34 + h}`} fill={RIGHT} />
    </>
  );
  let body;
  switch (kind) {
    case 'flaps': body = <>{cube()}<line x1="27" y1="16" x2="53" y2="28" stroke={DARK} strokeWidth="1.2" /></>; break;
    case 'fol': body = <>{cube()}<line x1="27" y1="16" x2="53" y2="28" stroke={DARK} strokeWidth="1.2" /><line x1="22" y1="19" x2="58" y2="25" stroke={DARK} strokeWidth="1" /></>; break;
    case 'open': body = <>{cube()}<polygon points="40,14 58,22 40,30 22,22" fill={IN} /></>; break;
    case 'tele': body = <>{cube(26)}<polyline points="14,32 40,44 66,32" fill="none" stroke={DARK} strokeWidth="1.4" /></>; break;
    case 'tele-half': body = <>{cube(26)}<polyline points="14,28 40,40 66,28" fill="none" stroke={DARK} strokeWidth="1.4" /></>; break;
    case 'lid': body = <><polygon points="14,22 40,34 40,56 14,44" fill={LEFT} /><polygon points="40,34 66,22 66,44 40,56" fill={RIGHT} /><polygon points="40,14 58,22 40,30 22,22" fill={IN} /><polygon points="14,22 40,10 40,0 14,12" fill={TOP} /></>; break;
    case 'lid-wrap': body = <>{cube()}<polygon points="14,22 40,34 40,44 14,32" fill={TOP} /><line x1="14" y1="32" x2="40" y2="44" stroke={DARK} strokeWidth="1.2" /></>; break;
    case 'tray': body = <><polygon points="14,34 40,46 40,56 14,44" fill={LEFT} /><polygon points="40,46 66,34 66,44 40,56" fill={RIGHT} /><polygon points="40,24 66,34 40,46 14,34" fill={IN} /></>; break;
    case 'display': body = <><polygon points="14,22 40,34 40,56 14,44" fill={LEFT} /><polygon points="40,34 66,22 66,44 40,56" fill={RIGHT} /><polygon points="40,10 66,22 40,34 14,22" fill={IN} /><polygon points="14,22 40,46 40,56 14,44" fill={TOP} /></>; break;
    case 'partition': body = <>{cube()}<polygon points="40,14 58,22 40,30 22,22" fill={IN} /><line x1="31" y1="18" x2="49" y2="26" stroke={TOP} strokeWidth="1.5" /><line x1="49" y1="18" x2="31" y2="26" stroke={TOP} strokeWidth="1.5" /></>; break;
    default: body = cube();
  }
  return <svg viewBox="0 0 80 64" className="h-14 w-16 shrink-0" aria-hidden="true">{body}</svg>;
}

export default function BoxStyleSelector({ style, onChange }) {
  return (
    <fieldset className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <legend className="px-1 text-sm font-semibold text-neutral-900">Box style</legend>
      <div className="mt-1 grid max-h-[420px] gap-2 overflow-y-auto pr-1">
        {BOX_STYLES.map((s) => {
          const active = s.id === style;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onChange(s.id)}
              aria-pressed={active}
              className={`flex items-center gap-3 rounded-xl border p-2 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5e34] ${active ? 'border-[#8b5e34] bg-[#f6ede1]' : 'border-neutral-200 bg-neutral-50 hover:border-neutral-400'}`}
            >
              <Thumb kind={s.thumb} />
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-neutral-900">{s.name}</span>
                <span className="block text-xs leading-snug text-neutral-600">{s.description}</span>
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
