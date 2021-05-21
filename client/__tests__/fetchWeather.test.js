import axios from 'axios'
import { fetchWeather } from '../js/fetchWeather'

jest.mock('axios')

describe('fetchWeather()', () => {
  it('should return promise that resolves to object with weather properties if fetch is successful and points are within range', async () => {
    expect.assertions(1)

    axios.get.mockImplementation(() => Promise.resolve({
      data: {
        properties: 'weather'
      }
    }))

    try {
      expect(await fetchWeather(['45', '-93'])).toEqual('weather')
    } catch (e) {
      console.error(e)
    }
  })

  it('should reject promise with error if fetch is successful but points are out of range', async () => {
    expect.assertions(1)

    axios.get.mockImplementation(() => Promise.resolve({
      data: {
        name: 'Error'
      }
    }))

    try {
      await fetchWeather(['0', '0'])
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  it('should reject promise with error if fetch is unsuccessful', async () => {
    expect.assertions(1)

    axios.get.mockImplementation(() => Promise.reject(new Error('Network error occurred')))

    try {
      await fetchWeather(['45', '-93'])
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })
})
