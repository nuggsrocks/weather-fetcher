import React from 'react'
import { render } from '@testing-library/react'
import { Temperature } from '../js/components/ui/Temperature'

describe('<Temperature/>', () => {
  it('should render temperature prop to the dom along with correct units', () => {
    const { getByText } = render(<Temperature temp={80}/>)

    expect(getByText('80\u00b0F')).toBeTruthy()
  })
})
