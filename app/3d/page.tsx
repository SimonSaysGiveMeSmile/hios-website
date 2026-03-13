'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useEnvironment, useGLTF, Preload } from '@react-three/drei';
import * as THREE from 'three';

function IPhoneModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { gl } = useThree();

  const { scene } = useGLTF('/3d/iphone17pro/kbeEpEkAZVEQIzQ.gltf');

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  return (
    <primitive
      ref={groupRef}
      object={scene}
      scale={0.25}
      position={[0, -0.15, 0]}
    />
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#a0c4ff" />
      <pointLight position={[0, 5, 0]} intensity={0.5} />
    </>
  );
}

function LoadingScreen() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
          style={{ borderColor: 'var(--text-secondary)', borderTopColor: 'transparent' }}
        />
        <p style={{ color: 'var(--text-secondary)' }}>Loading 3D Model...</p>
      </div>
    </div>
  );
}

function Scene() {
  return (
    <>
      <Lights />
      <Suspense fallback={null}>
        <IPhoneModel />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={0.5}
        maxDistance={10}
        enableDamping
        dampingFactor={0.05}
        autoRotate
        autoRotateSpeed={0.5}
        makeDefault
      />
      <Preload all />
    </>
  );
}

function ModelViewer() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['transparent']} />
        <fog attach="fog" args={['#000000', 8, 20]} />
        <Scene />
      </Canvas>
    </div>
  );
}

export default function ThreeDPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--color-bg)' }}
      >
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'var(--color-bg)',
      }}
    >
      {/* Navigation Bar */}
      <nav className="fixed top-6 left-0 right-0 z-50 px-6" style={{ zIndex: 100 }}>
        <div
          className="max-w-5xl mx-auto px-8 py-4 liquidGlass-wrapper"
          style={{ borderRadius: '9999px' }}
        >
          <div className="flex items-center justify-between w-full">
            <a
              href="/"
              className="flex items-center justify-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <img src="/logo.svg" alt="HiOS Logo" className="w-full h-full logo-img" />
              </div>
              <span className="font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>
                HiOS
              </span>
            </a>

            <div className="flex items-center gap-4">
              <a
                href="/"
                className="text-sm font-medium px-4 py-2 rounded-full transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* 3D Viewer Container */}
      <div
        className="relative w-full"
        style={{
          height: '100vh',
          paddingTop: '100px',
        }}
      >
        {/* Title */}
        <div
          className="absolute top-32 left-0 right-0 text-center z-10"
          style={{ pointerEvents: 'none' }}
        >
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              color: 'var(--text-primary)',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            iPhone 17 Pro
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Drag to rotate • Scroll to zoom
          </p>
        </div>

        {/* 3D Canvas */}
        <div className="w-full" style={{ height: 'calc(100vh - 100px)' }}>
          <ModelViewer />
        </div>
      </div>
    </div>
  );
}