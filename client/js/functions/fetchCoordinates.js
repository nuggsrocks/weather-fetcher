import 'regenerator-runtime/runtime'
import 'core-js/stable'

export const fetchCoordinates = async (queryString) => {
  try {
    const { default: axios } = await import('axios')

    const response = await axios.get('/server/geocode?q=' + encodeURIComponent(queryString))

    if (response.data.lat === undefined || response.data.lon === undefined) {
      console.error(new Error('Coordinates could not be found!'))
      return null
    }

    return [response.data.lat, response.data.lon]
  } catch(err) {
    console.error(err);
    return null
  }
}
