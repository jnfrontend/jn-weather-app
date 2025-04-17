document.addEventListener("DOMContentLoaded", function () { 
    let locationNameHeadline = document.getElementById("location_name");
    const locationsTrigger = document.getElementById("locations_trigger"); // Button to open locations modal
    const locationsList = document.querySelectorAll("#locations_list li"); // List of countrys/locations

    // If location hasn't been selected, set default location for Ireland
    if (!localStorage.getItem("selectedLocation")) {
        const defaultLocationData = {
            countryCode: "ie",
            locationName: "Ireland"
        };
        localStorage.setItem("selectedLocation", JSON.stringify(defaultLocationData));
    }

    locationsTrigger.addEventListener("click", function() {
        document.body.classList.toggle("openLocations"); // Show/Hide modal with country/locations
    });

    locationsList.forEach(locationItem => {
        locationItem.addEventListener("click", () => {
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
        });
    });

    // Keep location headline text and highlight class for selected location on page reload
    const savedLocationData = JSON.parse(localStorage.getItem("selectedLocation")); // Read localStorage data "selectedLocation"
    console.log('savedLocationData is: ', savedLocationData);
    if (savedLocationData) {
        console.log(Array.from(locationsList)); // Convert locationsList to array
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