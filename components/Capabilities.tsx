'use client';

import React from 'react';
import GlassCard from './GlassCard';

export default function Capabilities() {
  const capabilities = [
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      title: 'Voice Command Center',
      description: 'Natural language understanding',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: 'OCR + Vision',
      description: 'Screen reading and text extraction',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Shortcut Automation',
      description: 'Native iOS workflow execution',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Context Memory',
      description: 'Remembers your preferences',
      color: 'from-emerald-500 to-green-600'
    },
  ];

  return (
    <section id="capabilities" className="relative min-h-[66vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Core Capabilities
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
            Everything you need for autonomous task completion
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className="animate-fadeInUp"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <GlassCard className="p-8 h-full" variant="subtle">
                <div className="space-y-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cap.color} flex items-center justify-center`}>
                    {cap.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{cap.title}</h3>
                    <p style={{ color: 'var(--text-muted)' }}>{cap.description}</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
