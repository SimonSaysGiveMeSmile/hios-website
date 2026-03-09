'use client';

import React, { useEffect, useRef, useState } from 'react';
import { GlassContainer } from '@/lib/glass/GlassContainer';

interface WebGLGlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'subtle';
}

export default function WebGLGlassCard({ children, className = '', variant = 'default' }: WebGLGlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glassRef = useRef<GlassContainer | null>(null);
  const [settings, setSettings] = useState({
    blur: 40,
    saturation: 100,
    brightness: 120,
    tintOpacity: 0,
    borderRadius: 40,
  });

  // Adjust settings based on variant
  useEffect(() => {
    const variantSettings = {
      default: { blur: 40, saturation: 100, brightness: 120 },
      strong: { blur: 48, saturation: 120, brightness: 125 },
      subtle: { blur: 32, saturation: 90, brightness: 115 },
    }[variant];

    setSettings(prev => ({ ...prev, ...variantSettings }));
  }, [variant]);

  // Listen for global settings changes
  useEffect(() => {
    const handleSettingsChange = () => {
      const root = document.documentElement;
      const blur = parseFloat(root.style.getPropertyValue('--glass-blur')) || 40;
      const saturation = parseFloat(root.style.getPropertyValue('--glass-saturation')) || 100;
      const brightness = parseFloat(root.style.getPropertyValue('--glass-brightness')) * 100 || 120;
      const tintOpacity = parseFloat(root.style.getPropertyValue('--glass-tint-opacity')) * 100 || 0;
      const borderRadius = parseFloat(root.style.getPropertyValue('--glass-border-radius')) || 40;

      setSettings({ blur, saturation, brightness, tintOpacity, borderRadius });
    };

    // Check for changes periodically
    const interval = setInterval(handleSettingsChange, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    // Initialize glass container
    glassRef.current = new GlassContainer(ref.current, settings);

    return () => {
      glassRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (glassRef.current) {
      glassRef.current.updateSettings(settings);
    }
  }, [settings]);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{
        borderRadius: `${settings.borderRadius}px`,
        overflow: 'hidden',
      }}
    >
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
