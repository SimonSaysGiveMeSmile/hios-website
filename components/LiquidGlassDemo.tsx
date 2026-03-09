'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    Container: any;
    Button: any;
    html2canvas: any;
    glassControls: {
      edgeIntensity: number;
      rimIntensity: number;
      baseIntensity: number;
      edgeDistance: number;
      rimDistance: number;
      baseDistance: number;
      cornerBoost: number;
      rippleEffect: number;
      blurRadius: number;
      tintOpacity: number;
    };
  }
}

export default function LiquidGlassDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [controls, setControls] = useState({
    edgeIntensity: 0.02,
    rimIntensity: 0.08,
    baseIntensity: 0.01,
    edgeDistance: 0.15,
    rimDistance: 0.8,
    baseDistance: 0.1,
    cornerBoost: 0.02,
    rippleEffect: 0.1,
    blurRadius: 7.0,
    tintOpacity: 0.3,
  });

  useEffect(() => {
    if (scriptsLoaded && containerRef.current && window.Container && window.Button) {
      initGlassComponents();
    }
  }, [scriptsLoaded]);

  useEffect(() => {
    if (window.glassControls) {
      window.glassControls = controls;
      updateAllGlassInstances();
    }
  }, [controls]);

  const initGlassComponents = () => {
    if (!containerRef.current) return;

    // Initialize global controls
    window.glassControls = controls;

    // Clear existing content
    containerRef.current.innerHTML = '';

    // Create main glass container
    const mainContainer = new window.Container({
      borderRadius: 32,
      type: 'rounded',
      tintOpacity: 0.2
    });

    mainContainer.element.style.padding = '32px';
    mainContainer.element.style.display = 'flex';
    mainContainer.element.style.flexDirection = 'column';
    mainContainer.element.style.gap = '16px';
    mainContainer.element.style.minWidth = '400px';

    // Add title
    const title = document.createElement('h3');
    title.textContent = 'Liquid Glass Demo';
    title.style.color = 'white';
    title.style.fontSize = '24px';
    title.style.fontWeight = '600';
    title.style.margin = '0 0 8px 0';
    title.style.position = 'relative';
    title.style.zIndex = '10';
    mainContainer.element.appendChild(title);

    // Add subtitle
    const subtitle = document.createElement('p');
    subtitle.textContent = 'WebGL-powered glass effects with real-time refraction';
    subtitle.style.color = 'rgba(255, 255, 255, 0.7)';
    subtitle.style.fontSize = '14px';
    subtitle.style.margin = '0 0 16px 0';
    subtitle.style.position = 'relative';
    subtitle.style.zIndex = '10';
    mainContainer.element.appendChild(subtitle);

    // Create button container
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '12px';
    buttonContainer.style.flexWrap = 'wrap';
    buttonContainer.style.position = 'relative';
    buttonContainer.style.zIndex = '10';
    mainContainer.element.appendChild(buttonContainer);

    // Add glass buttons
    const button1 = new window.Button({
      text: 'Rounded',
      size: 16,
      type: 'rounded',
      borderRadius: 16,
      tintOpacity: 0.3,
      onClick: (text: string) => console.log(`${text} clicked!`)
    });

    const button2 = new window.Button({
      text: '●',
      size: 20,
      type: 'circle',
      tintOpacity: 0.3,
      onClick: (text: string) => console.log(`${text} clicked!`)
    });

    const button3 = new window.Button({
      text: 'Pill Button',
      size: 16,
      type: 'pill',
      tintOpacity: 0.3,
      onClick: (text: string) => console.log(`${text} clicked!`)
    });

    mainContainer.addChild(button1);
    mainContainer.addChild(button2);
    mainContainer.addChild(button3);

    buttonContainer.appendChild(button1.element);
    buttonContainer.appendChild(button2.element);
    buttonContainer.appendChild(button3.element);

    containerRef.current.appendChild(mainContainer.element);
  };

  const updateAllGlassInstances = () => {
    if (!window.Container || !window.Container.instances) return;

    window.Container.instances.forEach((instance: any) => {
      if (instance.gl_refs && instance.gl_refs.gl) {
        const gl = instance.gl_refs.gl;
        gl.uniform1f(instance.gl_refs.edgeIntensityLoc, controls.edgeIntensity);
        gl.uniform1f(instance.gl_refs.rimIntensityLoc, controls.rimIntensity);
        gl.uniform1f(instance.gl_refs.baseIntensityLoc, controls.baseIntensity);
        gl.uniform1f(instance.gl_refs.edgeDistanceLoc, controls.edgeDistance);
        gl.uniform1f(instance.gl_refs.rimDistanceLoc, controls.rimDistance);
        gl.uniform1f(instance.gl_refs.baseDistanceLoc, controls.baseDistance);
        gl.uniform1f(instance.gl_refs.cornerBoostLoc, controls.cornerBoost);
        gl.uniform1f(instance.gl_refs.rippleEffectLoc, controls.rippleEffect);
        gl.uniform1f(instance.gl_refs.blurRadiusLoc, controls.blurRadius);
        if (instance.render) instance.render();
      }
    });
  };

  const handleControlChange = (key: keyof typeof controls, value: number) => {
    setControls(prev => ({ ...prev, [key]: value }));
  };

  const resetDefaults = () => {
    setControls({
      edgeIntensity: 0.02,
      rimIntensity: 0.08,
      baseIntensity: 0.01,
      edgeDistance: 0.15,
      rimDistance: 0.8,
      baseDistance: 0.1,
      cornerBoost: 0.02,
      rippleEffect: 0.1,
      blurRadius: 7.0,
      tintOpacity: 0.3,
    });
  };

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/liquid-glass/container.js"
        strategy="afterInteractive"
      />
      <Script
        src="/liquid-glass/button.js"
        strategy="afterInteractive"
        onLoad={() => setScriptsLoaded(true)}
      />

      <div className="relative flex flex-col items-center justify-center min-h-screen gap-8 p-8">
        <div ref={containerRef} className="relative z-10" />

        {/* Control Panel Toggle */}
        <button
          onClick={() => setIsControlsOpen(!isControlsOpen)}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full liquidGlass-wrapper flex items-center justify-center hover:scale-105 transition-transform"
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
        {isControlsOpen && (
          <div className="fixed bottom-24 right-8 z-50 w-80 max-h-[70vh] overflow-y-auto liquidGlass-wrapper rounded-[24px]">
            <div className="liquidGlass-effect rounded-[24px]" />
            <div className="liquidGlass-tint rounded-[24px]" />
            <div className="liquidGlass-shine rounded-[24px]" />
            <div className="liquidGlass-text w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Liquid Glass Controls
                </h3>
                <button
                  onClick={() => setIsControlsOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" style={{ color: 'var(--text-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Edge Intensity */}
                <div>
                  <label className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                    <span>Edge Intensity</span>
                    <span>{controls.edgeIntensity.toFixed(3)}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="0.1"
                    step="0.001"
                    value={controls.edgeIntensity}
                    onChange={(e) => handleControlChange('edgeIntensity', Number(e.target.value))}
                    className="w-full glass-slider"
                  />
                </div>

                {/* Rim Intensity */}
                <div>
                  <label className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                    <span>Rim Intensity</span>
                    <span>{controls.rimIntensity.toFixed(3)}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="0.2"
                    step="0.001"
                    value={controls.rimIntensity}
                    onChange={(e) => handleControlChange('rimIntensity', Number(e.target.value))}
                    className="w-full glass-slider"
                  />
                </div>

                {/* Base Intensity */}
                <div>
                  <label className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                    <span>Base Intensity</span>
                    <span>{controls.baseIntensity.toFixed(3)}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="0.05"
                    step="0.001"
                    value={controls.baseIntensity}
                    onChange={(e) => handleControlChange('baseIntensity', Number(e.target.value))}
                    className="w-full glass-slider"
                  />
                </div>

                {/* Edge Distance */}
                <div>
                  <label className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                    <span>Edge Distance</span>
                    <span>{controls.edgeDistance.toFixed(2)}</span>
                  </label>
                  <input
                    type="range"
                    min="0.05"
                    max="0.5"
                    step="0.01"
                    value={controls.edgeDistance}
                    onChange={(e) => handleControlChange('edgeDistance', Number(e.target.value))}
                    className="w-full glass-slider"
                  />
                </div>

                {/* Rim Distance */}
                <div>
                  <label className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                    <span>Rim Distance</span>
                    <span>{controls.rimDistance.toFixed(2)}</span>
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="2.0"
                    step="0.1"
                    value={controls.rimDistance}
                    onChange={(e) => handleControlChange('rimDistance', Number(e.target.value))}
                    className="w-full glass-slider"
                  />
                </div>

                {/* Blur Radius */}
                <div>
                  <label className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                    <span>Blur Radius</span>
                    <span>{controls.blurRadius.toFixed(1)}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="0.5"
                    value={controls.blurRadius}
                    onChange={(e) => handleControlChange('blurRadius', Number(e.target.value))}
                    className="w-full glass-slider"
                  />
                </div>

                {/* Corner Boost */}
                <div>
                  <label className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                    <span>Corner Boost</span>
                    <span>{controls.cornerBoost.toFixed(3)}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="0.1"
                    step="0.001"
                    value={controls.cornerBoost}
                    onChange={(e) => handleControlChange('cornerBoost', Number(e.target.value))}
                    className="w-full glass-slider"
                  />
                </div>

                {/* Ripple Effect */}
                <div>
                  <label className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                    <span>Ripple Effect</span>
                    <span>{controls.rippleEffect.toFixed(2)}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="0.5"
                    step="0.01"
                    value={controls.rippleEffect}
                    onChange={(e) => handleControlChange('rippleEffect', Number(e.target.value))}
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
      </div>
    </>
  );
}
