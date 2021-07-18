import React, { Suspense } from 'react'
import ROUTE_HOME from '@constants/routes'
import Canvas from '@components/Canvas'
import { Route } from 'wouter'
import Home from '@pages/Home'

export default function App() {
  return (
    <div id="canvas-container">
      <Canvas>
        <Suspense fallback={null}>
          <Route path={ROUTE_HOME}>
            <Home />
          </Route>
        </Suspense>
      </Canvas>
    </div>
  )
}
