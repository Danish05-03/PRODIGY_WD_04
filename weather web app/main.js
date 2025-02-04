// Selector variables
const inputVal = document.querySelector('#cityinput');
const btn = document.querySelector('#add');
const cityOutput = document.querySelector('#cityoutput');
const descriptionOutput = document.querySelector('#description');
const tempOutput = document.querySelector('#temp');
const windOutput = document.querySelector('#wind');

// OpenWeatherMap API key
const apiKey = "3045dd712ffe6e702e3245525ac7fa38";

// Convert Kelvin to Celsius
function convertToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(1);
}

// Fetch weather data
btn.addEventListener('click', function () {
    const cityName = inputVal.value.trim();

    if (cityName === "") {
        alert("Please enter a city name!");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found!");
            }
            return response.json();
        })
        .then(data => {
            const name = data.name;
            const description = data.weather[0].description;
            const temperature = data.main.temp;
            const windSpeed = data.wind.speed;

            cityOutput.innerHTML = `🌍 City: <strong>${name}</strong>`;
            tempOutput.innerHTML = `🌡️ Temperature: <strong>${convertToCelsius(temperature)}°C</strong>`;
            descriptionOutput.innerHTML = `🌤️ Conditions: <strong>${description}</strong>`;
            windOutput.innerHTML = `💨 Wind Speed: <strong>${windSpeed} km/h</strong>`;
        })
        .catch(error => {
            alert(error.message);
        });
});
