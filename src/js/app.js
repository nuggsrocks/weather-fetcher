import '../scss/index.scss'
import React from 'react'
import { SearchBar } from './components/ui/SearchBar'
import { SearchButton } from './components/ui/SearchButton'
import { fetchCoordinates } from './functions/fetchCoordinates'
import { fetchLocality } from './functions/fetchLocality'

export class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      error: null,
      input: '',
      coordinates: null,
      locality: null,
      weather: null
    }

    this.searchForPlace = this.searchForPlace.bind(this)
  }

  async searchForPlace () {
    try {
      this.setState({ loading: true })

      const coordinates = await fetchCoordinates(this.state.input)

      this.setState({ coordinates })

      const locality = await fetchLocality(coordinates)

      this.setState({ loading: false, locality })
    } catch (error) {
      console.error(error)
      this.setState({ loading: false, error })
    }
  }

  render () {
    return (
      <div>
        <SearchBar handleChange={(value) => this.setState({ input: value })}/>
        <SearchButton handleClick={this.searchForPlace}/>

        <article>

        {this.state.loading && <div id={'loading-icon'}>Loading...</div>}

        {!this.state.loading && this.state.locality && <h2 id={'locality'}>{this.state.locality}</h2>}

        </article>
      </div>
    )
  }
}
