class Button extends Container {
  constructor(options = {}) {
    super({
      borderRadius: options.borderRadius || 24,
      type: options.type || 'rounded',
      tintOpacity: options.tintOpacity !== undefined ? options.tintOpacity : 0.2
    })

    this.text = options.text || 'Button'
    this.size = options.size || 48
    this.onClick = options.onClick || null
    this.warp = options.warp || false
    this.isNestedGlass = false

    this.setupButton()
  }

  setupButton() {
    this.element.classList.add('glass-button')

    if (this.type === 'circle') {
      this.element.classList.add('glass-button-circle')
    }

    this.textElement = document.createElement('div')
    this.textElement.className = 'glass-button-text'
    this.textElement.textContent = this.text
    this.textElement.style.fontSize = this.size + 'px'
    this.textElement.style.position = 'relative'
    this.textElement.style.zIndex = '10'
    this.textElement.style.pointerEvents = 'none'
    this.textElement.style.userSelect = 'none'
    this.textElement.style.fontWeight = '600'
    this.textElement.style.color = 'rgba(255, 255, 255, 0.95)'
    this.textElement.style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.2)'

    this.element.appendChild(this.textElement)

    if (this.onClick) {
      this.element.style.cursor = 'pointer'
      this.element.addEventListener('click', () => {
        this.onClick(this.text)
      })
    }

    this.updateSizeFromDOM()
  }

  setupAsNestedGlass() {
    if (this.isNestedGlass || !this.parent) return

    this.isNestedGlass = true

    const parentCanvas = this.parent.canvas
    if (!parentCanvas) return

    const nestedCanvas = document.createElement('canvas')
    nestedCanvas.style.position = 'absolute'
    nestedCanvas.style.top = '0'
    nestedCanvas.style.left = '0'
    nestedCanvas.style.width = '100%'
    nestedCanvas.style.height = '100%'
    nestedCanvas.style.borderRadius = this.borderRadius + 'px'
    nestedCanvas.style.zIndex = '-1'

    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas)
    }

    this.canvas = nestedCanvas
    this.element.insertBefore(nestedCanvas, this.element.firstChild)

    const gl = nestedCanvas.getContext('webgl', { preserveDrawingBuffer: true })
    if (!gl) {
      console.error('WebGL not supported for nested glass')
      return
    }

    this.gl = gl
    this.initNestedWebGL()
  }

  initNestedWebGL() {
    if (!this.parent || !this.parent.gl_refs || !this.parent.gl_refs.gl) {
      console.warn('Parent WebGL not ready')
      return
    }

    const gl = this.gl
    const parentWidth = this.parent.width
    const parentHeight = this.parent.height

    const vsSource = `
      attribute vec2 a_position;
      attribute vec2 a_texcoord;
      varying vec2 v_texcoord;

      void main() {
        gl_Position = vec4(a_position, 0, 1);
        v_texcoord = a_texcoord;
      }
    `

    const fsSource = `
      precision mediump float;
      uniform sampler2D u_parentTexture;
      uniform vec2 u_resolution;
      uniform vec2 u_textureSize;
      uniform vec2 u_containerSize;
      uniform vec2 u_offset;
      uniform float u_borderRadius;
      uniform float u_blurRadius;
      uniform float u_edgeIntensity;
      uniform float u_rimIntensity;
      uniform float u_baseIntensity;
      uniform float u_edgeDistance;
      uniform float u_rimDistance;
      uniform float u_baseDistance;
      uniform float u_cornerBoost;
      uniform float u_rippleEffect;
      uniform float u_tintOpacity;
      uniform float u_warp;
      varying vec2 v_texcoord;

      float roundedRectDistance(vec2 coord, vec2 size, float radius) {
        vec2 center = size * 0.5;
        vec2 pixelCoord = coord * size;
        vec2 toCorner = abs(pixelCoord - center) - (center - radius);
        float outsideCorner = length(max(toCorner, 0.0));
        float insideCorner = min(max(toCorner.x, toCorner.y), 0.0);
        return (outsideCorner + insideCorner - radius);
      }

      float circleDistance(vec2 coord, vec2 size, float radius) {
        vec2 center = vec2(0.5, 0.5);
        vec2 pixelCoord = coord * size;
        vec2 centerPixel = center * size;
        float distFromCenter = length(pixelCoord - centerPixel);
        return distFromCenter - radius;
      }

      bool isCircle(vec2 size, float radius) {
        float minDim = min(size.x, size.y);
        bool radiusMatchesMinDim = abs(radius - minDim * 0.5) < 1.0;
        bool isRoughlySquare = abs(size.x - size.y) < 4.0;
        return radiusMatchesMinDim && isRoughlySquare;
      }

      void main() {
        vec2 coord = v_texcoord;
        vec2 buttonSize = u_resolution;
        vec2 containerSize = u_containerSize;

        vec2 buttonPixel = coord * buttonSize;
        vec2 containerCoord = (buttonPixel + u_offset) / containerSize;

        float distFromEdgeShape;
        vec2 shapeNormal;

        if (isCircle(u_resolution, u_borderRadius)) {
          distFromEdgeShape = -circleDistance(coord, u_resolution, u_borderRadius);
          vec2 center = vec2(0.5, 0.5);
          shapeNormal = normalize(coord - center);
        } else {
          distFromEdgeShape = -roundedRectDistance(coord, u_resolution, u_borderRadius);
          vec2 center = vec2(0.5, 0.5);
          shapeNormal = normalize(coord - center);
        }
        distFromEdgeShape = max(distFromEdgeShape, 0.0);

        float distFromLeft = coord.x;
        float distFromRight = 1.0 - coord.x;
        float distFromTop = coord.y;
        float distFromBottom = 1.0 - coord.y;
        float distFromEdge = distFromEdgeShape / min(u_resolution.x, u_resolution.y);

        float normalizedDistance = distFromEdge * min(u_resolution.x, u_resolution.y);
        float baseIntensity = 1.0 - exp(-normalizedDistance * u_baseDistance);
        float edgeIntensity = exp(-normalizedDistance * u_edgeDistance);
        float rimIntensity = exp(-normalizedDistance * u_rimDistance);

        float baseComponent = u_warp > 0.5 ? baseIntensity * u_baseIntensity : 0.0;
        float totalIntensity = baseComponent + edgeIntensity * u_edgeIntensity + rimIntensity * u_rimIntensity;

        vec2 baseRefraction = shapeNormal * totalIntensity;

        float cornerProximityX = min(distFromLeft, distFromRight);
        float cornerProximityY = min(distFromTop, distFromBottom);
        float cornerDistance = max(cornerProximityX, cornerProximityY);
        float cornerNormalized = cornerDistance * min(u_resolution.x, u_resolution.y);

        float cornerBoost = exp(-cornerNormalized * 0.3) * u_cornerBoost;
        vec2 cornerRefraction = shapeNormal * cornerBoost;

        vec2 perpendicular = vec2(-shapeNormal.y, shapeNormal.x);
        float rippleEffect = sin(distFromEdge * 25.0) * u_rippleEffect * rimIntensity;
        vec2 textureRefraction = perpendicular * rippleEffect;

        vec2 totalRefraction = baseRefraction + cornerRefraction + textureRefraction;
        containerCoord += totalRefraction * 0.02;

        vec4 color = vec4(0.0);
        vec2 texelSize = 1.0 / u_containerSize;
        float sigma = u_blurRadius / 2.0;
        vec2 blurStep = texelSize * sigma;

        float totalWeight = 0.0;

        for(float i = -6.0; i <= 6.0; i += 1.0) {
          for(float j = -6.0; j <= 6.0; j += 1.0) {
            float distance = length(vec2(i, j));
            if(distance > 6.0) continue;

            float weight = exp(-(distance * distance) / (2.0 * sigma * sigma));

            vec2 offset = vec2(i, j) * blurStep;
            color += texture2D(u_parentTexture, containerCoord + offset) * weight;
            totalWeight += weight;
          }
        }

        color /= totalWeight;

        float gradientPosition = coord.y;
        vec3 topTint = vec3(1.0, 1.0, 1.0);
        vec3 bottomTint = vec3(0.7, 0.7, 0.7);
        vec3 gradientTint = mix(topTint, bottomTint, gradientPosition);
        vec3 tintedColor = mix(color.rgb, gradientTint, u_tintOpacity);
        color = vec4(tintedColor, color.a);

        float maskDistance;
        if (isCircle(u_resolution, u_borderRadius)) {
          maskDistance = circleDistance(coord, u_resolution, u_borderRadius);
        } else {
          maskDistance = roundedRectDistance(coord, u_resolution, u_borderRadius);
        }
        float mask = 1.0 - smoothstep(-1.0, 1.0, maskDistance);

        gl_FragColor = vec4(color.rgb, mask);
      }
    `

    const program = this.createProgram(gl, vsSource, fsSource)
    if (!program) return

    gl.useProgram(program)

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)

    const texcoordBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0]), gl.STATIC_DRAW)

    const positionLoc = gl.getAttribLocation(program, 'a_position')
    const texcoordLoc = gl.getAttribLocation(program, 'a_texcoord')
    const resolutionLoc = gl.getUniformLocation(program, 'u_resolution')
    const textureSizeLoc = gl.getUniformLocation(program, 'u_textureSize')
    const containerSizeLoc = gl.getUniformLocation(program, 'u_containerSize')
    const offsetLoc = gl.getUniformLocation(program, 'u_offset')
    const borderRadiusLoc = gl.getUniformLocation(program, 'u_borderRadius')
    const blurRadiusLoc = gl.getUniformLocation(program, 'u_blurRadius')
    const edgeIntensityLoc = gl.getUniformLocation(program, 'u_edgeIntensity')
    const rimIntensityLoc = gl.getUniformLocation(program, 'u_rimIntensity')
    const baseIntensityLoc = gl.getUniformLocation(program, 'u_baseIntensity')
    const edgeDistanceLoc = gl.getUniformLocation(program, 'u_edgeDistance')
    const rimDistanceLoc = gl.getUniformLocation(program, 'u_rimDistance')
    const baseDistanceLoc = gl.getUniformLocation(program, 'u_baseDistance')
    const cornerBoostLoc = gl.getUniformLocation(program, 'u_cornerBoost')
    const rippleEffectLoc = gl.getUniformLocation(program, 'u_rippleEffect')
    const tintOpacityLoc = gl.getUniformLocation(program, 'u_tintOpacity')
    const warpLoc = gl.getUniformLocation(program, 'u_warp')
    const parentTextureLoc = gl.getUniformLocation(program, 'u_parentTexture')

    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, parentWidth, parentHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    this.gl_refs = {
      gl,
      texture,
      textureSizeLoc,
      containerSizeLoc,
      offsetLoc,
      positionLoc,
      texcoordLoc,
      resolutionLoc,
      borderRadiusLoc,
      blurRadiusLoc,
      edgeIntensityLoc,
      rimIntensityLoc,
      baseIntensityLoc,
      edgeDistanceLoc,
      rimDistanceLoc,
      baseDistanceLoc,
      cornerBoostLoc,
      rippleEffectLoc,
      tintOpacityLoc,
      warpLoc,
      parentTextureLoc,
      positionBuffer,
      texcoordBuffer
    }

    gl.viewport(0, 0, this.canvas.width, this.canvas.height)
    gl.clearColor(0, 0, 0, 0)

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.enableVertexAttribArray(positionLoc)
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)

    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer)
    gl.enableVertexAttribArray(texcoordLoc)
    gl.vertexAttribPointer(texcoordLoc, 2, gl.FLOAT, false, 0, 0)

    gl.uniform2f(resolutionLoc, this.canvas.width, this.canvas.height)
    gl.uniform2f(textureSizeLoc, parentWidth, parentHeight)
    gl.uniform2f(containerSizeLoc, parentWidth, parentHeight)
    gl.uniform1f(blurRadiusLoc, window.glassControls?.blurRadius || 5.0)
    gl.uniform1f(borderRadiusLoc, this.borderRadius)
    gl.uniform1f(warpLoc, this.warp ? 1.0 : 0.0)
    gl.uniform1f(edgeIntensityLoc, window.glassControls?.edgeIntensity || 0.01)
    gl.uniform1f(rimIntensityLoc, window.glassControls?.rimIntensity || 0.05)
    gl.uniform1f(baseIntensityLoc, window.glassControls?.baseIntensity || 0.01)
    gl.uniform1f(edgeDistanceLoc, window.glassControls?.edgeDistance || 0.15)
    gl.uniform1f(rimDistanceLoc, window.glassControls?.rimDistance || 0.8)
    gl.uniform1f(baseDistanceLoc, window.glassControls?.baseDistance || 0.1)
    gl.uniform1f(cornerBoostLoc, window.glassControls?.cornerBoost || 0.02)
    gl.uniform1f(rippleEffectLoc, window.glassControls?.rippleEffect || 0.1)
    gl.uniform1f(tintOpacityLoc, this.tintOpacity)

    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.uniform1i(parentTextureLoc, 0)

    this.startNestedRenderLoop()
  }

  startNestedRenderLoop() {
    const render = () => {
      if (!this.gl_refs.gl || !this.parent || !this.parent.gl_refs || !this.parent.gl_refs.gl) return

      const gl = this.gl_refs.gl
      const parentGl = this.parent.gl_refs.gl

      const buttonRect = this.canvas.getBoundingClientRect()
      const parentRect = this.parent.canvas.getBoundingClientRect()

      const offsetX = buttonRect.left - parentRect.left
      const offsetY = buttonRect.top - parentRect.top

      gl.uniform2f(this.gl_refs.offsetLoc, offsetX, offsetY)

      gl.bindTexture(gl.TEXTURE_2D, this.gl_refs.texture)
      gl.copyTexImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 0, 0, this.parent.width, this.parent.height, 0)

      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    this.render = render

    const parentRender = this.parent.render
    if (parentRender) {
      this.parent.render = () => {
        parentRender()
        requestAnimationFrame(() => render())
      }
    }
  }
}

// Export to window for global access
if (typeof window !== 'undefined') {
  window.Button = Button;
}
