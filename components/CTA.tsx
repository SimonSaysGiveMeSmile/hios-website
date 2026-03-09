'use client';

import React from 'react';
import GlassCard from './GlassCard';
import InteractiveButton from './InteractiveButton';

export default function CTA() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Device mockup */}
          <div className="relative">
            <GlassCard className="p-8" variant="subtle">
              <div className="space-y-6">
                {/* Command bubble */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 transform rotate-180">
                    <img src="/logo.svg" alt="HiOS" className="w-full h-full" />
                  </div>
                  <div className="flex-1 glass-subtle rounded-2xl p-4">
                    <p className="text-sm" style={{ color: 'var(--text-primary)' }}>"Book me an Uber to the airport"</p>
                  </div>
                </div>

                {/* Checklist */}
                <div className="space-y-2">
                  {[
                    'Ride selected',
                    'Pickup confirmed',
                    'Driver assigned',
                  ].map((task, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl glass-subtle"
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right: CTA content */}
          <div className="space-y-8 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
              Ready to try HiOS?
            </h2>
            <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
              Join TestFlight and experience the future of iOS automation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <InteractiveButton primary>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                Join TestFlight
              </InteractiveButton>

              <InteractiveButton>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                View Docs
              </InteractiveButton>
            </div>

            <p className="text-sm" style={{ color: 'var(--text-subtle)' }}>
              Free for beta testers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
