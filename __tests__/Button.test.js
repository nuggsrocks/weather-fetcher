import React from 'react'
import { Button } from '../src/js/components/ui/Button'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

describe('<Button/>', () => {
  it('should render button with given content to dom', () => {
    render(<Button content={'Search'}/>)

    expect(screen.getByRole('button')).toHaveTextContent('Search')
  })

  it('should call handleClick prop on button click', () => {
    const mockHandleClick = jest.fn()

    render(<Button handleClick={mockHandleClick}/>)

    userEvent.click(screen.getByRole('button'))

    expect(mockHandleClick).toHaveBeenCalled()
  })
})
