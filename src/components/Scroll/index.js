/**
 * The components managing the behavior pf the scroll
 * @module components/ScrollContainer
 */

import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'

/* The smooth power of the scroll */
const smoothLevel = 0.15

/**
 * @function ScrollContainer
 * Create the component ScrollContainer
 * @param {Object} Children The dom element nested in the component
 * @param {Object} scroll The reference to the position of the scroll
 * @return {Object} Return the dom of the ScrollContainer
 */
export default function ScrollContainer({ scroll, children }) {
  const { viewport } = useThree()
  const group = useRef()
  const vec = new THREE.Vector3()
  useFrame(() =>
    group.current.position.lerp(
      vec.set(0, viewport.height * scroll.current, 0),
      smoothLevel
    )
  )
  return <group ref={group}>{children}</group>
}
