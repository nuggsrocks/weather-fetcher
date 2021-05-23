import 'regenerator-runtime/runtime'
import 'core-js/stable'

export const fetchWeather = async (coords) => {
  const { default: axios } = await import('axios')

  const response = await axios.get(
    `/server/weather?coords=${coords[0]},${coords[1]}`
  )

  if (response.data.name === 'Error') {
    throw new Error('Coordinates are not in range!')
  }

  return response.data.properties
}
