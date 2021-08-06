import React from 'react'
import { TextInput } from '../src/js/components/ui/TextInput'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<TextInput/>', () => {
  it('should render a text input', () => {
    render(<TextInput/>)

    expect(screen.getByRole('textbox'))
  })

  it('should call handleChange prop on change', () => {
    const mockHandleChange = jest.fn()

    render(<TextInput handleChange={mockHandleChange}/>)

    userEvent.type(screen.getByRole('textbox'), 'a')

    expect(mockHandleChange).toHaveBeenCalledWith('a')
  })
})
