'use client';

import React from 'react';
import GlassCard from './GlassCard';

export default function Pricing() {
  const plans = [
    {
      name: 'Trial',
      price: '$0.99',
      period: 'trial',
      features: [
        'Test HiOS',
        'Limited usage',
        'Basic features',
      ],
      color: 'from-blue-500 to-cyan-600',
    },
    {
      name: 'Basic',
      price: '$9',
      period: '/month',
      features: [
        'Browser automation',
        'Simple workflows',
        'Limited tasks',
      ],
      color: 'from-purple-500 to-pink-600',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$29-49',
      period: '/month',
      features: [
        'Device automation',
        'Shortcuts integration',
        'OCR workflows',
        'Higher usage limits',
      ],
      color: 'from-orange-500 to-red-600',
      popular: true,
    },
    {
      name: 'Power',
      price: '$79-99',
      period: '/month',
      features: [
        'Advanced automation',
        'Heavy usage',
        'Priority features',
        'Full system access',
      ],
      color: 'from-emerald-500 to-green-600',
    },
  ];

  return (
    <section id="pricing" className="relative min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Automation for everyone.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className="animate-fadeInUp"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <GlassCard className={`p-6 h-full ${plan.popular ? 'ring-2 ring-emerald-500' : ''}`} variant={plan.popular ? 'strong' : 'subtle'}>
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                    {plan.popular && (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{plan.price}</span>
                      <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
