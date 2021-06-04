import React from 'react'
import { render } from '@testing-library/react'
import { Wind } from '../js/components/ui/Wind'

describe('<WindSpeed/>', () => {
  it('should render wind speed and direction to the dom', () => {
    const speed = '10 to 12 mph'
    const direction = 'WNW'

    render(<Wind speed={speed} direction={direction}/>)

    const expected = `Wind: ${speed} ${direction}`

    expect(document.querySelector('span').textContent).toEqual(expected)
  })
})
