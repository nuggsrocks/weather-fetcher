import React from 'react';
import axios from 'axios';
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
		this.findAddress = this.findAddress.bind(this);

		this.map = null;
		this.marker = null;
	}

	geolocate() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				this.setState({location: [position.coords.latitude, position.coords.longitude]});
				this.findAddress();
			}, error => console.error(error));
		} else {
			this.setState({weather: undefined});
		}
	}

	findAddress() {
		axios.get('http://localhost:3000/weather-fetcher/server?location=' + this.state.location[0] + ',' + this.state.location[1])
			.then(response => {
				this.setState({locationName: response.data.address.city});
				this.setMapView();
			});
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
		
	}

	handleChange(e) {
		this.setState({
			input: e.target.value
		});
	}

	componentDidMount() {
		this.map = leaflet.map('map');
		leaflet.control.scale().addTo(this.map);
		
		//this.map.onclick = (event) => console.log(event.latlng);

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
