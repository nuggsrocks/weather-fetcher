import axios from 'axios'
import { fetchWeather } from '../js/functions/fetchWeather'

jest.mock('axios')

describe('fetchWeather()', () => {
  it('should return data property if fetch is successful and points are within range', async () => {
    expect.assertions(1)

    const fakeResponse = {
      data: {
        properties: {}
      }
    }

    axios.get.mockImplementation(() => Promise.resolve(fakeResponse))

    expect(await fetchWeather(['45', '-93'])).toStrictEqual(fakeResponse.data)
  })

  it('should return null and log error if fetch is successful but points are out of range', async () => {
    expect.assertions(2)

    axios.get.mockImplementation(() => Promise.resolve({
      data: {
        name: 'Error'
      }
    }))

    expect(await fetchWeather(['0', '0'])).toEqual(null)
    expect(console.error).toHaveBeenCalled()
  })

  it('should return null and log error if fetch is unsuccessful', async () => {
    expect.assertions(2)

    axios.get.mockImplementation(() => Promise.reject(new Error('Network error occurred')))

    expect(await fetchWeather(['45', '-93'])).toEqual(null)
    expect(console.error).toHaveBeenCalled()
  })
})
