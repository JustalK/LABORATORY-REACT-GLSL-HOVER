import * as THREE from 'three'
import { extend } from '@react-three/fiber'

export default class OffsetMaterial extends THREE.ShaderMaterial {
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
      uniform vec2 resolution;
      float rand(vec2 uv, float t) {
          return fract(sin(dot(uv, vec2(1225.6548, 321.8942))) * 4251.4865 + t);
      }
      void main() {
        vUv = uv;
        vec3 pos = position;
        pos.x += 0.01 * (rand(vUv, uTime) - 0.5);
        pos.y += 0.05 * (rand(vUv, uTime) - 0.5);
        gl_Position = mix(projectionMatrix * modelViewMatrix * vec4(position,1.), projectionMatrix * modelViewMatrix * vec4(pos,1.), 0.5);
      }`,
      fragmentShader: `
      uniform sampler2D uTexture;
      varying vec2 vUv;
      uniform vec2 uMouse;
      uniform float uTime;
      uniform float uVelo;
      void main()  {
        gl_FragColor = texture2D(uTexture, vUv);
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

extend({ OffsetMaterial })
