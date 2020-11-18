import React from 'react';
import '../scss/index.scss';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: '',
			weather: null,
			location: '',
			locationName: ''
		}
		this.locate = this.locate.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.setMapView = this.setMapView.bind(this);
		this.findAddress = this.findAddress.bind(this);
		this.findWeather = this.findWeather.bind(this);

		this.map = null;
		this.marker = null;
	}


	locate() {
		if (navigator.geolocation) {
			console.log('fetching current position....');
			navigator.geolocation.getCurrentPosition(position => {
				console.log('postion found...');
				this.setState({location: [position.coords.latitude, position.coords.longitude]});
				this.findAddress();
			}, error => console.error(error));
		} else {
			this.setState({weather: undefined});
		}
	}

	findAddress() {
		console.log('reverse geocoding...');
		import('axios').then(({default: axios}) => {
			axios.get(`${process.env.URL}/server/geocoding?location=${this.state.location[0]},${this.state.location[1]}`)
				.then(response => {
					console.log('found address...');
					let address = response.data.address;

					let locationName;

					if (address.city !== undefined) {
						locationName = address.city;
					} else if (address['village'] !== undefined) {
						locationName = address['village'];
					} else if (address['hamlet'] !== undefined) {
						locationName = address['hamlet'];
					} else if (address['municipality'] !== undefined) {
						locationName = address['municipality'];
					} else {
						locationName = address.state;
					}

					this.setState({locationName});

					this.setMapView();

					this.findWeather();
				})
				.catch(e => console.error(e));
		});
	}

	findWeather() {
		console.log('searching for weather information...');
		import('axios').then(({default: axios}) => {
			axios.get(`${process.env.URL}/server/weather?coords=${this.state.location[0]},${this.state.location[1]}`)
				.then(response => {
					console.log('found weather...');
					this.setState({weather: response.data.properties});
				})
				.catch(e => console.error(e));
		});
	}

	setMapView() {

		import('leaflet').then(({default: leaflet}) => {
			this.map.setView(this.state.location, 10);
			leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 19,
				attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
			}).addTo(this.map);

			if (this.marker !== null) {
				this.marker.remove();
			}

			this.marker = leaflet.marker(this.state.location).bindPopup('Your location').addTo(this.map);

		});
		
	}

	handleChange(e) {
		this.setState({
			input: e.target.value
		});
	}

	componentDidMount() {
		import('leaflet').then(({default: leaflet}) => {
			this.map = leaflet.map('map');
			leaflet.control.scale().addTo(this.map);
			
			this.map.on('click', (event) => {
				this.setState({
					location: [event.latlng.lat, event.latlng.lng],
					locationName: '',
					weather: null
				});
				this.findAddress();
			});

			this.locate();

		});


	}

	render() {
		let weather = this.state.weather;

		

		return (
			<main>

				<div>
					<input type={'text'} value={this.state.input} onChange={this.handleChange} />
					<button onClick={this.findWeather}>
						Search
					</button>
				</div>
				{
					this.state.locationName === '' &&
					<article>
						<header>
							<h1>Loading...</h1>
						</header>
					</article>
				}
				{
					this.state.locationName !== '' &&
					<article>
						<header>
							<h1>{this.state.locationName}</h1>
						</header>
						
						<div className='spacer'/>

						{
							weather === null &&
							<section>
								<div className='loading'/>
							</section>
						}

						{
							weather !== null && weather !== undefined &&
							<section>
								<div>
									<h2>{weather['periods'][0]['shortForecast']}</h2>
								</div>
								<div>
									<span>Temperature:&nbsp;</span>
									{weather['periods'][0].temperature}&deg;F
								</div>
								<div>
									<span>Wind:&nbsp;</span>
									{weather['periods'][0]['windSpeed'] + ' ' + weather['periods'][0]['windDirection']}
								</div>
							</section>
							
						}

						{
							weather === undefined && 
							<section>
								<div>
									<span>There was an error processing your request. Try again in a sec?</span>
								</div>
							</section>
						}


					</article>
				}
				
				

				<div id='map'/>
			</main>
		);
	}
}

import('react-dom').then(({default: ReactDOM}) => {
	ReactDOM.render(<App/>, document.querySelector('div#root'));
});
