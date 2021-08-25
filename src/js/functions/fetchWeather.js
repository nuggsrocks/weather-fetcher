export const fetchWeather = async (query) => {
  try {
    const { default: axios } = await import('axios')

    const response = await axios.get(
      `/server/weather?q=${query}`
    )

    return response.data
  } catch (e) {
    console.error(e)
    return null
  }
}
