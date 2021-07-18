/**
 * The components managing the area scrollable
 * @module components/Panel
 */

import React from 'react'
import { Route } from 'wouter'

/**
 * @function Panel
 * Create the component Panel with a div of a certain size
 * @param {string} path The path where this element will be shown
 * @param {number} size The height of the div
 * @return {Object} Return the dom of the Panel
 */
const Panel = ({ path, size }) => {
  return (
    <Route path={path}>
      <div style={{ height: `${size}vh`, pointerEvents: 'none' }} />
    </Route>
  )
}

export default Panel
