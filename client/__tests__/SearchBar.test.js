import React from 'react'
import { render } from '@testing-library/react'
import { SearchBar } from '../js/components/ui/SearchBar'
import userEvent from '@testing-library/user-event'

describe('<LocationInput/>', () => {
  it('should render button and text input', () => {
    render(<SearchBar/>)

    expect(document.querySelector('button')).toBeTruthy()
    expect(document.querySelector('input[type="text"]')).toBeTruthy()
  })

  it('should call onChange prop on input change', () => {
    const mockHandleChange = jest.fn()

    render(<SearchBar handleChange={mockHandleChange}/>)

    userEvent.type(document.querySelector('input'), 'abc')

    expect(mockHandleChange).toHaveBeenCalled()
  })

  it('should call onClick prop on click event', () => {
    const mockHandleClick = jest.fn()

    render(<SearchBar handleClick={mockHandleClick}/>)

    userEvent.click(document.querySelector('button'))

    expect(mockHandleClick).toHaveBeenCalledTimes(1)
  })
})
