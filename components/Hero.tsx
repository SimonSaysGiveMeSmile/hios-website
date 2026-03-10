'use client';

import React from 'react';
import GlassCard from './GlassCard';
import InteractiveButton from './InteractiveButton';

function AgentTaskIllustration() {
  return (
    <div className="relative w-full aspect-[16/10] max-w-2xl mx-auto">
      {/* Main task automation UI */}
      <GlassCard className="absolute inset-0 p-6" variant="subtle">
        <div className="h-full flex flex-col gap-4">
          {/* Command bubble */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 transform rotate-180">
              <img src="/logo.svg" alt="HiOS" className="w-full h-full" />
            </div>
            <div className="flex-1 glass-subtle rounded-2xl p-4">
              <p className="text-sm" style={{ color: 'var(--text-primary)' }}>"Scan this document and send it to my accountant"</p>
            </div>
          </div>

          {/* Task checklist */}
          <div className="flex-1 space-y-2">
            {[
              { label: 'Capture image', delay: '0ms' },
              { label: 'Extract text', delay: '100ms' },
              { label: 'Find contact', delay: '200ms' },
              { label: 'Send email', delay: '300ms' },
            ].map((task, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl glass-subtle animate-fadeInUp"
                style={{ animationDelay: task.delay }}
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{task.label}</span>
              </div>
            ))}
          </div>

          {/* Progress badge */}
          <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-emerald-500/20 to-green-600/20 border border-emerald-500/30">
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-semibold text-emerald-400">Task Completed</span>
          </div>
        </div>
      </GlassCard>

      {/* AI reasoning bubble */}
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-56 animate-float">
        <GlassCard className="p-4" variant="strong">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>AI Reasoning</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Document recognized → extracting text → identifying contact → composing email
            </p>
          </div>
        </GlassCard>
      </div>

      {/* Speed indicator */}
      <div className="absolute -left-4 bottom-8 animate-float" style={{ animationDelay: '1s' }}>
        <GlassCard className="p-3" variant="strong">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>10s</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>vs 90s manual</div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-24 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: 'var(--glow-blue)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: 'var(--glow-purple)' }} />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]" style={{ color: 'var(--text-primary)' }}>
              Tell your phone.<br />
              <span style={{ color: 'var(--text-secondary)' }}>It gets it done.</span>
            </h1>

            <p className="text-xl max-w-md mx-auto lg:mx-0" style={{ color: 'var(--text-muted)' }}>
              HiOS runs autonomous agents on iPhone, completing tasks across apps, shortcuts, and websites.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <InteractiveButton primary>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                Join TestFlight
              </InteractiveButton>

              <InteractiveButton>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                View Automations
              </InteractiveButton>
            </div>
          </div>

          {/* Right: Visual illustration */}
          <div className="relative">
            <AgentTaskIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
