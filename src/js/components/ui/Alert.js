import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export const Alert = ({ message }) => {
  return <Fragment>
    <h1>Error!</h1>
    <div>{message}</div>
  </Fragment>
}

Alert.propTypes = {
  message: PropTypes.string
}
