import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from '../src/js/components/ui/SearchBar'

describe('<SearchBar/>', () => {
  it('should render an input field', () => {
    const { getByRole } = render(<SearchBar/>)

    expect(getByRole('textbox')).toBeInstanceOf(HTMLInputElement)
  })

  it('should pass value of input element to handleClick prop on input change', () => {
    const mockHandleChange = jest.fn().mockName('props.handleChange')

    const { getByRole } = render(<SearchBar handleChange={mockHandleChange}/>)

    userEvent.type(getByRole('textbox'), 'a')

    expect(mockHandleChange).toHaveBeenCalledWith('a')
  })
})
