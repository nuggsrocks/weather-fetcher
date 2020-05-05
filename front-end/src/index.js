import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import '@fortawesome/fontawesome-free/js/all';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: null,
            weather: null
        }
        this.fetchWeather = this.fetchWeather.bind(this);
    }

    fetchWeather() {
        let input = this.state.input === null ? 'fetch:ip' : this.state.input;
        fetch('http://localhost:3000/weather?location=' + input)
            .then(res => res.json())
            .then(data => this.setState({weather: data}));
    }

    componentDidMount() {
        this.fetchWeather();
    }

    render() {
        const weather = this.state.weather;
        return (
            <div className={'flexbox'}>
                {
                    weather === null &&
                    <div>
                        <span className={'fas fa-sync-alt fa-spin fa-3x'}/>
                    </div>
                }
                {
                    weather !== null &&
                    <div className={'card text-center w-auto'}>
                        <div className={'card-header'}>
                            <h1>{weather.location.name}</h1>
                        </div>
                        <div className={'card-body'}>
                            <img id={'weather-icon'} src={weather.current['weather_icons'][0]} alt={'weather'}/>
                            <hr/>
                            <div className={'display-item'}>
                                <span className={'font-weight-bold'}>Temp:</span> {weather.current['temperature']}&deg;F
                            </div>
                            <div className={'display-item'}>
                                <span className={'font-weight-bold'}>Feels Like:</span> {weather.current['feelslike']}&deg;F
                            </div>
                            <div className={'display-item'}>
                                <span className={'font-weight-bold'}>Humidity:</span> {weather.current['humidity']}%
                            </div>
                            <div className={'display-item'}>
                                <span className={'font-weight-bold'}>Pressure:</span> {weather.current['pressure']} mbar
                            </div>
                            <div className={'display-item'}>
                                <span className={'font-weight-bold'}>
                                    Wind:
                                </span> {weather.current['wind_speed']} MPH {weather.current['wind_dir']}
                            </div>
                        </div>
                    </div>

                }
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));