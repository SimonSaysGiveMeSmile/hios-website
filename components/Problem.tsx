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
                      {
                        icon: (
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        ),
                        label: 'Open App',
                        color: 'from-gray-500 to-gray-600'
                      },
                      {
                        icon: (
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        ),
                        label: 'Search',
                        color: 'from-gray-500 to-gray-600'
                      },
                      {
                        icon: (
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        ),
                        label: 'Copy',
                        color: 'from-gray-500 to-gray-600'
                      },
                      {
                        icon: (
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        ),
                        label: 'Paste',
                        color: 'from-gray-500 to-gray-600'
                      },
                      {
                        icon: (
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        ),
                        label: 'Send',
                        color: 'from-gray-500 to-gray-600'
                      },
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
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
              Phones follow commands.<br />
              <span style={{ color: 'var(--text-muted)' }}>But you still do the work.</span>
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Most assistants answer questions. HiOS completes tasks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
