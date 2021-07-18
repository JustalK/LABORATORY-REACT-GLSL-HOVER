/**
 * The module managing the secondary page
 * @module Secondary
 */
import React, { useRef, useEffect } from 'react'
import Transitions from '@components/Transition'
import { ROUTE_HOME } from '@constants/routes'

/* Number of slides of the Secondary */
const pageSlides = 2

/**
 * @function Secondary
 * Create the Secondary page with all the slide and elements of this component inside
 * @param {function} loadedPage The function to call once the page is loaded
 * @return {Object} Return the dom of the Secondary
 */
export default function Secondary({ loadedPage }) {
  const activated = useRef(false)

  useEffect(() => {
    loadedPage(pageSlides)
  }, [])

  return (
    <>
      <Transitions
        pageSlides={pageSlides}
        activated={activated}
        route={ROUTE_HOME}
      />
      <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 5]} />
      <mesh position={[0, 0, 0]} onClick={() => (activated.current = true)}>
        <boxGeometry />
        <meshPhongMaterial />
      </mesh>
    </>
  )
}
