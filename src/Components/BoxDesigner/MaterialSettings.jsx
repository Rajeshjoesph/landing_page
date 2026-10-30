import { BOARD_TYPES, FLUTES, nominalThickness } from '../../utils/boxCalculations';
import NumberField from './NumberField';

const PRESETS = [['kraft', 'Brown kraft'], ['white', 'White'], ['custom', 'Custom']];

function validateThickness(text) {
  const v = Number(String(text).trim().replace(',', '.'));
  if (String(text).trim() === '' || !Number.isFinite(v)) return { error: 'Enter a number.' };
  if (v < 0.3 || v > 25) return { error: 'Use 0.3–25 mm.' };
  return { value: v };
}

export default function MaterialSettings({ design, onChange }) {
  const { boardType, fluteType, boardThickness, appearance } = design;
  const setApp = (patch) => onChange({ appearance: { ...appearance, ...patch } });
  const pickBoard = (id) => {
    const nominal = nominalThickness(id, fluteType);
    onChange({ boardType: id, ...(nominal ? { boardThickness: nominal } : {}) });
  };
  const pickFlute = (f) => {
    const nominal = nominalThickness(boardType, f);
    onChange({ fluteType: f, ...(nominal ? { boardThickness: nominal } : {}) });
  };
  const sel = 'w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-[#8b5e34] focus:outline-none';

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-neutral-900">Board &amp; material</h2>
      <div className="mt-3 grid gap-3">
        <label className="block text-xs font-medium text-neutral-600">Construction
          <select className={`${sel} mt-1`} value={boardType} onChange={(e) => pickBoard(e.target.value)}>
            {BOARD_TYPES.map((b) => <option key={b.id} value={b.id}>{b.label} corrugated</option>)}
          </select>
        </label>
        <label className="block text-xs font-medium text-neutral-600">Flute
          <select className={`${sel} mt-1`} value={fluteType} onChange={(e) => pickFlute(e.target.value)}>
            {FLUTES.map((f) => <option key={f} value={f}>{f === 'custom' ? 'Custom thickness' : `${f} flute`}</option>)}
          </select>
        </label>
        <NumberField
          label="Board thickness"
          suffix="mm"
          value={boardThickness}
          validate={validateThickness}
          hint="Nominal value; actual thickness varies by supplier."
          onValidChange={(v) => onChange({ boardThickness: v, fluteType: nominalThickness(boardType, fluteType) === v ? fluteType : 'custom' })}
        />
        <div>
          <span className="mb-1 block text-xs font-medium text-neutral-600">Appearance</span>
          <div className="flex gap-1" role="group" aria-label="Board colour">
            {PRESETS.map(([id, label]) => (
              <button key={id} type="button" aria-pressed={appearance.preset === id} onClick={() => setApp({ preset: id })}
                className={`flex-1 rounded-lg border px-2 py-1.5 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5e34] ${appearance.preset === id ? 'border-[#8b5e34] bg-[#f6ede1] font-semibold' : 'border-neutral-300 hover:bg-neutral-50'}`}>
                {label}
              </button>
            ))}
          </div>
          {appearance.preset === 'custom' && (
            <label className="mt-2 flex items-center gap-2 text-xs text-neutral-600">Colour
              <input type="color" value={appearance.color} onChange={(e) => setApp({ color: e.target.value })} className="h-8 w-12 cursor-pointer rounded border border-neutral-300" />
            </label>
          )}
        </div>
        <label className="flex items-center gap-2 text-sm text-neutral-800">
          <input type="checkbox" checked={appearance.showPrint} onChange={(e) => setApp({ showPrint: e.target.checked })} className="h-4 w-4 accent-[#8b5e34]" />
          Show printed design preview
        </label>
        {appearance.showPrint && (
          <label className="block text-xs font-medium text-neutral-600">Printed text
            <input type="text" maxLength={24} value={appearance.printText} onChange={(e) => setApp({ printText: e.target.value })} className={`${sel} mt-1`} />
          </label>
        )}
      </div>
    </section>
  );
}
