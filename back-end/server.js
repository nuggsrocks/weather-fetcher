const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

const port = process.env.PORT || 3000;

const host = process.env.HOST || 'localhost';

const apiUrl = 'http://api.weatherstack.com/current';
const apiKey = '34186a5024e82427bd4224df690c561b';

function fetchWeather(location, res) {
    const params = {
        access_key: apiKey,
        query: location,
        units: 'f'
    }
    axios.get(apiUrl, {params})
        .then(response => res.send(response.data))
        .catch(e => console.log(e));
}

app.use((req, res, next) => {
    console.log(req.method + ' - ' + req.path);
    next();
});
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.route('/weather-fetcher/server').get((req, res) => {
    fetchWeather(req.query.location, res);
});

app.listen(port, host, () => console.log('http://' + host + ':' + port));