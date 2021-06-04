import React from 'react'
import PropTypes from 'prop-types'

export const Wind = ({ speed, direction }) => {
  return <span>Wind: {speed} {direction}</span>
}

Wind.propTypes = {
  speed: PropTypes.string,
  direction: PropTypes.string
}
