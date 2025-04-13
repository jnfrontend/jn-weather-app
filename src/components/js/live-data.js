import { OPEN_WEATHER_API_KEY } from "astro:env/client";
import { OPEN_WEATHER_API_URL } from "astro:env/client";

document.addEventListener("DOMContentLoaded",() => { 
    const API_KEY = OPEN_WEATHER_API_KEY;
	const API_URL = OPEN_WEATHER_API_URL;

	const weatherSearchBar = document.getElementById('searchWeatherByCityName');
	const weatherSearchButton = document.getElementById('searchWeatherAction');

    // Function to fetch weather data
	async function fetchWeather(cityName) {
		const response = await fetch(API_URL + cityName + ',' + 'ie' + `&appid=${API_KEY}`);
		if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

		const weatherData = await response.json();
		console.log(weatherData);
	}

    // When the user enters the city name and clicks the Search button -> display weather data
	weatherSearchButton.addEventListener("click", () => {
		fetchWeather(weatherSearchBar.value);
	});
});