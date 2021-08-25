import React from 'react'
import PropTypes from 'prop-types'

export const Button = ({ children, handleClick }) => {
  return <button onClick={handleClick}>{children}</button>
}

Button.propTypes = {
  children: PropTypes.string,
  handleClick: PropTypes.func
}
