import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Temperature } from './ui/Temperature'
import { Wind } from './ui/Wind'

export const Weather = ({ weather }) => {
  return (
    <Fragment>
      <h1>{weather.city}</h1>

      <div className={'spacer'}/>

      {
        weather.periods.slice(0, 2).map((period, key) => {
          return (
            <section key={key}>
              <h2>{period}</h2>
              <p>{period.detailedForecast}</p>
              <Temperature value={period.temperature}/>
              <Wind speed={period.windSpeed} direction={period.windDirection}/>
            </section>
          )
        })
      }
    </Fragment>
  )
}

Weather.propTypes = {
  weather: PropTypes.object
}
