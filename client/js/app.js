import '../scss/index.scss'
import React from 'react'
import { LocationInput } from './LocationInput'
import { LoadingIcon } from './LoadingIcon'
import { ErrorNotification } from './ErrorNotification'
import { fetchWeather } from './fetchWeather'
import { locate } from './locate'

export class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      weather: null,
      coords: null,
      locationName: '',
      error: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.setMapView = this.setMapView.bind(this)
    this.findAddress = this.findAddress.bind(this)
    this.findCoords = this.findCoords.bind(this)
    this.displayWeather = this.displayWeather.bind(this)

    this.map = null
    this.marker = null
  }

  findAddress () {
    console.log('reverse geocoding...')
    import('axios').then(({ default: axios }) => {
      axios.get(
        `/server/reverse-geo?coords=${this.state.location[0]},${this.state.location[1]}`)
        .then(response => {
          console.log('found address...')
          console.log(response.data)

          const locationNames = []

          const keyRegex = /aeroway|hamlet|suburb|town|municipality|city|county/

          const locationObject = response.data.address

          Object.keys(locationObject).forEach(key => {
            if (keyRegex.test(key)) {
              locationNames.push(locationObject[key])
            }
          })

          const locationName = locationNames[0]

          this.setState({
            locationName
          })

          this.setMapView()

          this.findWeather()
        })
        .catch(e => console.error(e))
    })
  }

  findCoords (queryString) {
    import('axios').then(({ default: axios }) => {
      axios.get('/server/geocode?q=' + queryString)
        .then(response => {
          console.log(response.data)
          this.setState({
            location: [response.data.lat, response.data.lon]
          })

          this.findAddress()
        })
    })
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
          handleClick={() => this.findCoords(this.state.input)}
          input={this.state.input}
        />

        {
          error !== null && <ErrorNotification error={error}/>
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
