'use client';

import React from 'react';

interface iPhoneFrameProps {
  children: React.ReactNode;
}

export default function iPhoneFrame({ children }: iPhoneFrameProps) {
  return (
    <div className="relative">
      {/* iPhone Frame */}
      <div
        className="relative rounded-[3rem] p-3"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
          border: '2px solid rgba(255,255,255,0.2)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
        }}
      >
        {/* Screen */}
        <div
          className="rounded-[2.5rem] overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 100%)',
          }}
        >
          {/* Dynamic Island */}
          <div
            className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10"
            style={{
              width: '60px',
              height: '12px',
              background: '#000',
              borderRadius: '10px',
            }}
          />

          {/* Content */}
          <div className="pt-8">
            {children}
          </div>
        </div>
      </div>

      {/* Reflection effect */}
      <div
        className="absolute inset-0 rounded-[3rem] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, transparent 100%)',
        }}
      />
    </div>
  );
}
