/**
 * The module managing the slide 2 of the Home page
 * @module Home/slide2
 */
import React from 'react'
import { useThree } from '@react-three/fiber'

/**
 * @function Slide2
 * Create the slide 2
 * @param {function} handleOnClick The function to call when we want to change page
 * @return {Object} Return the dom of the Slide2
 */
const Slide2 = ({ handleOnClick }) => {
  const { viewport } = useThree()

  return (
    <mesh position={[0, -viewport.height, 0]} onClick={handleOnClick}>
      <boxGeometry />
      <meshPhongMaterial />
    </mesh>
  )
}

export default Slide2
