/**
 * The components managing the transition of the app
 * @module components/Transition
 */

import React, { useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useLocation } from 'wouter'
import transitionMaterial from './Materials'

/**
 * @function Transition
 * Create a mesh taking the whole page which will be shown when activated
 * @param {number} pageSlides The number of slide of the current page
 * @param {boolean} activated If true the transition will be in position `out` or else the transition will be in position out `out`
 * @param {string} route The route where to redirect the user
 * @return {Object} Return the dom of the Transition
 */
const Transition = ({ pageSlides, activated, route }) => {
  const location = useLocation()
  const setLocation = location[1]
  const ref = useRef()
  const { viewport } = useThree()

  useFrame((state, delta) => {
    if (activated.current && ref.current.uVelo === 2) {
      setLocation(route)
    } else {
      ref.current.uVelo = activated.current
        ? Math.min(ref.current.uVelo + delta, 2)
        : Math.max(ref.current.uVelo - delta, 0)
    }
  })

  return (
    <mesh position={[0, 0, 1]}>
      <planeGeometry
        args={[viewport.width, pageSlides * 2 * viewport.height, 32, 32]}
      />
      <transitionMaterial ref={ref} pageSlides={pageSlides * 2} transparent />
    </mesh>
  )
}

export default Transition
