import React from 'react'
import PropTypes from 'prop-types'

export const TextInput = ({ handleChange }) => {
  return <input type={'text'} onChange={event => handleChange(event.target.value)}/>
}

TextInput.propTypes = {
  handleChange: PropTypes.func
}
