import axios from 'axios'
import { fetchCoordinates } from '../src/js/functions/fetchCoordinates'

jest.mock('axios')

describe('fetchCoordinates()', () => {
  it('should encode string argument to uri before fetch', async () => {
    axios.get = jest.fn()

    const mockQueryString = 'los angeles, ca'

    await fetchCoordinates(mockQueryString)

    expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(new RegExp(encodeURIComponent(mockQueryString))))
  })

  it('should return array of coordinates on success', async () => {
    expect.assertions(1)

    const fakeData = { data: { lat: 1, lon: -1 } }
    axios.get.mockImplementation(() => Promise.resolve(fakeData))

    expect(await fetchCoordinates('anywhere, usa')).toEqual([1, -1])
  })

  it('should return null and log error if coordinates could not be found', async () => {
    expect.assertions(2)

    axios.get.mockImplementation(() => Promise.resolve({ data: [] }))

    expect(await fetchCoordinates('mars, pluto')).toEqual(null)
    expect(console.error).toHaveBeenCalled()
  })

  it('should return null and log error on network error', async () => {
    expect.assertions(2)

    axios.get.mockImplementation(() => Promise.reject(new Error()))

    expect(await fetchCoordinates('anywhere, usa')).toEqual(null)
    expect(console.error).toHaveBeenCalled()
  })
})
