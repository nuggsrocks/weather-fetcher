const express = require('express')
const axios = require('axios')
const path = require('path')

const app = express()

app.use(express.static(path.resolve(__dirname, '../client/public')))

app.use((req, res, next) => {
  console.log(req.method + ' - ' + req.path)
  next()
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const LOCATION_API = 'https://nominatim.openstreetmap.org'

async function searchForLocation (queryString) {
  try {
    const res = await axios.get(
      `${LOCATION_API}/search?q=${queryString}&format=json`)

    return res.data[0]
  } catch (e) {
    console.error(e)
    return null
  }
}

async function reverseGeocode (coordinates) {
  try {
    const response = await axios.get(
      `${LOCATION_API}/reverse?lat=${coordinates[0]}&lon=${coordinates[1]}&format=json`)

    return response.data
  } catch (e) {
    console.error(e)
  }
}

const WEATHER_API = 'https://api.weather.gov'

async function fetchWeatherInfo (coordinates) {
  try {
    const response = await axios.get(`${WEATHER_API}/points/${coordinates}`, {
      headers: {
        'User-Agent': '(mfweatherapp, nuggsrocks@yahoo.com)',
        accept: 'application/geo+json'
      }
    })

    const city = response.data.properties.relativeLocation.properties.city

    const forecastUrl = response.data.properties.forecast

    let forecast

    if (forecastUrl) {
      const forecastResponse = await axios.get(forecastUrl)
      forecast = forecastResponse.data.properties.periods
    } else {
      const forecastZoneResponse = await axios.get(
        response.data.properties.forecastZone + '/observations')
      forecast = forecastZoneResponse.data.features[0].properties
    }

    return { city, periods: forecast }
  } catch (e) {
    // statements
    return e
  }
}

app.route('/server/geocode').get((req, res) => {
  searchForLocation(req.query.q).then(results => res.send(results))
})

app.route('/server/reverse-geo').get((req, res) => {
  const coords = req.query.coords.split(',')
  reverseGeocode(coords).then(result => res.send(result))
})

app.route('/server/weather').get((req, res) => {
  fetchWeatherInfo(req.query.coords).then(data => res.send(data))
})

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'))
})

const PORT = process.env.PORT || 3010

const HOST = process.env.HOST || '127.0.0.1'

app.listen(PORT, HOST, () => console.log('********** server is listening *********'))
