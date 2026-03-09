'use client';

import React, { useState, useEffect } from 'react';

interface GlassSettings {
  blur: number;
  saturation: number;
  brightness: number;
  tintOpacity: number;
  borderRadius: number;
}

export default function GlassControls() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<GlassSettings>({
    blur: 40,
    saturation: 100,
    brightness: 120,
    tintOpacity: 0,
    borderRadius: 40,
  });

  useEffect(() => {
    // Apply settings to CSS custom properties
    document.documentElement.style.setProperty('--glass-blur', `${settings.blur}px`);
    document.documentElement.style.setProperty('--glass-saturation', `${settings.saturation}%`);
    document.documentElement.style.setProperty('--glass-brightness', `${settings.brightness / 100}`);
    document.documentElement.style.setProperty('--glass-tint-opacity', `${settings.tintOpacity / 100}`);
    document.documentElement.style.setProperty('--glass-border-radius', `${settings.borderRadius}px`);
  }, [settings]);

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

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-64 right-1 z-[100] w-14 h-14 rounded-full liquidGlass-wrapper flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Toggle glass controls"
      >
        <div className="liquidGlass-effect rounded-full" />
        <div className="liquidGlass-tint rounded-full" />
        <div className="liquidGlass-shine rounded-full" />
        <div className="liquidGlass-text">
          <svg className="w-6 h-6" style={{ color: 'var(--text-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
      </button>

      {/* Control Panel */}
      {isOpen && (
        <div className="fixed bottom-[21rem] right-1 z-[100] w-80 max-h-[calc(100vh-22rem)] overflow-y-auto liquidGlass-wrapper rounded-[24px]">
          <div className="liquidGlass-effect rounded-[24px]" />
          <div className="liquidGlass-tint rounded-[24px]" />
          <div className="liquidGlass-shine rounded-[24px]" />
          <div className="liquidGlass-text w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Glass Controls
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5" style={{ color: 'var(--text-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Blur */}
              <div>
                <label className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  <span>Blur</span>
                  <span>{settings.blur}px</span>
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
                  <span>{settings.saturation}%</span>
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
                  <span>{settings.brightness}%</span>
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
                  <span>{settings.tintOpacity}%</span>
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
                  <span>{settings.borderRadius}px</span>
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
                className="w-full py-2 px-4 rounded-xl text-sm font-medium transition-colors"
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
      )}
    </>
  );
}
