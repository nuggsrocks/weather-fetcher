import 'regenerator-runtime/runtime'
import 'core-js/stable'

export const fetchLocality = async (coords) => {
  try {
    const { default: axios } = await import('axios')

    const response = await axios.get(`/server/reverse-geo?coords=${coords[0]},${coords[1]}`)

    const locationNames = []

    const keyRegex = /aeroway|hamlet|suburb|town|municipality|city|county/

    const locationObject = response.data.address

    Object.keys(locationObject).forEach(key => {
      if (keyRegex.test(key)) {
        locationNames.push(locationObject[key])
      }
    })

    return locationNames[0]
  } catch(err) {
    console.error(err);
    return null
  }
}
