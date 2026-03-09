'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { WebGLGlassSettings } from '@/types/glass';

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
  const [activeTab, setActiveTab] = useState<'css' | 'webgl'>('css');
  const [webglInstanceCount, setWebglInstanceCount] = useState(0);
  const [settings, setSettings] = useState<GlassSettings>({
    blur: 40,
    saturation: 100,
    brightness: 120,
    tintOpacity: 0,
    borderRadius: 40,
  });

  const [webglSettings, setWebglSettings] = useState<WebGLGlassSettings>({
    edgeIntensity: 0.02,
    rimIntensity: 0.08,
    baseIntensity: 0.01,
    edgeDistance: 0.15,
    rimDistance: 0.8,
    baseDistance: 0.1,
    cornerBoost: 0.02,
    rippleEffect: 0.1,
    blurRadius: 7.0,
  });

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  // Check WebGL instance count periodically
  useEffect(() => {
    const checkInstances = () => {
      if (typeof window !== 'undefined' && window.Container && window.Container.instances) {
        setWebglInstanceCount(window.Container.instances.length);
      } else {
        setWebglInstanceCount(0);
      }
    };

    checkInstances();
    const interval = setInterval(checkInstances, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Apply CSS settings with force reflow
    const root = document.documentElement;
    root.style.setProperty('--glass-blur', `${settings.blur}px`);
    root.style.setProperty('--glass-saturation', `${settings.saturation}%`);
    root.style.setProperty('--glass-brightness', `${settings.brightness / 100}`);
    root.style.setProperty('--glass-tint-opacity', `${settings.tintOpacity / 100}`);
    root.style.setProperty('--glass-border-radius', `${settings.borderRadius}px`);

    // Force reflow and directly apply backdrop-filter to all glass elements
    const backdropFilterValue = `blur(${settings.blur}px) saturate(${settings.saturation}%) brightness(${settings.brightness / 100})`;

    document.querySelectorAll('.liquidGlass-wrapper, .glass, .glass-strong, .glass-subtle, .glass-nav').forEach((el) => {
      const element = el as HTMLElement;
      element.style.backdropFilter = backdropFilterValue;
      element.style.webkitBackdropFilter = backdropFilterValue;

      // Update border radius for elements that use it
      if (element.classList.contains('liquidGlass-wrapper')) {
        const currentBorderRadius = element.style.borderRadius;
        if (!currentBorderRadius || currentBorderRadius === '9999px') {
          // Don't override pill shapes
        } else {
          element.style.borderRadius = `${settings.borderRadius}px`;
        }
      }
    });
  }, [settings]);

  useEffect(() => {
    // Apply WebGL settings
    if (typeof window !== 'undefined') {
      window.glassControls = webglSettings;
      updateAllGlassInstances();
    }
  }, [webglSettings]);

  useEffect(() => {
    if (isOpen && panelRef.current) {
      const rect = panelRef.current.getBoundingClientRect();
      setPosition({
        x: (window.innerWidth - rect.width) / 2,
        y: (window.innerHeight - rect.height) / 2,
      });
    }
  }, [isOpen]);

  const updateAllGlassInstances = () => {
    if (typeof window === 'undefined' || !window.Container || !window.Container.instances) {
      console.warn('No WebGL instances found');
      return;
    }

    console.log('Updating window.glassControls:', webglSettings);

    // Update global controls - the render loop will pick these up automatically
    window.glassControls = { ...webglSettings };

    // Trigger a single render for immediate feedback
    window.Container.instances.forEach((instance: any) => {
      if (instance.render) {
        instance.render();
      }
    });
  };

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

  const handleWebGLChange = (key: keyof WebGLGlassSettings, value: number) => {
    setWebglSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetDefaults = () => {
    if (activeTab === 'css') {
      setSettings({
        blur: 40,
        saturation: 100,
        brightness: 120,
        tintOpacity: 0,
        borderRadius: 40,
      });
    } else {
      setWebglSettings({
        edgeIntensity: 0.02,
        rimIntensity: 0.08,
        baseIntensity: 0.01,
        edgeDistance: 0.15,
        rimDistance: 0.8,
        baseDistance: 0.1,
        cornerBoost: 0.02,
        rippleEffect: 0.1,
        blurRadius: 7.0,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className="fixed z-[201] w-96 max-h-[85vh] overflow-hidden glass-strong"
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

      {/* Tab Switcher */}
      <div className="px-6 pb-4">
        <div className="flex gap-2 p-1 rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
          <button
            onClick={() => setActiveTab('css')}
            className="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all"
            style={{
              background: activeTab === 'css' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              color: 'var(--text-primary)',
            }}
          >
            CSS Glass
          </button>
          <button
            onClick={() => setActiveTab('webgl')}
            className="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all relative"
            style={{
              background: activeTab === 'webgl' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              color: 'var(--text-primary)',
            }}
          >
            WebGL Glass
            {webglInstanceCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-current" />
            )}
          </button>
        </div>

        {/* Info text */}
        <p className="text-xs mt-3 opacity-60" style={{ color: 'var(--text-secondary)' }}>
          {activeTab === 'css'
            ? 'Controls backdrop-filter effects for navigation, cards, and UI elements'
            : 'Controls WebGL shader effects in the Demo section (requires page snapshot)'
          }
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="px-6 pb-6 max-h-[calc(85vh-10rem)] overflow-y-auto">
        {activeTab === 'css' ? (
          <div className="space-y-6">
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
          </div>
        ) : (
          <div className="space-y-4">
            {/* WebGL Status Indicator */}
            <div className="p-4 rounded-xl mb-4" style={{
              background: webglInstanceCount > 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
              border: `1px solid ${webglInstanceCount > 0 ? 'rgba(34, 197, 94, 0.3)' : 'rgba(234, 179, 8, 0.3)'}`
            }}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${webglInstanceCount > 0 ? 'bg-green-500' : 'bg-yellow-500'}`} />
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  WebGL Status
                </span>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {webglInstanceCount > 0 ? (
                  <>Active: {webglInstanceCount} instance{webglInstanceCount !== 1 ? 's' : ''} found</>
                ) : (
                  <>Inactive: Scroll to Demo section to activate WebGL</>
                )}
              </p>
            </div>

            <div>
              <label className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                <span>Edge Intensity</span>
                <span className="font-mono">{webglSettings.edgeIntensity.toFixed(3)}</span>
              </label>
              <input
                type="range"
                min="0"
                max="0.1"
                step="0.001"
                value={webglSettings.edgeIntensity}
                onChange={(e) => handleWebGLChange('edgeIntensity', Number(e.target.value))}
                className="w-full glass-slider"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                <span>Rim Intensity</span>
                <span className="font-mono">{webglSettings.rimIntensity.toFixed(3)}</span>
              </label>
              <input
                type="range"
                min="0"
                max="0.2"
                step="0.001"
                value={webglSettings.rimIntensity}
                onChange={(e) => handleWebGLChange('rimIntensity', Number(e.target.value))}
                className="w-full glass-slider"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                <span>Base Intensity</span>
                <span className="font-mono">{webglSettings.baseIntensity.toFixed(3)}</span>
              </label>
              <input
                type="range"
                min="0"
                max="0.05"
                step="0.001"
                value={webglSettings.baseIntensity}
                onChange={(e) => handleWebGLChange('baseIntensity', Number(e.target.value))}
                className="w-full glass-slider"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                <span>Edge Distance</span>
                <span className="font-mono">{webglSettings.edgeDistance.toFixed(2)}</span>
              </label>
              <input
                type="range"
                min="0.05"
                max="0.5"
                step="0.01"
                value={webglSettings.edgeDistance}
                onChange={(e) => handleWebGLChange('edgeDistance', Number(e.target.value))}
                className="w-full glass-slider"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                <span>Rim Distance</span>
                <span className="font-mono">{webglSettings.rimDistance.toFixed(2)}</span>
              </label>
              <input
                type="range"
                min="0.1"
                max="2.0"
                step="0.1"
                value={webglSettings.rimDistance}
                onChange={(e) => handleWebGLChange('rimDistance', Number(e.target.value))}
                className="w-full glass-slider"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                <span>Blur Radius</span>
                <span className="font-mono">{webglSettings.blurRadius.toFixed(1)}</span>
              </label>
              <input
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={webglSettings.blurRadius}
                onChange={(e) => handleWebGLChange('blurRadius', Number(e.target.value))}
                className="w-full glass-slider"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                <span>Corner Boost</span>
                <span className="font-mono">{webglSettings.cornerBoost.toFixed(3)}</span>
              </label>
              <input
                type="range"
                min="0"
                max="0.1"
                step="0.001"
                value={webglSettings.cornerBoost}
                onChange={(e) => handleWebGLChange('cornerBoost', Number(e.target.value))}
                className="w-full glass-slider"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                <span>Ripple Effect</span>
                <span className="font-mono">{webglSettings.rippleEffect.toFixed(2)}</span>
              </label>
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.01"
                value={webglSettings.rippleEffect}
                onChange={(e) => handleWebGLChange('rippleEffect', Number(e.target.value))}
                className="w-full glass-slider"
              />
            </div>
          </div>
        )}

        {/* Reset Button */}
        <button
          onClick={resetDefaults}
          className="w-full mt-6 py-3 px-4 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]"
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
  );
}
