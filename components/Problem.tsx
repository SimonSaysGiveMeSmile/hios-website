'use client';

import React from 'react';
import GlassCard from './GlassCard';

export default function Problem() {
  return (
    <section className="relative min-h-[66vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Comparison diagram */}
          <div className="relative">
            <GlassCard className="p-8" variant="subtle">
              <div className="grid grid-cols-2 gap-8">
                {/* Current UX */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Current UX</h3>
                  <div className="space-y-3">
                    {[
                      { icon: '📱', label: 'Open App', color: 'from-gray-500 to-gray-600' },
                      { icon: '🔍', label: 'Search', color: 'from-gray-500 to-gray-600' },
                      { icon: '📋', label: 'Copy', color: 'from-gray-500 to-gray-600' },
                      { icon: '📝', label: 'Paste', color: 'from-gray-500 to-gray-600' },
                      { icon: '✉️', label: 'Send', color: 'from-gray-500 to-gray-600' },
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-lg`}>
                          {step.icon}
                        </div>
                        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{step.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 text-center">
                    <div className="text-2xl font-bold" style={{ color: 'var(--text-subtle)' }}>5 steps</div>
                  </div>
                </div>

                {/* HiOS */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-emerald-400 mb-6">With HiOS</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 transform rotate-180">
                        <img src="/logo.svg" alt="HiOS" className="w-full h-full" />
                      </div>
                      <span className="text-sm" style={{ color: 'var(--text-primary)' }}>Voice</span>
                    </div>
                    <div className="flex items-center justify-center py-8">
                      <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-emerald-400">Done</span>
                    </div>
                  </div>
                  <div className="pt-4 text-center">
                    <div className="text-2xl font-bold text-emerald-400">1 step</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right: Text */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
              Phones execute commands.<br />
              <span style={{ color: 'var(--text-muted)' }}>They don't complete tasks.</span>
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Every action requires manual navigation, context switching, and repetitive steps. HiOS changes that.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
