import React from 'react'
import PropTypes from 'prop-types'

export const SearchButton = ({ handleClick }) => {
  return <button id={'search-button'} onClick={handleClick}>Search</button>
}

SearchButton.propTypes = {
  handleClick: PropTypes.func
}
