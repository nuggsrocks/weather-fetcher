import axios from 'axios'
import { fetchCoordinates } from '../js/functions/fetchCoordinates'

jest.mock('axios')

describe('fetchCoordinates()', () => {
  it('should encode string argument to uri before fetch', async () => {
    axios.get = jest.fn()

    const mockQueryString = 'los angeles, ca'

    try {
      await fetchCoordinates(mockQueryString)
    } catch (e) {
      console.error(e)
    }

    expect(axios.get.mock.calls[0][0]).toMatch(new RegExp(encodeURIComponent(mockQueryString)))
  })

  it('should return promise that resolves to array of coordinates on success', async () => {
    expect.assertions(1)

    const fakeData = { data: { lat: 1, lon: -1 } }
    axios.get.mockImplementation(() => Promise.resolve(fakeData))

    await expect(fetchCoordinates('anywhere, usa')).resolves.toEqual([1, -1])
  })

  it('should return promise that rejects with error if coordinates could not be found', async () => {
    expect.assertions(1)

    axios.get.mockImplementation(() => Promise.resolve({ data: [] }))

    await expect(fetchCoordinates('mars, pluto')).rejects.toThrow()
  })

  it('should return promise that rejects with error on network error', async () => {
    expect.assertions(1)

    axios.get.mockImplementation(() => Promise.reject(new Error()))

    await expect(fetchCoordinates('anywhere, usa')).rejects.toThrow()
  })
})
