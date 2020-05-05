import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

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
        return (
            <div>
                <h1>Hello World</h1>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));