'use client';

import { useEffect, useRef } from 'react';
import { GlassContainer } from './GlassContainer';

interface UseGlassOptions {
  blur: number;
  saturation: number;
  brightness: number;
  tintOpacity: number;
  borderRadius: number;
}

export function useGlass(options: UseGlassOptions) {
  const ref = useRef<HTMLDivElement>(null);
  const glassRef = useRef<GlassContainer | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Initialize glass container
    glassRef.current = new GlassContainer(ref.current, options);

    return () => {
      glassRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (glassRef.current) {
      glassRef.current.updateSettings(options);
    }
  }, [options.blur, options.saturation, options.brightness, options.tintOpacity, options.borderRadius]);

  return ref;
}
