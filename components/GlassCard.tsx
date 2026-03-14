'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const LiquidGlass = dynamic(
  () => import('@/lib/liquid-glass-react'),
  { ssr: false }
);

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'subtle';
  useLiquidGlass?: boolean;
}

const containerStyle: React.CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  border: 'none',
  borderRadius: 'var(--glass-border-radius)',
  isolation: 'isolate' as const,
};

const blurSpanStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  backdropFilter: 'blur(1px) saturate(140%)',
  WebkitBackdropFilter: 'blur(1px) saturate(140%)',
  background: 'transparent',
  pointerEvents: 'none',
  zIndex: 0,
};

const contentStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 1,
};

export default function GlassCard({
  children,
  className = '',
  variant = 'default',
  useLiquidGlass = false
}: GlassCardProps) {
  if (useLiquidGlass) {
    return (
      <LiquidGlass
        className={className}
        cornerRadius={24}
        padding="24px"
        displacementScale={50}
        blurAmount={0.05}
        saturation={160}
        aberrationIntensity={1.5}
        elasticity={0.1}
      >
        {children}
      </LiquidGlass>
    );
  }

  return (
    <div
      className={`liquidGlass-wrapper ${className}`}
      style={containerStyle}
    >
      <span style={blurSpanStyle} />
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
}
