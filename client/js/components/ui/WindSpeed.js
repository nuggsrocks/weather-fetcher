import React from 'react'
import PropTypes from 'prop-types'

export const WindSpeed = ({ speed, direction }) => {
  return <div>
    <span>Wind: </span>
    {`${speed} ${direction}`}
  </div>
}

WindSpeed.propTypes = {
  speed: PropTypes.string,
  direction: PropTypes.string
}
