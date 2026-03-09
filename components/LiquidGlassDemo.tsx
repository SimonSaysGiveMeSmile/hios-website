'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import type { WebGLGlassSettings } from '@/types/glass';

export default function LiquidGlassDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('LiquidGlassDemo useEffect:', {
      scriptsLoaded,
      hasContainerRef: !!containerRef.current,
      hasContainer: !!window.Container,
      hasButton: !!window.Button
    });

    if (scriptsLoaded && containerRef.current && window.Container && window.Button) {
      try {
        initGlassComponents();
      } catch (err) {
        console.error('Failed to initialize glass components:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    } else if (scriptsLoaded) {
      console.warn('Scripts loaded but missing dependencies:', {
        hasContainerRef: !!containerRef.current,
        hasContainer: !!window.Container,
        hasButton: !!window.Button
      });
    }
  }, [scriptsLoaded]);

  const initGlassComponents = () => {
    if (!containerRef.current) {
      console.warn('Container ref not available');
      return;
    }

    console.log('Initializing WebGL glass components...');

    // Initialize global controls with defaults
    if (!window.glassControls) {
      console.log('Initializing window.glassControls with defaults');
      window.glassControls = {
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
      };
    } else {
      console.log('window.glassControls already exists:', window.glassControls);
    }

    // Clear existing content
    containerRef.current.innerHTML = '';

    // Create main glass container
    const mainContainer = new window.Container({
      borderRadius: 32,
      type: 'rounded',
      tintOpacity: 0.2
    });

    console.log('Container created:', mainContainer);

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

    // Add instruction
    const instruction = document.createElement('p');
    instruction.textContent = 'Use the settings button in the navigation to adjust WebGL glass properties';
    instruction.style.color = 'rgba(255, 255, 255, 0.5)';
    instruction.style.fontSize = '12px';
    instruction.style.margin = '0 0 16px 0';
    instruction.style.position = 'relative';
    instruction.style.zIndex = '10';
    mainContainer.element.appendChild(instruction);

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

    console.log('WebGL glass components initialized. Total instances:', window.Container.instances.length);
  };

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('html2canvas loaded:', !!window.html2canvas);
        }}
        onError={(e) => {
          console.error('Failed to load html2canvas:', e);
          setError('Failed to load html2canvas');
        }}
      />
      <Script
        src="/liquid-glass/container.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('container.js loaded:', !!window.Container);
        }}
        onError={(e) => {
          console.error('Failed to load container.js:', e);
          setError('Failed to load container.js');
        }}
      />
      <Script
        src="/liquid-glass/button.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('button.js loaded:', !!window.Button);
          setScriptsLoaded(true);
        }}
        onError={(e) => {
          console.error('Failed to load button.js:', e);
          setError('Failed to load button.js');
        }}
      />

      <div className="relative flex flex-col items-center justify-center gap-8 p-8 min-h-[600px]">
        {/* Colorful background layers to demonstrate glassmorphism */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient orbs */}
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-30 blur-3xl animate-pulse" />
          <div className="absolute top-32 right-20 w-80 h-80 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 opacity-25 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/3 w-72 h-72 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

          {/* Geometric shapes */}
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-yellow-400 to-red-500 opacity-20 rotate-45 blur-xl" />
          <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-gradient-to-br from-green-400 to-teal-500 opacity-15 rounded-2xl blur-xl" />

          {/* Text layers */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl font-bold text-white opacity-5 select-none">
            GLASS
          </div>

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        {error && (
          <div className="relative z-20 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            Error: {error}
          </div>
        )}
        {!scriptsLoaded && !error && (
          <div className="relative z-20 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm">
            Loading WebGL components...
          </div>
        )}
        <div ref={containerRef} className="relative z-10" />
      </div>
    </>
  );
}
