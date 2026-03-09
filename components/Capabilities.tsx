'use client';

import React from 'react';
import GlassCard from './GlassCard';

export default function Capabilities() {
  const capabilities = [
    {
      icon: '🎤',
      title: 'Voice Command Center',
      description: 'Natural language understanding',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: '👁️',
      title: 'OCR + Vision',
      description: 'Screen reading and text extraction',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: '⚡',
      title: 'Shortcut Automation',
      description: 'Native iOS workflow execution',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: '🧠',
      title: 'Context Memory',
      description: 'Remembers your preferences',
      color: 'from-emerald-500 to-green-600'
    },
  ];

  return (
    <section className="relative min-h-[66vh] flex items-center justify-center px-6 py-24">
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
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cap.color} flex items-center justify-center text-3xl`}>
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
