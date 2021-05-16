import React from 'react'
import '../scss/index.scss'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      input: '',
      weather: null,
      location: undefined,
      locationName: '',
      error: false
    }
    this.locate = this.locate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.setMapView = this.setMapView.bind(this)
    this.findAddress = this.findAddress.bind(this)
    this.findCoords = this.findCoords.bind(this)
    this.findWeather = this.findWeather.bind(this)
    this.handleError = this.handleError.bind(this)
    this.displayWeather = this.displayWeather.bind(this)

    this.map = null
    this.marker = null
  }

  locate () {
    if (navigator.geolocation) {
      console.log('fetching current position....')

      navigator.geolocation.getCurrentPosition(position => {
        console.log('postion found...')
        this.setState(
          { location: [position.coords.latitude, position.coords.longitude] })
        this.findAddress()
      }, error => {
        console.error(error)
        this.setState({
          error
        })
      },
      {
        timeout: 500
      })
    } else {
      this.setState({
        error: 'Geolocation not supported'
      })
    }
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

  findCoords () {
    import('axios').then(({ default: axios }) => {
      axios.get('/server/geocode?q=' + this.state.input)
        .then(response => {
          console.log(response.data)
          this.setState({
            location: [response.data.lat, response.data.lon]
          })

          this.findAddress()
        })
    })
  }

  findWeather () {
    console.log('searching for weather information...')

    if (this.state.error) {
      this.setState({
        error: false
      })
    }

    import('axios').then(({ default: axios }) => {
      axios.get(
        `/server/weather?coords=${this.state.location[0]},${this.state.location[1]}`)
        .then(response => {
          if (response.data.properties === undefined) {
            throw new Error('Error occurred while fetching weather info.')
          }
          this.setState({ weather: response.data.properties })
        })
        .catch(e => {
          console.error(e)
          this.setState({
            error: e
          })
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

  handleError () {
    return <article>
      <header>
        <h1>Error</h1>
        <code>{this.state.error.message}</code>
      </header>
    </article>
  }

  componentDidMount () {
    import('leaflet').then(({ default: leaflet }) => {
      this.map = leaflet.map('map')
      leaflet.control.scale().addTo(this.map)

      this.map.on('click', (event) => {
        this.setState({
          location: [event.latlng.lat, event.latlng.lng],
          locationName: '',
          weather: null
        })
        this.findAddress()
      })

      this.locate()
    })
  }

  displayLoadingScreen () {
    return <article>
      <header>
        <h1>Loading...</h1>
      </header>
    </article>
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

        <div>
          <input type={'text'} value={this.state.input}
                 onChange={this.handleChange}/>
          <button onClick={this.findCoords}>
            Search
          </button>
        </div>

        {
          error !== false && this.handleError()
        }

        {
          error === false && weather === null && this.displayLoadingScreen()
        }

        {
          error === false && weather && this.displayWeather()
        }

        <div id='map'/>
      </main>
    )
  }
}

import('react-dom').then(({ default: ReactDOM }) => {
  ReactDOM.render(<App/>, document.querySelector('div#root'))
})
