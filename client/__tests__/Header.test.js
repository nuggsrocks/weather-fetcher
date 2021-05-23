import React from 'react'
import { render } from '@testing-library/react'
import { Header } from '../js/components/ui/Header'

describe('<Header/>', () => {
  it('should render empty header if content prop is omitted', () => {
    const { getByRole } = render(<Header/>)

    expect(getByRole('heading').textContent).toEqual('')
  })

  it('should render content prop to dom', () => {
    const { getByText } = render(<Header content={'hello world'}/>)

    expect(getByText('hello world')).toBeTruthy()
  })
})
