import * as THREE from 'three'
import { extend } from '@react-three/fiber'

export default class MaskNewImageMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTexture: { value: undefined },
        uTexture2: { value: undefined },
        resolution: {
          value: new THREE.Vector2(
            window.innerHeight / window.innerWidth,
            window.innerHeight / window.innerWidth
          )
        },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uVelo: { value: 0.0 },
        smoothness: { value: 0.01 },
        scale: { value: 4.0 },
        seed: { value: 12.9898 },
        uTime: { value: 0 }
      },
      vertexShader: `
      varying vec2 vUv;
      uniform float uTime;
      uniform float uVelo;
      void main() {
        vec3 pos = position;
        pos.x += sin(pos.y*10.0*uVelo+uTime)/100.0 * uVelo;
        pos.y += sin(pos.x*10.0*uVelo+uTime)/100.0 * uVelo;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
      }`,
      fragmentShader: `
      uniform sampler2D uTexture;
      uniform sampler2D uTexture2;
      uniform vec2 resolution;
      varying vec2 vUv;
      uniform vec2 uMouse;
      uniform float uTime;
      uniform float uVelo;
      uniform float scale;
      uniform float smoothness;
      uniform float seed;
      float random(vec2 co) {
          highp float a = seed;
          highp float b = 78.233;
          highp float c = 43758.5453;
          highp float dt= dot(co.xy ,vec2(a,b));
          highp float sn= mod(dt,3.14);
          return fract(sin(sn) * c);
      }
      float noise (in vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);

          // Four corners in 2D of a tile
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));

          // Smooth Interpolation

          // Cubic Hermine Curve.  Same as SmoothStep()
          vec2 u = f*f*(3.0-2.0*f);
          // u = smoothstep(0.,1.,f);

          // Mix 4 coorners porcentages
          return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
        uv -= disc_center;
        uv*=resolution;
        float dist = sqrt(dot(uv, uv));
        return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
      }
      void main()  {
          vec2 newUV = vUv;
          float c = circle(vUv, uMouse, 0.1 + (1.0 - uVelo), 0.05);
          float r = texture2D(uTexture2, newUV.xy  -= c * (0.1 * .15 * uVelo)).x;
          float g = texture2D(uTexture2, newUV.xy).y;
          float b = texture2D(uTexture2, newUV.xy  += c * (0.1 * .35 * uVelo)).z;
          vec4 color = vec4(r, g * (1.0 - uVelo), b, 1.);

          float finalMask = smoothstep(0.4, 0.5, c);

        	vec4 hover = texture2D(uTexture, vUv);
          vec4 from = hover;
          vec4 to = color;
          float n = noise(vUv * scale);

          float p = mix(-smoothness, 1.0 + smoothness, uVelo);
          float lower = p - smoothness;
          float higher = p + smoothness;

          float q = smoothstep(lower, higher, n);

          gl_FragColor = mix(from, to, 1.0 - q);
      }`
    })
  }

  get uVelo() {
    return this.uniforms.uVelo.value
  }

  set uVelo(v) {
    return (this.uniforms.uVelo.value = v)
  }

  get uTime() {
    return this.uniforms.uTime.value
  }

  set uTime(v) {
    return (this.uniforms.uTime.value = v)
  }

  get uTexture2() {
    return this.uniforms.uTexture2.value
  }

  set uTexture2(v) {
    return (this.uniforms.uTexture2.value = v)
  }

  get uTexture() {
    return this.uniforms.uTexture.value
  }

  set uTexture(v) {
    return (this.uniforms.uTexture.value = v)
  }

  get uMouse() {
    return this.uniforms.uMouse.value
  }

  set uMouse(v) {
    return (this.uniforms.uMouse.value = v)
  }
}

extend({ MaskNewImageMaterial })
