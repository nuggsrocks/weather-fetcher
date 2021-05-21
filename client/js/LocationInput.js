import React, { useState } from 'react'
import PropTypes from 'prop-types'

export const LocationInput = (props) => {
  const [input, setInput] = useState('')

  const handleInput = (event) => {
    setInput(event.target.value)
  }

  return (
  <div>
    <label htmlFor='location'>
      Enter Location: <input id='location' type={'text'} value={input} onInput={handleInput}/>
    </label>
    <button onClick={() => props.handleClick(input)}>
      Search
    </button>
  </div>
  )
}

LocationInput.propTypes = {
  handleClick: PropTypes.func
}
