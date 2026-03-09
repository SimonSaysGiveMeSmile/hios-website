import html2canvas from 'html2canvas';

interface GlassSettings {
  blur: number;
  saturation: number;
  brightness: number;
  tintOpacity: number;
  borderRadius: number;
}

export class GlassContainer {
  element: HTMLElement;
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext | null;
  program: WebGLProgram | null;
  backgroundTexture: WebGLTexture | null;
  settings: GlassSettings;
  animationFrame: number | null;
  cleanup: (() => void) | null;
  recaptureTimeout: number | null;
  isCapturing: boolean;

  constructor(element: HTMLElement, settings: GlassSettings) {
    this.element = element;
    this.settings = settings;
    this.canvas = document.createElement('canvas');
    this.gl = null;
    this.program = null;
    this.backgroundTexture = null;
    this.animationFrame = null;
    this.cleanup = null;
    this.recaptureTimeout = null;
    this.isCapturing = false;

    this.init();
  }

  init() {
    // Setup canvas
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.element.style.position = 'relative';
    this.element.insertBefore(this.canvas, this.element.firstChild);

    // Initialize WebGL
    this.gl = this.canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: false
    });

    if (!this.gl) {
      console.error('WebGL not supported');
      return;
    }

    this.setupShaders();
    this.updateSize();
    this.captureBackground();
    this.render();

    // Debounced recapture on scroll/resize to prevent flickering
    const debouncedRecapture = () => {
      if (this.recaptureTimeout) {
        clearTimeout(this.recaptureTimeout);
      }
      this.recaptureTimeout = window.setTimeout(() => {
        if (!this.isCapturing) {
          this.captureBackground().then(() => this.render());
        }
      }, 150); // 150ms debounce
    };

    window.addEventListener('scroll', debouncedRecapture);
    window.addEventListener('resize', debouncedRecapture);

    // Store cleanup function
    this.cleanup = () => {
      if (this.recaptureTimeout) {
        clearTimeout(this.recaptureTimeout);
      }
      window.removeEventListener('scroll', debouncedRecapture);
      window.removeEventListener('resize', debouncedRecapture);
    };
  }

  setupShaders() {
    if (!this.gl) return;

    const vertexShaderSource = `
      attribute vec2 position;
      attribute vec2 texCoord;
      varying vec2 vTexCoord;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
        vTexCoord = texCoord;
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform sampler2D backgroundTexture;
      uniform vec2 resolution;
      uniform float blur;
      uniform float saturation;
      uniform float brightness;
      uniform float tintOpacity;
      varying vec2 vTexCoord;

      vec3 adjustSaturation(vec3 color, float sat) {
        float gray = dot(color, vec3(0.299, 0.587, 0.114));
        return mix(vec3(gray), color, sat);
      }

      void main() {
        vec2 uv = vTexCoord;
        vec3 color = vec3(0.0);
        float total = 0.0;

        // Gaussian blur
        float blurSize = blur / resolution.x;
        for(float x = -4.0; x <= 4.0; x += 1.0) {
          for(float y = -4.0; y <= 4.0; y += 1.0) {
            vec2 offset = vec2(x, y) * blurSize;
            float weight = exp(-(x*x + y*y) / 8.0);
            color += texture2D(backgroundTexture, uv + offset).rgb * weight;
            total += weight;
          }
        }
        color /= total;

        // Apply saturation
        color = adjustSaturation(color, saturation);

        // Apply brightness
        color *= brightness;

        // Add tint
        color = mix(color, vec3(1.0), tintOpacity);

        gl_FragColor = vec4(color, 0.85);
      }
    `;

    const vertexShader = this.compileShader(vertexShaderSource, this.gl.VERTEX_SHADER);
    const fragmentShader = this.compileShader(fragmentShaderSource, this.gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) return;

    this.program = this.gl.createProgram();
    if (!this.program) return;

    this.gl.attachShader(this.program, vertexShader);
    this.gl.attachShader(this.program, fragmentShader);
    this.gl.linkProgram(this.program);

    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      console.error('Program link error:', this.gl.getProgramInfoLog(this.program));
      return;
    }

    // Setup geometry
    const positions = new Float32Array([
      -1, -1,  1, -1,  -1, 1,
      -1, 1,   1, -1,   1, 1
    ]);

    const texCoords = new Float32Array([
      0, 1,  1, 1,  0, 0,
      0, 0,  1, 1,  1, 0
    ]);

    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);

    const positionLocation = this.gl.getAttribLocation(this.program, 'position');
    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);

    const texCoordBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texCoordBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, texCoords, this.gl.STATIC_DRAW);

    const texCoordLocation = this.gl.getAttribLocation(this.program, 'texCoord');
    this.gl.enableVertexAttribArray(texCoordLocation);
    this.gl.vertexAttribPointer(texCoordLocation, 2, this.gl.FLOAT, false, 0, 0);
  }

  compileShader(source: string, type: number): WebGLShader | null {
    if (!this.gl) return null;

    const shader = this.gl.createShader(type);
    if (!shader) return null;

    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  updateSize() {
    const rect = this.element.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    if (this.gl) {
      this.gl.viewport(0, 0, rect.width, rect.height);
    }
  }

  async captureBackground() {
    if (this.isCapturing) return; // Prevent concurrent captures
    this.isCapturing = true;

    try {
      const rect = this.element.getBoundingClientRect();

      // Temporarily hide canvas during capture to prevent self-capture
      const originalCanvasOpacity = this.canvas.style.opacity;
      this.canvas.style.opacity = '0';

      // Wait a frame for the DOM to update
      await new Promise(resolve => requestAnimationFrame(resolve));

      const screenshot = await html2canvas(document.body, {
        x: Math.max(0, rect.left + window.scrollX),
        y: Math.max(0, rect.top + window.scrollY),
        width: Math.max(1, rect.width),
        height: Math.max(1, rect.height),
        backgroundColor: null,
        logging: false,
        scale: window.devicePixelRatio || 1,
      });

      // Restore canvas opacity
      this.canvas.style.opacity = originalCanvasOpacity || '1';

      if (!this.gl) return;

      // Create texture from screenshot
      this.backgroundTexture = this.gl.createTexture();
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.backgroundTexture);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, screenshot);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
    } catch (error) {
      console.error('Failed to capture background:', error);
      // Ensure canvas is visible even if capture fails
      this.canvas.style.opacity = '1';
    } finally {
      this.isCapturing = false;
    }
  }

  render() {
    if (!this.gl || !this.program || !this.backgroundTexture) return;

    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.useProgram(this.program);

    // Set uniforms
    const resolutionLocation = this.gl.getUniformLocation(this.program, 'resolution');
    this.gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);

    const blurLocation = this.gl.getUniformLocation(this.program, 'blur');
    this.gl.uniform1f(blurLocation, this.settings.blur);

    const saturationLocation = this.gl.getUniformLocation(this.program, 'saturation');
    this.gl.uniform1f(saturationLocation, this.settings.saturation / 100);

    const brightnessLocation = this.gl.getUniformLocation(this.program, 'brightness');
    this.gl.uniform1f(brightnessLocation, this.settings.brightness / 100);

    const tintOpacityLocation = this.gl.getUniformLocation(this.program, 'tintOpacity');
    this.gl.uniform1f(tintOpacityLocation, this.settings.tintOpacity / 100);

    // Bind texture
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.backgroundTexture);
    this.gl.uniform1i(this.gl.getUniformLocation(this.program, 'backgroundTexture'), 0);

    // Draw
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  }

  updateSettings(settings: Partial<GlassSettings>) {
    this.settings = { ...this.settings, ...settings };
    this.render();
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    if (this.cleanup) {
      this.cleanup();
    }
    if (this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}
