/**
 * The module managing the home page
 * @module Home
 */
import React, { useRef, useEffect } from 'react'
import Transitions from '@components/Transition'
import { ROUTE_SECONDARY } from '@constants/routes'
import Slide1 from './Slides/Slide1'
import Slide2 from './Slides/Slide2'
import Slide3 from './Slides/Slide3'
import Slide4 from './Slides/Slide4'

/* Number of slides of the Home */
const pageSlides = 4

/**
 * @function Home
 * Create the home page with all the slide and elements of this component inside
 * @param {function} loadedPage The function to call once the page is loaded
 * @return {Object} Return the dom of the Home
 */
export default function Home({ loadedPage }) {
  const activated = useRef(false)

  const handleOnClick = () => {
    activated.current = true
  }

  useEffect(() => {
    loadedPage(pageSlides)
  }, [])

  return (
    <>
      <Transitions
        pageSlides={pageSlides}
        activated={activated}
        route={ROUTE_SECONDARY}
      />
      <ambientLight intensity={0.1} />
      <Slide1 handleOnClick={handleOnClick} />
      <Slide2 handleOnClick={handleOnClick} />
      <Slide3 handleOnClick={handleOnClick} />
      <Slide4 handleOnClick={handleOnClick} />
    </>
  )
}
