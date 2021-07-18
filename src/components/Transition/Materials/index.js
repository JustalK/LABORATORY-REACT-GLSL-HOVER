/**
 * The class managing the transition between the page
 * @module components/TransitionMaterial
 */

import * as THREE from 'three'
import { extend } from '@react-three/fiber'

export default class TransitionMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        resolution: {
          value: new THREE.Vector2(
            window.innerHeight / window.innerWidth,
            window.innerHeight / window.innerWidth
          )
        },
        uVelo: { value: 2.0 },
        uPageSlides: { value: 4.0 }
      },
      vertexShader: `
      varying vec2 vUv;
      uniform float uVelo;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
      fragmentShader: `
      varying vec2 vUv;
      uniform vec2 resolution;
      uniform float uVelo;
      uniform float uPageSlides;
      float rand(int x, int y){
        vec2 co = vec2(float(x), float(y));
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
      }

      float cubicInterpolate (vec4 p, float x) {
      	return p[1] + 0.5 * x*(p[2] - p.r + x*(2.0*p.r - 5.0*p[1] + 4.0*p[2] - p[3] + x*(3.0*(p[1] - p[2]) + p[3] - p[0])));
      }

      float bicubicInterpolate (mat4 p, float x, float y) {
      	vec4 arr;
      	arr.x = cubicInterpolate(p[0], x);
      	arr.y = cubicInterpolate(p[1], x);
      	arr.z = cubicInterpolate(p[2], x);
      	arr.w = cubicInterpolate(p[3], x);
      	return cubicInterpolate(arr, y);
      }

      float randomNoise(float scale, vec2 uv){
          float inverseScale = 1./scale;
          vec2 modUv = mod(uv, vec2(inverseScale, inverseScale));
          vec2 sampleBias = (modUv)/inverseScale;

          int x = int(uv.x * scale);
          int y = int(uv.y * scale);

          mat4 samples;

          samples[0][0] = rand(x - 1,y - 1);
          samples[0][1] = rand(x    ,y - 1);
          samples[0][2] = rand(x + 1,y - 1);
          samples[0][3] = rand(x + 2,y - 1);
          samples[1][0] = rand(x - 1,y    );
          samples[1][1] = rand(x    ,y    );
          samples[1][2] = rand(x + 1,y    );
          samples[1][3] = rand(x + 2,y    );
          samples[2][0] = rand(x - 1,y + 1);
          samples[2][1] = rand(x    ,y + 1);
          samples[2][2] = rand(x + 1,y + 1);
          samples[2][3] = rand(x + 2,y + 1);
          samples[3][0] = rand(x - 1,y + 2);
          samples[3][1] = rand(x    ,y + 2);
          samples[3][2] = rand(x + 1,y + 2);

          samples[3][3] = rand(x + 2,y + 2);


          float val = bicubicInterpolate(samples, sampleBias.x, sampleBias.y);

          return(val);

      }

      float perlinishNoise(float scale, vec2 uv, int iter, float scaleFalloff){
          float noise;
          for(int i=0;i<iter;i++) {
              float iterScale = scale * pow(2., float(i));
              noise += randomNoise(iterScale, uv)*1./pow(2., float(i+1));
          }
          return noise;

      }
      void main()  {
          vec2 newUV = vUv / vec2(resolution.x, resolution.y / uPageSlides);
          float noise = perlinishNoise(2.0, newUV, 3, 5.);
          if(noise > (uVelo)*0.5){
              gl_FragColor =  vec4(0.0, 0.0, 0.0, 0.0);
          }
          else{
              gl_FragColor =  vec4(0.0, 0.0, 0.0, 1.0);
          }
      }`
    })
  }

  get uVelo() {
    return this.uniforms.uVelo.value
  }

  set uVelo(v) {
    return (this.uniforms.uVelo.value = v)
  }

  get uPageSlides() {
    return this.uniforms.uPageSlides.value
  }

  set uPageSlides(v) {
    return (this.uniforms.uPageSlides.value = v)
  }
}

extend({ TransitionMaterial })
