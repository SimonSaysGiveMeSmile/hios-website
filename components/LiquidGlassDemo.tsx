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

  useEffect(() => {
    if (scriptsLoaded && containerRef.current && window.Container && window.Button) {
      initGlassComponents();
    }
  }, [scriptsLoaded]);

  const initGlassComponents = () => {
    if (!containerRef.current) return;

    // Initialize global controls with defaults
    if (!window.glassControls) {
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
    }

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

      <div className="relative flex flex-col items-center justify-center gap-8 p-8">
        <div ref={containerRef} className="relative z-10" />
      </div>
    </>
  );
}
