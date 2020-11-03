const express = require('express');
const app = express();

const axios = require('axios');
const cors = require('cors');

const port = process.env.PORT || 8000;

const host = process.env.HOST || '0.0.0.0';

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	console.log(req.method + ' - ' + req.path);
	next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());


let locationApiUrl = 'https://us1.locationiq.com/v1/reverse.php';
let locationApiKey = process.env.LOCATION_API_KEY;

async function fetchReverseGeocoding(location) {
	try {

		let locationArray = location.split(',');

		let response = await axios.get(`${locationApiUrl}?key=${locationApiKey}&lat=${locationArray[0]}&lon=${locationArray[1]}&format=json`);

		return response;
		
		} catch(e) {
		// statements
		console.log(e);
	}
}

let weatherApiUrl = 'https://api.weather.gov';

async function fetchWeatherInfo (coordinates) {
	try {
		let coords = coordinates.replace(',', '%2C');
		let response = await axios.get(`${weatherApiUrl}/points/${coords}`, {
			headers: {accept: 'application/geo+json'}
		});

		let forecastResponse = await axios.get(response.data.properties.forecast);

	
		return forecastResponse.data;

	} catch(e) {
		// statements
		return e;
	}
}

app.route('/server/geocoding').get((request, response) => {
	fetchReverseGeocoding(request.query.location).then(results => response.send(results.data));
});

app.route('/server/weather').get((req, res) => {
	fetchWeatherInfo(req.query.coords).then(data => res.send(data));
});

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, host, () => console.log('************'));