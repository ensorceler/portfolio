"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  useAnimations,
  ContactShadows,
  BakeShadows,
  useProgress,
  Html,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  EffectComposer,
  Bloom,
  Vignette,
  SSAO,
  ToneMapping,
  ColorAverage,
  N8AO,
} from "@react-three/postprocessing";
import { BlendFunction, ToneMappingMode } from "postprocessing";
import { Color } from "three";
import TokyoModel from "./TokyoModel.tsx";
import DragonModel from "./DragonModel.tsx";
import useSoundEffect from "../hooks/useSoundEffect.tsx";

function LoadingSpinner() {
  return (
    <Html center>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
    </Html>
  );
}

export default function MainScene() {
  const { active, progress } = useProgress();
  const [hasPlayed, setHasPlayed] = useState(false);

  // Initialize sound with optimized hook
  const completionSound = useSoundEffect("/sounds/dragon.mp3", {
    volume: 0.1,
    resetOnPlay: true,
  });

  // Use separate hook for background music if needed
  const backgroundMusic = useSoundEffect("/sounds/dragon.mp3", {
    volume: 0.1,
    loop: true,
  });

  // Play sound when model is loaded
  useEffect(() => {
    //console.log("model loaded");
    if (!active && progress === 100 && !hasPlayed && completionSound.isLoaded) {
      console.log("play sound");
      completionSound.play();
      // Optionally start background music after completion sound
      setTimeout(() => backgroundMusic.play(), 1000);
      setHasPlayed(true);
    }
  }, [active, progress, hasPlayed, completionSound]);

  return (
    <div className="max-w-2xl w-full h-[280px] ml-auto mr-auto px-4">
      <Canvas
        shadows
        camera={{ position: [0, 1.5, 3], fov: 45 }}
        gl={{
          antialias: true,
          toneMapping: 4, // ACESFilmicToneMapping
          toneMappingExposure: 1.2,
        }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <DragonModel />
        </Suspense>

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          //minPolarAngle={Math.PI / 6} // Limit how high the camera can go
          //maxPolarAngle={Math.PI / 2} // Limit how low the camera can go
        />

        {/* Post-processing effects */}
        <EffectComposer enableNormalPass>
          {/* Bloom effect for the strong sun highlights */}
          <Bloom
            intensity={0.3}
            luminanceThreshold={0.85}
            luminanceSmoothing={0.9}
            height={300}
          />
          {/* Tone mapping for a more realistic look */}
          <ToneMapping
            blendFunction={BlendFunction.NORMAL}
            adaptive={true}
            resolution={256}
            middleGrey={0.6}
            maxLuminance={16.0}
            averageLuminance={1.0}
            adaptationRate={1.0}
            mode={ToneMappingMode.REINHARD2}
          />

          {/* Subtle vignette */}
          <Vignette
            offset={0.5}
            darkness={0.5}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>
        <BakeShadows />
      </Canvas>
    </div>
  );
}
