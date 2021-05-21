import axios from 'axios'
import { fetchAddress } from '../js/fetchAddress'

jest.mock('axios')

describe('fetchAddress()', () => {
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

    try {
      expect(await fetchAddress([45, -95])).toEqual('foo')
    } catch (e) {
      console.error(e)
    }
  })

  it('should reject if passed invalid coordinates', async () => {
    expect.assertions(1)

    axios.get.mockImplementation(() => Promise.resolve({ data: [] }))

    try {
      await fetchAddress(['a', 'b'])
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  it('should reject on network failure', async () => {
    expect.assertions(1)

    axios.get.mockImplementation(() => Promise.reject(new Error()))

    try {
      await fetchAddress([55, -105])
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })
})
