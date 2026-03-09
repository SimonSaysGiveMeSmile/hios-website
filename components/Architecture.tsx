'use client';

import React from 'react';
import GlassCard from './GlassCard';

export default function Architecture() {
  const layers = [
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      title: 'Voice Interface',
      description: 'Natural language input',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Intent Parser',
      description: 'Understands user goals',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'OpenClaw Planner',
      description: 'Generates task graphs',
      color: 'from-violet-500 to-purple-600'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Task Graph',
      description: 'Execution plan',
      color: 'from-indigo-500 to-blue-600'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: 'HiOS Tool Bus',
      description: 'Connects to iOS APIs',
      color: 'from-cyan-500 to-teal-600'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Execution Layer',
      description: 'Browser • Shortcuts • OCR • Contacts',
      color: 'from-emerald-500 to-green-600',
      expanded: true
    },
  ];

  return (
    <section id="architecture" className="section-standard relative flex items-center justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid-standard">
          {/* Left: Architecture stack */}
          <div className="section-illustration">
            <GlassCard className="p-8" variant="subtle">
              <div className="space-y-3">
                {layers.map((layer, i) => (
                  <div key={i} className="relative">
                    <div className={`p-4 rounded-xl glass-subtle hover:scale-[1.02] transition-transform cursor-pointer`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${layer.color} flex items-center justify-center flex-shrink-0`}>
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
          <div className="section-content space-y-6">
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
