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
        this.handleChange = this.handleChange.bind(this);
    }

    fetchWeather() {
        let input = this.state.input === null ? 'fetch:ip' : this.state.input;
        fetch('http://localhost/weather-fetcher/server?location=' + input)
            .then(res => res.json())
            .then(data => this.setState({weather: data}))
            .catch(e => console.log(e));
    }

    handleChange(e) {
        this.setState({
            input: e.target.value
        });
    }

    componentDidMount() {
        this.fetchWeather();
    }

    render() {
        const weather = this.state.weather;
        return (
            <div className={'flexbox'}>
                <div>
                    <input
                        type={'text'} className={'form-control text-center'}
                        value={this.state.input} onChange={this.handleChange}
                    />
                    <button
                        className={'btn btn-primary w-100'} onClick={this.fetchWeather}
                    >Search
                    </button>
                </div>
                {
                    weather === null &&
                    <div id={'load-icon-wrapper'}>
                        <span className={'fas fa-sync-alt fa-spin fa-3x'}/>
                    </div>
                }
                {
                    weather !== null &&
                    <div className={'card text-center'}>
                        <div className={'card-header'}>
                            <h1>{weather.location.name}</h1>
                        </div>
                        <div className={'card-body'}>
                            <div className={'display-item pb-3'}>
                                <span className={'font-weight-bold'}>
                                    Currently:
                                </span> {weather.current['weather_descriptions'][0]}
                            </div>
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