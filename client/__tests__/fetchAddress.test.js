import axios from 'axios'
import { fetchAddress } from '../js/functions/fetchAddress'

jest.mock('axios')

describe('fetchAddress()', () => {
  it('should resolve to name of locality on success', async () => {
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

    await expect(fetchAddress([45, -95])).resolves.toEqual('foo')
  })

  it('should reject with error if passed invalid coordinates', async () => {
    expect.assertions(1)

    axios.get.mockImplementation(() => Promise.resolve({ data: [] }))

    await expect(fetchAddress(['a', 'b'])).rejects.toThrow()
  })

  it('should reject with error on network failure', async () => {
    expect.assertions(1)

    axios.get.mockImplementation(() => Promise.reject(new Error()))

    await expect(fetchAddress([55, -105])).rejects.toThrow()
  })
})
