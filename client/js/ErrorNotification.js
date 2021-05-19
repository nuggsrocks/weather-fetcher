import React from 'react'
import PropTypes from 'prop-types'

export const ErrorNotification = (props) => {
  return <article>
    <header>
      <h1>Error</h1>
      <code>{props.error.message}</code>
    </header>
  </article>
}
ErrorNotification.propTypes = {
  error: PropTypes.object.isRequired
}
