export const locate = () => {
  return new Promise((resolve, reject) => {
    global.navigator.geolocation.getCurrentPosition(position => {
      resolve([position.coords.latitude, position.coords.longitude])
    }, positionError => {
      reject(positionError)
    }, {
      timeout: 5000
    })
  })
}
