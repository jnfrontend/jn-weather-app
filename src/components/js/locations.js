document.addEventListener("DOMContentLoaded", function () { 
    const locationsTrigger = document.getElementById("locations_trigger"); // Button to open locations modal
    const locationsList = document.querySelectorAll("#locations_list li"); // List of country/locations

    locationsTrigger.addEventListener("click", function() {
        document.body.classList.toggle("openLocations"); // Show/Hide modal with country/locations
    });

    locationsList.forEach(locationItem => {
        locationItem.addEventListener("click", () => {
            const _thisCountryCode = locationItem.getAttribute("data-country-code"); // Country codes: uk, ie, pl, fr, it
            const _thisLocationName = locationItem.getAttribute("data-location-name"); // Country name: England, Ireland, Poland, France, Italy

            const selectedLocationData = {
                countryCode: _thisCountryCode,
                locationName: _thisLocationName
            };

            // Highlight selected location
            locationsList.forEach(li => li.classList.remove("selected_location"));
            locationItem.classList.add("selected_location");

            // Save selected country code and location name as JSON in localStorage
            localStorage.setItem("selectedLocation", JSON.stringify(selectedLocationData));
            console.log("Selected Location Data is: ", selectedLocationData);
        });
    });
});