'use client';

import React, { useState, useEffect, useRef } from 'react';

interface GlassSettings {
  blur: number;
  saturation: number;
  brightness: number;
  tintOpacity: number;
  borderRadius: number;
}

interface GlassControlsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlassControlsModal({ isOpen, onClose }: GlassControlsProps) {
  const [settings, setSettings] = useState<GlassSettings>({
    blur: 40,
    saturation: 100,
    brightness: 120,
    tintOpacity: 0,
    borderRadius: 40,
  });

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Apply settings to CSS custom properties
    document.documentElement.style.setProperty('--glass-blur', `${settings.blur}px`);
    document.documentElement.style.setProperty('--glass-saturation', `${settings.saturation}%`);
    document.documentElement.style.setProperty('--glass-brightness', `${settings.brightness / 100}`);
    document.documentElement.style.setProperty('--glass-tint-opacity', `${settings.tintOpacity / 100}`);
    document.documentElement.style.setProperty('--glass-border-radius', `${settings.borderRadius}px`);
  }, [settings]);

  useEffect(() => {
    if (isOpen && panelRef.current) {
      // Center the panel when it opens
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
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleChange = (key: keyof GlassSettings, value: number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetDefaults = () => {
    setSettings({
      blur: 40,
      saturation: 100,
      brightness: 120,
      tintOpacity: 0,
      borderRadius: 40,
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Control Panel - Draggable Floating Window */}
      <div
        ref={panelRef}
        className="fixed z-[201] w-96 max-h-[80vh] overflow-hidden glass-strong"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: isDragging ? 'grabbing' : 'default',
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Draggable Header */}
        <div className="drag-handle flex items-center justify-between p-6 pb-4 cursor-grab active:cursor-grabbing">
            <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Glass Controls
            </h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" style={{ color: 'var(--text-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="px-6 pb-6 max-h-[calc(80vh-5rem)] overflow-y-auto">
            <div className="space-y-6">
              {/* Blur */}
              <div>
                <label className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  <span>Blur</span>
                  <span className="font-mono">{settings.blur}px</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={settings.blur}
                  onChange={(e) => handleChange('blur', Number(e.target.value))}
                  className="w-full glass-slider"
                />
              </div>

              {/* Saturation */}
              <div>
                <label className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  <span>Saturation</span>
                  <span className="font-mono">{settings.saturation}%</span>
                </label>
                <input
                  type="range"
                  min="100"
                  max="250"
                  value={settings.saturation}
                  onChange={(e) => handleChange('saturation', Number(e.target.value))}
                  className="w-full glass-slider"
                />
              </div>

              {/* Brightness */}
              <div>
                <label className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  <span>Brightness</span>
                  <span className="font-mono">{settings.brightness}%</span>
                </label>
                <input
                  type="range"
                  min="90"
                  max="120"
                  value={settings.brightness}
                  onChange={(e) => handleChange('brightness', Number(e.target.value))}
                  className="w-full glass-slider"
                />
              </div>

              {/* Tint Opacity */}
              <div>
                <label className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  <span>Tint Opacity</span>
                  <span className="font-mono">{settings.tintOpacity}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={settings.tintOpacity}
                  onChange={(e) => handleChange('tintOpacity', Number(e.target.value))}
                  className="w-full glass-slider"
                />
              </div>

              {/* Border Radius */}
              <div>
                <label className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  <span>Border Radius</span>
                  <span className="font-mono">{settings.borderRadius}px</span>
                </label>
                <input
                  type="range"
                  min="8"
                  max="64"
                  value={settings.borderRadius}
                  onChange={(e) => handleChange('borderRadius', Number(e.target.value))}
                  className="w-full glass-slider"
                />
              </div>

              {/* Reset Button */}
              <button
                onClick={resetDefaults}
                className="w-full py-3 px-4 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]"
                style={{
                  color: 'var(--text-primary)',
                  background: 'rgba(255, 255, 255, 0.1)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
    </>
  );
}
