// Shared type definitions for WebGL glass controls

export interface WebGLGlassSettings {
  edgeIntensity: number;
  rimIntensity: number;
  baseIntensity: number;
  edgeDistance: number;
  rimDistance: number;
  baseDistance: number;
  cornerBoost: number;
  rippleEffect: number;
  blurRadius: number;
  tintOpacity?: number;
}

declare global {
  interface Window {
    Container: any;
    Button: any;
    html2canvas: any;
    glassControls: WebGLGlassSettings;
  }
}

export {};
