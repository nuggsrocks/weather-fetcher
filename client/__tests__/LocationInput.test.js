import React from 'react'
import { render } from '@testing-library/react'
import { LocationInput } from '../js/LocationInput'
import userEvent from '@testing-library/user-event'

describe('<LocationInput/>', () => {
  it('should pass value of input element to click event listener', () => {
    const mockHandleClick = jest.fn()

    const { getByRole } = render(<LocationInput handleClick={mockHandleClick}/>)

    userEvent.type(getByRole('textbox'), 'hello')

    userEvent.click(getByRole('button'))

    expect(mockHandleClick).toHaveBeenCalledWith('hello')
  })
})
