/**
 * The module managing the home page
 * @module Home
 */
import React, { useRef, useState, useEffect } from 'react'
import { useLoader, useFrame, extend } from '@react-three/fiber'
import { Text } from 'troika-three-text'
import * as THREE from 'three'
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
  const [hover, setHover] = useState(false)
  const [tDiffuse] = useLoader(THREE.TextureLoader, ['./1.jpeg'])
  const [selection, setSelection] = useState(0)

  useFrame((state, delta) => {
    ref.current.uTime += delta
    ref.current.uVelo = hover
      ? Math.min(1.0, ref.current.uVelo + 0.05)
      : Math.max(0.0, ref.current.uVelo - 0.05)
  })

  useEffect(() => {
    titleRef.current.sync()
    subtitleRef.current.sync()
  }, [])

  return (
    <>
      <ambientLight intensity={0.1} />
      <mesh
        position={[0, 0, 0]}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        onPointerMove={(e) => {
          ref.current.uMouse = e.intersections[0].uv
        }}
        onClick={() => setSelection((c) => c + 1)}
      >
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
          text={`Click on the image`}
          ref={subtitleRef}
          {...propsText}
        >
          <meshPhongMaterial />
        </text>
        <planeGeometry args={[1, 1, 32, 32]} />
        <Selector selection={selection} ref={ref} tDiffuse={tDiffuse} />
      </mesh>
    </>
  )
}
