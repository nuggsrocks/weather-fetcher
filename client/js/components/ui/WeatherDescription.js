import React from 'react'
import PropTypes from 'prop-types'

export const WeatherDescription = ({ description }) => {
  return <div>
    <h2>{description}</h2>
  </div>
}

WeatherDescription.propTypes = {
  description: PropTypes.string
}
