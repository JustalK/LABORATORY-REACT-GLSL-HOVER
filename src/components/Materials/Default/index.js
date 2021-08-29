import * as THREE from 'three'
import { extend } from '@react-three/fiber'

export default class DefaultMaterial extends THREE.ShaderMaterial {
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
        uTime: { value: 0 }
      },
      vertexShader: `
      varying vec2 vUv;
      uniform vec2 resolution;
      void main() {
        vUv = uv;
        vec3 pos = position;
        gl_Position = mix(projectionMatrix * modelViewMatrix * vec4(position,1.), projectionMatrix * modelViewMatrix * vec4(pos,1.), 0.5);
      }`,
      fragmentShader: `
      uniform sampler2D uTexture;
      varying vec2 vUv;
      void main()  {
        gl_FragColor = texture2D(uTexture, vUv);
      }`
    })
  }

  get uTexture() {
    return this.uniforms.uTexture.value
  }

  set uTexture(v) {
    return (this.uniforms.uTexture.value = v)
  }
}

extend({ DefaultMaterial })
