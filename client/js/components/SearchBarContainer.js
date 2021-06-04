import React, { useReducer } from 'react'
import { SearchBar } from './ui/SearchBar'
import { reducer, input } from '../functions/reducers/input'
import PropTypes from 'prop-types'

export const LocationInputContainer = ({ handleClick }) => {
  const [value, dispatch] = useReducer(reducer, reducer())

  const handleChange = (event) => {
    dispatch(input(event.target.value))
  }

  return <SearchBar handleChange={handleChange} handleClick={() => handleClick(value)}/>
}

LocationInputContainer.propTypes = {
  handleClick: PropTypes.func
}
