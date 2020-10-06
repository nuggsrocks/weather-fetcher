import React from 'react';
import leaflet from 'leaflet';
import overcastImg from '../img/overcast.jpeg';
import sunnyImg from '../img/sunny.jpg';



class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: '',
			weather: null,
			weatherImage: '',
			location: '',
			locationName: ''
		}
		this.geolocate = this.geolocate.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.setMapView = this.setMapView.bind(this);

		this.map = null;
		this.marker = null;
	}

	geolocate() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				this.setState({location: [position.coords.latitude, position.coords.longitude]});
				this.findAddress();
				this.setMapView();
			}, error => console.error(error));
		} else {
			this.setState({weather: undefined});
		}
	}

	findAddress() {
		
	}

	setMapView() {
		
		this.map.setView(this.state.location, 10);
		leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
		}).addTo(this.map);

		if (this.marker !== null) {
			this.marker.remove();
		}

		this.marker = leaflet.marker(this.state.location).bindPopup('Your location').addTo(this.map);

		this.map.on('click', event => {
			let coords = event.latlng;
			let lat = Math.round(coords.lat * 1000) / 1000;
			let lng = Math.round(coords.lng * 1000) / 1000;
			this.setState({location: [lat, lng]});
			this.findAddress();
			this.setMapView();
		});
		
	}

	handleChange(e) {
		this.setState({
			input: e.target.value
		});
	}

	componentDidMount() {
		this.map = leaflet.map('map');
		leaflet.control.scale().addTo(this.map);
		this.geolocate();
	}

	render() {
		const weather = this.state.weather;



		return (
			<main style={{backgroundImage: `url(${this.state.weatherImage})`}}>

				<div>
					<input type={'text'} value={this.state.input} onChange={this.handleChange} />
					<button onClick={this.fetchWeather}>
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


					</article>
				}
				{
					weather !== null && weather.location === undefined &&
					<article>
						<header>
							<h2>There was an unknown error!</h2>
						</header>
					</article>
				}

				<div id='map'></div>
			</main>
		);
	}
}

export default App;
