import { getStyle } from '../../utils/boxGeometry';
import { UNITS, parseDimension } from '../../utils/unitConversion';
import NumberField from './NumberField';

const FIELDS = [['length', 'Length (L)'], ['width', 'Width (W)'], ['height', 'Height (H)']];

export default function DimensionInputs({ dimensions, unit, style, options, onDimensionChange, onUnitChange, onOptionChange }) {
  const styleDef = getStyle(style);
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-neutral-900">Inside dimensions</h2>
      <div className="mt-3 inline-flex rounded-lg border border-neutral-300 p-0.5" role="group" aria-label="Measurement unit">
        {Object.keys(UNITS).map((u) => (
          <button
            key={u}
            type="button"
            onClick={() => onUnitChange(u)}
            aria-pressed={u === unit}
            className={`rounded-md px-3 py-1 text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5e34] ${u === unit ? 'bg-[#8b5e34] text-white' : 'text-neutral-700 hover:bg-neutral-100'}`}
          >
            {u}
          </button>
        ))}
      </div>
      <div className="mt-3 grid gap-3">
        {FIELDS.map(([key, label]) => (
          <NumberField
            key={`${key}-${unit}`}
            label={label}
            value={dimensions[key]}
            suffix={unit}
            validate={(text) => parseDimension(text, unit)}
            onValidChange={(v) => onDimensionChange(key, v)}
          />
        ))}
      </div>
      {styleDef.options.length > 0 && (
        <div className="mt-4 border-t border-neutral-200 pt-3">
          <h3 className="text-xs font-semibold text-neutral-700">{styleDef.short} options</h3>
          {styleDef.options.map((opt) => (
            <label key={opt.key} className="mt-2 block text-xs text-neutral-600">
              <span className="flex justify-between"><span>{opt.label}</span><span className="font-medium text-neutral-900">{options[opt.key]}</span></span>
              <input
                type="range"
                min={opt.min}
                max={opt.max}
                step={opt.step}
                value={options[opt.key]}
                onChange={(e) => onOptionChange(opt.key, Number(e.target.value))}
                className="mt-1 w-full accent-[#8b5e34]"
              />
            </label>
          ))}
        </div>
      )}
    </section>
  );
}
