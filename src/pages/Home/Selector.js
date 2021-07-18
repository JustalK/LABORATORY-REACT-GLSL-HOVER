/**
 * The module managing the home page
 * @module Home
 */
import React, { forwardRef } from 'react'
import * as Selections from './Selections'

const total = Object.keys(Selections).length

const Selector = forwardRef(
  ({ selection, uTexture, uTexture2, uTextureDisplacement }, ref) => {
    return (
      <>
        {selection % total === 0 && (
          <offsetMaterial ref={ref} uTexture={uTexture} />
        )}
        {selection % total === 1 && (
          <smokeMaterial ref={ref} uTexture={uTexture} />
        )}
        {selection % total === 2 && (
          <topToBottomMaterial ref={ref} uTexture={uTexture} />
        )}
        {selection % total === 3 && (
          <displacementMaterial
            ref={ref}
            uTexture1={uTexture}
            uTexture2={uTexture2}
            uTextureDisplacement={uTextureDisplacement}
          />
        )}
      </>
    )
  }
)

Selector.displayName = 'Selector'
export default Selector
