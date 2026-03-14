'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
// Inline SVG icons (no lucide-react dependency)
const LogOutIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);
const GithubIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LiquidGlass = dynamic(
  () => import('@/lib/liquid-glass-react'),
  { ssr: false }
);

type Mode = 'standard' | 'polar' | 'prominent' | 'shader';

interface ControlProps {
  mode: Mode; setMode: (m: Mode) => void;
  displacementScale: number; setDisplacementScale: (v: number) => void;
  blurAmount: number; setBlurAmount: (v: number) => void;
  saturation: number; setSaturation: (v: number) => void;
  aberrationIntensity: number; setAberrationIntensity: (v: number) => void;
  elasticity: number; setElasticity: (v: number) => void;
  cornerRadius: number; setCornerRadius: (v: number) => void;
  overLight: boolean; setOverLight: (v: boolean) => void;
}

export default function Home() {
  const [displacementScale, setDisplacementScale] = useState(100);
  const [blurAmount, setBlurAmount] = useState(0.5);
  const [saturation, setSaturation] = useState(140);
  const [aberrationIntensity, setAberrationIntensity] = useState(2);
  const [elasticity, setElasticity] = useState(0);
  const [cornerRadius, setCornerRadius] = useState(32);
  const [userInfoOverLight, setUserInfoOverLight] = useState(false);
  const [userInfoMode, setUserInfoMode] = useState<Mode>('standard');

  const [logoutDisplacementScale, setLogoutDisplacementScale] = useState(64);
  const [logoutBlurAmount, setLogoutBlurAmount] = useState(0.1);
  const [logoutSaturation, setLogoutSaturation] = useState(130);
  const [logoutAberrationIntensity, setLogoutAberrationIntensity] = useState(2);
  const [logoutElasticity, setLogoutElasticity] = useState(0.35);
  const [logoutCornerRadius, setLogoutCornerRadius] = useState(100);
  const [logoutOverLight, setLogoutOverLight] = useState(false);
  const [logoutMode, setLogoutMode] = useState<Mode>('standard');

  const [activeTab, setActiveTab] = useState<'userInfo' | 'logOut'>('userInfo');
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-3 shadow-2xl w-full max-w-5xl mx-auto md:my-10 h-screen md:max-h-[calc(100vh-5rem)] md:rounded-3xl overflow-hidden">
      <div className="flex-1 relative overflow-auto min-h-screen md:col-span-2" ref={containerRef}>
        <div className="w-full min-h-[200vh] absolute top-0 left-0 pb-96 mb-96">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://picsum.photos/2000/2000" className="w-full h-96 object-cover" alt="" />
          <div className="flex flex-col gap-2" id="bright-section">
            <h2 className="text-2xl font-semibold my-5 text-center">Some Heading</h2>
            <p className="px-10">
              Bacon ipsum dolor amet hamburger Bacon ipsum dolor amet hamburger <br />
              Bacon ipsum dolor amet hamburger Bacon ipsum dolor amet hamburger<br />
              Bacon ipsum dolor amet hamburger Bacon ipsum dolor amet hamburger<br />
              Bacon ipsum dolor amet hamburger Bacon ipsum dolor amet hamburger<br />
              Bacon ipsum dolor amet hamburger Bacon ipsum dolor amet hamburger<br />
              Bacon ipsum dolor amet hamburger Bacon ipsum dolor amet hamburger
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://picsum.photos/1200/1200" className="w-full h-80 object-cover my-10" alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://picsum.photos/1400/1300" className="w-full h-72 object-cover my-10" alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://picsum.photos/1100/1200" className="w-full h-96 object-cover my-10 mb-96" alt="" />
        </div>

        {activeTab === 'userInfo' && (
          <LiquidGlass
            displacementScale={displacementScale}
            blurAmount={blurAmount}
            saturation={saturation}
            aberrationIntensity={aberrationIntensity}
            elasticity={elasticity}
            cornerRadius={cornerRadius}
            mouseContainer={containerRef}
            overLight={userInfoOverLight}
            mode={userInfoMode}
            style={{ position: 'fixed', top: '25%', left: '40%' }}
          >
            <div className="w-72 text-shadow-lg">
              <h3 className="text-xl font-semibold mb-4">User Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-black/10 backdrop-blur rounded-full flex items-center justify-center text-white font-semibold">JD</div>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-white">Software Engineer</p>
                  </div>
                </div>
                <div className="pt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-white">Email:</span>
                    <span className="text-sm">john.doe@example.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-white">Location:</span>
                    <span className="text-sm">San Francisco, CA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-white">Joined:</span>
                    <span className="text-sm">March 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </LiquidGlass>
        )}

        {activeTab === 'logOut' && (
          <LiquidGlass
            displacementScale={logoutDisplacementScale}
            blurAmount={logoutBlurAmount}
            saturation={logoutSaturation}
            aberrationIntensity={logoutAberrationIntensity}
            elasticity={logoutElasticity}
            cornerRadius={logoutCornerRadius}
            mouseContainer={containerRef}
            overLight={logoutOverLight}
            mode={logoutMode}
            padding="8px 16px"
            onClick={() => console.log('Logged out')}
            style={{ position: 'fixed', top: '20%', left: '40%' }}
          >
            <h3 className="text-lg font-medium flex items-center gap-2">
              Log Out
              <LogOutIcon />
            </h3>
          </LiquidGlass>
        )}
      </div>

      <div className="row-start-2 rounded-t-3xl md:rounded-none md:col-start-3 bg-gray-900/80 h-full overflow-y-auto backdrop-blur-md border-l border-white/10 p-8 flex flex-col">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Glassy Boi but Web</h2>
            <a href="https://github.com/rdev/liquid-glass-react" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg" title="View on GitHub">
              <GithubIcon />
            </a>
          </div>
          <p className="text-white/60 text-sm">Liquid Glass container effect for React. With settings and effects and stuff.</p>
          <p className="font-semibold text-yellow-300 text-xs mt-2 leading-snug">⚠️ This doesn&apos;t fully work in Safari and Firefox. You will not see edge refraction on non-chromium browsers.</p>
        </div>

        <div className="flex mb-6 bg-white/5 rounded-lg p-1">
          <button onClick={() => setActiveTab('userInfo')} className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'userInfo' ? 'bg-blue-500 text-white shadow-lg' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
            User Info Card
          </button>
          <button onClick={() => setActiveTab('logOut')} className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'logOut' ? 'bg-blue-500 text-white shadow-lg' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
            Log Out Button
          </button>
        </div>

        <div className="space-y-8 flex-1">
          {activeTab === 'userInfo' && (
            <Controls prefix="userInfo" mode={userInfoMode} setMode={setUserInfoMode}
              displacementScale={displacementScale} setDisplacementScale={setDisplacementScale}
              blurAmount={blurAmount} setBlurAmount={setBlurAmount}
              saturation={saturation} setSaturation={setSaturation}
              aberrationIntensity={aberrationIntensity} setAberrationIntensity={setAberrationIntensity}
              elasticity={elasticity} setElasticity={setElasticity}
              cornerRadius={cornerRadius} setCornerRadius={setCornerRadius}
              overLight={userInfoOverLight} setOverLight={setUserInfoOverLight}
            />
          )}
          {activeTab === 'logOut' && (
            <Controls prefix="logout" mode={logoutMode} setMode={setLogoutMode}
              displacementScale={logoutDisplacementScale} setDisplacementScale={setLogoutDisplacementScale}
              blurAmount={logoutBlurAmount} setBlurAmount={setLogoutBlurAmount}
              saturation={logoutSaturation} setSaturation={setLogoutSaturation}
              aberrationIntensity={logoutAberrationIntensity} setAberrationIntensity={setLogoutAberrationIntensity}
              elasticity={logoutElasticity} setElasticity={setLogoutElasticity}
              cornerRadius={logoutCornerRadius} setCornerRadius={setLogoutCornerRadius}
              overLight={logoutOverLight} setOverLight={setLogoutOverLight}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Controls({ prefix, ...p }: ControlProps & { prefix: string }) {
  const modes: { value: Mode; label: string }[] = [
    { value: 'standard', label: 'Standard' },
    { value: 'polar', label: 'Polar' },
    { value: 'prominent', label: 'Prominent' },
    { value: 'shader', label: 'Shader (Experimental)' },
  ];
  return (
    <>
      <div>
        <span className="block text-sm font-semibold text-white/90 mb-3">Refraction Mode</span>
        <div className="space-y-2">
          {modes.map((m) => (
            <div key={m.value} className="flex items-center space-x-3">
              <input type="radio" id={`${prefix}Mode${m.value}`} name={`${prefix}Mode`} value={m.value} checked={p.mode === m.value} onChange={() => p.setMode(m.value)} className="w-4 h-4 accent-blue-500" />
              <label htmlFor={`${prefix}Mode${m.value}`} className="text-sm text-white/90">{m.label}</label>
            </div>
          ))}
        </div>
        <p className="text-xs text-white/50 mt-2">Controls the refraction calculation method</p>
      </div>
      <Slider label="Displacement Scale" value={p.displacementScale} onChange={p.setDisplacementScale} min={0} max={200} step={1} color="text-blue-300" desc="Controls the intensity of edge distortion" />
      <Slider label="Blur Amount" value={p.blurAmount} onChange={p.setBlurAmount} min={0} max={1} step={0.01} color="text-green-300" fmt={(v) => v.toFixed(1)} desc="Controls backdrop blur intensity" />
      <Slider label="Saturation" value={p.saturation} onChange={p.setSaturation} min={100} max={300} step={10} color="text-purple-300" suffix="%" desc="Controls color saturation of the backdrop" />
      <Slider label="Chromatic Aberration" value={p.aberrationIntensity} onChange={p.setAberrationIntensity} min={0} max={20} step={1} color="text-cyan-300" desc="Controls RGB channel separation intensity" />
      <Slider label="Elasticity" value={p.elasticity} onChange={p.setElasticity} min={0} max={1} step={0.05} color="text-orange-300" fmt={(v) => v.toFixed(2)} desc="Controls how much the glass reaches toward the cursor" />
      <Slider label="Corner Radius" value={p.cornerRadius} onChange={p.setCornerRadius} min={0} max={100} step={1} color="text-pink-300" fmt={(v) => v === 999 ? 'Full' : `${v}px`} desc="Controls the roundness of the glass corners" />
      <div>
        <span className="block text-sm font-semibold text-white/90 mb-3">Over Light</span>
        <div className="flex items-center space-x-3">
          <input type="checkbox" id={`${prefix}OverLight`} checked={p.overLight} onChange={(e) => p.setOverLight(e.target.checked)} className="w-5 h-5 accent-blue-500" />
          <label htmlFor={`${prefix}OverLight`} className="text-sm text-white/90">Tint liquid glass dark (use for bright backgrounds)</label>
        </div>
        <p className="text-xs text-white/50 mt-2">Makes the glass darker for better visibility on light backgrounds</p>
      </div>
    </>
  );
}

function Slider({ label, value, onChange, min, max, step, color, fmt, suffix, desc }: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; color: string;
  fmt?: (v: number) => string; suffix?: string; desc: string;
}) {
  return (
    <div>
      <span className="block text-sm font-semibold text-white/90 mb-3">{label}</span>
      <div className="mb-2">
        <span className={`text-xl font-mono ${color}`}>{fmt ? fmt(value) : `${value}`}{suffix || ''}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" />
      <p className="text-xs text-white/50 mt-2">{desc}</p>
    </div>
  );
}
