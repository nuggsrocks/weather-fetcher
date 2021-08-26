import React from 'react'
import PropTypes from 'prop-types'

export const Alert = ({ message }) => {
  return <div className={'error'}>
    <h1>Error!</h1>
    <div>{message}</div>
  </div>
}

Alert.propTypes = {
  message: PropTypes.string
}
