import { LocationInput } from '../js/LocationInput'
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ErrorNotification } from '../js/ErrorNotification'
import { fetchWeather } from '../js/fetchWeather'
import axios from 'axios'
import { locate } from '../js/locate'
import { fetchCoordinates } from '../js/fetchCoordinates'
import { fetchAddress } from '../js/fetchAddress'

jest.mock('axios')

describe('app', () => {
  describe('locate()', () => {
    it('should resolve with data on success', () => {
      const successData = {
        coords: {
          latitude: 100,
          longitude: 200
        }
      }

      global.navigator.geolocation = {
        getCurrentPosition: jest.fn((success) => {
          return Promise.resolve(success(successData))
        })
      }

      expect(locate()).resolves.toEqual([100, 200])
    })

    it('should reject with error on failure', () => {
      const errorData = new Error()

      global.navigator.geolocation = {
        getCurrentPosition: jest.fn((success, error, options) => {
          return Promise.reject(error(errorData))
        })
      }

      expect(locate()).rejects.toThrow(errorData)
    })
  })

  describe('fetchWeather()', () => {
    it('should return object with weather properties if fetch is successful and points are within range', async () => {
      axios.get.mockImplementation(() => Promise.resolve({
        data: {
          properties: 'weather'
        }
      }))

      await expect(fetchWeather(['45', '-93'])).resolves.toEqual('weather')
    })

    it('should reject promise with error if fetch is successful but points are out of range', async () => {
      axios.get.mockImplementation(() => Promise.resolve({
        data: {
          name: 'Error'
        }
      }))

      await expect(fetchWeather(['0', '0'])).rejects.toThrow('Coordinates are not in range')
    })

    it('should reject promise with error if fetch is unsuccessful', async () => {
      axios.get.mockImplementation(() => Promise.reject(new Error('Network error occurred')))

      await expect(fetchWeather(['45', '-93'])).rejects.toThrow('Network error occurred')
    })
  })

  describe('fetchCoordinates()', () => {
    it('should return promise that resolves to array of coordinates on success', async () => {
      const fakeData = { data: { lat: 1, lon: -1 } }
      axios.get.mockImplementation(() => Promise.resolve(fakeData))

      await expect(fetchCoordinates('anywhere, usa')).resolves.toStrictEqual([1, -1])
    })

    it('should return promise that rejects if coordinates could not be found', async () => {
      axios.get.mockImplementation(() => Promise.resolve({ data: [] }))

      await expect(fetchCoordinates('anywhere, usa')).rejects.toThrow()
    })

    it('should return promise that rejects on network error', async () => {
      axios.get.mockImplementation(() => Promise.reject(new Error()))

      await expect(fetchCoordinates('anywhere, usa')).rejects.toThrow()
    })
  })

  describe('fetchAddress()', () => {
    it('should return name of locality on success', async () => {
      axios.get.mockImplementation(() => Promise.resolve({
        data: {
          address: {
            city: 'foo',
            county: 'bar',
            state: 'foobar'
          }
        }
      }))

      await expect(fetchAddress([45, -95])).resolves.toEqual('foo')
    })

    it('should reject if passed invalid coordinates', async () => {
      axios.get.mockImplementation(() => Promise.resolve({ data: [] }))

      await expect(fetchAddress(['a', 'b'])).rejects.toThrow()
    })

    it('should reject on network failure', async () => {
      axios.get.mockImplementation(() => Promise.rejects(new Error()))

      await expect(fetchAddress([55, -105])).rejects.toThrow()
    })
  })

  describe('<ErrorNotification/>', () => {
    it('should write error message to the dom', () => {
      render(<ErrorNotification error={new Error('Error message')}/>)

      expect(screen.getByText('Error'))
      expect(screen.getByText('Error message'))
    })
  })

  describe('<LocationInput/>', () => {
    it('should execute oninput method on input', () => {
      const mockHandleInput = jest.fn()

      render(<LocationInput handleInput={mockHandleInput}/>)

      const inputString = 'hello'

      let i = 0

      while (i < inputString.length) {
        userEvent.type(screen.getByRole('textbox'), inputString[i])

        const inputValue = mockHandleInput.mock.calls[i][0].target.value

        expect(inputValue).toEqual(inputString.substring(0, i) + inputString[i])

        i++
      }

      expect(mockHandleInput).toHaveBeenCalledTimes(inputString.length)
    })

    it('should execute onclick method on button click', () => {
      const mockHandleClick = jest.fn()

      render(<LocationInput handleClick={mockHandleClick}/>)

      userEvent.click(screen.getByText('Search'))

      expect(mockHandleClick).toHaveBeenCalledTimes(1)
    })
  })
})
