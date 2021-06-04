import 'regenerator-runtime/runtime'
import 'core-js/stable'

export const fetchWeather = async (coords) => {
  try {
    const { default: axios } = await import('axios')

    const response = await axios.get(
      `/server/weather?coords=${coords[0]},${coords[1]}`
    )

    if (response.data.name === 'Error') {
      console.error(new Error('Coordinates are not in range!'))
      return null
    }

    return response.data
  } catch(e) {
    console.error(e)
    return null
  }
}
