/**
 * The module managing the slide 3 of the Home page
 * @module Home/slide3
 */
import React from 'react'
import { useThree } from '@react-three/fiber'

/**
 * @function Slide3
 * Create the slide 3
 * @param {function} handleOnClick The function to call when we want to change page
 * @return {Object} Return the dom of the Slide3
 */
const Slide3 = ({ handleOnClick }) => {
  const { viewport } = useThree()

  return (
    <mesh position={[0, -2 * viewport.height, 0]} onClick={handleOnClick}>
      <boxGeometry />
      <meshPhongMaterial />
    </mesh>
  )
}

export default Slide3
