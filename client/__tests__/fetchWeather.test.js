import axios from 'axios'
import { fetchWeather } from '../js/functions/fetchWeather'

jest.mock('axios')

describe('fetchWeather()', () => {
  it('should return promise that resolves to object if fetch is successful and points are within range', async () => {
    expect.assertions(1)

    axios.get.mockImplementation(() => Promise.resolve({
      data: {
        properties: {}
      }
    }))

    await expect(fetchWeather(['45', '-93'])).resolves.toBeInstanceOf(Object)
  })

  it('should reject with error if fetch is successful but points are out of range', async () => {
    expect.assertions(1)

    axios.get.mockImplementation(() => Promise.resolve({
      data: {
        name: 'Error'
      }
    }))

    await expect(fetchWeather(['0', '0'])).rejects.toThrow()
  })

  it('should reject with error if fetch is unsuccessful', async () => {
    expect.assertions(1)

    axios.get.mockImplementation(() => Promise.reject(new Error('Network error occurred')))

    await expect(fetchWeather(['45', '-93'])).rejects.toThrow()
  })
})
