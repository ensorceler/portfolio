import {ContactShadows, useAnimations, useGLTF} from "@react-three/drei";
import {useEffect, useRef} from "react";
import {Color} from "three";

export default function TokyoModel() {
    const gltf = useGLTF("/models/LittlestTokyo.glb");
    const modelRef = useRef(null);
    const { actions, names } = useAnimations(gltf.animations, gltf.scene);
    const sunLightRef = useRef(null);

    // Play animations if available
    useEffect(() => {
        if (names.length > 0) {
            console.log("Model has animations:", names);
            actions[names[0]].play();
        } else {
            console.log("Model has no animations.");
        }
    }, [actions, names]);

    // Setup model properties
    useEffect(() => {
        // Enable shadows for the entire scene
        if (gltf.scene) {
            gltf.scene.traverse((child:any) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;

                    // Enhance material properties for better lighting response
                    if (child.material) {
                        child.material.roughness = Math.max(0.4, child.material.roughness || 0.5);
                        child.material.metalness = Math.min(0.8, child.material.metalness || 0.5);
                    }
                }
            });
        }
    }, [gltf.scene]);

    // Slow rotation
    useEffect(() => {
        const timer = setInterval(() => {
            if (modelRef.current) {
                modelRef.current.rotation.y += 0.001;
            }
        }, 16);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            {/* Strong directional sunlight */}
            <directionalLight
                ref={sunLightRef}
                position={[3, 10, 3]}
                intensity={12}
                color={new Color(1, 0.95, 0.85)} // Warm sunlight color
                castShadow={true}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />

            {/* Softer fill light from opposite direction */}
            <directionalLight
                position={[-5, 8, -5]}
                intensity={10}
                color={new Color(0.9, 0.95, 1)} // Slightly cooler fill light
            />

            {/* Ambient light for base illumination */}
            <ambientLight intensity={6}
                color={new Color(0.8, 0.85, 1)}
            />

            {/* The actual model */}
            <primitive
                ref={modelRef}
                object={gltf.scene}
                scale={[0.01, 0.01, 0.01]}
                position={[0, 0, 0]} // Slightly lowered to show more shadow below
                castShadow
                receiveShadow
            />

            {/* Contact shadows for more definition */}
            {/*

            */}
        </>
    );
}

// Preload the model
useGLTF.preload("/models/LittlestTokyo.glb");
