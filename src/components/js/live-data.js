import { OPEN_WEATHER_API_KEY } from "astro:env/client";
import { OPEN_WEATHER_API_URL } from "astro:env/client";

document.addEventListener("DOMContentLoaded",() => { 
    const API_KEY = OPEN_WEATHER_API_KEY;
	const API_URL = OPEN_WEATHER_API_URL;

	const weatherSearchBar = document.getElementById('searchWeatherByCityName');
	const weatherSearchButton = document.getElementById('searchWeatherAction');
    const weatherCardIcon = document.getElementById('weather_card_icon');

    // Function to fetch weather data
	async function fetchWeather(cityName) {
		const response = await fetch(API_URL + cityName + ',' + 'ie' + `&appid=${API_KEY}`);
		if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

		const weatherData = await response.json();
		console.log(weatherData);

        document.querySelector(".weather_card_city").innerHTML = weatherData.name;
        document.querySelector(".weather_card_temp").innerHTML = Math.round(weatherData.main.temp) + "<span>&deg;C</span>" ;

        // Display weather icon
        if(weatherData.weather[0].description == "clear sky") {
            weatherCardIcon.src = "images/weather-icons/clear.png";
        } else if(weatherData.weather[0].main == "Clouds") {
            weatherCardIcon.src = "images/weather-icons/clouds.png";
        } else if(weatherData.weather[0].description == "shower rain") {
            weatherCardIcon.src = "images/weather-icons/shower_rain.png";
        } else if(weatherData.weather[0].description == "rain") {
            weatherCardIcon.src = "images/weather-icons/drizzle.png";
        } else if(weatherData.weather[0].description == "thunderstorm") {
            weatherCardIcon.src = "images/weather-icons/thunderstorm.png";
        } else if(weatherData.weather[0].description == "mist") {
            weatherCardIcon.src = "images/weather-icons/mist.png";
        } else if(weatherData.weather[0].description == "snow") {
            weatherCardIcon.src = "images/weather-icons/snow.png";
        }
	}

    // When the user enters the city name and clicks the Search button -> display weather data
	weatherSearchButton.addEventListener("click", () => {
		fetchWeather(weatherSearchBar.value);
	});
});