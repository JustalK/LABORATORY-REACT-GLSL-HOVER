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
 * @param {Object} scrollRef The reference to the actual div having the scroll bar
 * @return {Object} Return the dom of the Canvas
 */
const Scene = ({ children, scrollRef }) => {
  return (
    <div id="canvas-container">
      <Canvas
        onCreated={(state) => state.events.connect(scrollRef.current)}
        raycaster={{
          computeOffsets: ({ clientX, clientY }) => {
            return {
              offsetX: clientX,
              offsetY: clientY
            }
          }
        }}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  )
}

export default Scene
