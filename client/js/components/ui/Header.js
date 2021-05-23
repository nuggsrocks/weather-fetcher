import React from 'react'
import PropTypes from 'prop-types'

export const Header = ({ content }) => {
  return (
    <article>
      <header>
        <h1>{content}</h1>
      </header>
    </article>
  )
}

Header.propTypes = {
  content: PropTypes.string
}
