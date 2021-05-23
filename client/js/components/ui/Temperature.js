import React from 'react'
import PropTypes from 'prop-types'

export const Temperature = ({ temp }) => {
  return <div>
    <span>Temperature: </span>
    {temp}&deg;F
  </div>
}

Temperature.propTypes = {
  temp: PropTypes.number
}
