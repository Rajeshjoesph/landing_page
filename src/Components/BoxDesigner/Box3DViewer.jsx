import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Edges, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import MeasurementArrows from './MeasurementArrows';
import { MM_TO_WORLD } from '../../utils/unitConversion';

// ---- procedural textures (module level helpers keep render bodies pure) ----
function makePaperTexture() {
  const s = 256;
  const c = document.createElement('canvas');
  c.width = c.height = s;
  const g = c.getContext('2d');
  g.fillStyle = '#dcdcdc';
  g.fillRect(0, 0, s, s);
  for (let i = 0; i < 6000; i++) {
    const v = 150 + Math.floor(Math.random() * 90);
    g.fillStyle = `rgba(${v},${v},${v},0.4)`;
    g.fillRect(Math.random() * s, Math.random() * s, 1 + Math.random() * 2, 1);
  }
  g.strokeStyle = 'rgba(90,90,90,0.07)';
  for (let i = 0; i < 140; i++) {
    const y = Math.random() * s, x = Math.random() * s;
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + 20 + Math.random() * 60, y + Math.random() * 2); g.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 3);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function makePrintTexture(text) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 256;
  const g = c.getContext('2d');
  g.strokeStyle = '#2b2118'; g.lineWidth = 8;
  g.strokeRect(14, 14, 484, 228);
  g.fillStyle = '#2b2118';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  let size = 72;
  g.font = `bold ${size}px Arial, sans-serif`;
  while (g.measureText(text).width > 440 && size > 16) { size -= 4; g.font = `bold ${size}px Arial, sans-serif`; }
  g.fillText(text || ' ', 256, 112);
  g.font = '28px Arial, sans-serif';
  g.fillText('HANDLE WITH CARE  ▲  THIS SIDE UP', 256, 200);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const PRESET_COLOR = { kraft: '#b98b5a', white: '#f1efe9' };

function Panel({ part, geometry, material }) {
  return (
    <mesh geometry={geometry} material={material} position={part.position} scale={part.size} castShadow receiveShadow>
      <Edges color="#4a3320" threshold={20} />
    </mesh>
  );
}

function ExtrudePanel({ part, material }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape(part.points.map(([x, y]) => new THREE.Vector2(x, y)));
    return new THREE.ExtrudeGeometry(shape, { depth: part.depth, bevelEnabled: false });
  }, [part.points, part.depth]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <mesh geometry={geometry} material={material} position={[part.x0, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
      <Edges color="#4a3320" threshold={20} />
    </mesh>
  );
}

function renderPart(part, geometry, material) {
  return part.kind === 'extrude'
    ? <ExtrudePanel key={part.id} part={part} material={material} />
    : <Panel key={part.id} part={part} geometry={geometry} material={material} />;
}

function setFlapRotation(g, side, a) {
  g.rotation.set(0, 0, 0);
  if (side === 'front') g.rotation.x = a;
  else if (side === 'back') g.rotation.x = -a;
  else if (side === 'left') g.rotation.z = a;
  else g.rotation.z = -a;
}

function Flap({ flap, t, progressRef, geometry, material }) {
  const ref = useRef(null);
  useFrame(() => {
    if (ref.current) setFlapRotation(ref.current, flap.side, flap.animated ? flap.open * progressRef.current : 0);
  });
  const y = (flap.edge === 'top' ? 1 : -1) * (flap.layer + 0.5) * t;
  const fb = flap.side === 'front' || flap.side === 'back';
  const pos = { front: [0, y, -flap.depth / 2], back: [0, y, flap.depth / 2], left: [flap.depth / 2, y, 0], right: [-flap.depth / 2, y, 0] }[flap.side];
  const size = fb ? [flap.length, t, flap.depth] : [flap.depth, t, flap.length];
  return (
    <group ref={ref} position={flap.pivot}>
      <mesh geometry={geometry} material={material} position={pos} scale={size} castShadow receiveShadow>
        <Edges color="#4a3320" threshold={20} />
      </mesh>
    </group>
  );
}

function Decal({ decal, text, clipPlane, cut }) {
  const map = useMemo(() => makePrintTexture(text), [text]);
  useEffect(() => () => map.dispose(), [map]);
  return (
    <mesh position={decal.position}>
      <planeGeometry args={decal.size} />
      <meshBasicMaterial map={map} transparent polygonOffset polygonOffsetFactor={-2} side={THREE.DoubleSide} clippingPlanes={cut ? [clipPlane] : null} />
    </mesh>
  );
}

function BoxScene({ model, design, viewMode, progressRef, clipPlane }) {
  const paper = useMemo(() => makePaperTexture(), []);
  const unitBox = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  useEffect(() => () => { paper.dispose(); unitBox.dispose(); }, [paper, unitBox]);

  const { appearance } = design;
  const color = appearance.preset === 'custom' ? appearance.color : PRESET_COLOR[appearance.preset];
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color, map: paper, bumpMap: paper, bumpScale: 1.2, roughness: 0.92, metalness: 0,
    side: viewMode === 'solid' ? THREE.FrontSide : THREE.DoubleSide,
    transparent: viewMode === 'transparent', opacity: viewMode === 'transparent' ? 0.35 : 1,
    depthWrite: viewMode !== 'transparent',
    clippingPlanes: viewMode === 'cutaway' ? [clipPlane] : null,
  }), [color, paper, viewMode, clipPlane]);
  useEffect(() => () => material.dispose(), [material]);

  const liftRef = useRef(null);
  const hingeRef = useRef(null);
  useFrame((_, dt) => {
    const target = design.isOpen && model.canOpen ? 1 : 0;
    progressRef.current += (target - progressRef.current) * Math.min(1, dt * 5);
    if (Math.abs(target - progressRef.current) < 0.001) progressRef.current = target;
    if (liftRef.current && model.lift) liftRef.current.position.y = model.lift.closedY + model.lift.rise * progressRef.current;
    if (hingeRef.current && model.hinge) hingeRef.current.rotation.x = -model.hinge.open * progressRef.current;
  });

  const t = model.dims.t;
  const decalOn = appearance.showPrint ? model.decal : null;
  const cut = viewMode === 'cutaway';
  return (
    <group scale={MM_TO_WORLD}>
      {model.statics.map((p) => renderPart(p, unitBox, material))}
      {model.flaps.map((f) => <Flap key={f.id} flap={f} t={t} progressRef={progressRef} geometry={unitBox} material={material} />)}
      {model.lift && (
        <group ref={liftRef} position={[0, model.lift.closedY, 0]}>
          {model.lift.parts.map((p) => renderPart(p, unitBox, material))}
          {decalOn?.target === 'lift' && <Decal decal={decalOn} text={appearance.printText} clipPlane={clipPlane} cut={cut} />}
        </group>
      )}
      {model.hinge && (
        <group ref={hingeRef} position={model.hinge.pivot}>
          {model.hinge.panels.map((p) => renderPart({ ...p, kind: 'box' }, unitBox, material))}
          {model.hinge.children.map((c) => (
            <group key={c.id} position={c.pivot} rotation={[c.rotX, 0, 0]}>
              {c.panels.map((p) => renderPart({ ...p, kind: 'box' }, unitBox, material))}
            </group>
          ))}
        </group>
      )}
      {decalOn?.target === 'root' && <Decal decal={decalOn} text={appearance.printText} clipPlane={clipPlane} cut={cut} />}
      {design.showDimensions && <MeasurementArrows dims={model.dims} bounds={model.bounds} unit={design.unit} />}
    </group>
  );
}

function CameraBridge({ apiRef, framing, style }) {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls);
  const { dist, cy } = framing;

  useEffect(() => {
    const reset = () => {
      camera.position.set(dist * 0.85, dist * 0.65 + cy, dist * 1.05);
      if (controls) { controls.target.set(0, cy, 0); controls.update(); } else camera.lookAt(0, cy, 0);
    };
    apiRef.current = {
      resetCamera: reset,
      capture: () => { gl.render(scene, camera); return gl.domElement.toDataURL('image/png'); },
    };
    return () => { apiRef.current = null; };
  }, [apiRef, gl, scene, camera, controls, dist, cy]);

  // Re-frame whenever the box style changes (or controls first mount).
  useEffect(() => {
    camera.position.set(dist * 0.85, dist * 0.65 + cy, dist * 1.05);
    if (controls) { controls.target.set(0, cy, 0); controls.update(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [style, controls]);
  return null;
}

function Lights({ extent }) {
  const ref = useRef(null);
  useEffect(() => {
    const cam = ref.current?.shadow.camera;
    if (!cam) return;
    cam.left = -extent; cam.right = extent; cam.top = extent; cam.bottom = -extent;
    cam.far = extent * 8;
    cam.updateProjectionMatrix();
  }, [extent]);
  return (
    <>
      <ambientLight intensity={0.55} />
      <hemisphereLight args={['#ffffff', '#c9c2b8', 0.5]} />
      <directionalLight ref={ref} position={[extent * 1.2, extent * 2.2, extent * 1.4]} intensity={1.9} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0004} />
      <directionalLight position={[-extent * 1.5, extent, -extent]} intensity={0.5} />
    </>
  );
}

export default function Box3DViewer({ model, design, viewMode, apiRef }) {
  const progressRef = useRef(0);
  const clipPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, -1), 0), []);
  const { L, W, H } = model.dims;
  const maxDim = Math.max(L, W, H) * MM_TO_WORLD;
  const framing = { dist: maxDim * 2.4 + 2, cy: (H * MM_TO_WORLD) / 2 };
  const groundY = model.bounds.minY * MM_TO_WORLD - 0.01;

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ fov: 40, near: 0.1, far: 500, position: [5, 4, 6] }}
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      onCreated={({ gl }) => { gl.localClippingEnabled = true; }}
      style={{ touchAction: 'none' }}
    >
      <color attach="background" args={['#eceef0']} />
      <Lights extent={Math.max(4, maxDim * 1.6)} />
      <BoxScene model={model} design={design} viewMode={viewMode} progressRef={progressRef} clipPlane={clipPlane} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, groundY, 0]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <shadowMaterial opacity={0.25} />
      </mesh>
      <OrbitControls makeDefault enableDamping dampingFactor={0.1} minDistance={1} maxDistance={120} maxPolarAngle={Math.PI * 0.495} />
      <CameraBridge apiRef={apiRef} framing={framing} style={design.style} />
    </Canvas>
  );
}
