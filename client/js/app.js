import '../scss/index.scss'
import React from 'react'
import { fetchCoordinates } from './functions/fetchCoordinates'
import { LocationInputContainer } from './components/LocationInputContainer'
import { fetchWeather } from './functions/fetchWeather'
import { WeatherContainer } from './components/WeatherContainer'

export class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      weather: null,
      coords: null,
      error: null
    }

    this.searchForWeather = this.searchForWeather.bind(this)
    this.searchForCoordinates = this.searchForCoordinates.bind(this)

    this.map = null
    this.marker = null
  }



  async searchForWeather () {
    try {
      this.setState({ weather: null, error: null })

      const weather = await fetchWeather(this.state.coords)

      this.setState({ weather })
    } catch (error) {
      console.error(error)
      this.setState({ error })
    }
  }

  async searchForCoordinates (queryString) {
    try {
      this.setState({ coords: null, error: null })

      const coords = await fetchCoordinates(queryString)

      this.setState({ coords })
    } catch (error) {
      console.error(error)
      this.setState({ error })
    } finally {
      await this.searchForWeather()
    }
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ coords: position.coords })
    }, positionError => {
      this.setState({ error: positionError })
    }, {
      timeout: 5000
    })
  }

  render () {
    const { weather, error } = this.state

    return (
      <main>

        <LocationInputContainer handleClick={this.searchForCoordinates}/>

        {
          error !== null && <article><h1>Error!</h1></article>
        }

        {
          error === null && weather === null && <article><h1>Loading...</h1></article>
        }

        {
          weather !== null && <WeatherContainer weather={weather}/>
        }

        <div id='map'/>
      </main>
    )
  }
}

import('react-dom').then(({ default: ReactDOM }) => {
  ReactDOM.render(<App/>, document.querySelector('div#root'))
})
