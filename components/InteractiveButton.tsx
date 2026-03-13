'use client';

import React, { useRef, useState } from 'react';

interface InteractiveButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function InteractiveButton({
  children,
  primary = false,
  onClick,
  className = ''
}: InteractiveButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setLightPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  if (primary) {
    return (
      <button
        ref={ref}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative w-full sm:w-auto px-8 py-4 rounded-full cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-[1.02] bg-gradient-to-br from-white to-gray-200 text-black font-semibold shadow-[0_10px_40px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.9)] ${className}`}
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #e5e5e5 100%)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 ease-out"
          style={{
            opacity: isHovered ? 0.9 : 0,
            background: `radial-gradient(ellipse 60% 50% at ${lightPos.x}% ${lightPos.y}%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 40%, transparent 70%)`,
          }}
        />
        <span className="relative z-10 flex items-center justify-center gap-3">
          {children}
        </span>
      </button>
    );
  }

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`glass relative w-full sm:w-auto px-8 py-4 rounded-full cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] ${className}`}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(ellipse 80% 60% at ${lightPos.x}% ${lightPos.y}%, var(--reflection-color) 0%, transparent 70%)`,
        }}
      />
      <span className="relative z-10 flex items-center justify-center gap-3 font-medium" style={{ color: 'var(--text-primary)' }}>
        {children}
      </span>
    </button>
  );
}
