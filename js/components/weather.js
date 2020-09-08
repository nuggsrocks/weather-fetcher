import React from 'react';

const Weather = (props) => {
	let icon,
		weather = props.weather;
	{/* only sets icon if weather is loaded */}
	if (weather !== undefined) {
		icon = weather.current['weather_icons'][0];
	}


	return (
		<div className={'card text-center'}>
			<div className={'card-header'}>
				<h1>{weather.location.name}</h1>
			</div>
			<div className={'card-body'}>
			<div className={'display-item pb-3'}>
				<span className={'font-weight-bold'}>Currently:</span>
				&nbsp;{weather.current.weather_descriptions[0]}
			</div>

			<img id={'weather-icon'} src={icon} alt={'weather'}/>

			<hr/>

			<div className={'display-item'}>
				<span className={'font-weight-bold'}>Temp:</span>
				&nbsp;{weather.current.temperature}&deg;F
			</div>
			<div className={'display-item'}>
				<span className={'font-weight-bold'}>Feels Like:</span>
				&nbsp;{weather.current.feelslike}&deg;F
			</div>
			<div className={'display-item'}>
				<span className={'font-weight-bold'}>Humidity:</span>
				&nbsp;{weather.current.humidity}%
			</div>
			<div className={'display-item'}>
				<span className={'font-weight-bold'}>Pressure:</span>
				&nbsp;{weather.current.pressure} mbar
			</div>
			<div className={'display-item'}>
				<span className={'font-weight-bold'}>Wind:</span>
				&nbsp;{weather.current.wind_speed} MPH {weather.current.wind_dir}
			</div>
			</div>
		</div>
	);
};


export default Weather;

