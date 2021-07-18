/**
 * The module managing the home page
 * @module Home
 */
import React, { useRef, useState, useEffect } from 'react'
import { useLoader, useFrame, extend } from '@react-three/fiber'
import { Text } from 'troika-three-text'
import * as THREE from 'three'
import { TweenMax as TM } from 'gsap'
import Selector from './Selector'
import * as Selections from './Selections'

const total = Object.keys(Selections).length

extend({ Text })

const propsText = {
  color: '#99ccff',
  maxWidth: 300,
  align: 'center',
  font: '/font.ttf',
  anchorX: 'center',
  anchorY: 'middle'
}

/**
 * @function Home
 * Create the home page with all the slide and elements of this component inside
 * @param {function} loadedPage The function to call once the page is loaded
 * @return {Object} Return the dom of the Home
 */
export default function Home() {
  const ref = useRef()
  const titleRef = useRef()
  const subtitleRef = useRef()
  const [tDiffuse, tDiffuse2, tDisplacement] = useLoader(THREE.TextureLoader, [
    './1.jpeg',
    './2.jpeg',
    './displacement/4.png'
  ])
  const [selection, setSelection] = useState(0)

  useFrame((state, delta) => {
    ref.current.uTime += delta
  })

  useEffect(() => {
    titleRef.current.sync()
    subtitleRef.current.sync()
  }, [])

  return (
    <>
      <ambientLight intensity={0.1} />
      <text
        position={[0, 0.6, 0]}
        fontSize={0.08}
        text={`Experience: ${(selection % total) + 1}`}
        ref={titleRef}
        {...propsText}
      >
        <meshPhongMaterial />
      </text>
      <text
        position={[0, -0.6, 0]}
        fontSize={0.06}
        text={`Click here for switching experience`}
        ref={subtitleRef}
        {...propsText}
        onClick={() => setSelection((c) => c + 1)}
      >
        <meshPhongMaterial />
      </text>
      <mesh
        position={[0, 0, 0]}
        onPointerEnter={() => {
          if (ref.current.uniforms.uTextureDisplacementFactor) {
            TM.to(ref.current.uniforms.uTextureDisplacementFactor, 1.6, {
              value: 1,
              ease: 'expo.out'
            })
          }
          if (ref.current.uniforms.uVelo) {
            TM.to(ref.current.uniforms.uVelo, 1.0, {
              value: 1,
              ease: 'expo.out'
            })
          }
        }}
        onPointerLeave={() => {
          if (ref.current.uniforms.uTextureDisplacementFactor) {
            TM.to(ref.current.uniforms.uTextureDisplacementFactor, 1.6, {
              value: 0,
              ease: 'expo.out'
            })
          }
          if (ref.current.uniforms.uVelo) {
            TM.to(ref.current.uniforms.uVelo, 1.0, {
              value: 0,
              ease: 'expo.out'
            })
          }
        }}
        onPointerMove={(e) => {
          ref.current.uMouse = e.intersections[0].uv
        }}
      >
        <planeGeometry args={[1, 1, 32, 32]} />
        <Selector
          selection={selection}
          ref={ref}
          tDiffuse={tDiffuse}
          tDiffuse2={tDiffuse2}
          tDisplacement={tDisplacement}
        />
      </mesh>
    </>
  )
}
