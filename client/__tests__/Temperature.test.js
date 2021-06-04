import React from 'react'
import { render } from '@testing-library/react'
import { Temperature } from '../js/components/ui/Temperature'

describe('<Temperature/>', () => {
  it('should render temperature prop to the dom along with correct units', () => {
    const temp = 80
    render(<Temperature value={temp}/>)

    const expected = `Temperature: ${temp}\u00b0F`
    expect(document.querySelector('span').textContent).toEqual(expected)
  })
})
