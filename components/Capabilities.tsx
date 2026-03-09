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
      title: 'Just say it',
      description: 'HiOS understands natural language and executes the task.',
      color: 'from-blue-500 to-cyan-600',
      miniDiagram: (
        <div className="flex items-center gap-2 mt-4">
          <div className="flex-1 h-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full animate-pulse" />
          <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <div className="px-3 py-1 rounded-full bg-cyan-500/20 text-xs text-cyan-400">Command</div>
        </div>
      )
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: "See what's on screen",
      description: 'Extract text from documents, screenshots, and photos.',
      color: 'from-purple-500 to-pink-600',
      miniDiagram: (
        <div className="mt-4 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
          <div className="space-y-1">
            <div className="h-1.5 bg-purple-500/30 rounded w-full" />
            <div className="h-1.5 bg-purple-500/50 rounded w-3/4" />
            <div className="h-1.5 bg-purple-500/30 rounded w-5/6" />
          </div>
        </div>
      )
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      title: 'Works across the web',
      description: 'HiOS navigates websites and completes tasks automatically.',
      color: 'from-orange-500 to-red-600',
      miniDiagram: (
        <div className="mt-4 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500 animate-ping" />
          <div className="flex-1 flex gap-1">
            <div className="w-2 h-2 rounded-sm bg-orange-500/30" />
            <div className="w-2 h-2 rounded-sm bg-orange-500/50" />
            <div className="w-2 h-2 rounded-sm bg-orange-500/30" />
          </div>
          <span className="text-xs text-orange-400">Click</span>
        </div>
      )
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Remembers what matters',
      description: 'HiOS learns your contacts, habits, and preferences.',
      color: 'from-emerald-500 to-green-600',
      miniDiagram: (
        <div className="mt-4 flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/30" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/50 to-transparent" />
          <span className="text-xs text-emerald-400">History</span>
        </div>
      )
    },
  ];

  return (
    <section id="capabilities" className="relative min-h-[66vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Built to get things done.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className="animate-fadeInUp"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <GlassCard className="p-8 h-full hover:scale-[1.02] transition-transform" variant="subtle">
                <div className="space-y-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cap.color} flex items-center justify-center`}>
                    {cap.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{cap.title}</h3>
                    <p style={{ color: 'var(--text-muted)' }}>{cap.description}</p>
                  </div>
                  {cap.miniDiagram}
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
