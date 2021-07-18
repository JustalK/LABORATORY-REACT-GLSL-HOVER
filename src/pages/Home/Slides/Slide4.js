/**
 * The module managing the slide 4 of the Home page
 * @module Home/slide4
 */
import React from 'react'
import { useThree } from '@react-three/fiber'

/**
 * @function Slide4
 * Create the Slide4
 * @param {function} handleOnClick The function to call when we want to change page
 * @return {Object} Return the dom of the Slide4
 */
const Slide4 = ({ handleOnClick }) => {
  const { viewport } = useThree()

  return (
    <mesh position={[0, -3 * viewport.height, 0]} onClick={handleOnClick}>
      <boxGeometry />
      <meshPhongMaterial />
    </mesh>
  )
}

export default Slide4
