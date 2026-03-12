'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

interface NavigationProps {
  minimal?: boolean;
}

export default function Navigation({ minimal = false }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(minimal);
  const [mouseNearTop, setMouseNearTop] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      // Float up animation: hide when scrolling down, show when at top
      if (minimal) {
        setIsHidden(window.scrollY > 50);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [minimal]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Show nav when mouse is within 80px of top of viewport
      if (minimal && e.clientY < 80) {
        setMouseNearTop(true);
      } else {
        setMouseNearTop(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [minimal]);

  useEffect(() => {
    // Initially hide for minimal mode to trigger animation
    if (minimal) {
      const timer = setTimeout(() => setIsHidden(true), 100);
      return () => clearTimeout(timer);
    }
  }, [minimal]);

  // Show nav when mouse is near top
  const shouldShow = minimal ? !isHidden || mouseNearTop : true;

  const navItems = [
    { label: 'Overview', href: '#hero' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Waitlist', href: '#cta' },
  ];

  return (
    <nav
      className={`fixed top-6 left-0 right-0 z-50 px-6 transition-all duration-500 ${
        minimal ? (shouldShow ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0') : ''
      }`}
      style={{
        transitionProperty: 'transform, opacity',
      }}
    >
      <div className={`max-w-5xl mx-auto liquidGlass-wrapper px-8 py-4 ${minimal ? 'py-2' : ''}`} style={{ borderRadius: '9999px' }}>
        <div className="flex items-center justify-between w-full"
          style={{ color: 'var(--text-primary)' }}
        >
          {/* Logo - always visible, links to home */}
          <a href="/" className="flex items-center justify-center gap-3 hover:opacity-80 transition-opacity">
            <div className={`${minimal ? 'w-8 h-8' : 'w-10 h-10'} flex items-center justify-center`}>
              <img src="/logo.svg" alt="HiOS Logo" className="w-full h-full logo-img" />
            </div>
            <span className={`font-bold ${minimal ? 'text-lg' : 'text-2xl'}`} style={{ color: 'var(--text-primary)' }}>HiOS</span>
          </a>

          {/* Center Navigation Items - hidden in minimal mode */}
          {!minimal && (
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:opacity-100"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}

          {/* Theme Toggle Only */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle - Circular */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:scale-105 transition-transform"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                boxShadow: '0 0 12px rgba(255, 255, 255, 0.1)',
              }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg
                  className="w-5 h-5"
                  style={{ color: '#ffffff' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  style={{ color: '#000000' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}