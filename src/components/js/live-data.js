import { OPEN_WEATHER_API_KEY } from "astro:env/client";
import { OPEN_WEATHER_API_URL } from "astro:env/client";

document.addEventListener("DOMContentLoaded",() => { 
    const API_KEY = OPEN_WEATHER_API_KEY;
	const API_URL = OPEN_WEATHER_API_URL;

    const lsSavedLocationData = JSON.parse(localStorage.getItem("selectedLocation"));
	const weatherSearchBar = document.getElementById('searchWeatherByCityName');
	const weatherSearchButton = document.getElementById('searchWeatherAction');
    const weatherCardIcon = document.getElementById('weather_card_icon');

    setWeatherCardToActive(lsSavedLocationData); // Check if weather card can be set to active
    populateWeatherCardOnReLoad(lsSavedLocationData);

    // Function to fetch weather data
	async function fetchWeather(cityName) {
        const savedLocationData = JSON.parse(localStorage.getItem("selectedLocation"));
        let countryCode = "";
  
        /* 
        ** Cookie "savedLocationData" has been set in locations.js
        */
        if (savedLocationData) {
            // Get location/country-code from localStorage
            countryCode = savedLocationData.countryCode;

            // If user used search then add active flag to localStorage
            // [active] flag is used to adjust weather card style
            if (!savedLocationData.searchState) {
                saveToWeatherLocalStorage(savedLocationData, "searchState", "active", "selectedLocation");
            }
        } else {
            countryCode = "ie";
        }

        console.log('cityName is: ' + cityName);
        console.log('countryCode is: ' + countryCode);

		const response = await fetch(API_URL + cityName + ',' + countryCode + `&appid=${API_KEY}`);
		if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

		const weatherData = await response.json();
		console.log(weatherData);

        setWeatherCardToActive(savedLocationData);

        const weatherDataCityName = weatherData.name;
        const weatherDataTemp = Math.round(weatherData.main.temp);
        const weatherDataIcon = weatherData.weather[0].main.toLowerCase();

        // Populate weather card
        document.querySelector(".weather_card_city").innerHTML = weatherDataCityName;
        document.querySelector(".weather_card_temp .temp").innerHTML = weatherDataTemp;

        // Save searched weather data into local storage
        saveToWeatherLocalStorage(savedLocationData, 'weatherCityName', weatherDataCityName, "selectedLocation");
        saveToWeatherLocalStorage(savedLocationData, 'weatherTemp', weatherDataTemp, "selectedLocation");
        saveToWeatherLocalStorage(savedLocationData, 'weatherIcon', weatherDataIcon, "selectedLocation");
        console.log(savedLocationData);

        // Display weather icon
        displayWeatherConditionIcon(weatherDataIcon);
        
	}

    /*
    ** Fetch weather api
    */
    // When the user enters the city name and clicks the Search button -> display weather data
	weatherSearchButton.addEventListener("click", () => {
		fetchWeather(weatherSearchBar.value);
	});

    // When page is reloaded fill out weather card with data from localStorage
    function populateWeatherCardOnReLoad(localStorageData) {
        if (localStorageData.searchState) { 
            document.querySelector(".weather_card_city").innerHTML = localStorageData.weatherCityName;
            document.querySelector(".weather_card_temp .temp").innerHTML = localStorageData.weatherTemp;
            displayWeatherConditionIcon(localStorageData.weatherIcon);
        } else {
            document.querySelector('.weather_card_city').textContent = 'City in ' + localStorageData.locationName;
        }
    }

    // If user searched for city then set weather card to active
    function setWeatherCardToActive(localStorageData) {
        if (localStorageData.searchState) { 
            document.body.setAttribute('data-weather-card-state', 'active'); // Set data attribute value to active
        }
    }

    // Display the weather icon, depends on condition name returned from weather api
    function displayWeatherConditionIcon(weatherIconName){
        const weatherConditions = ["clear", "clouds", "mist", "fog", "snow", "drizzle", "thunderstorm"];
        if (weatherConditions.includes(weatherIconName)) {
            console.log("Weather condition is:", weatherIconName);
            weatherCardIcon.src = "images/weather-icons/" + weatherIconName + ".png";
          } else {
            weatherCardIcon.src = "images/weather-icons/cloud.png"; // Default weather icon
          }
    }

    // Save new property to weather data in localStorage
    function saveToWeatherLocalStorage(localStorageData, propertyName, propertyValue, lsObject) {
        localStorageData[propertyName] = propertyValue;
        localStorage.setItem(lsObject, JSON.stringify(localStorageData));
    }
});