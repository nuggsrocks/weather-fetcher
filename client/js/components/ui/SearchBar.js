import React from 'react'
import PropTypes from 'prop-types'

export const SearchBar = ({ handleChange, handleClick }) => {
  return (
  <div>
    <form>
      <label htmlFor='location'>
        Enter Location:
        <input
          id='location'
          type={'text'}
          onChange={handleChange}
        />
      </label>
    </form>
    <button onClick={handleClick}>
      Search
    </button>
  </div>
  )
}

SearchBar.propTypes = {
  handleClick: PropTypes.func,
  handleChange: PropTypes.func
}
