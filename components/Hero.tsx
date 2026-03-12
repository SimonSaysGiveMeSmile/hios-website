'use client';

import React, { useState, useEffect, useCallback } from 'react';
import InteractiveButton from './InteractiveButton';

// Reusable iOS-style icons
const Icons = {
  check: () => (
    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  ),
  pending: () => (
    <svg className="w-2.5 h-2.5" style={{ color: '#007AFF' }} fill="currentColor" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="8" />
    </svg>
  ),
  search: () => (
    <svg className="w-4 h-4" style={{ color: '#8E8E93' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  phone: () => (
    <svg className="w-4 h-4" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  email: () => (
    <svg className="w-4 h-4" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  calendar: () => (
    <svg className="w-4 h-4" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  notes: () => (
    <svg className="w-4 h-4" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  map: () => (
    <svg className="w-4 h-4" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  music: () => (
    <svg className="w-4 h-4" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    </svg>
  ),
  wallet: () => (
    <svg className="w-4 h-4" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
  health: () => (
    <svg className="w-4 h-4" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  shopping: () => (
    <svg className="w-4 h-4" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  message: () => (
    <svg className="w-4 h-4" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  settings: () => (
    <svg className="w-4 h-4" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

// Use case definitions
const useCases = [
  {
    id: 'receipt',
    appName: 'Receipt Scanner',
    searchPlaceholder: 'Scan receipt for expense report',
    taskLabel: 'Current Task',
    tasks: [
      { label: 'Capture receipt', done: true },
      { label: 'Extract totals', done: true },
      { label: 'Find accountant', done: true },
      { label: 'Send via email', done: false, pending: true },
    ],
    progress: 75,
    quickActions: [
      { icon: 'phone', label: 'Calls' },
      { icon: 'message', label: 'Messages' },
      { icon: 'calendar', label: 'Calendar' },
      { icon: 'notes', label: 'Notes' },
    ],
  },
  {
    id: 'meeting',
    appName: 'Meeting Prep',
    searchPlaceholder: 'Find meeting room and send invites',
    taskLabel: 'Upcoming Meeting',
    tasks: [
      { label: 'Check calendar', done: true },
      { label: 'Book room', done: true },
      { label: 'Send agenda', done: true },
      { label: 'Notify attendees', done: false, pending: true },
    ],
    progress: 75,
    quickActions: [
      { icon: 'calendar', label: 'Calendar' },
      { icon: 'email', label: 'Mail' },
      { icon: 'message', label: 'Messages' },
      { icon: 'phone', label: 'Calls' },
    ],
  },
  {
    id: 'travel',
    appName: 'Travel Planner',
    searchPlaceholder: 'Plan weekend trip to NYC',
    taskLabel: 'Trip Itinerary',
    tasks: [
      { label: 'Find flights', done: true },
      { label: 'Book hotel', done: true },
      { label: 'Reserve restaurant', done: true },
      { label: 'Create packing list', done: false, pending: true },
    ],
    progress: 75,
    quickActions: [
      { icon: 'map', label: 'Maps' },
      { icon: 'calendar', label: 'Calendar' },
      { icon: 'notes', label: 'Notes' },
      { icon: 'shopping', label: 'Shopping' },
    ],
  },
  {
    id: 'fitness',
    appName: 'Fitness Tracker',
    searchPlaceholder: 'Start evening workout routine',
    taskLabel: 'Daily Goals',
    tasks: [
      { label: 'Track cardio', done: true },
      { label: 'Log strength', done: true },
      { label: 'Record stretches', done: true },
      { label: 'Update streaks', done: false, pending: true },
    ],
    progress: 75,
    quickActions: [
      { icon: 'health', label: 'Health' },
      { icon: 'music', label: 'Music' },
      { icon: 'calendar', label: 'Calendar' },
      { icon: 'notes', label: 'Notes' },
    ],
  },
  {
    id: 'dining',
    appName: 'Restaurant Finder',
    searchPlaceholder: 'Find Italian restaurant nearby',
    taskLabel: 'Dinner Plans',
    tasks: [
      { label: 'Search restaurants', done: true },
      { label: 'Check reviews', done: true },
      { label: 'Make reservation', done: true },
      { label: 'Add to calendar', done: false, pending: true },
    ],
    progress: 75,
    quickActions: [
      { icon: 'map', label: 'Maps' },
      { icon: 'calendar', label: 'Calendar' },
      { icon: 'message', label: 'Messages' },
      { icon: 'phone', label: 'Calls' },
    ],
  },
  {
    id: 'shopping',
    appName: 'Shopping List',
    searchPlaceholder: 'Add items to grocery list',
    taskLabel: 'Shopping List',
    tasks: [
      { label: 'Add milk', done: true },
      { label: 'Add eggs', done: true },
      { label: 'Check pantry', done: true },
      { label: 'Set reminders', done: false, pending: true },
    ],
    progress: 75,
    quickActions: [
      { icon: 'shopping', label: 'Shopping' },
      { icon: 'notes', label: 'Notes' },
      { icon: 'reminder', label: 'Reminders' },
      { icon: 'map', label: 'Maps' },
    ],
  },
  {
    id: 'billpay',
    appName: 'Bill Manager',
    searchPlaceholder: 'Pay utility bills this week',
    taskLabel: 'Pending Bills',
    tasks: [
      { label: 'View statements', done: true },
      { label: 'Verify amounts', done: true },
      { label: 'Schedule payment', done: true },
      { label: 'Confirm transaction', done: false, pending: true },
    ],
    progress: 75,
    quickActions: [
      { icon: 'wallet', label: 'Wallet' },
      { icon: 'calendar', label: 'Calendar' },
      { icon: 'email', label: 'Mail' },
      { icon: 'notes', label: 'Notes' },
    ],
  },
  {
    id: 'playlist',
    appName: 'Music Curator',
    searchPlaceholder: 'Create workout playlist',
    taskLabel: 'Playlist Progress',
    tasks: [
      { label: 'Select genre', done: true },
      { label: 'Add songs', done: true },
      { label: 'Arrange order', done: true },
      { label: 'Save playlist', done: false, pending: true },
    ],
    progress: 75,
    quickActions: [
      { icon: 'music', label: 'Music' },
      { icon: 'search', label: 'Search' },
      { icon: 'calendar', label: 'Calendar' },
      { icon: 'message', label: 'Messages' },
    ],
  },
  {
    id: 'homework',
    appName: 'Study Buddy',
    searchPlaceholder: 'Help with math homework',
    taskLabel: 'Study Session',
    tasks: [
      { label: 'Open textbook', done: true },
      { label: 'Search solutions', done: true },
      { label: 'Explain concept', done: true },
      { label: 'Quiz me', done: false, pending: true },
    ],
    progress: 75,
    quickActions: [
      { icon: 'notes', label: 'Notes' },
      { icon: 'search', label: 'Search' },
      { icon: 'calendar', label: 'Calendar' },
      { icon: 'message', label: 'Messages' },
    ],
  },
  {
    id: 'reminder',
    appName: 'Reminder Assistant',
    searchPlaceholder: 'Set reminders for tomorrow',
    taskLabel: 'Tomorrow\'s Tasks',
    tasks: [
      { label: 'List tasks', done: true },
      { label: 'Set times', done: true },
      { label: 'Add locations', done: true },
      { label: 'Enable notifications', done: false, pending: true },
    ],
    progress: 75,
    quickActions: [
      { icon: 'notes', label: 'Notes' },
      { icon: 'calendar', label: 'Calendar' },
      { icon: 'map', label: 'Maps' },
      { icon: 'settings', label: 'Settings' },
    ],
  },
  {
    id: 'async-hook',
    appName: 'Async Hook',
    searchPlaceholder: 'Process notification queue',
    taskLabel: 'Async hook Notification',
    tasks: [
      { label: 'Queue webhook', done: true },
      { label: 'Fetch payload', done: true },
      { label: 'Validate schema', done: true },
      { label: 'Trigger callback', done: false, pending: true },
    ],
    progress: 75,
    quickActions: [
      { icon: 'settings', label: 'Settings' },
      { icon: 'message', label: 'Messages' },
      { icon: 'email', label: 'Mail' },
      { icon: 'calendar', label: 'Calendar' },
    ],
  },
];

// Icon renderer helper
const renderIcon = (iconName: string) => {
  const iconMap: Record<string, () => JSX.Element> = {
    phone: Icons.phone,
    message: Icons.message,
    calendar: Icons.calendar,
    notes: Icons.notes,
    map: Icons.map,
    music: Icons.music,
    wallet: Icons.wallet,
    health: Icons.health,
    shopping: Icons.shopping,
    email: Icons.email,
    search: Icons.search,
    settings: Icons.settings,
  };
  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent /> : Icons.notes();
};

// iOS-style demo content with proper light/dark mode and use case cycling
function PhoneShowcase() {
  const [isDark, setIsDark] = useState(false);
  const [currentUseCase, setCurrentUseCase] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  // Randomly cycle through use cases
  useEffect(() => {
    const cycleUseCase = () => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentUseCase((prev) => (prev + 1) % useCases.length);
        setIsTransitioning(false);
      }, 300);
    };

    const interval = setInterval(cycleUseCase, 4000);
    return () => clearInterval(interval);
  }, []);

  const useCase = useCases[currentUseCase];

  return (
    <div className="relative h-full flex flex-col">
      {/* Phone Container */}
      <div className="relative w-full" style={{ aspectRatio: '9 / 19.5' }}>
        {/* Screen content - iOS App UI */}
        <div
          className={`absolute overflow-hidden transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
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
                <span className="text-sm font-semibold" style={{ color: isDark ? '#FFFFFF' : '#000000' }}>{useCase.appName}</span>
              </div>
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: isDark ? '#1C1C1E' : '#E5E5EA' }}>
                <div className="w-3 h-3 rounded-full" style={{ background: isDark ? '#FFFFFF' : '#000000', opacity: 0.2 }} />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-4 pb-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: isDark ? '#1C1C1E' : '#FFFFFF' }}>
              <Icons.search />
              <span className="text-sm" style={{ color: '#8E8E93' }}>{useCase.searchPlaceholder}</span>
            </div>
          </div>

          {/* Task Card */}
          <div className="px-4 py-2">
            <div className="rounded-2xl p-4" style={{ background: isDark ? '#1C1C1E' : '#FFFFFF' }}>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium uppercase" style={{ color: '#8E8E93', letterSpacing: '0.5px' }}>{useCase.taskLabel}</span>
                <span className="text-xs font-semibold px-2 py-1 rounded-lg" style={{ background: '#007AFF20', color: '#007AFF' }}>{useCase.progress}%</span>
              </div>

              {/* Task List */}
              <div className="space-y-3">
                {useCase.tasks.map((task, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      task.done ? '' : task.pending ? 'border-2' : ''
                    }`} style={{
                      background: task.done ? '#34C759' : 'transparent',
                      borderColor: task.pending ? '#007AFF' : 'transparent'
                    }}>
                      {task.done && <Icons.check />}
                      {task.pending && <Icons.pending />}
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
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${useCase.progress}%`, background: '#007AFF' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-3">
            <span className="text-xs font-medium uppercase px-2" style={{ color: '#8E8E93', letterSpacing: '0.5px' }}>Quick Actions</span>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {useCase.quickActions.map((action, i) => (
                <div key={i} className="flex flex-col items-center gap-1 py-2 rounded-xl" style={{ background: isDark ? '#1C1C1E' : '#FFFFFF' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: isDark ? '#2C2C2E' : '#F2F2F7' }}>
                    {renderIcon(action.icon)}
                  </div>
                  <span className="text-[10px]" style={{ color: isDark ? '#FFFFFF' : '#000000' }}>{action.label}</span>
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