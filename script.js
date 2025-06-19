const weatherEmoji = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Drizzle: "🌦️",
  Thunderstorm: "⛈️",
  Snow: "❄️",
  Fog: "🌫️",
  Unknown: "❔"
};

function mapCodeToCondition(code) {
  if ([0].includes(code)) return "Clear";
  if ([1, 2, 3].includes(code)) return "Clouds";
  if ([45, 48].includes(code)) return "Fog";
  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
  if ([61, 63, 65, 66, 67].includes(code)) return "Rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snow";
  if ([95, 96, 99].includes(code)) return "Thunderstorm";
  return "Unknown";
}

function updateWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const weather = data.current_weather;
      const condition = mapCodeToCondition(weather.weathercode);

      document.getElementById("emoji").textContent = weatherEmoji[condition];
      document.getElementById("temp").textContent = `${Math.round(weather.temperature)}°C`;
      document.getElementById("desc").textContent = condition;
      document.getElementById("location").textContent = `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`;
    })
    .catch(err => {
      document.getElementById("desc").textContent = "Failed to fetch weather.";
      console.error("Weather fetch error:", err);
    });
}

navigator.geolocation.getCurrentPosition(
  pos => updateWeather(pos.coords.latitude, pos.coords.longitude),
  err => {
    document.getElementById("desc").textContent = "Location access denied.";
    console.error("Geolocation error:", err);
  }
);
