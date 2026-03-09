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
                    { label: 'User', icon: '👤' },
                    { label: 'Device AI', icon: '📱' },
                    { label: 'Cloud AI', icon: '☁️' },
                    { label: 'Actions', icon: '✓' },
                  ].map((step, i) => (
                    <React.Fragment key={i}>
                      <div className="text-center">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl mb-2">
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
                    { icon: '🔒', label: 'Local Processing' },
                    { icon: '🌐', label: 'Cloud Intelligence' },
                    { icon: '🔐', label: 'Encrypted Actions' },
                  ].map((feature, i) => (
                    <div key={i} className="text-center p-3 rounded-xl glass-subtle">
                      <div className="text-2xl mb-2">{feature.icon}</div>
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
