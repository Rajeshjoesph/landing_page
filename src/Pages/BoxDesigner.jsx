import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import logo from '../assets/Logo_img.png';
import BoxStyleSelector from '../Components/BoxDesigner/BoxStyleSelector';
import DimensionInputs from '../Components/BoxDesigner/DimensionInputs';
import MaterialSettings from '../Components/BoxDesigner/MaterialSettings';
import Box3DViewer from '../Components/BoxDesigner/Box3DViewer';
import MeasurementSummary from '../Components/BoxDesigner/MeasurementSummary';
import Dieline2D from '../Components/BoxDesigner/Dieline2D';
import ExportControls from '../Components/BoxDesigner/ExportControls';
import BoxDesignToolbar from '../Components/BoxDesigner/BoxDesignToolbar';
import { DEFAULT_DESIGN, buildBoxModel, getStyle, mergeDesign } from '../utils/boxGeometry';
import { buildDieline } from '../utils/dielineCalculations';
import { calculateAll } from '../utils/boxCalculations';
import { convertValue } from '../utils/unitConversion';
import { downloadText, downloadUrl, dielineSvgString, printSummary, summaryText } from '../utils/exportUtils';

const STORAGE_KEY = 'boxDesigner.design.v1';

const readSaved = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? mergeDesign(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
};

export default function BoxDesigner() {
  const [design, setDesign] = useState(DEFAULT_DESIGN);
  const [mode, setMode] = useState('3d');
  const [viewMode, setViewMode] = useState('solid');
  const [hasSaved, setHasSaved] = useState(() => readSaved() !== null);
  const [status, setStatus] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const apiRef = useRef(null);
  const containerRef = useRef(null);

  const model = useMemo(() => buildBoxModel(design), [design]);
  const dieline = useMemo(() => buildDieline(design), [design]);
  const results = useMemo(() => calculateAll(design), [design]);
  const styleDef = getStyle(design.style);

  const patch = useCallback((p) => setDesign((d) => ({ ...d, ...p })), []);
  const notify = useCallback((msg) => { setStatus(msg); setTimeout(() => setStatus(''), 3500); }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement === containerRef.current);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const changeUnit = (unit) => setDesign((d) => ({
    ...d, unit,
    dimensions: Object.fromEntries(Object.entries(d.dimensions).map(([k, v]) => [k, convertValue(v, d.unit, unit)])),
  }));

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else containerRef.current?.requestFullscreen?.().catch(() => notify('Full screen is not available in this browser.'));
  };

  const save = () => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(design)); setHasSaved(true); notify('Design saved in this browser.'); }
    catch { notify('Could not save: browser storage is unavailable.'); }
  };
  const load = () => { const s = readSaved(); if (s) { setDesign(s); notify('Saved design loaded.'); } };
  const reset = () => { setDesign(DEFAULT_DESIGN); notify('Reset to default dimensions.'); };
  const exportPng = () => {
    const url = apiRef.current?.capture();
    if (url) { downloadUrl(url, `box-${design.style}-3d.png`); notify('PNG exported.'); }
  };
  const exportSvg = () => {
    downloadText(dielineSvgString(dieline, design.unit, `${styleDef.name} dieline`), `box-${design.style}-dieline.svg`, 'image/svg+xml');
    notify('Dieline SVG exported.');
  };
  const print = () => { if (!printSummary(design, results, dieline)) notify('Pop-up blocked: allow pop-ups to print.'); };
  const copy = async () => {
    try { await navigator.clipboard.writeText(summaryText(design, results)); notify('Dimensions copied to clipboard.'); }
    catch { notify('Copy failed: clipboard access was denied.'); }
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-4 py-3">
          <img src={logo} alt="Company logo" className="h-9 w-auto" />
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold text-[#5b3d22]">3D Corrugated Box Designer</h1>
            <p className="truncate text-xs text-neutral-500">Choose a style, enter inside dimensions, inspect and export.</p>
          </div>
          <a href="#/" className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm hover:bg-neutral-50">
            <ArrowLeft size={14} aria-hidden="true" />Back to website
          </a>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1600px] gap-4 p-3 lg:grid-cols-[320px_minmax(0,1fr)_320px] lg:p-5">
        <div className="order-1 min-w-0 lg:order-2">
          <div ref={containerRef} className={`flex flex-col overflow-hidden rounded-2xl ${isFullscreen ? 'h-screen' : ''}  border border-neutral-200 bg-white shadow-sm`}>
            <BoxDesignToolbar
              mode={mode} onModeChange={setMode}
              isOpen={design.isOpen} canOpen={model.canOpen} openLabel={model.openLabel}
              onToggleOpen={() => patch({ isOpen: !design.isOpen })}
              showDimensions={design.showDimensions} onToggleDimensions={() => patch({ showDimensions: !design.showDimensions })}
              viewMode={viewMode} onViewModeChange={setViewMode}
              onResetCamera={() => apiRef.current?.resetCamera()}
              onFullscreen={toggleFullscreen} isFullscreen={isFullscreen}
            />
            <div className={isFullscreen ? 'relative min-h-0 flex-1' : 'relative h-[420px] sm:h-[540px] lg:h-[680px]'}>
              {mode === '3d'
                ? <Box3DViewer model={model} design={design} viewMode={viewMode} apiRef={apiRef} />
                : <Dieline2D dieline={dieline} unit={design.unit} styleName={styleDef.name} />}
            </div>
          </div>
        </div>

        <div className="order-2 min-w-0 space-y-4 lg:order-1">
          <BoxStyleSelector style={design.style} onChange={(style) => patch({ style })} />
          <DimensionInputs
            dimensions={design.dimensions} unit={design.unit} style={design.style} options={design.options}
            onDimensionChange={(k, v) => setDesign((d) => ({ ...d, dimensions: { ...d.dimensions, [k]: v } }))}
            onUnitChange={changeUnit}
            onOptionChange={(k, v) => setDesign((d) => ({ ...d, options: { ...d.options, [k]: v } }))}
          />
        </div>

        <div className="order-3 min-w-0 space-y-4">
          <MeasurementSummary design={design} results={results} />
          <MaterialSettings design={design} onChange={patch} />
          <ExportControls
            hasSaved={hasSaved} is3d={mode === '3d'} status={status}
            onSave={save} onLoad={load} onReset={reset}
            onExportPng={exportPng} onExportSvg={exportSvg} onPrint={print} onCopy={copy}
          />
        </div>
      </main>
    </div>
  );
}
