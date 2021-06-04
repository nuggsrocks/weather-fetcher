import { Map } from '../js/functions/map'
import L from 'leaflet'

const mockLeaflet = () => {
  const L = {
    map: () => ({
      setView: jest.fn(),
      addLayer: jest.fn()
    }),
    bindPopup: jest.fn(() => L),
    addTo: jest.fn(),
    marker: jest.fn(() => L),
    tileLayer: jest.fn(() => L)
  }

  return L
}

describe('map()', () => {
  it('should return object with setView property', () => {
    const map = Map(L)

    expect(map).toHaveProperty('setView', expect.any(Function))
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
      expect(L.bindPopup).toHaveBeenCalled()
      expect(L.addTo).toHaveBeenCalledWith(map)
      expect(L.tileLayer).toHaveBeenCalled()
    })
  })
})
