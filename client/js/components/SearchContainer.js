import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import {SearchBar} from './ui/SearchBar'
import {reducer, change} from '../functions/searchBarReducer'
import { SearchButton } from './ui/SearchButton'

export const SearchContainer = () => {
  const [input, dispatch] = useReducer(reducer, reducer())
  return (
    <article>
      <SearchBar handleChange={(value) => dispatch(change(value))}/>
    </article>
  )
}

SearchContainer.propTypes = {
  SearchBar: PropTypes.func,
  reducer: PropTypes.func
}
