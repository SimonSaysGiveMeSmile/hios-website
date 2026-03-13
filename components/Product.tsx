'use client';

import React from 'react';

export default function Product() {
  const layers = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7}>
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5 11c0 3.5 3 6 7 6s7-2.5 7-6" />
          <path d="M12 17v3" />
        </svg>
      ),
      title: 'Just say the words',
      description: 'Speak naturally. HiOS understands and executes the task.',
      detail: 'Voice commands, natural language, smart intent detection.'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7}>
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      title: 'See what\'s on screen',
      description: 'Extract text from documents, screenshots, and photos.',
      detail: 'OCR, image recognition, document parsing.'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
        </svg>
      ),
      title: 'Works across the web',
      description: 'Navigate websites and complete tasks automatically.',
      detail: 'Browser automation, form filling, web scraping.'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7}>
          <path d="M9 18h6M10 21h4" />
          <path d="M6 10a6 6 0 1112 0c0 2-1 3-2 4-1 1-1 2-1 3h-6c0-1 0-2-1-3-1-1-2-2-2-4z" />
        </svg>
      ),
      title: 'Remembers what matters',
      description: 'Learns your contacts, habits, and preferences.',
      detail: 'Contextual memory, preference learning, smart suggestions.'
    },
  ];

  return (
    <section id="product" className="relative min-h-[66vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ color: 'var(--text-primary)' }}>
            Just say the words.
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
            HiOS takes care of the steps.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {layers.map((layer, i) => (
            <div
              key={i}
              className="group p-7 rounded-2xl transition-all duration-300 hover:translate-y-[-2px]"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--card-shadow)'
              }}
            >
              {/* Icon Container */}
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center mb-4 transition-colors"
                style={{
                  backgroundColor: 'rgba(142, 142, 147, 0.08)',
                  border: '1px solid rgba(142, 142, 147, 0.12)',
                  color: 'var(--text-primary)'
                }}
              >
                {layer.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {layer.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>
                {layer.description}
              </p>

              {/* Detail */}
              <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>
                {layer.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
