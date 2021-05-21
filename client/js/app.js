import '../scss/index.scss'
import React from 'react'
import { LocationInput } from './LocationInput'
import { LoadingIcon } from './LoadingIcon'
import { ErrorDisplay } from './ErrorDisplay'
import { fetchWeather } from './fetchWeather'
import { locate } from './locate'

export class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      input: '',
      weather: null,
      coords: null,
      locationName: '',
      error: null
    }
    this.fetchCoordinates = this.fetchCoordinates.bind(this)
    this.fetchWeather = this.fetchWeather.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.setMapView = this.setMapView.bind(this)
    this.displayWeather = this.displayWeather.bind(this)

    this.map = null
    this.marker = null
  }

  async fetchWeather () {
    try {
      const { default: axios } = await import('axios')

      const response = await axios.get(
        `/server/weather?coords=${this.state.coords[0]},${this.state.coords[1]}`
      )

      if (response.data.name === 'Error') {
        this.setState({ error: new Error('Coordinates are not in range') })
        return
      }

      this.setState({ weather: response.data.properties })
    } catch (error) {
      console.error(error)
      this.setState({ error })
    }
  }

  async fetchCoordinates () {
    try {
      const { default: axios } = await import('axios')

      const response = await axios.get('/server/geocode?q=' + this.state.input)

      if (response.data.lat === undefined || response.data.lon === undefined) {
        this.setState({ error: new Error('Coordinates could not be found') })
        return
      }

      this.setState({ coords: [response.data.lat, response.data.lon] })

      await this.fetchWeather()
    } catch (error) {
      console.error(error)
      this.setState({ error })
    }
  }

  setMapView () {
    import('leaflet').then(({ default: leaflet }) => {
      this.map.setView(this.state.location, 10)
      leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      }).addTo(this.map)

      if (this.marker !== null) {
        this.marker.remove()
      }

      this.marker = leaflet.marker(this.state.location)
        .bindPopup('Your location')
        .addTo(this.map)
    })
  }

  handleChange (event) {
    this.setState({
      input: event.target.value
    })
  }

  async componentDidMount () {
    try {
      const position = await locate()

      this.setState({ coords: position.coords })

      const weather = await fetchWeather(this.state.coords)

      this.setState({ weather })
    } catch (error) {
      console.error(error)
      this.setState({ error })
    }
  }

  displayWeather () {
    const { weather } = this.state

    return <article>
      <header>
        <h1>{this.state.locationName}</h1>
      </header>

      <div className='spacer'/>

      <section>
        <div>
          <h2>{weather.periods[0].shortForecast}</h2>
        </div>
        <div>
          <span>Temperature: </span>
          {weather.periods[0].temperature}&deg;F
        </div>
        <div>
          <span>Wind:&nbsp;</span>
          {weather.periods[0].windSpeed + ' ' +
          weather.periods[0].windDirection}
        </div>
      </section>

    </article>
  }

  render () {
    const { weather, error } = this.state

    return (
      <main>

        <LocationInput
          handleInput={event => this.setState({ input: event.target.value })}
          handleClick={this.fetchCoordinates}
          input={this.state.input}
        />

        {
          error !== null && <ErrorDisplay error={error}/>
        }

        {
          error === null && weather === null && <LoadingIcon />
        }

        {
          error === null && weather && this.displayWeather()
        }

        <div id='map'/>
      </main>
    )
  }
}

import('react-dom').then(({ default: ReactDOM }) => {
  ReactDOM.render(<App/>, document.querySelector('div#root'))
})
