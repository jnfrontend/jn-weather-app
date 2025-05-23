document.addEventListener("DOMContentLoaded", function () {
    const BASE_URL = import.meta.env.BASE_URL;
    const ASSETS_IMG_PATH = BASE_URL + "/images";
    let locationNameHeadline = document.getElementById("location_name");
    let weatherSearchInput = document.getElementById("searchWeatherByCityName");
    const locationsModalTriggers = document.querySelectorAll(".locations_trigger_btn"); // Button to open locations modal
    const locationsList = document.querySelectorAll("#locations_list li"); // List of countrys/locations

    // If location hasn't been selected, set default location for Ireland
    if (!localStorage.getItem("selectedLocation")) {
        const defaultLocationData = {
            countryCode: "ie",
            locationName: "Ireland"
        };
        localStorage.setItem("selectedLocation", JSON.stringify(defaultLocationData));
    }

    locationsModalTriggers.forEach(locationsModalBtn => { 
        locationsModalBtn.addEventListener("click", function() {
            document.body.classList.toggle("openLocations"); // Show/Hide modal with country/locations
        });
    });
    

    locationsList.forEach(locationItem => {
        locationItem.addEventListener("click", () => {
            // Get data from selected item
            const _thisCountryCode = locationItem.getAttribute("data-country-code"); // Country codes: uk, ie, pl, fr, it
            const _thisLocationName = locationItem.getAttribute("data-location-name"); // Country names: England, Ireland, Poland, France, Italy

            const selectedLocationData = {
                countryCode: _thisCountryCode,
                locationName: _thisLocationName
            };

            // Update location headline with selected location
            if (locationNameHeadline) {
                locationNameHeadline.innerHTML = _thisLocationName;
            }
            
            // Highlight selected location
            locationsList.forEach(li => li.classList.remove("selected_location"));
            locationItem.classList.add("selected_location");

            // Save selected country code and location name as JSON in localStorage
            localStorage.setItem("selectedLocation", JSON.stringify(selectedLocationData));
            console.log("Selected Location Data is: ", selectedLocationData);

            // When user select new location clear weather card and local storage
            if (selectedLocationData) {
                selectedLocationData.weatherTemp = '';
                selectedLocationData.weatherCityName = '';
                selectedLocationData.weatherIcon = 'cloud';
                document.body.setAttribute('data-weather-card-state', '');

                if(document.getElementById('weather_card')) {
                    document.querySelector('.weather_card_city').textContent = 'City in ' + selectedLocationData.locationName;
                    document.querySelector('.weather_card_temp .temp').textContent = '';
                    document.getElementById('weather_card_icon').src = ASSETS_IMG_PATH + "/weather-icons/cloud.png";
                    
                    // Clear value in weather search bar
                    if(weatherSearchInput) {
                        weatherSearchInput.value = "";
                    }

                    // Hide search error notification
                    if(document.querySelector(".error_label.show_err_msg")) {
                        document.querySelector(".error_label").classList.remove('show_err_msg');
                    }
                }
                console.log("Selected Location Data is: ", selectedLocationData);
            }
        });
    });

    // Keep location headline text and highlight class for selected location on page reload
    const savedLocationData = JSON.parse(localStorage.getItem("selectedLocation")); // Read localStorage data "selectedLocation"
    console.log('savedLocationData is: ', savedLocationData);
    if (savedLocationData) {
        // Convert locationsList to array
        // console.log(Array.from(locationsList));
        const matchingSavedLocation = Array.from(locationsList).find(li => li.getAttribute("data-country-code") === savedLocationData.countryCode); // Match locations list <li> data-country-code with saved location data -> (countryCode) 
        if (matchingSavedLocation) {
            matchingSavedLocation.classList.add("selected_location");
            // Update location headline with selected location
            if (locationNameHeadline) { 
                locationNameHeadline.innerHTML = savedLocationData.locationName;
            }
        }
    }
});