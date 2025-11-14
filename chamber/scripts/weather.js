const OWM_KEY = "83d2c672c6d06da69fb2e84f778f4eba";
const LAT = -34.726;
const LON = -56.219;
const UNITS = "metric";

async function loadCurrentWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${OWM_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  const today = new Date().toLocaleDateString("es-UY", { weekday: "short" });

  document.getElementById("w-today").textContent = today;
  document.getElementById("w-temp").textContent = `${Math.round(data.main.temp)}°C`;
  document.getElementById("w-desc").textContent = data.weather[0].description;
}

async function loadForecast() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${OWM_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  const container = document.getElementById("w-forecast");
  container.innerHTML = "";

  // Tomamos 1 pronóstico por día (al mediodía)
  const daily = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

  daily.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString(undefined, { weekday: "short" });

    const card = document.createElement("article");
    card.className = "forecast-card";

    card.innerHTML = `
      <h3>${day}</h3>
      <p>${item.weather[0].main}</p>
      <p><strong>${Math.round(item.main.temp_max)}°</strong> / ${Math.round(item.main.temp_min)}°</p>
    `;

    container.appendChild(card);
  });
}

loadCurrentWeather();
loadForecast();
