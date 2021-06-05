import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchButton } from '../../js/components/ui/SearchButton'

describe('<SearchButton/>', () => {
  it('should render button element', () => {
    const { getByRole } = render(<SearchButton/>)

    expect(getByRole('button')).toBeInstanceOf(HTMLButtonElement)
  })

  it('should call handleClick prop on button click event', () => {
    const mockHandleClick = jest.fn()

    const { getByRole } = render(<SearchButton handleClick={mockHandleClick}/>)

    userEvent.click(getByRole('button'))

    expect(mockHandleClick).toHaveBeenCalled()
  })
})
