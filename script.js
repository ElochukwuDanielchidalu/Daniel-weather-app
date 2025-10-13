// ========== Time / Date Section ==========
function updateClockAndDate() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const mins = String(now.getMinutes()).padStart(2, '0');
  const secs = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('clock').textContent = `${hours}:${mins}:${secs}`;

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('date').textContent = now.toLocaleDateString(undefined, options);
}

// Update every second
setInterval(updateClockAndDate, 1000);
updateClockAndDate(); // initial call

// ========== Weather Section ==========
const apiKey = ''; 

// Function to get weather data based on city, state, and country
async function getWeather(city, state, country) {
  let query = `${city},${state},${country}`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === '404') {
      throw new Error('City not found');
    }

    // Update the UI with the weather information
    document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temp').textContent = data.main.temp;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind').textContent = data.wind.speed;

    // Update the weather icon
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    // Show weather card
    document.getElementById('weather-card').classList.remove('hidden');
    document.getElementById('error-message').classList.add('hidden');
  } catch (error) {
    document.getElementById('error-message').textContent = error.message;
    document.getElementById('error-message').classList.remove('hidden');
    document.getElementById('weather-card').classList.add('hidden');
  }
}

// Event listener for search button
document.getElementById('search-btn').addEventListener('click', function() {
  const city = document.getElementById('city-input').value.trim();
  const state = document.getElementById('state-input').value.trim();
  const country = document.getElementById('country-input').value.trim();

  // Check if all fields are filled
  if (city && state && country) {
    getWeather(city, state, country);
  } else {
    // Show error message if any field is empty
    document.getElementById('error-message').textContent = 'Please fill in all fields: City, State, and Country';
    document.getElementById('error-message').classList.remove('hidden');
    document.getElementById('weather-card').classList.add('hidden');
  }
});

// Allow pressing Enter to search for weather
document.getElementById('city-input').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    document.getElementById('search-btn').click();
  }
});
