const apiKey = "0875360bff485c5dc9f73a08b21ead18";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");
  resultDiv.innerHTML = "";

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    // Get coordinates
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.length) {
      resultDiv.innerHTML = "<p>City not found.</p>";
      return;
    }

    const { lat, lon, name, country } = geoData[0];

    // Get weather
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    const icon = weatherData.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    resultDiv.innerHTML = `
      <div class="weather-card">
        <h2>${name}, ${country}</h2>
        <img src="${iconUrl}" alt="${weatherData.weather[0].description}">
        <p><strong>${weatherData.weather[0].description}</strong></p>
        <p>🌡️ Temp: ${weatherData.main.temp} °C</p>
        <p>💧 Humidity: ${weatherData.main.humidity}%</p>
        <p>💨 Wind: ${weatherData.wind.speed} m/s</p>
      </div>
    `;
  } catch (error) {
    resultDiv.innerHTML = "<p>Failed to fetch weather data.</p>";
    console.error(error);
  }
}
