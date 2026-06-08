import { Float } from '@react-three/drei';

const shapes = [
  {
    position: [-4, 2.5, -1] as [number, number, number],
    rotation: [0.4, 0.8, 0] as [number, number, number],
    scale: 0.3,
    speed: 1.5,
  },
  {
    position: [-3, -2, 1] as [number, number, number],
    rotation: [1, 0.2, 0.5] as [number, number, number],
    scale: 0.2,
    speed: 2,
  },
  {
    position: [5, 3, -3] as [number, number, number],
    rotation: [0.3, 1.2, 0] as [number, number, number],
    scale: 0.25,
    speed: 1.8,
  },
  {
    position: [4, -2.5, 0] as [number, number, number],
    rotation: [0, 0.5, 1] as [number, number, number],
    scale: 0.18,
    speed: 2.2,
  },
  {
    position: [-5.5, 0, -2] as [number, number, number],
    rotation: [0.7, 0, 0.3] as [number, number, number],
    scale: 0.22,
    speed: 1.2,
  },
];

const geometries = [
  <octahedronGeometry key="oct" args={[1, 0]} />,
  <tetrahedronGeometry key="tet" args={[1, 0]} />,
  <icosahedronGeometry key="ico" args={[1, 0]} />,
  <dodecahedronGeometry key="dod" args={[1, 0]} />,
  <torusGeometry key="tor" args={[1, 0.4, 8, 16]} />,
];

export function FloatingGeometry() {
  return (
    <group>
      {shapes.map((shape, i) => (
        <Float
          key={i}
          speed={shape.speed}
          rotationIntensity={1.5}
          floatIntensity={1}
          position={shape.position}
        >
          <mesh rotation={shape.rotation} scale={shape.scale}>
            {geometries[i]}
            <meshBasicMaterial color="#F97316" wireframe transparent opacity={0.25} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}
