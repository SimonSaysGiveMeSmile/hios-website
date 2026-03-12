'use client';

import React, { useState } from 'react';
import InteractiveButton from './InteractiveButton';

// Phone showcase group - can be swapped for different demos
function PhoneShowcase() {
  const [activeDemo, setActiveDemo] = useState(0);

  const demos = [
    {
      id: 'uber-airport',
      command: '"Book me an Uber to the airport"',
      tasks: [
        { label: 'Ride selected', done: true },
        { label: 'Pickup confirmed', done: true },
        { label: 'Driver assigned', done: true },
      ],
      status: 'On the way',
    },
  ];

  const currentDemo = demos[activeDemo];

  return (
    <div className="relative h-full flex flex-col">
      {/* Phone Container - maintains 9:19.5 aspect ratio from PNG */}
      <div className="relative w-full" style={{ aspectRatio: '9 / 19.5' }}>
        {/* Screen content - scaled to fit within 80% sized PNG */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: '14.5%',
            left: '15%',
            width: '70%',
            height: '71%',
            borderRadius: '2rem',
            background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
          }}
        >
          <div className="h-full p-5 pt-12 flex flex-col justify-between">
            {/* Command bubble */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 transform rotate-180">
                <img src="/logo.svg" alt="HiOS" className="w-full h-full" />
              </div>
              <div className="flex-1 glass-subtle rounded-2xl p-4">
                <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{currentDemo.command}</p>
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

export default function CTA() {
  return (
    <section id="cta" className="relative min-h-screen flex items-center justify-center px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Device mockup */}
          <div className="relative w-full max-w-xs mx-auto mt-8 md:mt-0 order-2 lg:order-1">
            <PhoneShowcase />
          </div>

          {/* Right: CTA content */}
          <div className="space-y-8 text-center lg:text-left order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
              Meet your new<br />iPhone.
            </h2>
            <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
              HiOS turns simple requests into completed tasks.<br />
              Experience the future of iPhone automation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <InteractiveButton primary>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                Join TestFlight
              </InteractiveButton>

              <InteractiveButton>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Read the Docs
              </InteractiveButton>
            </div>

            <p className="text-sm" style={{ color: 'var(--text-subtle)' }}>
              Free during beta
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}