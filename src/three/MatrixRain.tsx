import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COLUMNS = 50;
const ROWS = 30;
const TOTAL = COLUMNS * ROWS;

export function MatrixRain() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const data = useMemo(() => {
    const arr = [];
    for (let i = 0; i < COLUMNS; i++) {
      const x = (i - COLUMNS / 2) * 0.5;
      const speed = 0.8 + Math.random() * 2.5;
      const offset = Math.random() * 25;
      for (let j = 0; j < ROWS; j++) {
        arr.push({
          x,
          y: 14 - j * 0.7 + offset,
          speed,
          flickerRate: 0.5 + Math.random() * 3,
          flickerOffset: Math.random() * Math.PI * 2,
        });
      }
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < TOTAL; i++) {
      const d = data[i];

      // Move down
      d.y -= d.speed * delta;
      if (d.y < -14) {
        d.y = 14 + Math.random() * 4;
      }

      // Flicker opacity via scale
      const flicker = Math.sin(t * d.flickerRate + d.flickerOffset);
      const normalizedY = (d.y + 14) / 28;
      const baseScale = 0.06 + normalizedY * 0.08;
      const scale = flicker > 0.3 ? baseScale : baseScale * 0.2;

      dummy.position.set(d.x, d.y, -6);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, TOTAL]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial
        color="#F97316"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
