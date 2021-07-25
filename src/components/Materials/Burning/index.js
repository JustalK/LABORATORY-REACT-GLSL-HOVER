import * as THREE from 'three'
import { extend } from '@react-three/fiber'

export default class BurningMaterial extends THREE.ShaderMaterial {
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
      float Hash( vec2 p) {
        vec3 p2 = vec3(p.xy,1.0);
        return fract(sin(dot(p2,vec3(37.1,61.7, 12.4)))*3758.5453123);
      }

      float noise(in vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f *= f * (3.0-2.0*f);

          return mix(mix(Hash(i + vec2(0.,0.)), Hash(i + vec2(1.,0.)),f.x),
          mix(Hash(i + vec2(0.,1.)), Hash(i + vec2(1.,1.)),f.x),
          f.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        v += noise(p*1.)*.5;
        v += noise(p*2.)*.25;
        v += noise(p*4.)*.125;
        return v;
      }

      void main() {
        vec2 newUV = vUv;
        vec2 uv = (gl_FragCoord.xy - resolution.xy*0.5)/resolution.y;

        vec3 src = texture2D(uTexture, vUv).xyz;

        vec3 tgt = texture2D(uTexture2, vUv).xyz;

        vec3 col = src.xyz;

        newUV.x -= 1.0;

        float ctime = uVelo * 0.8;

        // burn
        float d = newUV.x+newUV.y*0.5 + 0.5*fbm(newUV*15.1) + ctime*1.3;
        if (d >0.35) col = clamp(col-(d-0.35)*10.,0.0,1.0);
        if (d >0.47) {
          if (d < 0.5 ) col += (d-0.4)*33.0*0.5*(0.0+noise(100.*newUV+vec2(-ctime*2.,0.)))*vec3(1.5,0.5,0.0);
          else col += tgt; }

        gl_FragColor = vec4(col, 1.0);
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

extend({ BurningMaterial })
