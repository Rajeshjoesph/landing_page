import { useId, useState } from 'react';

// Text input that keeps a local draft while typing and only reports valid values.
export default function NumberField({ label, value, validate, onValidChange, suffix, hint }) {
  const id = useId();
  const [draft, setDraft] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const text = e.target.value;
    setDraft(text);
    const res = validate(text);
    if (res.error) setError(res.error);
    else { setError(''); onValidChange(res.value); }
  };

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-medium text-neutral-600">{label}</label>
      <div className={`flex items-center rounded-lg border bg-white ${error ? 'border-red-500' : 'border-neutral-300 focus-within:border-[#8b5e34]'}`}>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={draft ?? String(value)}
          onChange={handleChange}
          onBlur={() => { setDraft(null); setError(''); }}
          aria-invalid={!!error}
          className="w-full rounded-lg bg-transparent px-3 py-2 text-sm text-neutral-900 outline-none"
        />
        {suffix && <span className="pr-3 text-xs text-neutral-500">{suffix}</span>}
      </div>
      {error ? <p className="mt-1 text-xs text-red-600" role="alert">{error}</p> : hint && <p className="mt-1 text-xs text-neutral-500">{hint}</p>}
    </div>
  );
}
