'use client';

import { useEffect, useState } from 'react';

export default function GlassTestPage() {
  const [blur, setBlur] = useState(40);
  const [saturation, setSaturation] = useState(100);
  const [brightness, setBrightness] = useState(120);

  useEffect(() => {
    document.documentElement.style.setProperty('--glass-blur', `${blur}px`);
    document.documentElement.style.setProperty('--glass-saturation', `${saturation}%`);
    document.documentElement.style.setProperty('--glass-brightness', `${brightness / 100}`);
  }, [blur, saturation, brightness]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* Test Element */}
        <div className="liquidGlass-wrapper p-8 rounded-3xl">
          <div className="liquidGlass-effect rounded-3xl" />
          <div className="liquidGlass-tint rounded-3xl" />
          <div className="liquidGlass-shine rounded-3xl" />
          <div className="liquidGlass-text">
            <h1 className="text-3xl font-bold mb-4">Glass Effect Test</h1>
            <p className="text-lg opacity-80">
              Adjust the controls below to see the glass effect change in real-time.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="liquidGlass-wrapper p-6 rounded-2xl">
          <div className="liquidGlass-effect rounded-2xl" />
          <div className="liquidGlass-tint rounded-2xl" />
          <div className="liquidGlass-shine rounded-2xl" />
          <div className="liquidGlass-text space-y-6 w-full">
            <div>
              <label className="flex justify-between text-sm mb-2">
                <span>Blur</span>
                <span className="font-mono">{blur}px</span>
              </label>
              <input
                type="range"
                min="0"
                max="80"
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
                className="w-full glass-slider"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm mb-2">
                <span>Saturation</span>
                <span className="font-mono">{saturation}%</span>
              </label>
              <input
                type="range"
                min="50"
                max="300"
                value={saturation}
                onChange={(e) => setSaturation(Number(e.target.value))}
                className="w-full glass-slider"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm mb-2">
                <span>Brightness</span>
                <span className="font-mono">{brightness}%</span>
              </label>
              <input
                type="range"
                min="80"
                max="150"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full glass-slider"
              />
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-xs opacity-60">
                Current CSS Variables:
              </p>
              <pre className="text-xs mt-2 opacity-80 font-mono">
                --glass-blur: {blur}px{'\n'}
                --glass-saturation: {saturation}%{'\n'}
                --glass-brightness: {brightness / 100}
              </pre>
            </div>
          </div>
        </div>

        {/* Additional Test Elements */}
        <div className="grid grid-cols-3 gap-4">
          <div className="liquidGlass-wrapper p-6 rounded-2xl aspect-square flex items-center justify-center">
            <div className="liquidGlass-effect rounded-2xl" />
            <div className="liquidGlass-tint rounded-2xl" />
            <div className="liquidGlass-shine rounded-2xl" />
            <div className="liquidGlass-text text-center">
              <p className="font-semibold">Card 1</p>
            </div>
          </div>
          <div className="liquidGlass-wrapper p-6 rounded-2xl aspect-square flex items-center justify-center">
            <div className="liquidGlass-effect rounded-2xl" />
            <div className="liquidGlass-tint rounded-2xl" />
            <div className="liquidGlass-shine rounded-2xl" />
            <div className="liquidGlass-text text-center">
              <p className="font-semibold">Card 2</p>
            </div>
          </div>
          <div className="liquidGlass-wrapper p-6 rounded-2xl aspect-square flex items-center justify-center">
            <div className="liquidGlass-effect rounded-2xl" />
            <div className="liquidGlass-tint rounded-2xl" />
            <div className="liquidGlass-shine rounded-2xl" />
            <div className="liquidGlass-text text-center">
              <p className="font-semibold">Card 3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
