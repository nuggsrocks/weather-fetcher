import axios from 'axios'
import { fetchCoordinates } from '../js/fetchCoordinates'

jest.mock('axios')

describe('fetchCoordinates()', () => {
  it('should return promise that resolves to array of coordinates on success', async () => {
    expect.assertions(1)

    const fakeData = { data: { lat: 1, lon: -1 } }
    axios.get.mockImplementation(() => Promise.resolve(fakeData))

    try {
      expect(await fetchCoordinates('anywhere, usa')).toEqual([1, -1])
    } catch (e) {
      console.error(e)
    }
  })

  it('should return promise that rejects if coordinates could not be found', async () => {
    expect.assertions(1)

    axios.get.mockImplementation(() => Promise.resolve({ data: [] }))

    try {
      await fetchCoordinates('mars, pluto')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  it('should return promise that rejects on network error', async () => {
    expect.assertions(1)

    axios.get.mockImplementation(() => Promise.reject(new Error()))

    try {
      await fetchCoordinates('anywhere, usa')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })
})
