import { Check, ClipboardCopy, FileCode, FileImage, FolderOpen, Printer, Save, Undo2 } from 'lucide-react';

function Btn({ icon, onClick, disabled, children, title }) {
  const Icon = icon;
  return (
    <button type="button" onClick={onClick} disabled={disabled} title={title}
      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-2.5 py-2 text-xs font-medium text-neutral-800 transition hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5e34] disabled:cursor-not-allowed disabled:opacity-40">
      <Icon size={14} aria-hidden="true" />{children}
    </button>
  );
}

export default function ExportControls({ hasSaved, is3d, status, onSave, onLoad, onReset, onExportPng, onExportSvg, onPrint, onCopy }) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-neutral-900">Save &amp; export</h2>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Btn icon={Save} onClick={onSave}>Save design</Btn>
        <Btn icon={FolderOpen} onClick={onLoad} disabled={!hasSaved} title={hasSaved ? '' : 'No saved design yet'}>Load saved</Btn>
        <Btn icon={FileImage} onClick={onExportPng} disabled={!is3d} title={is3d ? '' : 'Switch to 3D Preview to export an image'}>3D as PNG</Btn>
        <Btn icon={FileCode} onClick={onExportSvg}>Dieline SVG</Btn>
        <Btn icon={Printer} onClick={onPrint}>Print summary</Btn>
        <Btn icon={ClipboardCopy} onClick={onCopy}>Copy values</Btn>
        <div className="col-span-2"><Btn icon={Undo2} onClick={onReset}>Reset to defaults</Btn></div>
      </div>
      <p className="mt-2 text-[11px] text-neutral-500">Print summary opens your browser's print dialog; choose “Save as PDF” for a PDF.</p>
      <p className="mt-2 min-h-5 text-xs font-medium text-emerald-700" role="status" aria-live="polite">
        {status && <span className="inline-flex items-center gap-1"><Check size={13} aria-hidden="true" />{status}</span>}
      </p>
    </section>
  );
}
