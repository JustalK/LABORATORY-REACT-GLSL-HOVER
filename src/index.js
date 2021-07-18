/**
 * The module managing the entry point of the APP
 * @module Main
 */

import React from 'react'
import ReactDOM from 'react-dom'
import '@styles/index.scss'
import App from '@src/App'

/**
 * @function render
 * Render the Home component inside the element root of the index page
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
