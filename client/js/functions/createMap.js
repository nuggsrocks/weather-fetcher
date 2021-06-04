export const createMap = (L) => ({
  setView: (map, coordinates) => {
    map.setView(coordinates, 10)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map)

    L.marker(coordinates)
    .bindPopup('Your location')
    .addTo(map)
  }
})
