const express = require('express');
const app = express();

const axios = require('axios');
const cors = require('cors');

const port = process.env.PORT || 8080;

const host = process.env.HOST || '0.0.0.0';

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	console.log(req.method + ' - ' + req.path);
	next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const LOCATION_API = 'https://nominatim.openstreetmap.org';

async function searchForLocation(queryString) {
	try {
	    let res = await axios.get(`${LOCATION_API}/search?q=${queryString}&format=json`);

	    return res.data[0];
	} catch(e) {
	    console.error(e);
	}
}

async function reverseGeocode(coordinates) {
	try {
	    let response = await axios.get(`${LOCATION_API}/reverse?lat=${coordinates[0]}&lon=${coordinates[1]}&format=json`);

	    return response.data;
	} catch(e) {
	    console.error(e);
	}
}

let weatherApiUrl = 'https://api.weather.gov';

async function fetchWeatherInfo (coordinates) {
	try {
		let coords = coordinates.replace(',', '%2C');
		let response = await axios.get(`${weatherApiUrl}/points/${coords}`, {
			headers: {
				'User-Agent': '(mfweatherapp, nuggsrocks@yahoo.com)',
				accept: 'application/geo+json'
			}
		});

		let forecastUrl = response.data.properties.forecast;

		let forecastResponse = await axios.get(forecastUrl);

	
		return forecastResponse.data;

	} catch(e) {
		// statements
		return e;
	}
}

app.route('/server/geocode').get((req, res) => {
	searchForLocation(req.query.q).then(results => res.send(results));
});

app.route('/server/reverse-geo').get((req, res) => {
	let coords = req.query.coords.split(',');
	reverseGeocode(coords).then(result => res.send(result));
})

app.route('/server/weather').get((req, res) => {
	fetchWeatherInfo(req.query.coords).then(data => res.send(data));
});

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, host, () => console.log('************'));