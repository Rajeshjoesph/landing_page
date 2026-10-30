import { Box, Maximize2, Minimize2, PackageOpen, Package, Ruler, RotateCcw, Scissors, Eye } from 'lucide-react';

const VIEW_MODES = [['solid', 'Solid'], ['transparent', 'Transparent'], ['cutaway', 'Cutaway']];

function Btn({ onClick, active, disabled, icon, children, title }) {
  const Icon = icon;
  return (
    <button type="button" onClick={onClick} disabled={disabled} title={title} aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5e34] disabled:cursor-not-allowed disabled:opacity-40 ${active ? 'border-[#8b5e34] bg-[#8b5e34] text-white' : 'border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50'}`}>
      <Icon size={14} aria-hidden="true" />{children}
    </button>
  );
}

export default function BoxDesignToolbar({ mode, onModeChange, isOpen, canOpen, openLabel, onToggleOpen, showDimensions, onToggleDimensions, viewMode, onViewModeChange, onResetCamera, onFullscreen, isFullscreen }) {
  const is3d = mode === '3d';
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-neutral-200 bg-white p-2">
      <div className="inline-flex gap-1" role="group" aria-label="Preview type">
        <Btn icon={Box} active={is3d} onClick={() => onModeChange('3d')}>3D Preview</Btn>
        <Btn icon={Scissors} active={!is3d} onClick={() => onModeChange('2d')}>2D Dieline</Btn>
      </div>
      <span className="hidden h-5 w-px bg-neutral-300 sm:block" />
      <Btn icon={isOpen ? Package : PackageOpen} disabled={!is3d || !canOpen} active={isOpen && canOpen} onClick={onToggleOpen}
        title={canOpen ? '' : 'This style has no lid or flaps to animate'}>
        {canOpen ? `${isOpen ? 'Close' : 'Open'} ${openLabel.toLowerCase()}` : 'Open / close'}
      </Btn>
      <Btn icon={Ruler} disabled={!is3d} active={showDimensions} onClick={onToggleDimensions}>Dimensions</Btn>
      <div className="inline-flex items-center gap-1" role="group" aria-label="Material view">
        <Eye size={14} className="text-neutral-500" aria-hidden="true" />
        {VIEW_MODES.map(([id, label]) => <Btn key={id} icon={() => null} disabled={!is3d} active={viewMode === id} onClick={() => onViewModeChange(id)}>{label}</Btn>)}
      </div>
      <div className="ml-auto inline-flex gap-1">
        <Btn icon={RotateCcw} disabled={!is3d} onClick={onResetCamera}>Reset view</Btn>
        <Btn icon={isFullscreen ? Minimize2 : Maximize2} onClick={onFullscreen}>{isFullscreen ? 'Exit' : 'Full screen'}</Btn>
      </div>
    </div>
  );
}
