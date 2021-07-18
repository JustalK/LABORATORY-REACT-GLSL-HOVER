/**
 * The module managing the home page
 * @module Home
 */
import React, { useRef, useState } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import '@components/Materials/Smoke'

/**
 * @function Home
 * Create the home page with all the slide and elements of this component inside
 * @param {function} loadedPage The function to call once the page is loaded
 * @return {Object} Return the dom of the Home
 */
export default function Home() {
  const ref = useRef()
  const [hover, setHover] = useState(false)
  const [tDiffuse] = useLoader(THREE.TextureLoader, ['./1.jpeg'])

  useFrame((state, delta) => {
    ref.current.uTime += delta
    ref.current.uVelo = hover
      ? Math.min(1.0, ref.current.uVelo + 0.05)
      : Math.max(0.0, ref.current.uVelo - 0.05)
  })

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
      >
        <planeGeometry args={[1, 1, 32, 32]} />
        <imageMaterial ref={ref} tDiffuse={tDiffuse} />
      </mesh>
    </>
  )
}
