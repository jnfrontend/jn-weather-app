import { OPEN_WEATHER_API_KEY } from "astro:env/client";
import { OPEN_WEATHER_API_URL } from "astro:env/client";

document.addEventListener("DOMContentLoaded",() => { 
    const API_KEY = OPEN_WEATHER_API_KEY;
	const API_URL = OPEN_WEATHER_API_URL;

    let currentDate = new Date();
    let weatherCarddate = document.querySelector('#weather_card .weather_card_date');
    let weatherSearchErrorLabel = document.querySelector(".error_label");
    const lsSavedLocationData = JSON.parse(localStorage.getItem("selectedLocation"));
	const weatherSearchBar = document.getElementById('searchWeatherByCityName');
	const weatherSearchButton = document.getElementById('searchWeatherAction');
    const weatherCardIcon = document.getElementById('weather_card_icon');
    
    weatherCarddate.innerHTML = displayCurrentDate(currentDate); // Display current date in weather card
    setActiveFlagForWeatherCard(lsSavedLocationData); // Check if weather card can be set to active
    checkWeatherCard(lsSavedLocationData, 'City in ' + lsSavedLocationData.locationName); // Populate or clearweather card

    
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
        if (response.status == 404) {
            weatherSearchErrorLabel.classList.add('show_err_msg');
            saveToWeatherLocalStorage(savedLocationData, "searchState", "", "selectedLocation");
            console.log(savedLocationData);
            checkWeatherCard(savedLocationData, "Invalid city name");
        } else {
            const weatherData = await response.json();
            console.log(weatherData);

            if(document.querySelector(".error_label.show_err_msg")) {
                document.querySelector(".error_label").classList.remove('show_err_msg');
            }

            setActiveFlagForWeatherCard(savedLocationData);

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
	} // End fetch api

    // When the user enters the city name and clicks the Search button -> fetch and display weather data
	weatherSearchButton.addEventListener("click", () => {
		fetchWeather(weatherSearchBar.value);
	});

    // When page is reloaded fill out weather card with data from localStorage
    // OR clear weather card data if value for 'searchState' property is empty
    // document.querySelector('.weather_card_city').textContent = 'City in ' + localStorageData.locationName; Invalid city name. 
    function checkWeatherCard(localStorageData, lsCityName) {
        if (localStorageData.searchState && !localStorageData.searchState == "") { 
            document.querySelector(".weather_card_city").innerHTML = localStorageData.weatherCityName;
            document.querySelector(".weather_card_temp .temp").innerHTML = localStorageData.weatherTemp;
            displayWeatherConditionIcon(localStorageData.weatherIcon);
            console.log('searchState is: ' + localStorageData.searchState);
        } else {
            console.log('searchState is empty - clear weather card [!]');
            document.querySelector('.weather_card_city').textContent = lsCityName;
            document.querySelector(".weather_card_temp .temp").innerHTML = "";
            document.getElementById('weather_card_icon').src = "images/weather-icons/cloud.png";
            document.body.setAttribute('data-weather-card-state', ''); 
        }
    }

    // If user searched for city then set weather card to active
    function setActiveFlagForWeatherCard(localStorageData) {
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

    // Display current date
    function displayCurrentDate(d) {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
      
        return `${day}, ${date} ${month}`;
      }
});