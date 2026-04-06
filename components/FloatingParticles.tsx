'use client'

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 60;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.02;
      meshRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#c4a265"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

const FloatingParticles = ({ className = "" }: { className?: string })=> {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}


export default FloatingParticles;