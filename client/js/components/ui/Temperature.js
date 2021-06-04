import React from 'react'
import PropTypes from 'prop-types'

export const Temperature = ({ value }) => {
  return <span>Temperature: {value}&deg;F</span>
}

Temperature.propTypes = {
  value: PropTypes.number
}
