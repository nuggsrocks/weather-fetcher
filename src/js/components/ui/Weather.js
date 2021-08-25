import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export const Weather = ({ data }) => {
  const airQualities = {
    1: 'Good',
    2: 'Moderate',
    3: 'Unhealthy for Sensitive Individuals',
    4: 'Unhealthy',
    5: 'Very Unhealthy',
    6: 'Hazardous'
  }

  const airIndex = data.current.air_quality['us-epa-index']

  return <Fragment>
    <h1>
      {data.location.name}, {data.location.region}, {data.location.country}
    </h1>
    <div>
      {data.current.condition.text}
    </div>
    <div>
      {data.location.localtime}
    </div>
    <div>
      Temperature: {data.current.temp_f}&deg;F
    </div>
    <div>
      Feels Like: {data.current.feelslike_f}&deg;F
    </div>
    <div>
      Humidity: {data.current.humidity}%
    </div>
    <div>
      Wind: {data.current.wind_mph} mph {data.current.wind_dir}
    </div>
    <div>
      Gusts: up to {data.current.gust_mph} mph
    </div>
    <div>
      Pressure: {data.current.pressure_mb} mbar
    </div>
    <div>
      Cloud Coverage: {data.current.cloud}%
    </div>
    <div>
      UV Index: {data.current.uv}
    </div>
    <div>
      Air Quality Index: {airIndex} ({airQualities[airIndex]})
    </div>
  </Fragment>
}

Weather.propTypes = {
  data: PropTypes.object
}
