import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { DielineSvg } from '../Components/BoxDesigner/Dieline2D';
import { getStyle } from './boxGeometry';
import { formatValue, roundTo } from './unitConversion';

export function downloadUrl(url, filename) {
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
}

export function downloadText(text, filename, mime) {
  const url = URL.createObjectURL(new Blob([text], { type: mime }));
  downloadUrl(url, filename);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const dielineSvgString = (dieline, unit, title) =>
  renderToStaticMarkup(createElement(DielineSvg, { dieline, unit, title }));

export function summaryText(design, r) {
  const f = (mm) => formatValue(mm, design.unit);
  const s = getStyle(design.style);
  return [
    `${s.name} (${s.short})`,
    `Inside L x W x H: ${f(r.dimsMm.L)} x ${f(r.dimsMm.W)} x ${f(r.dimsMm.H)}`,
    `Outside (est.): ${f(r.external.length)} x ${f(r.external.width)} x ${f(r.external.height)}`,
    `Board: ${r.boardLabel}, ${design.fluteType === 'custom' ? 'custom' : design.fluteType + ' flute'}, ${design.boardThickness} mm`,
    `Internal volume: ${roundTo(r.volumeLitres, 2)} L`,
    `Blank (est.): ${f(r.blank.width)} x ${f(r.blank.height)}`,
    `Board area (est.): ${roundTo(r.netAreaM2, 3)} m2`,
  ].join('\n');
}

export function printSummary(design, r, dieline) {
  const w = window.open('', '_blank');
  if (!w) return false;
  const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  w.document.write(`<!doctype html><title>Box design summary</title>
<style>body{font-family:Arial,sans-serif;margin:24px;color:#222}pre{font-size:14px;line-height:1.6;background:#f6f3ee;padding:12px;border-radius:8px}h1{font-size:20px}</style>
<h1>Box design summary</h1><pre>${esc(summaryText(design, r))}</pre>
${dielineSvgString(dieline, design.unit, 'Dieline')}
<p style="color:#8a1c1c;font-size:12px">${esc(r.notes.join(' '))}</p>`);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 300);
  return true;
}
