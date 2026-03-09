'use client';

import React from 'react';
import GlassCard from './GlassCard';

export default function Product() {
  const layers = [
    {
      icon: '🎤',
      title: 'Voice Interface',
      description: 'Understands your request',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: '🧠',
      title: 'Intent Parsing',
      description: 'Extracts meaning and context',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: '⚡',
      title: 'Agent Planner',
      description: 'Creates execution strategy',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: '🔧',
      title: 'Shortcut Execution',
      description: 'Runs iOS automations',
      color: 'from-emerald-500 to-green-600'
    },
    {
      icon: '📱',
      title: 'Apps + Web',
      description: 'Interacts with services',
      color: 'from-indigo-500 to-blue-600'
    },
  ];

  return (
    <section className="relative min-h-[66vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Architecture stack */}
          <div className="relative">
            <div className="space-y-3">
              {layers.map((layer, i) => (
                <div
                  key={i}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <GlassCard className="p-5" variant="subtle">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${layer.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                        {layer.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{layer.title}</h3>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{layer.description}</p>
                      </div>
                      {i < layers.length - 1 && (
                        <svg className="w-5 h-5" style={{ color: 'var(--text-subtle)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      )}
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Text */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
              An AI operating layer<br />
              <span style={{ color: 'var(--text-muted)' }}>for iOS</span>
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              HiOS sits between you and your phone, translating natural language into automated workflows that span apps, shortcuts, and web services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
