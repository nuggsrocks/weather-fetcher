import React from 'react'
import PropTypes from 'prop-types'

export const LocationInput = (props) => {
  return (
  <div>
    <label htmlFor='location'>
      Enter Location: <input id='location' type={'text'} value={props.input} onInput={props.handleInput}/>
    </label>
    <button onClick={props.handleClick}>
      Search
    </button>
  </div>
  )
}

LocationInput.propTypes = {
  handleClick: PropTypes.func,
  handleInput: PropTypes.func,
  input: PropTypes.string
}
