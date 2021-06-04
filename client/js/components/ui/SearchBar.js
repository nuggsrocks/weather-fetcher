import React from 'react'
import PropTypes from 'prop-types'

export const SearchBar = ({ handleChange }) => {
  return <input type={'text'} onChange={event => handleChange(event.target.value)}/>
}

SearchBar.propTypes = {
  handleChange: PropTypes.func
}
