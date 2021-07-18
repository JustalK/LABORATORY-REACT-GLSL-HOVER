/**
 * The module managing the home page
 * @module Home
 */
import React, { forwardRef } from 'react'
import * as Selections from './Selections'

const total = Object.keys(Selections).length

const Selector = forwardRef(({ selection, tDiffuse }, ref) => {
  return (
    <>
      {selection % total === 0 && (
        <offsetMaterial ref={ref} tDiffuse={tDiffuse} />
      )}
      {selection % total === 1 && (
        <smokeMaterial ref={ref} tDiffuse={tDiffuse} />
      )}
    </>
  )
})

Selector.displayName = 'Selector'
export default Selector
