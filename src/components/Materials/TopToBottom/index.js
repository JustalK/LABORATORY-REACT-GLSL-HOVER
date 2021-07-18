import * as THREE from 'three'
import { extend } from '@react-three/fiber'

export default class TopToBottomMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTexture: { value: undefined },
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
      uniform sampler2D uTexture;
      uniform vec2 resolution;
      varying vec2 vUv;
      uniform vec2 uMouse;
      uniform float uTime;
      uniform float uVelo;
      float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
        uv -= disc_center;
        uv*=resolution;
        float dist = sqrt(dot(uv, uv));
        return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
      }
      void main()  {
          vec2 newUV = vUv;
          float c = circle(vUv, uMouse, 0.1 + (1.0 - uVelo), 0.05);
          float r = texture2D(uTexture, newUV.xy  -= c * (0.1 * .15 * uVelo)).x;
          float g = texture2D(uTexture, newUV.xy).y;
          float b = texture2D(uTexture, newUV.xy  += c * (0.1 * .35 * uVelo)).z;
          vec4 color = vec4(r, g * (1.0 - uVelo), b, 1.);

          float finalMask = smoothstep(0.4, 0.5, c);

        	vec4 hover = texture2D(uTexture, vUv);
        	vec2 p = vUv + uVelo * vec2(0.0, 1.0);
          gl_FragColor = mix(color, hover, step(0.0, p.y) * step(p.y, 1.0) * step(0.0, p.x) * step(p.x, 1.0));
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

extend({ TopToBottomMaterial })
