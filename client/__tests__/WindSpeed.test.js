import React from 'react'
import { render } from '@testing-library/react'
import { WindSpeed } from '../js/components/ui/WindSpeed'

describe('<WindSpeed/>', () => {
  it('should render speed and direction props to the dom', () => {
    const speed = '10 to 12 mph'
    const direction = 'WNW'

    const { getByText } = render(<WindSpeed speed={speed} direction={direction}/>)

    expect(getByText(speed, { exact: false })).toBeTruthy()
    expect(getByText(direction, { exact: false })).toBeTruthy()
  })
})
