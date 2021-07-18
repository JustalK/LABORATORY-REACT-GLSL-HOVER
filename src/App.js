import React, { Suspense, useRef } from 'react'
import { ROUTE_HOME, ROUTE_SECONDARY } from '@constants/routes'
import Canvas from '@components/Canvas'
import Scroll from '@components/Scroll'
import Panel from '@components/Panel'
import { Route } from 'wouter'
import Home from '@pages/Home'
import Secondary from '@pages/Secondary'

export default function App() {
  const scrollRef = useRef()
  const scroll = useRef(0)
  const totalSlides = useRef(4)
  const doScroll = (e) => {
    scroll.current =
      ((totalSlides.current - 1) * e.target.scrollTop) /
      (e.target.scrollHeight - window.innerHeight)
  }

  const loadedPage = (pageSlides) => {
    totalSlides.current = pageSlides
    scrollRef.current.scrollTop = 0
  }

  return (
    <div id="canvas-container">
      <Canvas scrollRef={scrollRef}>
        <Suspense fallback={null}>
          <Scroll scroll={scroll}>
            <Route path={ROUTE_SECONDARY}>
              <Secondary loadedPage={loadedPage} />
            </Route>
            <Route path={ROUTE_HOME}>
              <Home loadedPage={loadedPage} />
            </Route>
          </Scroll>
        </Suspense>
      </Canvas>
      <div ref={scrollRef} onScroll={doScroll} className="scroll">
        <Panel path={ROUTE_SECONDARY} size={200} />
        <Panel path={ROUTE_HOME} size={400} />
      </div>
    </div>
  )
}
