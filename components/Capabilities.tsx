'use client';

import React, { useState } from 'react';
import GlassCard from './GlassCard';

export default function Capabilities() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const capabilities = [
    {
      icon: (
        <svg className="w-7 h-7" style={{ color: 'var(--text-primary)' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
        </svg>
      ),
      title: 'Book a reservation',
      description: '"Find a sushi place near me tonight for two."',
      steps: [
        'Open Google Maps',
        'Search "sushi restaurants nearby"',
        'Filter by rating & availability',
        'Select best match → tap Reserve',
        'Fill in party size, time, confirm',
      ],
      color: 'from-zinc-400 to-slate-500',
    },
    {
      icon: (
        <svg className="w-7 h-7" style={{ color: 'var(--text-primary)' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99ZM6.5 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm11 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM5 11l1.5-4.5h11L19 11H5Z" />
        </svg>
      ),
      title: 'Call an Uber',
      description: '"Get me an Uber to the airport."',
      steps: [
        'Open Uber app',
        'Set destination to nearest airport',
        'Compare ride options & prices',
        'Select UberX → confirm pickup',
        'Track driver arrival in real-time',
      ],
      color: 'from-zinc-400 to-slate-500',
    },
    {
      icon: (
        <svg className="w-7 h-7" style={{ color: 'var(--text-primary)' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66l4.19 4.18Zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47Z" />
        </svg>
      ),
      title: 'Order DoorDash',
      description: '"Order my usual from Chipotle."',
      steps: [
        'Open DoorDash app',
        'Navigate to Chipotle → past orders',
        'Reorder saved favorite',
        'Apply best available promo',
        'Confirm order & track delivery',
      ],
      color: 'from-zinc-400 to-slate-500',
    },
    {
      icon: (
        <svg className="w-7 h-7" style={{ color: 'var(--text-primary)' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33a2.5 2.5 0 0 0 2.5 2.5c.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5a2.5 2.5 0 0 0 5 0V9c0-.69-.28-1.32-.73-1.77ZM12 10H6V5h6v5Z" />
        </svg>
      ),
      title: 'Find cheapest gas',
      description: '"Where\'s the cheapest gas near me?"',
      steps: [
        'Query gas price APIs for location',
        'Compare prices within 5-mile radius',
        'Rank by price per gallon',
        'Select cheapest station',
        'Open Maps → start navigation',
      ],
      color: 'from-zinc-400 to-slate-500',
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
            See how HiOS plans and executes real tasks, step by step.
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
                className="h-full hover:scale-[1.02] transition-transform cursor-pointer liquidGlass-wrapper rounded-2xl relative overflow-hidden"
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              >
                <span style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(1px) saturate(140%)', WebkitBackdropFilter: 'blur(1px) saturate(140%)', background: 'transparent', pointerEvents: 'none', zIndex: 0 }} />
                <div className="p-6 relative z-10">
                <div className="space-y-4">
                  <div className={`w-14 h-14 rounded-2xl icon-metallic flex items-center justify-center`}>
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

                  {/* Expanded steps */}
                  {expandedIndex === i && (
                    <div className="pt-3 mt-3 border-t border-white/10">
                      <div className="space-y-2">
                        {cap.steps.map((step, j) => (
                          <div key={j} className="flex items-start gap-2">
                            <span className="text-xs font-mono mt-0.5 shrink-0" style={{ color: 'var(--text-subtle)' }}>{j + 1}.</span>
                            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
