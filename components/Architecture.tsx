'use client';

import React from 'react';
import GlassCard from './GlassCard';

export default function Architecture() {
  const layers = [
    {
      icon: '🎤',
      title: 'Voice Interface',
      description: 'Natural language input',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: '🧠',
      title: 'Intent Parser',
      description: 'Understands user goals',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: '⚡',
      title: 'OpenClaw Planner',
      description: 'Generates task graphs',
      color: 'from-violet-500 to-purple-600'
    },
    {
      icon: '📊',
      title: 'Task Graph',
      description: 'Execution plan',
      color: 'from-indigo-500 to-blue-600'
    },
    {
      icon: '🔌',
      title: 'HiOS Tool Bus',
      description: 'Connects to iOS APIs',
      color: 'from-cyan-500 to-teal-600'
    },
    {
      icon: '⚙️',
      title: 'Execution Layer',
      description: 'Browser • Shortcuts • OCR • Contacts',
      color: 'from-emerald-500 to-green-600',
      expanded: true
    },
  ];

  return (
    <section id="architecture" className="relative min-h-[66vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Architecture stack */}
          <div className="relative">
            <GlassCard className="p-8" variant="subtle">
              <div className="space-y-3">
                {layers.map((layer, i) => (
                  <div key={i} className="relative">
                    <div className={`p-4 rounded-xl glass-subtle hover:scale-[1.02] transition-transform cursor-pointer`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${layer.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                          {layer.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                            {layer.title}
                          </h3>
                          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            {layer.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    {i < layers.length - 1 && (
                      <div className="flex justify-center py-1">
                        <svg className="w-5 h-5 text-emerald-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Right: Text */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
              Built on<br />
              <span style={{ color: 'var(--text-muted)' }}>OpenClaw agents</span>
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              HiOS is a runtime for OpenClaw agents. Voice commands flow through intent parsing, task planning, and execution—all powered by a unified tool bus connecting to iOS capabilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
