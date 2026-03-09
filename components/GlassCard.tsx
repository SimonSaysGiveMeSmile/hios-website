'use client';

import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'subtle';
}

export default function GlassCard({ children, className = '', variant = 'default' }: GlassCardProps) {
  const variantClass = {
    default: 'glass',
    strong: 'glass-strong',
    subtle: 'glass-subtle',
  }[variant];

  return (
    <div className={`${variantClass} rounded-[20px] ${className}`}>
      {children}
    </div>
  );
}
