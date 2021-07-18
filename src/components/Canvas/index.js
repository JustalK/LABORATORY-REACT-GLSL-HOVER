/**
 * The components managing the canvas of the application
 * @module components/Canvas
 */

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

/**
 * @function Scene
 * Create the component Canvas with the raycaster for interactinf with the mesh
 * @param {Object} Children The dom element nested in the component
 * @return {Object} Return the dom of the Canvas
 */
const Scene = ({ children }) => {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  )
}

export default Scene
