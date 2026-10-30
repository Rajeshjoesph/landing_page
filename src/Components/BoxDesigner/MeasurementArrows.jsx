import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';
import { formatValue } from '../../utils/unitConversion';

const UP = new THREE.Vector3(0, 1, 0);

function makeLabelTexture(text, color) {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 64;
  const g = c.getContext('2d');
  g.fillStyle = 'rgba(255,255,255,0.95)';
  g.beginPath(); g.roundRect(2, 2, 252, 60, 12); g.fill();
  g.strokeStyle = 'rgba(0,0,0,0.15)'; g.lineWidth = 2; g.stroke();
  g.fillStyle = color; g.font = 'bold 32px Arial, sans-serif';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(text, 128, 33);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function Label({ position, text, color }) {
  const map = useMemo(() => makeLabelTexture(text, color), [text, color]);
  useEffect(() => () => map.dispose(), [map]);
  return (
    <sprite position={position} scale={[11, 2.75, 1]} renderOrder={30}>
      <spriteMaterial map={map} depthTest={false} sizeAttenuation={false} transparent toneMapped={false} />
    </sprite>
  );
}

function Head({ at, dir, len, radius, color }) {
  const q = useMemo(() => new THREE.Quaternion().setFromUnitVectors(UP, dir), [dir]);
  const pos = useMemo(() => at.clone().addScaledVector(dir, -len / 2), [at, dir, len]);
  return (
    <mesh position={pos} quaternion={q} renderOrder={20}>
      <coneGeometry args={[radius, len, 12]} />
      <meshBasicMaterial color={color} depthTest={false} />
    </mesh>
  );
}

function DimArrow({ from, to, ext, color, label, head, shift }) {
  const a = useMemo(() => new THREE.Vector3(...from), [from]);
  const b = useMemo(() => new THREE.Vector3(...to), [to]);
  const dir = useMemo(() => b.clone().sub(a).normalize(), [a, b]);
  const back = useMemo(() => dir.clone().negate(), [dir]);
  const mid = useMemo(() => a.clone().add(b).multiplyScalar(0.5).add(new THREE.Vector3(...shift)), [a, b, shift]);
  return (
    <group>
      <Line points={[from, to]} color={color} lineWidth={2} depthTest={false} renderOrder={19} />
      {ext.map((e, i) => <Line key={i} points={e} color={color} lineWidth={1} dashed dashSize={6} gapSize={4} depthTest={false} renderOrder={19} />)}
      <Head at={b} dir={dir} len={head} radius={head * 0.32} color={color} />
      <Head at={a} dir={back} len={head} radius={head * 0.32} color={color} />
      <Label position={mid} text={label} color={color} />
    </group>
  );
}

// All coordinates in millimetres (parent group applies the mm -> world scale).
export default function MeasurementArrows({ dims, bounds, unit }) {
  const { L, W, H } = dims;
  const maxDim = Math.max(L, W, H);
  const off = Math.max(35, maxDim * 0.08);
  const head = Math.max(10, maxDim * 0.04);
  const y = bounds.minY;
  const zF = bounds.maxZ + off, xR = bounds.maxX + off;
  return (
    <group>
      <DimArrow color="#b4531f" label={`L: ${formatValue(L, unit)}`} head={head}
        from={[-L / 2, y, zF]} to={[L / 2, y, zF]} shift={[0, 0, off * 0.7]}
        ext={[[[-L / 2, y, bounds.maxZ], [-L / 2, y, zF + 8]], [[L / 2, y, bounds.maxZ], [L / 2, y, zF + 8]]]} />
      <DimArrow color="#1f6f8b" label={`W: ${formatValue(W, unit)}`} head={head}
        from={[xR, y, -W / 2]} to={[xR, y, W / 2]} shift={[off * 0.9, 0, 0]}
        ext={[[[bounds.maxX, y, -W / 2], [xR + 8, y, -W / 2]], [[bounds.maxX, y, W / 2], [xR + 8, y, W / 2]]]} />
      <DimArrow color="#5b4a8a" label={`H: ${formatValue(H, unit)}`} head={head}
        from={[xR, 0, zF]} to={[xR, H, zF]} shift={[off * 0.6, 0, off * 0.6]}
        ext={[[[bounds.maxX, 0, bounds.maxZ], [xR + 8, 0, zF]], [[bounds.maxX, H, bounds.maxZ], [xR + 8, H, zF]]]} />
    </group>
  );
}
