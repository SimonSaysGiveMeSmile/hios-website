'use client';

import React from 'react';

// Temporary placeholder - liquid-glass-react folder was removed
export default function LiquidGlassButton({
  children,
  className = '',
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}