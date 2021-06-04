import '../scss/index.scss'
import React from 'react'
import { SearchBar } from './components/ui/SearchBar'
import {SearchButton} from './components/ui/SearchButton'
import { fetchCoordinates } from './functions/fetchCoordinates'
import { fetchLocality } from './functions/fetchLocality'
import { fetchWeather } from './functions/fetchWeather'

export class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      input: '',
      coordinates: null,
      locality: null,
      weather: null
    }

    this.searchForPlace = this.searchForPlace.bind(this)
  }

  async searchForPlace() {
    try {
      const coordinates = await fetchCoordinates(this.state.input)

      this.setState({coordinates})

      const locality = await fetchLocality(this.state.coordinates)

      this.setState({locality})

      const weather = await fetchWeather(this.state.coordinates)

      this.setState({weather})

    } catch(error) {
      console.error(error);
      this.setState({error})
    }
  }


  render () {
    return (
      <div>
        <SearchBar handleChange={(value) => this.setState({input: value})}/>
        <SearchButton handleClick={this.searchForPlace}/>
      </div>
    )
  }
}
