import React from 'react'
import { render } from '@testing-library/react'
import { Wind } from '../src/js/components/ui/Wind'

describe('<WindSpeed/>', () => {
  it('should render wind speed and direction to the dom', () => {
    const speed = '10 to 12 mph'
    const direction = 'WNW'

    render(<Wind speed={speed} direction={direction}/>)

    expect(document.body.textContent).toMatch(speed)
    expect(document.body.textContent).toMatch(direction)
  })
})
