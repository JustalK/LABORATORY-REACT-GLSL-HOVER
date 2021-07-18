/**
 * The module managing the home page
 * @module Home
 */
import React, { forwardRef } from 'react'
import * as Selections from './Selections'

const total = Object.keys(Selections).length

const Selector = forwardRef(
  ({ selection, tDiffuse, tDiffuse2, tDisplacement }, ref) => {
    return (
      <>
        {selection % total === 0 && (
          <offsetMaterial ref={ref} tDiffuse={tDiffuse} />
        )}
        {selection % total === 1 && (
          <smokeMaterial ref={ref} tDiffuse={tDiffuse} />
        )}
        {selection % total === 2 && (
          <topToBottomMaterial ref={ref} tDiffuse={tDiffuse} />
        )}
        {selection % total === 3 && (
          <displacementMaterial
            ref={ref}
            uTexture1={tDiffuse}
            uTexture2={tDiffuse2}
            uTextureDisplacement={tDisplacement}
          />
        )}
      </>
    )
  }
)

Selector.displayName = 'Selector'
export default Selector
