import 'regenerator-runtime/runtime'
import 'core-js/stable'

export const locate = async (navigator) => {
  try {
    return await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        console.log('postion found...')
        resolve([position.coords.latitude, position.coords.longitude])
      }, error => {
        console.error(error)
        reject(error)
      },
      {
        timeout: 5000
      })
    })
  } catch (e) {
    console.error(e)
    return null
  }
}
