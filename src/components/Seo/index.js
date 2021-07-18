/**
 * The components managing the seo of the pages
 * @module components/Seo
 */

import React from 'react'
import { Helmet } from 'react-helmet'

/**
 * @function Seo
 * Create the component Seo
 * @return {Object} Return the dom of the Seo page
 */
const Seo = ({ title, description }) => {
  return (
    <Helmet
      htmlAttributes={{ lang: 'en' }}
      title={title}
      meta={[
        {
          name: 'description',
          content: description
        }
      ]}
    />
  )
}

export default Seo
