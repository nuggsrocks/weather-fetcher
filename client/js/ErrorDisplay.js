import React from 'react'
import PropTypes from 'prop-types'

export const ErrorDisplay = (props) => {
  return <article>
    <header>
      <h1>Error</h1>
      <code>{props.error.message}</code>
    </header>
  </article>
}
ErrorDisplay.propTypes = {
  error: PropTypes.object.isRequired
}
