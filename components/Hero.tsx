'use client';

import React, { useState, useEffect } from 'react';
import InteractiveButton from './InteractiveButton';

// iOS-style demo content with proper light/dark mode
function PhoneShowcase() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const theme = document.body.getAttribute('data-theme');
      setIsDark(theme === 'dark');
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const tasks = [
    { label: 'Capture receipt', done: true },
    { label: 'Extract totals', done: true },
    { label: 'Find accountant', done: true },
    { label: 'Send via email', done: false, pending: true },
  ];

  const progress = 75;

  return (
    <div className="relative h-full flex flex-col">
      {/* Phone Container */}
      <div className="relative w-full" style={{ aspectRatio: '9 / 19.5' }}>
        {/* Screen content - iOS App UI */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: '14.5%',
            left: '15%',
            width: '70%',
            height: '71%',
            borderRadius: '2rem',
            background: isDark ? '#000000' : '#F2F2F7',
          }}
        >
          {/* Status bar area */}
          <div className="flex items-center justify-between px-4 pt-3 pb-2" style={{ background: isDark ? '#000000' : '#F2F2F7' }}>
            <span className="text-xs font-semibold" style={{ color: isDark ? '#FFFFFF' : '#000000' }}>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2.5 rounded-sm" style={{ background: isDark ? '#FFFFFF' : '#000000', opacity: 0.3 }} />
            </div>
          </div>

          {/* App Header */}
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#007AFF' }}>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold" style={{ color: isDark ? '#FFFFFF' : '#000000' }}>HiOS</span>
              </div>
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: isDark ? '#1C1C1E' : '#E5E5EA' }}>
                <div className="w-3 h-3 rounded-full" style={{ background: isDark ? '#FFFFFF' : '#000000', opacity: 0.2 }} />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-4 pb-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: isDark ? '#1C1C1E' : '#FFFFFF' }}>
              <svg className="w-4 h-4" style={{ color: '#8E8E93' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-sm" style={{ color: '#8E8E93' }}>Scan and send to accountant</span>
            </div>
          </div>

          {/* Task Card */}
          <div className="px-4 py-2">
            <div className="rounded-2xl p-4" style={{ background: isDark ? '#1C1C1E' : '#FFFFFF' }}>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium uppercase" style={{ color: '#8E8E93', letterSpacing: '0.5px' }}>Current Task</span>
                <span className="text-xs font-semibold px-2 py-1 rounded-lg" style={{ background: '#007AFF20', color: '#007AFF' }}>75%</span>
              </div>

              {/* Task List */}
              <div className="space-y-3">
                {tasks.map((task, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      task.done ? '' : task.pending ? 'border-2' : ''
                    }`} style={{
                      background: task.done ? '#34C759' : 'transparent',
                      borderColor: task.pending ? '#007AFF' : 'transparent'
                    }}>
                      {task.done && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {task.pending && (
                        <svg className="w-2.5 h-2.5" style={{ color: '#007AFF' }} fill="currentColor" viewBox="0 0 20 20">
                          <circle cx="10" cy="10" r="8" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm" style={{ color: task.done ? (isDark ? '#FFFFFF' : '#000000') : '#8E8E93' }}>
                      {task.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="h-1 rounded-full" style={{ background: isDark ? '#38383A' : '#E5E5EA' }}>
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: '#007AFF' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-3">
            <span className="text-xs font-medium uppercase px-2" style={{ color: '#8E8E93', letterSpacing: '0.5px' }}>Quick Actions</span>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {['Calls', 'Messages', 'Calendar', 'Reminders'].map((action, i) => (
                <div key={i} className="flex flex-col items-center gap-1 py-2 rounded-xl" style={{ background: isDark ? '#1C1C1E' : '#FFFFFF' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: isDark ? '#2C2C2E' : '#F2F2F7' }}>
                    <svg className="w-4 h-4" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-[10px]" style={{ color: isDark ? '#FFFFFF' : '#000000' }}>{action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PNG Phone Frame Overlay */}
        <img
          src="/ip16-gold-front.png"
          alt="iPhone Frame"
          className="absolute pointer-events-none"
          style={{
            top: '50%',
            left: '50%',
            width: '80%',
            height: 'auto',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center px-4 md:px-6 overflow-visible pt-[120px] md:pt-16 pb-4">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: 'var(--glow-blue)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: 'var(--glow-purple)' }} />

      <div className="relative max-w-5xl mx-auto lg:translate-x-20">
        <div className="grid lg:grid-cols-2 gap-0 lg:gap-2 items-center">
          {/* Left: Text content */}
          <div className="space-y-4 text-center lg:text-left hero-text-shift">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight" style={{ color: 'var(--text-primary)' }}>
              Your iPhone.<br />
              <span style={{ color: 'var(--text-secondary)' }}>Now it gets things done.</span>
            </h1>

            <p className="text-xl max-w-lg mx-auto lg:mx-0" style={{ color: 'var(--text-muted)' }}>
              Tell your phone what you want.<br />
              Let HiOS handle the rest.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-row items-center justify-center lg:justify-start gap-4">
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
          <div className="relative w-full max-w-sm mt-0">
            <PhoneShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}