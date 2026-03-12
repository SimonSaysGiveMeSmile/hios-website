'use client';

import React, { useState } from 'react';
import InteractiveButton from './InteractiveButton';

// Phone showcase group - can be swapped for different demos
function PhoneShowcase() {
  const [activeDemo, setActiveDemo] = useState(0);

  const demos = [
    {
      id: 'scan-accountant',
      command: '"Scan and send to accountant"',
      tasks: [
        { label: 'Capture', done: true },
        { label: 'Extract', done: true },
        { label: 'Find contact', done: true },
        { label: 'Send', done: true },
      ],
      status: 'Task Completed',
    },
  ];

  const currentDemo = demos[activeDemo];

  return (
    <div className="relative h-full flex flex-col">
      {/* Phone Container - maintains 9:19.5 aspect ratio from PNG */}
      <div className="relative w-full" style={{ aspectRatio: '9 / 19.5' }}>
        {/* Screen content - scaled to fit within 80% sized PNG */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            top: '14.5%',
            left: '15%',
            width: '70%',
            height: '71%',
            borderRadius: '2rem',
            background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
          }}
        >
          <div className="h-full p-4 pt-10 flex flex-col justify-between">
            {/* Command bubble */}
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 flex-shrink-0">
                <img src="/logo.svg" alt="HiOS" className="w-full h-full" />
              </div>
              <div className="flex-1 glass-subtle rounded-2xl p-3">
                <p className="text-xs" style={{ color: 'var(--text-primary)' }}>{currentDemo.command}</p>
              </div>
            </div>

            {/* Task checklist - grows to fill space */}
            <div className="flex-1 flex flex-col justify-center py-4">
              <div className="space-y-3">
                {currentDemo.tasks.map((task, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${task.done ? 'bg-emerald-500' : 'bg-gray-600'}`}>
                      {task.done && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    {task.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Status badge */}
            <div className="mt-auto p-3 rounded-xl bg-emerald-500/20 text-center">
              <span className="text-sm font-semibold text-emerald-400">{currentDemo.status}</span>
            </div>
          </div>
        </div>

        {/* PNG Phone Frame Overlay - 20% smaller, centered */}
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

      {/* Demo indicator dots */}
      <div className="flex justify-center gap-2 mt-4">
        {demos.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveDemo(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === activeDemo ? 'bg-emerald-400 w-4' : 'bg-gray-600'}`}
            aria-label={`View demo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center px-6 overflow-hidden" style={{ paddingTop: '80px' }}>
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: 'var(--glow-blue)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: 'var(--glow-purple)' }} />

      <div className="relative max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Text content */}
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]" style={{ color: 'var(--text-primary)' }}>
              Your iPhone.<br />
              <span style={{ color: 'var(--text-secondary)' }}>Now it gets things done.</span>
            </h1>

            <p className="text-xl max-w-lg mx-auto lg:mx-0" style={{ color: 'var(--text-muted)' }}>
              Tell your phone what you want.<br />
              Let HiOS handle the rest.
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
          <div className="relative w-full max-w-xs mx-auto mt-8">
            <PhoneShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
