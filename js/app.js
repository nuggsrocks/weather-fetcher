import React from 'react';

import overcastImg from '../img/overcast.jpeg';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            weather: null,
            weatherImage: ''
        }
        this.fetchWeather = this.fetchWeather.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.weatherImage = '';
    }

    fetchWeather() {
        this.setState({
            weather: null,
            weatherImage: ''
        });
        let input = this.state.input === '' ? 'fetch:ip' : this.state.input;
        fetch(`http://${process.env.HOST}:3000/weather-fetcher/server?location=${input}`)
            .then(res => res.json())
            .then(data => {
                let imgSrc = '';
                if (data.current.weather_descriptions[0].search(/Overcast/) !== -1) {
                    imgSrc = overcastImg;
                }
                this.setState({
                    weather: data,
                    weatherImage: imgSrc
                });
            })
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
            <div>

                <div>
                    <input type={'text'} value={this.state.input} onChange={this.handleChange} />
                    <button onClick={this.fetchWeather}>
                        Search
                    </button>
                </div>
                {
                    weather === null &&
                    <article>
                        <header>
                            <h1>Loading...</h1>
                        </header>
                    </article>
                }
                {
                    weather !== null && weather.location !== undefined &&
                    <article>
                        <header>
                            <h1>{weather.location.name}</h1>
                        </header>
                        
                        <div className='spacer'/>


                        <div>
                            <span>
                                Currently:
                            </span>
                            &nbsp;
                            <span>
                                {weather.current['weather_descriptions'][0]}
                            </span>
                        </div>
                        
                        <div id='weather-image' style={{backgroundImage: `url(${this.state.weatherImage})`}}/>


                        <div>
                            <span>Temp:</span>
                            &nbsp;
                            <span>{weather.current['temperature']}&deg;F</span>
                        </div>
                        <div>
                            <span className={'font-weight-bold'}>Feels Like:</span>
                            &nbsp;
                            <span>{weather.current['feelslike']}&deg;F</span>
                        </div>
                        <div>
                            <span className={'font-weight-bold'}>Humidity:</span>
                            &nbsp;
                            <span>{weather.current['humidity']}%</span>
                        </div>
                        <div>
                            <span className={'font-weight-bold'}>Pressure:</span>
                            &nbsp;
                            <span>{weather.current['pressure']} mbar</span>
                        </div>
                        <div>
                            <span className={'font-weight-bold'}>Wind:</span>
                            &nbsp;
                            <span>{weather.current['wind_speed']} MPH {weather.current['wind_dir']}</span>
                        </div>

                    </article>
                }
                {
                    weather !== null && weather.location === undefined &&
                    <article>
                        <header>
                            <h2>You did not enter a valid location!</h2>
                        </header>
                    </article>
                }
            </div>
        );
    }
}

export default App;
