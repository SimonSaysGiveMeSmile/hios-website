'use client';

import React from 'react';
import GlassCard from './GlassCard';

// Consistent monoline icons (SF Symbols style)
const icons = {
  openApp: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12" y2="18" />
    </svg>
  ),
  search: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  copy: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  ),
  paste: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  ),
  send: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  ),
};

const manualSteps = [
  { label: 'Open App', icon: icons.openApp },
  { label: 'Search', icon: icons.search },
  { label: 'Copy', icon: icons.copy },
  { label: 'Paste', icon: icons.paste },
  { label: 'Send', icon: icons.send },
];

export default function Problem() {
  return (
    <section className="relative min-h-[66vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Comparison diagram */}
          <div className="relative order-2 lg:order-1">
            <GlassCard className="p-8" variant="subtle">
              {/* Two-column comparison with center divider */}
              <div className="grid grid-cols-[1fr_1px_1fr] gap-4 items-stretch">
                {/* Manual iPhone Workflow */}
                <div className="flex flex-col">
                  <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 text-center" style={{ color: 'var(--text-secondary)' }}>
                    Current
                  </h3>

                  <div className="flex-1 flex flex-col justify-center space-y-2">
                    {manualSteps.map((step, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
                        style={{
                          background: 'transparent',
                        }}
                      >
                        <div className="w-6 h-6 flex items-center justify-center" style={{ color: 'var(--text-secondary)' }}>
                          {step.icon}
                        </div>
                        <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Step count - prominent */}
                  <div className="pt-4 text-center">
                    <div className="text-3xl font-bold" style={{ color: 'var(--text-secondary)' }}>
                      5
                    </div>
                    <div className="text-xs font-medium mt-1" style={{ color: 'var(--text-secondary)', opacity: 0.8 }}>
                      steps
                    </div>
                  </div>
                </div>

                {/* Center Divider */}
                <div className="w-px" style={{ background: 'var(--text-subtle)', opacity: 0.2 }} />

                {/* With HiOS */}
                <div className="flex flex-col">
                  <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 text-center text-emerald-400">
                    HiOS
                  </h3>

                  <div className="flex-1 flex flex-col justify-center space-y-1">
                    {/* Voice */}
                    <div
                      className="relative overflow-hidden rounded-lg liquidGlass-wrapper"
                      style={{
                        border: '1px solid rgba(22, 199, 132, 0.2)',
                      }}
                    >
                      <span style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(1px) saturate(140%)', WebkitBackdropFilter: 'blur(1px) saturate(140%)', background: 'transparent', pointerEvents: 'none', zIndex: 0 }} />
                      <div className="flex items-center gap-3 px-3 py-2.5 relative z-10">
                      <div className="w-6 h-6 flex items-center justify-center text-emerald-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                          <path d="M19 10v2a7 7 0 01-14 0v-2" />
                          <line x1="12" y1="19" x2="12" y2="23" />
                          <line x1="8" y1="23" x2="16" y2="23" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        Voice
                      </span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center py-1">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>

                    {/* Done */}
                    <div
                      className="relative overflow-hidden rounded-lg liquidGlass-wrapper"
                      style={{
                        border: '1px solid rgba(22, 199, 132, 0.3)',
                      }}
                    >
                      <span style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(1px) saturate(140%)', WebkitBackdropFilter: 'blur(1px) saturate(140%)', background: 'transparent', pointerEvents: 'none', zIndex: 0 }} />
                      <div className="flex items-center gap-3 px-3 py-2.5 relative z-10">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-emerald-500">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-sm font-semibold text-emerald-400">
                        Done
                      </span>
                      </div>
                    </div>
                  </div>

                  {/* Step count - prominent */}
                  <div className="pt-4 text-center">
                    <div className="text-3xl font-bold text-emerald-400">
                      1
                    </div>
                    <div className="text-xs font-medium mt-1 text-emerald-400" style={{ opacity: 0.8 }}>
                      step
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right: Text */}
          <div className="space-y-6 order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
              Sit back and <span className="gradient-text">watch</span><br />your phone <span className="gradient-text">cook.</span>
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              HiOS allows you to book restaurants, order food, and call Uber with your voice while you continue using your device.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}