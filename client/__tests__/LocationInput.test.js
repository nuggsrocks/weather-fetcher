import React from 'react'
import { render } from '@testing-library/react'
import { LocationInput } from '../js/components/ui/LocationInput'
import userEvent from '@testing-library/user-event'

describe('<LocationInput/>', () => {
  it('should render button and input', () => {
    const { getByRole } = render(<LocationInput/>)

    expect(getByRole('textbox')).toBeTruthy()
    expect(getByRole('button')).toBeTruthy()
  })

  it('should call onChange prop on input change', () => {
    const mockOnChange = jest.fn()

    const { getByRole } = render(<LocationInput onChange={mockOnChange}/>)

    userEvent.type(getByRole('textbox'), 'abc')

    expect(mockOnChange).toHaveBeenCalled()
  })

  it('should call onClick prop on click event', () => {
    const mockOnClick = jest.fn()

    const { getByRole } = render(<LocationInput onClick={mockOnClick}/>)

    userEvent.click(getByRole('button'))

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})
