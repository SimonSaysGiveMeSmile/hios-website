'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Use Next.js dynamic import with SSR disabled
const LiquidGlass = dynamic(
  () => import('@/lib/liquid-glass-react'),
  {
    ssr: false,
    loading: () => (
      <div
        className="animate-pulse bg-white/10 rounded-3xl h-14 flex items-center justify-center"
        style={{
          backdropFilter: 'blur(1px) saturate(140%)',
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <span className="text-white/70">Loading...</span>
      </div>
    )
  }
);

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  overLight?: boolean;
  mode?: 'standard' | 'polar' | 'prominent' | 'shader';
}

export default function LiquidGlassButton({
  children,
  className = '',
  onClick,
  overLight = false,
  mode = 'standard',
}: LiquidGlassButtonProps) {
  return (
    <div className={className}>
      <LiquidGlass
        cornerRadius={40}
        padding="16px 32px"
        displacementScale={70}
        blurAmount={0.0625}
        saturation={140}
        aberrationIntensity={2}
        elasticity={0.15}
        overLight={overLight}
        mode={mode}
        onClick={onClick}
      >
        {children}
      </LiquidGlass>
    </div>
  );
}