import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

export function PostEffects() {
  return (
    <EffectComposer>
      <Bloom intensity={0.6} luminanceThreshold={0.3} luminanceSmoothing={0.9} mipmapBlur={false} />
      <Vignette eskil={false} offset={0.1} darkness={0.6} />
    </EffectComposer>
  );
}
