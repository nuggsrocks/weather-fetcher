import '../scss/index.scss'
import React from 'react'
import { LocationInput } from './components/ui/LocationInput'
import { Header } from './components/ui/Header'
import { fetchCoordinates } from './functions/fetchCoordinates'

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

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.setMapView = this.setMapView.bind(this)

    this.map = null
    this.marker = null
  }

  setMapView () {
    import('leaflet').then(({ default: leaflet }) => {
      this.map.setView(this.state.coords, 10)
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

  handleClick () {
    fetchCoordinates(this.state.input)
      .then(coords => {
        this.setState({coords})
        this.setMapView()
      })
      .catch(error => this.setState({error}))
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ coords: position.coords })
      this.setMapView()
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

        <LocationInput
          handleChange={event => this.setState({ input: event.target.value })}
          handleClick={this.handleClick}
        />

        {
          error !== null
            ? <Header content={'Error!'}/>
            : weather === null
              ? <Header content={'Loading...'}/>
              : <Header content={'Weather'}/>
        }

        <div id='map'/>
      </main>
    )
  }
}

import('react-dom').then(({ default: ReactDOM }) => {
  ReactDOM.render(<App/>, document.querySelector('div#root'))
})
