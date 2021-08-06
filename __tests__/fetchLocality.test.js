import axios from 'axios'
import { fetchLocality } from '../src/js/functions/fetchLocality'

jest.mock('axios')

describe('fetchLocality()', () => {
  it('should return name of locality on success', async () => {
    expect.assertions(1)

    axios.get.mockImplementation(() => Promise.resolve({
      data: {
        address: {
          city: 'foo',
          county: 'bar',
          state: 'foobar'
        }
      }
    }))

    expect(await fetchLocality([45, -95])).toEqual('foo')
  })

  it('should return null and log error if passed invalid coordinates', async () => {
    expect.assertions(2)

    axios.get.mockImplementation(() => Promise.resolve({ data: [] }))

    expect(await fetchLocality(['a', 'b'])).toEqual(null)
    expect(console.error).toHaveBeenCalled()
  })

  it('should return null and log error on network failure', async () => {
    expect.assertions(2)

    axios.get.mockImplementation(() => Promise.reject(new Error()))

    expect(await fetchLocality([55, -105])).toEqual(null)
    expect(console.error).toHaveBeenCalled()
  })
})
