import React from 'react'
import PropTypes from 'prop-types'

export const LocationInput = ({ onChange, onClick }) => {
  return (
  <div>
    <form>
      <label htmlFor='location'>
        Enter Location:
        <input
          id='location'
          type={'text'}
          onChange={onChange}
        />
      </label>
    </form>
    <button onClick={onClick}>
      Search
    </button>
  </div>
  )
}

LocationInput.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func
}
