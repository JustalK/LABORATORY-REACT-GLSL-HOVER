import * as THREE from 'three'
import { extend } from '@react-three/fiber'

export default class ImageMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        tDiffuse: { value: undefined },
        resolution: {
          value: new THREE.Vector2(
            window.innerHeight / window.innerWidth,
            window.innerHeight / window.innerWidth
          )
        },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uVelo: { value: 0.0 },
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
      uniform sampler2D tDiffuse;
      uniform vec2 resolution;
      varying vec2 vUv;
      uniform vec2 uMouse;
      uniform float uTime;
      uniform float uVelo;
      float random(float x) {
          return fract(sin(x) * 10000.);
      }

      float noise(vec2 p) {
       	return random(p.x + p.y * 10000.);
      }

      vec2 sw(vec2 p) { return vec2(floor(p.x), floor(p.y)); }
      vec2 se(vec2 p) { return vec2(ceil(p.x), floor(p.y)); }
      vec2 nw(vec2 p) { return vec2(floor(p.x), ceil(p.y)); }
      vec2 ne(vec2 p) { return vec2(ceil(p.x), ceil(p.y)); }

      float smoothNoise(vec2 p) {
          vec2 interp = smoothstep(0., 1., fract(p));
          float s = mix(noise(sw(p)), noise(se(p)), interp.x);
          float n = mix(noise(nw(p)), noise(ne(p)), interp.x);
          return mix(s, n, interp.y);
      }
      float fractalNoise(vec2 p) {
          float n = 0.;
          n += smoothNoise(p);
          n += smoothNoise(p * 2.) / 2.;
          n += smoothNoise(p * 4.) / 4.;
          n += smoothNoise(p * 8.) / 8.;
          n += smoothNoise(p * 16.) / 16.;
          n /= 1. + 1./2. + 1./4. + 1./8. + 1./16.;
          return n;
      }
      float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
        uv -= disc_center;
        uv*=resolution;
        float dist = sqrt(dot(uv, uv));
        return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
      }
      void main()  {
          vec2 nuv = vec2(vUv.x - uTime / 6., vUv.y);

          float x = fractalNoise(nuv * 6.);
          vec4 final = mix(vec4(x, x, x, 0), texture(tDiffuse, vUv), pow(abs(vUv.y), .9));

          gl_FragColor = final;
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

  get tDiffuse() {
    return this.uniforms.tDiffuse.value
  }

  set tDiffuse(v) {
    return (this.uniforms.tDiffuse.value = v)
  }

  get uMouse() {
    return this.uniforms.uMouse.value
  }

  set uMouse(v) {
    return (this.uniforms.uMouse.value = v)
  }
}

extend({ ImageMaterial })
