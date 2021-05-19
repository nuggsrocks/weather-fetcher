import React from 'react'
import PropTypes from 'prop-types'

export const WeatherDisplay = (props) => {
  return <article>
    <header>
      <h1>{props.locationName}</h1>
    </header>

    <div className='spacer'/>

    <section>
      <div>
        <h2>{props.weather.periods[0].shortForecast}</h2>
      </div>
      <div>
        <span>Temperature: </span>
        {props.weather.periods[0].temperature}&deg;F
      </div>
      <div>
        <span>Wind:&nbsp;</span>
        {props.weather.periods[0].windSpeed + ' ' +
        props.weather.periods[0].windDirection}
      </div>
    </section>

  </article>
}

WeatherDisplay.propTypes = {
  locationName: PropTypes.string,
  weather: PropTypes.shape({
    periods: PropTypes.arrayOf(PropTypes.object)
  })
}
