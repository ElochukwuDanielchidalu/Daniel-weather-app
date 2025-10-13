
  <script>
    // ===================================================
    // 1. Time / Date Section
    // ===================================================
    function updateClockAndDate() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      document.getElementById('clock').textContent = `${hours}:${mins}:${secs}`;

      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      document.getElementById('date').textContent = now.toLocaleDateString(undefined, options);
    }
    setInterval(updateClockAndDate, 1000);
    updateClockAndDate(); // initial call

    // ===================================================
    // 2. Expanded Local Weather Dataset (NO API KEY/CALLS)
    // ===================================================

    // Using lowercase keys for reliable searching
    const localWeatherDB = {
        // --- North America ---
        'new york,ny,usa': { name: 'New York City', country: 'US', temp: 15.2, description: 'clear sky', humidity: 55, wind: 3.5, icon: '01d' },
        'los angeles,ca,usa': { name: 'Los Angeles', country: 'US', temp: 21.0, description: 'sunny', humidity: 40, wind: 2.2, icon: '01d' },
        'toronto,ontario,canada': { name: 'Toronto', country: 'CA', temp: 8.5, description: 'light snow', humidity: 70, wind: 4.8, icon: '13d' },
        'mexico city,cdmx,mexico': { name: 'Mexico City', country: 'MX', temp: 19.4, description: 'partly cloudy', humidity: 65, wind: 1.5, icon: '03d' },

        // --- Europe ---
        'london,england,uk': { name: 'London', country: 'UK', temp: 12.1, description: 'overcast clouds', humidity: 85, wind: 5.5, icon: '04d' },
        'paris,île-de-france,france': { name: 'Paris', country: 'FR', temp: 14.8, description: 'mist', humidity: 90, wind: 1.1, icon: '50d' },
        'berlin,berlin,germany': { name: 'Berlin', country: 'DE', temp: 10.3, description: 'broken clouds', humidity: 78, wind: 3.0, icon: '04d' },
        'moscow,moscow,russia': { name: 'Moscow', country: 'RU', temp: 5.1, description: 'heavy snow', humidity: 92, wind: 6.2, icon: '13d' },
        'rome,lazio,italy': { name: 'Rome', country: 'IT', temp: 17.5, description: 'few clouds', humidity: 60, wind: 2.8, icon: '02d' },
        'madrid,community of madrid,spain': { name: 'Madrid', country: 'ES', temp: 16.9, description: 'clear sky', humidity: 50, wind: 4.0, icon: '01d' },
        
        // --- Asia ---
        'tokyo,kanto,japan': { name: 'Tokyo', country: 'JP', temp: 18.8, description: 'light rain', humidity: 75, wind: 3.2, icon: '10d' },
        'seoul,seoul,south korea': { name: 'Seoul', country: 'KR', temp: 11.5, description: 'clear', humidity: 60, wind: 2.5, icon: '01d' },
        'shanghai,shanghai,china': { name: 'Shanghai', country: 'CN', temp: 20.1, description: 'haze', humidity: 70, wind: 1.9, icon: '50d' },
        'singapore,central region,singapore': { name: 'Singapore', country: 'SG', temp: 29.8, description: 'thunderstorm', humidity: 88, wind: 4.1, icon: '11d' },
        'mumbai,maharashtra,india': { name: 'Mumbai', country: 'IN', temp: 27.5, description: 'moderate rain', humidity: 82, wind: 5.0, icon: '10d' },
        'dubai,dubai,uae': { name: 'Dubai', country: 'AE', temp: 35.7, description: 'hot and clear', humidity: 30, wind: 1.8, icon: '01d' },
        'hong kong,hong kong,china': { name: 'Hong Kong', country: 'HK', temp: 25.0, description: 'drizzle', humidity: 79, wind: 3.9, icon: '09d' },
        
        // --- Africa ---
        'lagos,lagos,nigeria': { name: 'Lagos', country: 'NG', temp: 28.5, description: 'scattered clouds', humidity: 80, wind: 4.3, icon: '03d' },
        'cairo,cairo,egypt': { name: 'Cairo', country: 'EG', temp: 24.1, description: 'clear sky', humidity: 50, wind: 2.0, icon: '01d' },
        'cape town,western cape,south africa': { name: 'Cape Town', country: 'ZA', temp: 18.0, description: 'windy and sunny', humidity: 65, wind: 7.5, icon: '01d' },

        // --- South America ---
        'rio de janeiro,rio de janeiro,brazil': { name: 'Rio de Janeiro', country: 'BR', temp: 25.5, description: 'broken clouds', humidity: 70, wind: 3.1, icon: '04d' },
        'são paulo,são paulo,brazil': { name: 'São Paulo', country: 'BR', temp: 22.8, description: 'overcast', humidity: 75, wind: 2.5, icon: '04d' },
        'buenos aires,autonomous city of buenos aires,argentina': { name: 'Buenos Aires', country: 'AR', temp: 20.0, description: 'showers', humidity: 80, wind: 4.0, icon: '09d' },

        // --- Oceania ---
        'sydney,nsw,australia': { name: 'Sydney', country: 'AU', temp: 23.0, description: 'light breeze', humidity: 55, wind: 2.1, icon: '02d' },
        'melbourne,victoria,australia': { name: 'Melbourne', country: 'AU', temp: 14.5, description: 'chilly and rainy', humidity: 78, wind: 5.0, icon: '10d' },

        // --- Additional Major Cities ---
        'istanbul,istanbul,turkey': { name: 'Istanbul', country: 'TR', temp: 15.6, description: 'moderate breeze', humidity: 68, wind: 3.8, icon: '02d' },
        'amsterdam,north holland,netherlands': { name: 'Amsterdam', country: 'NL', temp: 9.8, description: 'foggy', humidity: 95, wind: 1.0, icon: '50d' },
    };

    /**
     * Retrieves and displays weather data from the expanded local database.
     */
    function getWeather(city, state, country) {
        // Normalize the search query to match the database keys
        const cityClean = city.toLowerCase().replace(/\s/g, '');
        const stateClean = state.toLowerCase().replace(/\s/g, '');
        const countryClean = country.toLowerCase().replace(/\s/g, '');

        // Generate key using cleaned city, state, and country
        let queryKey = `${cityClean},${stateClean},${countryClean}`;
        let data = localWeatherDB[queryKey];
        
        // As a fallback, try matching just city and country (allowing flexibility for state name)
        if (!data) {
             queryKey = `${cityClean},${countryClean}`;
             data = Object.values(localWeatherDB).find(
                item => item.name.toLowerCase().replace(/\s/g, '') === cityClean && item.country.toLowerCase() === countryClean.substring(0, 2).toLowerCase()
            );
        }

        const weatherCard = document.getElementById('weather-card');
        const errorMessage = document.getElementById('error-message');

        if (data) {
            // Update the UI with the local weather information
            document.getElementById('city-name').textContent = `${data.name}, ${data.country}`;
            document.getElementById('temp').textContent = data.temp.toFixed(1);
            document.getElementById('description').textContent = data.description;
            document.getElementById('humidity').textContent = data.humidity;
            document.getElementById('wind').textContent = data.wind.toFixed(1);
            
            // The icon URL still points to OpenWeatherMap's CDN, using the local icon code
            document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
            
            // Show weather card and hide error
            weatherCard.classList.remove('hidden');
            errorMessage.classList.add('hidden');
        } else {
            // Handle 'City not found' error
            errorMessage.textContent = 'Weather data for this location is not found in the local database. Try a city from the list below.';
            errorMessage.classList.remove('hidden');
            weatherCard.classList.add('hidden');
        }
    }

    // ===================================================
    // 3. Event Listeners
    // ===================================================

    const cityInput = document.getElementById('city-input');
    const stateInput = document.getElementById('state-input');
    const countryInput = document.getElementById('country-input');
    const searchBtn = document.getElementById('search-btn');
    const errorMessage = document.getElementById('error-message');
    const weatherCard = document.getElementById('weather-card');


    function handleSearch() {
        const city = cityInput.value.trim();
        const state = stateInput.value.trim();
        const country = countryInput.value.trim();

        if (city && state && country) {
            getWeather(city, state, country);
        } else {
            errorMessage.textContent = 'Please fill in all three fields: City, State/Region, and Country.';
            errorMessage.classList.remove('hidden');
            weatherCard.classList.add('hidden');
        }
    }

    searchBtn.addEventListener('click', handleSearch);

    // Allow pressing Enter in any input field to trigger the search
    [cityInput, stateInput, countryInput].forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent form submission
                handleSearch();
            }
        });
    });

  </script>
