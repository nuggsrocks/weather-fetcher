import React from 'react'
import { render } from '@testing-library/react'
import { ErrorDisplay } from '../js/ErrorDisplay'

describe('<ErrorDisplay/>', () => {
  it('should write error message to the dom', () => {
    const { getByText } = render(<ErrorDisplay error={new Error('Something went wrong')}/>)

    expect(getByText(/Error/)).toBeDefined()
    expect(getByText(/Something went wrong/)).toBeDefined()
  })
})
