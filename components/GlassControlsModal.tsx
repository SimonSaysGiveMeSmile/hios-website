'use client';

import React, { useState, useEffect, useRef } from 'react';

type Mode = 'standard' | 'polar' | 'prominent' | 'shader';

interface GlassSettings {
  mode: Mode;
  displacementScale: number;
  blurAmount: number;
  saturation: number;
  aberrationIntensity: number;
  elasticity: number;
  cornerRadius: number;
  overLight: boolean;
}

interface GlassControlsProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_SETTINGS: GlassSettings = {
  mode: 'standard',
  displacementScale: 100,
  blurAmount: 0.5,
  saturation: 140,
  aberrationIntensity: 2,
  elasticity: 0,
  cornerRadius: 32,
  overLight: false,
};

export default function GlassControlsModal({ isOpen, onClose }: GlassControlsProps) {
  const [settings, setSettings] = useState<GlassSettings>({ ...DEFAULT_SETTINGS });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  // Apply settings to CSS custom properties
  useEffect(() => {
    const root = document.documentElement;
    const computedBlur = 4 + settings.blurAmount * 32;
    root.style.setProperty('--glass-blur', `${computedBlur}px`);
    root.style.setProperty('--glass-saturation', `${settings.saturation}%`);
    root.style.setProperty('--glass-border-radius', `${settings.cornerRadius}px`);

    const backdropFilterValue = `blur(${computedBlur}px) saturate(${settings.saturation}%)`;
    document.querySelectorAll('.liquidGlass-wrapper, .glass, .glass-strong, .glass-subtle, .glass-nav').forEach((el) => {
      const element = el as HTMLElement;
      element.style.backdropFilter = backdropFilterValue;
      (element.style as any).webkitBackdropFilter = backdropFilterValue;
      if (element.classList.contains('liquidGlass-wrapper')) {
        const br = element.style.borderRadius;
        if (!br || br === '9999px') { /* keep pill */ } else {
          element.style.borderRadius = `${settings.cornerRadius}px`;
        }
      }
    });
  }, [settings]);

  useEffect(() => {
    if (isOpen && panelRef.current) {
      const rect = panelRef.current.getBoundingClientRect();
      setPosition({
        x: (window.innerWidth - rect.width) / 2,
        y: (window.innerHeight - rect.height) / 2,
      });
    }
  }, [isOpen]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.drag-handle')) {
      setIsDragging(true);
      setDragOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) setPosition({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
    };
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleChange = <K extends keyof GlassSettings>(key: K, value: GlassSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (!isOpen) return null;

  const modes: { value: Mode; label: string }[] = [
    { value: 'standard', label: 'Standard' },
    { value: 'polar', label: 'Polar' },
    { value: 'prominent', label: 'Prominent' },
    { value: 'shader', label: 'Shader (Experimental)' },
  ];

  return (
    <div
      ref={panelRef}
      className="fixed z-[201] w-96 max-h-[85vh] overflow-hidden glass-strong"
      style={{ left: `${position.x}px`, top: `${position.y}px`, cursor: isDragging ? 'grabbing' : 'default' }}
      onMouseDown={handleMouseDown}
    >
      <div className="drag-handle flex items-center justify-between p-6 pb-4 cursor-grab active:cursor-grabbing">
        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>Glass Controls</h3>
        <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors" aria-label="Close">
          <svg className="w-5 h-5" style={{ color: 'var(--text-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="px-6 pb-6 max-h-[calc(85vh-6rem)] overflow-y-auto">
        <div className="space-y-8">
          {/* Refraction Mode */}
          <div>
            <span className="block text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Refraction Mode</span>
            <div className="space-y-2">
              {modes.map((m) => (
                <div key={m.value} className="flex items-center space-x-3">
                  <input type="radio" id={`ctrl-mode-${m.value}`} name="ctrl-mode" value={m.value}
                    checked={settings.mode === m.value} onChange={() => handleChange('mode', m.value)}
                    className="w-4 h-4 accent-blue-500" />
                  <label htmlFor={`ctrl-mode-${m.value}`} className="text-sm" style={{ color: 'var(--text-secondary)' }}>{m.label}</label>
                </div>
              ))}
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>Controls the refraction calculation method</p>
          </div>

          <Slider label="Displacement Scale" value={settings.displacementScale} onChange={(v) => handleChange('displacementScale', v)}
            min={0} max={200} step={1} color="text-blue-300" desc="Controls the intensity of edge distortion" />

          <Slider label="Blur Amount" value={settings.blurAmount} onChange={(v) => handleChange('blurAmount', v)}
            min={0} max={1} step={0.01} color="text-green-300" fmt={(v) => v.toFixed(1)} desc="Controls backdrop blur intensity" />

          <Slider label="Saturation" value={settings.saturation} onChange={(v) => handleChange('saturation', v)}
            min={100} max={300} step={10} color="text-purple-300" suffix="%" desc="Controls color saturation of the backdrop" />

          <Slider label="Chromatic Aberration" value={settings.aberrationIntensity} onChange={(v) => handleChange('aberrationIntensity', v)}
            min={0} max={20} step={1} color="text-cyan-300" desc="Controls RGB channel separation intensity" />

          <Slider label="Elasticity" value={settings.elasticity} onChange={(v) => handleChange('elasticity', v)}
            min={0} max={1} step={0.05} color="text-orange-300" fmt={(v) => v.toFixed(2)} desc="Controls how much the glass reaches toward the cursor" />

          <Slider label="Corner Radius" value={settings.cornerRadius} onChange={(v) => handleChange('cornerRadius', v)}
            min={0} max={100} step={1} color="text-pink-300" fmt={(v) => `${v}px`} desc="Controls the roundness of the glass corners" />

          {/* Over Light */}
          <div>
            <span className="block text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Over Light</span>
            <div className="flex items-center space-x-3">
              <input type="checkbox" id="ctrl-overlight" checked={settings.overLight}
                onChange={(e) => handleChange('overLight', e.target.checked)} className="w-5 h-5 accent-blue-500" />
              <label htmlFor="ctrl-overlight" className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Tint liquid glass dark (use for bright backgrounds)
              </label>
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
              Makes the glass darker for better visibility on light backgrounds
            </p>
          </div>
        </div>

        <button
          onClick={() => setSettings({ ...DEFAULT_SETTINGS })}
          className="w-full mt-6 py-3 px-4 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]"
          style={{ color: 'var(--text-primary)', background: 'rgba(255, 255, 255, 0.1)' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}

function Slider({ label, value, onChange, min, max, step, color, fmt, suffix, desc }: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; color: string;
  fmt?: (v: number) => string; suffix?: string; desc: string;
}) {
  return (
    <div>
      <span className="block text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{label}</span>
      <div className="mb-2">
        <span className={`text-xl font-mono ${color}`}>{fmt ? fmt(value) : `${value}`}{suffix || ''}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))} className="w-full glass-slider" />
      <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>{desc}</p>
    </div>
  );
}
