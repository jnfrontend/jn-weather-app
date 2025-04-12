document.addEventListener("DOMContentLoaded", function () { 
    const locationsTrigger = document.getElementById("locations_trigger"); // Button to open locations modal
    const locationsList = document.querySelectorAll("#locations_list li"); // List of country/locations

    locationsTrigger.addEventListener("click", function() {
        document.body.classList.toggle("openLocations"); // Show/Hide modal with country/locations
    });

    locationsList.forEach(locationItem => {
        locationItem.addEventListener("click", () => {
            const _thisCountryCode = locationItem.getAttribute("data-country-code"); // Country codes: uk, ie, pl, fr, it

            // Add selected country code to localStorage
            localStorage.setItem("selectedLocation", _thisCountryCode);
            console.log("Selected Location is: ", _thisCountryCode);
        });
    });
});