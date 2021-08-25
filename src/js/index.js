import 'regenerator-runtime/runtime'

import React from 'react'
import { App } from './app'

import('react-dom').then(({ default: ReactDOM }) => {
  ReactDOM.render(<App/>, document.querySelector('div#root'))
})
