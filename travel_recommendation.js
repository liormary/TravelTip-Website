const searchBtn = document.getElementById("btnSearch");
const resetBtn = document.getElementById("btnReset");
const resultDiv = document.getElementById('result');

function searchPlace() {
    resultDiv.innerHTML = '';
    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        const input = document.getElementById('placeInput').value.toLowerCase();
        let found = false;

        // Search for countries
        data.countries.forEach(country => {
            if (country.name.toLowerCase() === input || country.name.toLowerCase().includes(input)) {
                // Display all cities in the country
                country.cities.forEach(city => {
                    displayCity(city);
                });
                found = true;
                return; // Exit the loop once a country is found
            }
        });

        // If no country match is found, search for cities, temples, and beaches
        if (!found) {
            // Search for cities
            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    if (city.name.toLowerCase() === input) {
                        // Process city data
                        displayCity(city);
                        found = true;
                        return; // Exit the loop once a city is found
                    }
                });
            });

            // Search for temples
            data.temples.forEach(temple => {
                if (temple.name.toLowerCase() === input) {
                    // Process temple data
                    displayTemple(temple);
                    found = true;
                    return; // Exit the loop once a temple is found
                }
            });

            // Search for beaches
            data.beaches.forEach(beach => {
                if (beach.name.toLowerCase() === input || beach.name.toLowerCase().includes(input)) {
                    // Process beach data
                    displayBeach(beach);
                    found = true;
                    return; // Exit the loop once a beach is found
                }
            });
        }

        // If no match is found
        if (!found) {
            resultDiv.innerHTML = 'Place not found.';
        }

        // Show the result window after search
        resultDiv.style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
}

function displayCity(city) {
    resultDiv.innerHTML += `<img src="${city.imageUrl}" alt="${city.name} Image">`;
    resultDiv.innerHTML += `<h2>${city.name}</h2>`;
    resultDiv.innerHTML += `<p>${city.description}</p>`;
}

function displayTemple(temple) {
    resultDiv.innerHTML += `<img src="${temple.imageUrl}" alt="${temple.name} Image">`;
    resultDiv.innerHTML += `<h2>${temple.name}</h2>`;
    resultDiv.innerHTML += `<p>${temple.description}</p>`;
}

function displayBeach(beach) {
    resultDiv.innerHTML += `<img src="${beach.imageUrl}" alt="${beach.name} Image">`;
    resultDiv.innerHTML += `<h2>${beach.name}</h2>`;
    resultDiv.innerHTML += `<p>${beach.description}</p>`;
}

function clearResults() {
    resultDiv.innerHTML = '';
    // Hide the result window on reset
    resultDiv.style.display = 'none';
}

searchBtn.addEventListener('click', searchPlace);
resetBtn.addEventListener('click', clearResults);
