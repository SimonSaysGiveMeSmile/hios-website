'use client';

import React, { useState, useEffect, useRef } from 'react';
import GlassCard from './GlassCard';

const services = [
  {
    name: 'Gmail',
    color: '#EA4335',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.545l8.073-6.052C21.69 2.28 24 3.434 24 5.457z" fill="currentColor"/>
      </svg>
    ),
    angle: 270,
  },
  {
    name: 'LinkedIn',
    color: '#0A66C2',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
      </svg>
    ),
    angle: 315,
  },
  {
    name: 'DoorDash',
    color: '#FF3008',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M23.071 8.409a6.09 6.09 0 00-5.396-3.228H.584A.589.589 0 00.17 6.184L3.894 9.93a1.752 1.752 0 001.242.516h12.049a1.554 1.554 0 11.031 3.108H8.91a.589.589 0 00-.415 1.003l3.725 3.747a1.75 1.75 0 001.242.516h3.757c4.887 0 8.584-5.225 5.852-10.413z" fill="currentColor"/>
      </svg>
    ),
    angle: 0,
  },
  {
    name: 'Spotify',
    color: '#1DB954',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" fill="currentColor"/>
      </svg>
    ),
    angle: 45,
  },
  {
    name: 'Uber',
    color: '#000000',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M0 7.97v4.958c0 1.867 1.302 3.101 3 3.101.826 0 1.562-.316 2.094-.87v.736H6.27V7.97H5.094v4.674c0 1.44-.813 2.376-2.036 2.376-1.224 0-1.792-.837-1.792-2.174V7.97H0zm8.436 0v4.958c0 1.867 1.302 3.101 3 3.101.826 0 1.563-.316 2.094-.87v.736h1.177V7.97h-1.177v4.674c0 1.44-.812 2.376-2.035 2.376s-1.793-.837-1.793-2.174V7.97H8.436zm7.223 7.895h1.177v-3.063c0-1.353.725-2.174 1.793-2.174 1.068 0 1.793.82 1.793 2.174v3.063H21.6v-3.063c0-1.353.725-2.174 1.793-2.174.186 0 .363.025.527.07V9.504a2.243 2.243 0 00-.527-.063c-.826 0-1.563.316-2.094.87a2.69 2.69 0 00-2.094-.87c-.826 0-1.563.316-2.094.87V7.97h-1.177v7.895h-.275z" fill="currentColor"/>
      </svg>
    ),
    angle: 90,
  },
  {
    name: 'WhatsApp',
    color: '#25D366',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"/>
      </svg>
    ),
    angle: 135,
  },
  {
    name: 'Netflix',
    color: '#E50914',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.913.002-22.95zM5.398 1.05V24c2.873-.504 4.691-.762 5.697-.933V1.05z" fill="currentColor"/>
      </svg>
    ),
    angle: 180,
  },
  {
    name: 'Maps',
    color: '#4285F4',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M12 0C7.31 0 3.07 3.11 1.93 7.6c-.46 1.82-.46 3.76 0 5.58C3.07 17.67 7.31 24 12 24s8.93-6.33 10.07-10.82c.46-1.82.46-3.76 0-5.58C20.93 3.11 16.69 0 12 0zm0 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor"/>
      </svg>
    ),
    angle: 225,
  },
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const rotationRef = useRef(0);
  const [positions, setPositions] = useState<{x: number; y: number}[]>([]);
  const [isDark, setIsDark] = useState(false);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const checkTheme = () => {
      const theme = document.body.getAttribute('data-theme');
      setIsDark(theme === 'dark');
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const radius = 40;
    const cx = 50;
    const cy = 50;

    const animate = () => {
      rotationRef.current = (rotationRef.current + 0.04) % 360;
      const newPositions = services.map((s) => {
        const rad = ((s.angle + rotationRef.current) * Math.PI) / 180;
        return {
          x: cx + radius * Math.cos(rad),
          y: cy + radius * Math.sin(rad),
        };
      });
      setPositions(newPositions);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  if (positions.length === 0) return null;

  const cx = 50;
  const cy = 50;

  return (
    <section
      id="services"
      className="relative min-h-[66vh] flex items-center justify-center px-6 py-24"
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
          {/* Left: Visualization */}
          <div className="order-2 lg:order-1">
            <GlassCard className="p-8 md:p-10" variant="subtle">
            <div
              className="relative w-full mx-auto"
              style={{ aspectRatio: '1 / 1' }}
            >
            {/* SVG layer: orbit ring + connection lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              style={{ overflow: 'visible' }}
            >
              {/* Connection lines — visible only on hover */}
              {positions.map((pos, i) => {
                const isHovered = hoveredIndex === i;
                const svc = services[i];
                return (
                  <line
                    key={`line-${svc.name}`}
                    x1={cx}
                    y1={cy}
                    x2={pos.x}
                    y2={pos.y}
                    stroke={isHovered ? svc.color : 'transparent'}
                    strokeWidth={isHovered ? 0.8 : 0.4}
                    style={{
                      transition: 'stroke 0.4s ease, stroke-width 0.4s ease',
                    }}
                  />
                );
              })}

              {/* Animated pulse dots traveling along lines */}
              {positions.map((pos, i) => {
                const isHovered = hoveredIndex === i;
                if (!isHovered) return null;
                const svc = services[i];
                return (
                  <circle key={`pulse-${svc.name}`} r={1} fill={svc.color} opacity={0.6}>
                    <animateMotion
                      dur="1.5s"
                      repeatCount="indefinite"
                      path={`M${cx},${cy} L${pos.x},${pos.y}`}
                    />
                  </circle>
                );
              })}
            </svg>

            {/* Center hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div
                className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-[18px] flex items-center justify-center icon-metallic"
                style={{
                  background: isDark
                    ? 'linear-gradient(135deg, #8B8B8F, #A1A1AA)'
                    : 'linear-gradient(135deg, #A1A1AA, #B4B4BD)',
                  boxShadow: isDark
                    ? '0 8px 24px rgba(161,161,170,0.2), 0 0 0 1px rgba(255,255,255,0.08)'
                    : '0 12px 30px rgba(161,161,170,0.15), 0 0 0 1px rgba(161,161,170,0.1)',
                }}
              >
                <img
                  src="/logo.svg"
                  alt="HiOS"
                  className="w-9 h-9 md:w-10 md:h-10"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
            </div>

            {/* App nodes */}
            {positions.map((pos, i) => {
              const svc = services[i];
              const isHovered = hoveredIndex === i;

              return (
                <div
                  key={svc.name}
                  className="absolute z-10"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: `translate(-50%, -50%) scale(${isHovered ? 1.15 : 1})`,
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex flex-col items-center gap-1.5 cursor-default">
                    <div
                      className="w-11 h-11 md:w-[52px] md:h-[52px] rounded-full flex items-center justify-center"
                      style={{
                        background: isDark ? '#1A1A1A' : '#FFFFFF',
                        border: `1px solid ${
                          isHovered
                            ? (isDark ? `${svc.color}40` : `${svc.color}30`)
                            : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)')
                        }`,
                        boxShadow: isHovered
                          ? `0 8px 20px ${isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'}, 0 0 0 1px ${svc.color}20`
                          : `0 2px 8px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.04)'}`,
                        color: isHovered
                          ? svc.color
                          : (isDark ? '#9CA3AF' : '#6B7280'),
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      {svc.icon}
                    </div>
                    <span
                      className="text-[10px] font-medium whitespace-nowrap select-none"
                      style={{
                        color: isHovered
                          ? (isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)')
                          : (isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)'),
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {svc.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          </GlassCard>
          </div>

          {/* Right: Text */}
          <div className="space-y-6 order-1 lg:order-2 flex flex-col justify-center">
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Works with all
              <br />
              <span className="gradient-text">
                your favorite apps.
              </span>
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
            >
              HiOS can connect to and operate applications with your permission.
              One request can trigger tasks across multiple services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
