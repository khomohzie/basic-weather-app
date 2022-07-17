import React, { useState } from "react";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import "./App.css";
import Forecast from "./components/forecast/Forecast";
import Search from "./components/search/Search";
import CurrentWeather from "./components/weather/CurrentWeather";
import { SearchData } from "./interface";

function App() {
	const [currentWeather, setCurrentWeather] = useState(null);
	const [forecast, setForecast] = useState(null);

	const handleOnSearchChange = (searchData: SearchData) => {
		const [lat, lon] = searchData.value.split(" ");

		const currentWeatherFetch = fetch(
			`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
		);

		const forecastFetch = fetch(
			`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
		);

		Promise.all([currentWeatherFetch, forecastFetch]).then(
			async (response) => {
				const weatherResponse = await response[0].json();
				const forecastResponse = await response[1].json();

				setCurrentWeather({
					city: searchData.label,
					...weatherResponse,
				});
				setForecast({ city: searchData.label, ...forecastResponse });
			}
		);
	};

	return (
		<div className="App">
			<Search onSearchChange={handleOnSearchChange} />
			{currentWeather && <CurrentWeather data={currentWeather} />}
			{forecast && <Forecast data={forecast} />}

			{!(currentWeather && forecast) && (
				<div
					style={{
						display: "grid",
						placeItems: "center",
						height: "80vh",
						margin: "0 16px",
					}}
				>
					<p style={{ fontSize: "24px", textAlign: "center" }}>
						Start typing to see weather details...
					</p>
				</div>
			)}
		</div>
	);
}

export default App;
