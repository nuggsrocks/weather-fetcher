import '../scss/index.scss'
import React, { Fragment } from 'react'
import { TextInput } from './components/ui/TextInput'
import { Button } from './components/ui/Button'
import { fetchCoordinates } from './functions/fetchCoordinates'
import { fetchLocality } from './functions/fetchLocality'
import { Alert } from './components/ui/Alert'
import { LoadingIcon } from './components/ui/LoadingIcon'
import { fetchWeather } from './functions/fetchWeather'
import { Weather } from './components/ui/Weather'

export class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      input: '',
      coordinates: null,
      weather: null
    }

    this.searchForPlace = this.searchForPlace.bind(this)
    this.geolocate = this.geolocate.bind(this)
  }

  searchForPlace () {
    this.setState({ loading: true, error: false })

    fetchCoordinates(this.state.input)
      .then(coordinates => {
        this.setState({ coordinates })

        fetchWeather(coordinates).then(weather => {
          this.setState({ loading: false, weather })
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({ loading: false, error })
      })
  }

  geolocate () {
    this.setState({loading: true, error: false})
    if (window.navigator === undefined) {
      this.setState({error: new Error('Geolocation not available')})
      return
    }

    window.navigator.geolocation.getCurrentPosition((coordinates) => {
      this.setState({coordinates, loading: false})
    }, (error) => {
      console.error(error)
      this.setState({error, loading: false})
    })

  }

  componentDidMount () {
    this.geolocate()
  }

  render () {
    return (
      <Fragment>
        <TextInput handleChange={(value) => this.setState({ input: value })}/>
        <Button handleClick={this.searchForPlace}>Search</Button>

        <article>
          {
            this.state.loading && <LoadingIcon/>
          }

          {
            this.state.error && <Alert message={this.state.error.message}/>
          }

          {
            !this.state.loading && !this.state.error && <Weather data={this.state.weather}/>
          }

        </article>


      </Fragment>
    )
  }
}
