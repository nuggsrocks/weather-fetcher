const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

const port = 3000;

const apiUrl = 'http://api.weatherstack.com/current';
const apiKey = '34186a5024e82427bd4224df690c561b';

function fetchWeather(location, res) {
    const params = {
        access_key: apiKey,
        query: location
    }
    axios.get(apiUrl, {params})
        .then(response => res.send(response.data))
        .catch(e => console.log(e));
}

app.use(cors());

app.route('/weather').get((req, res) => {
    fetchWeather(req.query.location, res);
});

app.listen(port, () => console.log('http://localhost:' + port));