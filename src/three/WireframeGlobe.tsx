import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLOBE_RADIUS, GLOBE_DETAIL } from './constants';

interface Props {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

export function WireframeGlobe({ mouse }: Props) {
  const groupRef = useRef<THREE.Group>(null!);
  const pointsRef = useRef<THREE.Points>(null!);

  const pointsGeometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(GLOBE_RADIUS, GLOBE_DETAIL);
    const positions = geo.attributes.position;
    // Keep only unique-ish vertices for dots
    const seen = new Set<string>();
    const filtered: number[] = [];
    for (let i = 0; i < positions.count; i++) {
      const key = `${Math.round(positions.getX(i) * 10)},${Math.round(positions.getY(i) * 10)},${Math.round(positions.getZ(i) * 10)}`;
      if (!seen.has(key)) {
        seen.add(key);
        filtered.push(positions.getX(i), positions.getY(i), positions.getZ(i));
      }
    }
    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute('position', new THREE.Float32BufferAttribute(filtered, 3));
    return pointGeo;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08 + mouse.current.x * 0.3;
      groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.1 + mouse.current.y * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[3.5, 0, -2]}>
      {/* Wireframe sphere */}
      <mesh>
        <icosahedronGeometry args={[GLOBE_RADIUS, GLOBE_DETAIL]} />
        <meshBasicMaterial color="#F97316" wireframe transparent opacity={0.08} />
      </mesh>

      {/* Glowing dots at vertices */}
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial color="#F97316" size={0.04} transparent opacity={0.6} sizeAttenuation />
      </points>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 0.4, 16, 16]} />
        <meshBasicMaterial color="#F97316" transparent opacity={0.03} />
      </mesh>
    </group>
  );
}
