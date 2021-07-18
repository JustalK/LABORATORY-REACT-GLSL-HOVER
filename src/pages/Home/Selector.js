/**
 * The module managing the home page
 * @module Home
 */
import React, { forwardRef } from 'react'
import '@components/Materials/Smoke'
import '@components/Materials/Offset'

const Selector = forwardRef(({ selection, tDiffuse }, ref) => {
  const total = 2
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
