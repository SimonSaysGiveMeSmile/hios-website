'use client';

import React from 'react';
import GlassCard from './GlassCard';

export default function Architecture() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" style={{ color: 'var(--text-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
        </svg>
      ),
      title: 'Agent Tools',
      description: 'Customized tool registry',
    },
    {
      icon: (
        <svg className="w-6 h-6" style={{ color: 'var(--text-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: 'Safe Sandbox',
      description: 'Local secure runtime',
    },
    {
      icon: (
        <svg className="w-6 h-6" style={{ color: 'var(--text-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      ),
      title: 'Deterministic',
      description: 'Reliable task workflows',
    },
    {
      icon: (
        <svg className="w-6 h-6" style={{ color: 'var(--text-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
        </svg>
      ),
      title: 'Apple Login',
      description: 'Native authentication',
    },
    {
      icon: (
        <svg className="w-6 h-6" style={{ color: 'var(--text-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      title: 'Shortcuts',
      description: 'iOS Shortcuts integration',
    },
    {
      icon: (
        <svg className="w-6 h-6" style={{ color: 'var(--text-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'OCR',
      description: 'Screen text recognition',
    },
    {
      icon: (
        <svg className="w-6 h-6" style={{ color: 'var(--text-primary)' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L9.28 9.28 2 12l7.28 2.72L12 22l2.72-7.28L22 12l-7.28-2.72L12 2zm0 4.24L13.66 11 18 12l-4.34 1L12 17.76 10.34 13 6 12l4.34-1L12 6.24z" />
        </svg>
      ),
      title: 'Gemini',
      description: 'Google AI framework',
    },
    {
      icon: (
        <svg className="w-6 h-6" style={{ color: 'var(--text-primary)' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a2.5 2.5 0 00-2.5 2.5c0 .56.19 1.08.5 1.5H8.5A2.5 2.5 0 006 8.5V10l-2.5.5c-.83.17-1.5.92-1.5 1.78v.44c0 .86.67 1.61 1.5 1.78L6 15v1.5A2.5 2.5 0 008.5 19H10l.5 2.5c.17.83.92 1.5 1.78 1.5h.44c.86 0 1.61-.67 1.78-1.5L15 19h1.5a2.5 2.5 0 002.5-2.5V15l2.5-.5c.83-.17 1.5-.92 1.5-1.78v-.44c0-.86-.67-1.61-1.5-1.78L19 10V8.5A2.5 2.5 0 0016.5 6H15c.31-.42.5-.94.5-1.5A2.5 2.5 0 0013 2h-1zm0 2h1a.5.5 0 010 1h-1a.5.5 0 010-1zM8.5 8h7a.5.5 0 01.5.5v7a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-7a.5.5 0 01.5-.5zm1.5 2v4h4v-4h-4z" />
        </svg>
      ),
      title: 'Octopus',
      description: 'On-device AI agent',
    },
    {
      icon: (
        <svg className="w-6 h-6" style={{ color: 'var(--text-primary)' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 0011.05.5a6.04 6.04 0 00-5.79 4.412 5.993 5.993 0 00-3.91 2.903 6.05 6.05 0 00.749 7.11 5.985 5.985 0 00.516 4.911 6.046 6.046 0 006.51 2.9A6.065 6.065 0 0013.05 23.5a6.04 6.04 0 005.79-4.412 5.993 5.993 0 003.91-2.903 6.042 6.042 0 00-.468-6.364zM13.05 21.874a4.52 4.52 0 01-2.908-1.06l.144-.083 4.834-2.79a.786.786 0 00.397-.68v-6.81l2.043 1.18a.072.072 0 01.04.055v5.641a4.535 4.535 0 01-4.55 4.547zm-9.77-4.168a4.51 4.51 0 01-.54-3.043l.144.086 4.834 2.79a.778.778 0 00.788 0l5.903-3.41v2.36a.072.072 0 01-.029.061l-4.888 2.823a4.535 4.535 0 01-6.212-1.667zm-1.272-10.52A4.516 4.516 0 014.38 4.97v5.748a.778.778 0 00.391.676l5.903 3.41-2.043 1.179a.072.072 0 01-.069.006l-4.888-2.824A4.535 4.535 0 012.008 7.186zm16.79 3.907l-5.903-3.41 2.043-1.18a.072.072 0 01.069-.005l4.888 2.823a4.53 4.53 0 01-1.643 8.217v-5.769a.785.785 0 00-.397-.676h.044zm2.033-3.06l-.144-.085-4.834-2.79a.778.778 0 00-.788 0l-5.903 3.41V6.21a.072.072 0 01.029-.062l4.888-2.82a4.533 4.533 0 016.752 4.705zm-12.79 4.21L6 11.062a.072.072 0 01-.04-.055V5.366a4.533 4.533 0 017.46-3.463l-.145.083-4.834 2.79a.786.786 0 00-.397.68l-.003 6.787zm1.11-2.39l2.63-1.52 2.63 1.52v3.04l-2.63 1.52-2.63-1.52v-3.04z" />
        </svg>
      ),
      title: 'OpenAI',
      description: 'GPT model support',
    },
  ];

  return (
    <section id="architecture" className="relative min-h-[66vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="space-y-12">
          {/* Text */}
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
              Supports <span className="gradient-text">OpenClaw</span> & More 🦞
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              HiOS is an iOS native agent runtime that runs autonomous agents within a secure sandbox, supporting any available agent framework including OpenClaw.
            </p>
          </div>

          {/* Features - single row */}
          <div className="relative">
            <GlassCard className="p-6" variant="subtle">
              <div className="grid grid-cols-3 lg:grid-cols-9 gap-4">
                {features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:scale-[1.02] transition-transform cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg icon-metallic flex items-center justify-center flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div className="text-center">
                      <h3 className="text-xs font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>
                        {feature.title}
                      </h3>
                      <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
