'use client';

import React, { useState } from 'react';
import GlassCard from './GlassCard';

export default function Capabilities() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const capabilities = [
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      title: 'Just say the words',
      description: 'HiOS understands natural language and executes the task.',
      details: 'Voice commands, natural language processing, smart intent detection.',
      color: 'from-slate-600 to-slate-700',
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
      details: 'OCR, screenshot analysis, document parsing, visual recognition.',
      color: 'from-slate-600 to-slate-700',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      title: 'Works across the web',
      description: 'Navigate websites and complete tasks automatically.',
      details: 'Browser automation, form filling, web scraping, API integration.',
      color: 'from-slate-600 to-slate-700',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Remembers what matters',
      description: 'Learns your contacts, habits, and preferences.',
      details: 'Contact memory, preference learning, context awareness.',
      color: 'from-slate-600 to-slate-700',
    },
  ];

  return (
    <section id="capabilities" className="relative min-h-[66vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Just say the words.
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
            HiOS handles everyday tasks across your device.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className="animate-fadeInUp"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div
                className="p-6 h-full hover:scale-[1.02] transition-transform cursor-pointer glass-subtle rounded-2xl"
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              >
                <div className="space-y-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cap.color} flex items-center justify-center`}>
                    {cap.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{cap.title}</h3>
                    <p style={{ color: 'var(--text-muted)' }}>{cap.description}</p>
                  </div>

                  {/* Dropdown indicator */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs" style={{ color: 'var(--text-subtle)' }}>
                      {expandedIndex === i ? 'Less' : 'More'}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform ${expandedIndex === i ? 'rotate-180' : ''}`}
                      style={{ color: 'var(--text-subtle)' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Expanded details */}
                  {expandedIndex === i && (
                    <div className="pt-3 mt-3 border-t border-white/10">
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{cap.details}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
