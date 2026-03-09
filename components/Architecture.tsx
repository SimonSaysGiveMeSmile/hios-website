'use client';

import React from 'react';
import GlassCard from './GlassCard';

export default function Architecture() {
  return (
    <section className="relative min-h-[66vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
              Privacy-first<br />
              <span style={{ color: 'var(--text-muted)' }}>architecture</span>
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Your data stays secure with hybrid processing: voice on-device, AI in the cloud, and end-to-end encryption for all actions.
            </p>
          </div>

          {/* Right: Architecture diagram */}
          <div className="relative">
            <GlassCard className="p-8" variant="subtle">
              <div className="space-y-6">
                {/* Pipeline */}
                <div className="flex items-center justify-between">
                  {[
                    {
                      label: 'User',
                      icon: (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )
                    },
                    {
                      label: 'Device AI',
                      icon: (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      )
                    },
                    {
                      label: 'Cloud AI',
                      icon: (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                      )
                    },
                    {
                      label: 'Actions',
                      icon: (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )
                    },
                  ].map((step, i) => (
                    <React.Fragment key={i}>
                      <div className="text-center">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-2">
                          {step.icon}
                        </div>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{step.label}</span>
                      </div>
                      {i < 3 && (
                        <svg className="w-6 h-6" style={{ color: 'var(--text-subtle)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-3 pt-6">
                  {[
                    {
                      icon: (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      ),
                      label: 'Local Processing',
                      color: 'from-blue-500 to-cyan-600'
                    },
                    {
                      icon: (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      ),
                      label: 'Cloud Intelligence',
                      color: 'from-purple-500 to-pink-600'
                    },
                    {
                      icon: (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      ),
                      label: 'Encrypted Actions',
                      color: 'from-emerald-500 to-green-600'
                    },
                  ].map((feature, i) => (
                    <div key={i} className="text-center p-3 rounded-xl glass-subtle">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-2`}>
                        {feature.icon}
                      </div>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{feature.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
