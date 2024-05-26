const searchBtn = document.getElementById("btnSearch");
const resetBtn = document.getElementById("btnReset");
const resultDiv = document.getElementById('result');

function searchPlace() {
    resultDiv.innerHTML = '';
    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        const input = document.getElementById('placeInput').value.toLowerCase(); // Correct the input field ID
        let found = false;

        // Search for countries
        for (const country of data.countries) {
            if (country.name.toLowerCase() === input || country.name.toLowerCase().includes(input)) {
                country.cities.forEach(city => displayCity(city));
                found = true;
                break; // Exit the loop once a country is found
            }
        }

        // If no country match is found, search for cities, temples, and beaches
        if (!found) {
            // Search for cities
            for (const country of data.countries) {
                for (const city of country.cities) {
                    if (city.name.toLowerCase() === input) {
                        displayCity(city);
                        found = true;
                        break; // Exit the loop once a city is found
                    }
                }
                if (found) break; // Exit the loop once a city is found
            }
        }

        if (!found) {
            // Search for temples
            for (const temple of data.temples) {
                if (temple.name.toLowerCase() === input) {
                    displayTemple(temple);
                    found = true;
                    break; // Exit the loop once a temple is found
                }
            }
        }

        if (!found) {
            // Search for beaches
            for (const beach of data.beaches) {
                if (beach.name.toLowerCase() === input || beach.name.toLowerCase().includes(input)) {
                    displayBeach(beach);
                    found = true;
                    break; // Exit the loop once a beach is found
                }
            }
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
    resultDiv.innerHTML += `
        <div class="result-item">
            <img src="${city.imageUrl}" alt="${city.name} Image" class="result-image">
            <h2 class="result-title">${city.name}</h2>
            <p class="result-description">${city.description}</p>
        </div>`;
}

function displayTemple(temple) {
    resultDiv.innerHTML += `
        <div class="result-item">
            <img src="${temple.imageUrl}" alt="${temple.name} Image" class="result-image">
            <h2 class="result-title">${temple.name}</h2>
            <p class="result-description">${temple.description}</p>
        </div>`;
}

function displayBeach(beach) {
    resultDiv.innerHTML += `
        <div class="result-item">
            <img src="${beach.imageUrl}" alt="${beach.name} Image" class="result-image">
            <h2 class="result-title">${beach.name}</h2>
            <p class="result-description">${beach.description}</p>
        </div>`;
}


function clearResults() {
    resultDiv.innerHTML = '';
    // Hide the result window on reset
    resultDiv.style.display = 'none';
}

searchBtn.addEventListener('click', searchPlace);
resetBtn.addEventListener('click', clearResults);
