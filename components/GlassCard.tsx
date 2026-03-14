'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Use LiquidGlass for enhanced glass effect
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

export default function GlassCard({
  children,
  className = '',
  variant = 'default',
  useLiquidGlass = false
}: GlassCardProps) {
  const variantClass = {
    default: 'liquid-glass',
    strong: 'liquid-glass liquid-glass--strong',
    subtle: 'liquid-glass liquid-glass--subtle',
  }[variant];

  // Use LiquidGlass component for the enhanced effect
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
    <div className={`${variantClass} ${className}`}>
      {children}
    </div>
  );
}