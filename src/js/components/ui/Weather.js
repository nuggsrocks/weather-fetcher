import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

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

    this.map.addEventListener('click', (event) => {
      this.map.setView(event.latlng, 13)
      this.marker.remove()
      this.marker = L.marker(event.latlng).bindPopup('Your location').addTo(this.map)
    })

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
    return <div id={'weather-div'}>
      <h1>
        {this.props.data.location.name}, {this.props.data.location.region}, {this.props.data.location.country}
      </h1>
      <div className={'divider'}/>
      <div className={'grid'}>
        <section>
          <h3>
            {
              this.props.data.current.condition.text.toLowerCase()
              .replace(/\w+/g, (w) =>
                w.replace(/^\w/, (c) => c.toUpperCase())
              )}
          </h3>
          <p>
            {this.props.data.location.localtime}
          </p>
          <p>
            Temperature: {this.props.data.current.temp_f}&deg;F
          </p>
          <p>
            Feels Like: {this.props.data.current.feelslike_f}&deg;F
          </p>
          <p>
            Humidity: {this.props.data.current.humidity}%
          </p>
          <p>
            Wind: {this.props.data.current.wind_mph} mph {this.props.data.current.wind_dir}
          </p>
          <p>
            Gusts: up to {this.props.data.current.gust_mph} mph
          </p>
          <p>
            Pressure: {this.props.data.current.pressure_mb} mbar
          </p>
          <p>
            Cloud Coverage: {this.props.data.current.cloud}%
          </p>
          <p>
            UV Index: {this.props.data.current.uv}
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
  data: PropTypes.object
}
