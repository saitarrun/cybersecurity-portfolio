import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vUv = uv;

    // Gentle wave motion
    vec3 pos = position;
    pos.y += sin(uTime * 0.08 + position.x * 0.5) * 0.2;
    pos.x += cos(uTime * 0.06 + position.y * 0.3) * 0.15;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uOpacity;
  varying vec2 vUv;

  // Simplex noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x4 = x_ * ns.x + ns.yyyy;
    vec4 y4 = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x4) - abs(y4);
    vec4 b0 = vec4(x4.xy, y4.xy);
    vec4 b1 = vec4(x4.zw, y4.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec2 uv = vUv;

    // Multi-octave layered noise
    float n1 = snoise(vec3(uv * 1.5, uTime * 0.05)) * 0.5 + 0.5;
    float n2 = snoise(vec3(uv * 3.0, uTime * 0.04)) * 0.5 + 0.5;
    float n3 = snoise(vec3(uv * 0.8, uTime * 0.03)) * 0.5 + 0.5;

    // Blend layers for smooth flow
    float smoke = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
    smoke = pow(smoke, 1.1);

    // Red palette
    vec3 col1 = vec3(1.0, 0.0, 0.1);
    vec3 col2 = vec3(0.85, 0.0, 0.05);
    vec3 color = mix(col1, col2, n1);

    // Soft radial fade
    float dist = length(uv - 0.5);
    float radial = 1.0 - smoothstep(0.0, 0.75, dist);

    // Vertical fade
    float vFade = smoothstep(0.0, 0.2, uv.y) * smoothstep(1.0, 0.8, uv.y);

    float alpha = smoke * radial * vFade * uOpacity;

    gl_FragColor = vec4(color * alpha, alpha);
  }
`;

export function OrangeSmoke() {
  const groupRef = useRef<THREE.Group>(null);

  const uniforms1 = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: 0.3 },
    }),
    []
  );

  const uniforms2 = useMemo(
    () => ({
      uTime: { value: 100 },
      uOpacity: { value: 0.25 },
    }),
    []
  );

  const uniforms3 = useMemo(
    () => ({
      uTime: { value: 200 },
      uOpacity: { value: 0.2 },
    }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    uniforms1.uTime.value = t;
    uniforms2.uTime.value = t + 100;
    uniforms3.uTime.value = t + 200;

    if (groupRef.current) {
      groupRef.current.rotation.z += 0.00008;
    }
  });

  return (
    <group ref={groupRef}>
      {/* First flowing smoke layer */}
      <mesh position={[0, 2, 3]} scale={[12, 10, 1]} frustumCulled={false} renderOrder={1}>
        <planeGeometry args={[1, 1, 64, 64]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms1}
          transparent
          depthTest={false}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </mesh>

      {/* Second flowing smoke layer */}
      <mesh position={[-1.5, 1, 3.2]} scale={[10, 8, 1]} frustumCulled={false} renderOrder={1}>
        <planeGeometry args={[1, 1, 64, 64]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms2}
          transparent
          depthTest={false}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </mesh>

      {/* Third flowing smoke layer */}
      <mesh position={[1.5, 3, 2.8]} scale={[9, 7, 1]} frustumCulled={false} renderOrder={1}>
        <planeGeometry args={[1, 1, 64, 64]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms3}
          transparent
          depthTest={false}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </mesh>
    </group>
  );
}
