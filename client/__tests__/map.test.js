import { Map } from '../js/functions/map'
import L from 'leaflet'


const mockLeaflet = () => ({
  map: () => ({
    setView: jest.fn(),
    addLayer: jest.fn()
  }),
    marker: jest.fn(() => ({
    bindPopup: jest.fn(() => ({
      addTo: jest.fn()
    }))
  })),
    tileLayer: () => ({
    addTo: jest.fn()
  })
})

describe('map()', () => {

  it('should return object with setView property', () => {
    const setView = Map(L).setView

    expect(setView).toBeInstanceOf(Function)
  })

  describe('setView()', () => {
    it('should call map setView and leaflet marker methods with passed in coordinates', () => {
      const L = mockLeaflet()

      const setView = Map(L).setView

      const coords = [-93, 45]

      const map = L.map('map')

      setView(map, coords)

      expect(map.setView).toHaveBeenCalledWith(coords, expect.any(Number))
      expect(L.marker).toHaveBeenCalledWith(coords)

    })
  })
})
