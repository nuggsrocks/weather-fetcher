import 'regenerator-runtime/runtime'
import 'core-js/stable'

export const fetchCoordinates = async (queryString) => {
  const { default: axios } = await import('axios')

  const response = await axios.get('/server/geocode?q=' + queryString)

  if (response.data.lat === undefined || response.data.lon === undefined) {
    throw new Error('Coordinates could not be found!')
  }

  return [response.data.lat, response.data.lon]
}
