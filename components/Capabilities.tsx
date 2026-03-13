'use client';

import React, { useState } from 'react';
import GlassCard from './GlassCard';

export default function Capabilities() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const capabilities = [
    {
      icon: (
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1a4 4 0 0 0-4 4v6a4 4 0 0 0 8 0V5a4 4 0 0 0-4-4Z" />
          <path d="M6.5 11a.75.75 0 0 0-1.5 0 7 7 0 0 0 6.25 6.963V21H8.5a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-2.75v-3.037A7 7 0 0 0 19 11a.75.75 0 0 0-1.5 0 5.5 5.5 0 0 1-11 0Z" />
        </svg>
      ),
      title: 'Just say the words',
      description: 'HiOS understands natural language and executes the task.',
      details: 'Voice commands, natural language processing, smart intent detection.',
      color: 'from-slate-600 to-slate-700',
    },
    {
      icon: (
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4.5C7.305 4.5 3.135 7.61 1.13 12c2.005 4.39 6.175 7.5 10.87 7.5s8.865-3.11 10.87-7.5C20.865 7.61 16.695 4.5 12 4.5Zm0 12.75a5.25 5.25 0 1 1 0-10.5 5.25 5.25 0 0 1 0 10.5Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      title: "See what's on screen",
      description: 'Extract text from documents, screenshots, and photos.',
      details: 'OCR, screenshot analysis, document parsing, visual recognition.',
      color: 'from-slate-600 to-slate-700',
    },
    {
      icon: (
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM8.547 4.505a8.25 8.25 0 1 0 6.906 0 9.584 9.584 0 0 0-1.7-.225h-.006a9.584 9.584 0 0 0-1.7.225 8.25 8.25 0 0 0-3.5 0ZM12 6a.75.75 0 0 1 .75.75v.316a4.5 4.5 0 0 1 3.184 3.184h.316a.75.75 0 0 1 0 1.5h-.316a4.5 4.5 0 0 1-3.184 3.184v.316a.75.75 0 0 1-1.5 0v-.316a4.5 4.5 0 0 1-3.184-3.184H7.75a.75.75 0 0 1 0-1.5h.316A4.5 4.5 0 0 1 11.25 7.066V6.75A.75.75 0 0 1 12 6Zm-2.25 6a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Works across the web',
      description: 'Navigate websites and complete tasks automatically.',
      details: 'Browser automation, form filling, web scraping, API integration.',
      color: 'from-slate-600 to-slate-700',
    },
    {
      icon: (
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
          <path d="M5.25 5.25a3 3 0 0 0-3 3v8.5a3 3 0 0 0 3 3h8.5a3 3 0 0 0 3-3v-3.25a.75.75 0 0 0-1.5 0v3.25a1.5 1.5 0 0 1-1.5 1.5h-8.5a1.5 1.5 0 0 1-1.5-1.5v-8.5a1.5 1.5 0 0 1 1.5-1.5h3.25a.75.75 0 0 0 0-1.5H5.25Z" />
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
