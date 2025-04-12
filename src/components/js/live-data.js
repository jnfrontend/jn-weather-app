document.addEventListener("DOMContentLoaded",() => { 
    const API_KEY = "open_weather_api_key_here"; // Use api key from https://openweathermap.org/
	const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

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