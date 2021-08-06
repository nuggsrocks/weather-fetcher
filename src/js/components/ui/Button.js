import React from 'react'
import PropTypes from 'prop-types'

export const Button = ({ content, handleClick }) => {
  return <button onClick={handleClick}>{content}</button>
}

Button.propTypes = {
  content: PropTypes.string,
  handleClick: PropTypes.func
}
