import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            weather: null
        }
        this.fetchWeather = this.fetchWeather.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    fetchWeather() {
        this.setState({weather: null});
        let input = this.state.input === '' ? 'fetch:ip' : this.state.input;
        fetch(`http://${process.env.HOST}:3000/weather-fetcher/server?location=${input}`)
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
            <div>

                <div>
                    <input type={'text'} value={this.state.input} onChange={this.handleChange} />
                    <button onClick={this.fetchWeather}>
                        Search
                    </button>
                </div>
                {
                    weather === null &&
                    <h1>Loading...</h1>
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
                        
                        <img id={'weather-icon'} src={weather.current['weather_icons'][0]} alt={'weather'}/>


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
                        <h2>You did not enter a valid location!</h2>
                    }
            </div>
        );
    }
}

export default App;
