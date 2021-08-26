import React from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'

export class Weather extends React.Component {
  constructor (props) {
    super(props)

    this.airQualities = {
      1: 'Good',
      2: 'Moderate',
      3: 'Unhealthy for Sensitive Individuals',
      4: 'Unhealthy',
      5: 'Very Unhealthy',
      6: 'Hazardous'
    }

    this.airIndex = this.props.data.current.air_quality['us-epa-index']

    this.map = null
    this.marker = null
  }

  componentDidMount () {
    const location = this.props.data.location

    this.map = L.map('map')

    this.map.addEventListener('click', this.props.handleMapClick)

    this.map.setView([location.lat, location.lon], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: `
           &copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a> 
           | See a problem? <a href="https://www.openstreetmap.org/fixthemap">Fix the map</a>
           `
    }).addTo(this.map)

    this.marker = L.marker([location.lat, location.lon]).bindPopup('Your location').addTo(this.map)
  }

  render () {
    const { location, current } = this.props.data
    return <div id={'weather-div'}>
      <h1>
        {location.name}, {location.region}, {location.country}
      </h1>
      <div className={'divider'}/>
      <div className={'grid'}>
        <section>
          <h3>
            {
              current.condition.text.toLowerCase()
                .replace(/\w+/g, (w) =>
                  w.replace(/^\w/, (c) => c.toUpperCase())
                )}
          </h3>
          <p>
            {location.localtime}
          </p>
          <p>
            Temperature: {current.temp_f}&deg;F
          </p>
          <p>
            Feels Like: {current.feelslike_f}&deg;F
          </p>
          <p>
            Humidity: {current.humidity}%
          </p>
          <p>
            Wind: {current.wind_mph} mph {current.wind_dir}
          </p>
          <p>
            Gusts: up to {current.gust_mph} mph
          </p>
          <p>
            Pressure: {current.pressure_mb} mbar
          </p>
          <p>
            Cloud Coverage: {current.cloud}%
          </p>
          <p>
            UV Index: {current.uv}
          </p>
          <p>
            Air Quality Index: {this.airIndex} ({this.airQualities[this.airIndex]})
          </p>
        </section>
        <div id={'map'}/>
      </div>
    </div>
  }
}

Weather.propTypes = {
  data: PropTypes.object,
  handleMapClick: PropTypes.func
}
