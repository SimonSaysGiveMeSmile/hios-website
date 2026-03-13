'use client';

import React from 'react';
import GlassCard from './GlassCard';

export default function Product() {
  const layers = [
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      title: 'Voice Interface',
      description: 'Understands your request',
      color: 'from-slate-600 to-slate-700'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Intent Parsing',
      description: 'Extracts meaning and context',
      color: 'from-slate-600 to-slate-700'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Agent Planner',
      description: 'Creates execution strategy',
      color: 'from-slate-600 to-slate-700'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Shortcut Execution',
      description: 'Runs iOS automations',
      color: 'from-slate-600 to-slate-700'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Apps + Web',
      description: 'Interacts with services',
      color: 'from-slate-600 to-slate-700'
    },
  ];

  return (
    <section id="product" className="relative min-h-[66vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-center">
          {/* Left: Text */}
          <div className="space-y-6 order-1 lg:order-1 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
              Built to get<br />
              <span className="gradient-text">things done.</span>
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              HiOS turns your request into a plan and completes it across apps, websites, and device tools.
            </p>
          </div>

          {/* Right: Architecture stack */}
          <div className="relative order-2 lg:order-2 flex flex-col justify-center">
            <div className="space-y-2">
              {layers.map((layer, i) => (
                <div
                  key={i}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <GlassCard className="p-5" variant="subtle">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${layer.color} flex items-center justify-center flex-shrink-0`}>
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
        </div>
      </div>
    </section>
  );
}
