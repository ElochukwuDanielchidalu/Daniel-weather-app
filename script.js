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

// Update every second
setInterval(updateClockAndDate, 1000);
updateClockAndDate(); // initial call

// ===================================================
// 2. Local Weather Dataset (All Countries A-Z - Placeholder Data)
// ===================================================

const localWeatherDB = {
    // Helper function to generate randomized, plausible weather data
    _generatePlaceholderData: function(country, countryCode, baseTemp, description, icon) {
        const temp = baseTemp + (Math.random() * 5 - 2.5); // +/- 2.5 degree variance
        const humidity = Math.floor(60 + (Math.random() * 30)); // 60-90% humidity
        const wind = (1 + Math.random() * 4).toFixed(1); // 1.0 - 5.0 m/s wind
        return { name: country, country: countryCode, temp: temp, description: description, humidity: humidity, wind: wind, icon: icon };
    },

    // A - Z Country List with Placeholder Weather (Sorted by Name)
    'afghanistan': { name: 'Afghanistan', country: 'AF', temp: 15.0, description: 'sunny and dry', humidity: 35, wind: 1.5, icon: '01d' },
    'albania': { name: 'Albania', country: 'AL', temp: 16.5, description: 'partly cloudy', humidity: 65, wind: 2.2, icon: '03d' },
    'algeria': { name: 'Algeria', country: 'DZ', temp: 21.0, description: 'clear sky', humidity: 40, wind: 3.0, icon: '01d' },
    'andorra': { name: 'Andorra', country: 'AD', temp: 8.0, description: 'snow showers', humidity: 75, wind: 1.8, icon: '13d' },
    'angola': { name: 'Angola', country: 'AO', temp: 27.5, description: 'scattered clouds', humidity: 70, wind: 4.1, icon: '03d' },
    'antigua and barbuda': { name: 'Antigua and Barbuda', country: 'AG', temp: 30.0, description: 'light rain', humidity: 85, wind: 5.5, icon: '10d' },
    'argentina': { name: 'Argentina', country: 'AR', temp: 20.0, description: 'showers', humidity: 80, wind: 4.0, icon: '09d' },
    'armenia': { name: 'Armenia', country: 'AM', temp: 12.0, description: 'few clouds', humidity: 60, wind: 2.5, icon: '02d' },
    'australia': { name: 'Australia', country: 'AU', temp: 23.0, description: 'light breeze', humidity: 55, wind: 2.1, icon: '02d' },
    'austria': { name: 'Austria', country: 'AT', temp: 10.5, description: 'overcast clouds', humidity: 75, wind: 3.3, icon: '04d' },
    'azerbaijan': { name: 'Azerbaijan', country: 'AZ', temp: 17.0, description: 'clear sky', humidity: 50, wind: 2.8, icon: '01d' },

    // B
    'bahamas': { name: 'Bahamas', country: 'BS', temp: 29.5, description: 'sunny', humidity: 78, wind: 4.5, icon: '01d' },
    'bahrain': { name: 'Bahrain', country: 'BH', temp: 32.0, description: 'hot and clear', humidity: 35, wind: 1.9, icon: '01d' },
    'bangladesh': { name: 'Bangladesh', country: 'BD', temp: 28.0, description: 'moderate rain', humidity: 88, wind: 3.8, icon: '10d' },
    'barbados': { name: 'Barbados', country: 'BB', temp: 30.5, description: 'thunderstorm', humidity: 82, wind: 5.0, icon: '11d' },
    'belarus': { name: 'Belarus', country: 'BY', temp: 7.5, description: 'broken clouds', humidity: 85, wind: 4.2, icon: '04d' },
    'belgium': { name: 'Belgium', country: 'BE', temp: 11.0, description: 'light rain', humidity: 90, wind: 2.7, icon: '10d' },
    'belize': { name: 'Belize', country: 'BZ', temp: 26.5, description: 'scattered clouds', humidity: 75, wind: 3.1, icon: '03d' },
    'benin': { name: 'Benin', country: 'BJ', temp: 28.0, description: 'overcast', humidity: 80, wind: 3.5, icon: '04d' },
    'bhutan': { name: 'Bhutan', country: 'BT', temp: 14.5, description: 'mountain chill', humidity: 60, wind: 1.0, icon: '50d' },
    'bolivia': { name: 'Bolivia', country: 'BO', temp: 17.5, description: 'partly cloudy', humidity: 68, wind: 2.9, icon: '03d' },
    'bosnia and herzegovina': { name: 'Bosnia and Herzegovina', country: 'BA', temp: 13.0, description: 'mist', humidity: 88, wind: 1.5, icon: '50d' },
    'botswana': { name: 'Botswana', country: 'BW', temp: 25.0, description: 'clear sky', humidity: 45, wind: 2.4, icon: '01d' },
    'brazil': { name: 'Brazil', country: 'BR', temp: 25.5, description: 'broken clouds', humidity: 70, wind: 3.1, icon: '04d' },
    'brunei': { name: 'Brunei', country: 'BN', temp: 30.0, description: 'heavy rain', humidity: 92, wind: 4.0, icon: '10d' },
    'bulgaria': { name: 'Bulgaria', country: 'BG', temp: 15.5, description: 'few clouds', humidity: 72, wind: 3.7, icon: '02d' },
    'burkina faso': { name: 'Burkina Faso', country: 'BF', temp: 31.0, description: 'clear and hot', humidity: 30, wind: 2.0, icon: '01d' },
    'burundi': { name: 'Burundi', country: 'BI', temp: 23.5, description: 'light rain', humidity: 80, wind: 2.5, icon: '10d' },

    // C
    'cabo verde': { name: 'Cabo Verde', country: 'CV', temp: 28.0, description: 'windy', humidity: 65, wind: 6.0, icon: '02d' },
    'cambodia': { name: 'Cambodia', country: 'KH', temp: 31.5, description: 'drizzle', humidity: 85, wind: 3.2, icon: '09d' },
    'cameroon': { name: 'Cameroon', country: 'CM', temp: 26.0, description: 'heavy rain', humidity: 90, wind: 3.9, icon: '10d' },
    'canada': { name: 'Canada', country: 'CA', temp: 8.5, description: 'light snow', humidity: 70, wind: 4.8, icon: '13d' },
    'central african republic': { name: 'Central African Republic', country: 'CF', temp: 25.0, description: 'thunderstorm', humidity: 78, wind: 2.1, icon: '11d' },
    'chad': { name: 'Chad', country: 'TD', temp: 33.0, description: 'dusty wind', humidity: 25, wind: 5.5, icon: '50d' },
    'chile': { name: 'Chile', country: 'CL', temp: 18.0, description: 'clear sky', humidity: 50, wind: 3.0, icon: '01d' },
    'china': { name: 'China', country: 'CN', temp: 20.1, description: 'haze', humidity: 70, wind: 1.9, icon: '50d' },
    'colombia': { name: 'Colombia', country: 'CO', temp: 24.5, description: 'moderate rain', humidity: 75, wind: 2.6, icon: '10d' },
    'comoros': { name: 'Comoros', country: 'KM', temp: 29.0, description: 'broken clouds', humidity: 88, wind: 4.0, icon: '04d' },
    'congo': { name: 'Congo', country: 'CG', temp: 27.0, description: 'scattered clouds', humidity: 80, wind: 3.1, icon: '03d' },
    'costa rica': { name: 'Costa Rica', country: 'CR', temp: 26.5, description: 'rainy', humidity: 90, wind: 3.5, icon: '09d' },
    "côte d'ivoire": { name: "Côte d'Ivoire", country: 'CI', temp: 28.0, description: 'overcast', humidity: 82, wind: 4.2, icon: '04d' },
    'croatia': { name: 'Croatia', country: 'HR', temp: 17.5, description: 'few clouds', humidity: 65, wind: 2.8, icon: '02d' },
    'cuba': { name: 'Cuba', country: 'CU', temp: 28.5, description: 'partly cloudy', humidity: 75, wind: 4.0, icon: '03d' },
    'cyprus': { name: 'Cyprus', country: 'CY', temp: 22.0, description: 'clear sky', humidity: 55, wind: 3.0, icon: '01d' },
    'czechia': { name: 'Czechia', country: 'CZ', temp: 10.0, description: 'broken clouds', humidity: 78, wind: 3.5, icon: '04d' },

    // D
    'democratic republic of the congo': { name: 'DR Congo', country: 'CD', temp: 26.5, description: 'light rain', humidity: 85, wind: 3.0, icon: '10d' },
    'denmark': { name: 'Denmark', country: 'DK', temp: 9.0, description: 'windy', humidity: 80, wind: 5.5, icon: '04d' },
    'djibouti': { name: 'Djibouti', country: 'DJ', temp: 34.0, description: 'hot and clear', humidity: 30, wind: 1.8, icon: '01d' },
    'dominica': { name: 'Dominica', country: 'DM', temp: 29.0, description: 'heavy rain', humidity: 95, wind: 4.8, icon: '10d' },
    'dominican republic': { name: 'Dominican Republic', country: 'DO', temp: 27.5, description: 'sunny', humidity: 75, wind: 3.2, icon: '01d' },

    // E
    'ecuador': { name: 'Ecuador', country: 'EC', temp: 24.0, description: 'scattered clouds', humidity: 70, wind: 2.5, icon: '03d' },
    'egypt': { name: 'Egypt', country: 'EG', temp: 24.1, description: 'clear sky', humidity: 50, wind: 2.0, icon: '01d' },
    'el salvador': { name: 'El Salvador', country: 'SV', temp: 28.0, description: 'thunderstorm', humidity: 80, wind: 3.5, icon: '11d' },
    'equatorial guinea': { name: 'Equatorial Guinea', country: 'GQ', temp: 27.5, description: 'overcast', humidity: 90, wind: 4.0, icon: '04d' },
    'eritrea': { name: 'Eritrea', country: 'ER', temp: 25.0, description: 'few clouds', humidity: 60, wind: 2.8, icon: '02d' },
    'estonia': { name: 'Estonia', country: 'EE', temp: 6.5, description: 'light snow', humidity: 85, wind: 5.0, icon: '13d' },
    'eswatini': { name: 'Eswatini', country: 'SZ', temp: 22.0, description: 'partly cloudy', humidity: 55, wind: 2.1, icon: '03d' },
    'ethiopia': { name: 'Ethiopia', country: 'ET', temp: 18.5, description: 'drizzle', humidity: 65, wind: 1.5, icon: '09d' },

    // F
    'fiji': { name: 'Fiji', country: 'FJ', temp: 27.0, description: 'tropical showers', humidity: 88, wind: 4.5, icon: '09d' },
    'finland': { name: 'Finland', country: 'FI', temp: 4.0, description: 'heavy snow', humidity: 90, wind: 6.0, icon: '13d' },
    'france': { name: 'France', country: 'FR', temp: 14.8, description: 'mist', humidity: 90, wind: 1.1, icon: '50d' },

    // G
    'gabon': { name: 'Gabon', country: 'GA', temp: 28.0, description: 'scattered clouds', humidity: 85, wind: 3.8, icon: '03d' },
    'gambia': { name: 'Gambia', country: 'GM', temp: 30.5, description: 'clear and hot', humidity: 50, wind: 2.9, icon: '01d' },
    'georgia': { name: 'Georgia', country: 'GE', temp: 15.0, description: 'rain', humidity: 70, wind: 3.0, icon: '10d' },
    'germany': { name: 'Germany', country: 'DE', temp: 10.3, description: 'broken clouds', humidity: 78, wind: 3.0, icon: '04d' },
    'ghana': { name: 'Ghana', country: 'GH', temp: 29.0, description: 'partly cloudy', humidity: 75, wind: 4.1, icon: '03d' },
    'greece': { name: 'Greece', country: 'GR', temp: 19.5, description: 'clear sky', humidity: 55, wind: 3.5, icon: '01d' },
    'grenada': { name: 'Grenada', country: 'GD', temp: 31.0, description: 'thunderstorm', humidity: 90, wind: 5.2, icon: '11d' },
    'guatemala': { name: 'Guatemala', country: 'GT', temp: 25.0, description: 'light rain', humidity: 80, wind: 2.7, icon: '10d' },
    'guinea': { name: 'Guinea', country: 'GN', temp: 27.0, description: 'overcast', humidity: 85, wind: 3.6, icon: '04d' },
    'guinea-bissau': { name: 'Guinea-Bissau', country: 'GW', temp: 29.5, description: 'scattered clouds', humidity: 78, wind: 3.9, icon: '03d' },
    'guyana': { name: 'Guyana', country: 'GY', temp: 28.5, description: 'rainy', humidity: 92, wind: 4.0, icon: '09d' },

    // H
    'haiti': { name: 'Haiti', country: 'HT', temp: 28.0, description: 'partly cloudy', humidity: 75, wind: 3.0, icon: '03d' },
    'honduras': { name: 'Honduras', country: 'HN', temp: 27.5, description: 'thunderstorm', humidity: 85, wind: 3.8, icon: '11d' },
    'hungary': { name: 'Hungary', country: 'HU', temp: 12.5, description: 'few clouds', humidity: 70, wind: 2.9, icon: '02d' },

    // I
    'iceland': { name: 'Iceland', country: 'IS', temp: 3.0, description: 'windy snow', humidity: 85, wind: 7.0, icon: '13d' },
    'india': { name: 'India', country: 'IN', temp: 27.5, description: 'moderate rain', humidity: 82, wind: 5.0, icon: '10d' },
    'indonesia': { name: 'Indonesia', country: 'ID', temp: 30.0, description: 'heavy rain', humidity: 90, wind: 4.5, icon: '10d' },
    'iran': { name: 'Iran', country: 'IR', temp: 20.0, description: 'clear sky', humidity: 40, wind: 2.8, icon: '01d' },
    'iraq': { name: 'Iraq', country: 'IQ', temp: 25.0, description: 'sunny', humidity: 30, wind: 3.5, icon: '01d' },
    'ireland': { name: 'Ireland', country: 'IE', temp: 11.0, description: 'drizzle', humidity: 95, wind: 4.0, icon: '09d' },
    'israel': { name: 'Israel', country: 'IL', temp: 23.5, description: 'clear sky', humidity: 50, wind: 2.5, icon: '01d' },
    'italy': { name: 'Italy', country: 'IT', temp: 17.5, description: 'few clouds', humidity: 60, wind: 2.8, icon: '02d' },

    // J
    'jamaica': { name: 'Jamaica', country: 'JM', temp: 29.0, description: 'partly cloudy', humidity: 80, wind: 4.0, icon: '03d' },
    'japan': { name: 'Japan', country: 'JP', temp: 18.8, description: 'light rain', humidity: 75, wind: 3.2, icon: '10d' },
    'jordan': { name: 'Jordan', country: 'JO', temp: 20.5, description: 'clear sky', humidity: 45, wind: 2.0, icon: '01d' },

    // K
    'kazakhstan': { name: 'Kazakhstan', country: 'KZ', temp: 5.0, description: 'light snow', humidity: 70, wind: 4.5, icon: '13d' },
    'kenya': { name: 'Kenya', country: 'KE', temp: 21.0, description: 'scattered clouds', humidity: 65, wind: 2.3, icon: '03d' },
    'kiribati': { name: 'Kiribati', country: 'KI', temp: 30.5, description: 'tropical heat', humidity: 85, wind: 3.1, icon: '01d' },
    'kuwait': { name: 'Kuwait', country: 'KW', temp: 33.0, description: 'hot and clear', humidity: 30, wind: 1.5, icon: '01d' },
    'kyrgyzstan': { name: 'Kyrgyzstan', country: 'KG', temp: 10.0, description: 'broken clouds', humidity: 60, wind: 2.8, icon: '04d' },

    // L
    'laos': { name: 'Laos', country: 'LA', temp: 29.0, description: 'moderate rain', humidity: 88, wind: 3.7, icon: '10d' },
    'latvia': { name: 'Latvia', country: 'LV', temp: 8.0, description: 'overcast', humidity: 85, wind: 4.0, icon: '04d' },
    'lebanon': { name: 'Lebanon', country: 'LB', temp: 19.0, description: 'clear sky', humidity: 55, wind: 2.5, icon: '01d' },
    'lesotho': { name: 'Lesotho', country: 'LS', temp: 16.0, description: 'partly cloudy', humidity: 60, wind: 3.0, icon: '03d' },
    'liberia': { name: 'Liberia', country: 'LR', temp: 27.5, description: 'heavy rain', humidity: 92, wind: 4.5, icon: '10d' },
    'libya': { name: 'Libya', country: 'LY', temp: 26.0, description: 'clear sky', humidity: 35, wind: 2.0, icon: '01d' },
    'liechtenstein': { name: 'Liechtenstein', country: 'LI', temp: 10.0, description: 'misty', humidity: 80, wind: 1.0, icon: '50d' },
    'lithuania': { name: 'Lithuania', country: 'LT', temp: 7.0, description: 'light snow', humidity: 80, wind: 4.8, icon: '13d' },
    'luxembourg': { name: 'Luxembourg', country: 'LU', temp: 11.5, description: 'drizzle', humidity: 88, wind: 2.0, icon: '09d' },

    // M
    'madagascar': { name: 'Madagascar', country: 'MG', temp: 25.0, description: 'few clouds', humidity: 70, wind: 3.5, icon: '02d' },
    'malawi': { name: 'Malawi', country: 'MW', temp: 23.0, description: 'scattered clouds', humidity: 65, wind: 2.5, icon: '03d' },
    'malaysia': { name: 'Malaysia', country: 'MY', temp: 30.0, description: 'thunderstorm', humidity: 90, wind: 4.2, icon: '11d' },
    'maldives': { name: 'Maldives', country: 'MV', temp: 29.5, description: 'rainy', humidity: 85, wind: 3.9, icon: '09d' },
    'mali': { name: 'Mali', country: 'ML', temp: 34.0, description: 'hot and hazy', humidity: 25, wind: 2.0, icon: '50d' },
    'malta': { name: 'Malta', country: 'MT', temp: 21.0, description: 'clear sky', humidity: 60, wind: 3.0, icon: '01d' },
    'marshall islands': { name: 'Marshall Islands', country: 'MH', temp: 28.5, description: 'tropical showers', humidity: 88, wind: 4.1, icon: '09d' },
    'mauritania': { name: 'Mauritania', country: 'MR', temp: 32.5, description: 'clear and windy', humidity: 35, wind: 5.0, icon: '01d' },
    'mauritius': { name: 'Mauritius', country: 'MU', temp: 26.0, description: 'partly cloudy', humidity: 75, wind: 4.5, icon: '03d' },
    'mexico': { name: 'Mexico', country: 'MX', temp: 19.4, description: 'partly cloudy', humidity: 65, wind: 1.5, icon: '03d' },
    'micronesia': { name: 'Micronesia', country: 'FM', temp: 29.0, description: 'heavy rain', humidity: 95, wind: 4.0, icon: '10d' },
    'moldova': { name: 'Moldova', country: 'MD', temp: 13.0, description: 'broken clouds', humidity: 75, wind: 3.5, icon: '04d' },
    'monaco': { name: 'Monaco', country: 'MC', temp: 18.0, description: 'clear sky', humidity: 55, wind: 1.0, icon: '01d' },
    'mongolia': { name: 'Mongolia', country: 'MN', temp: 3.5, description: 'snow', humidity: 60, wind: 4.8, icon: '13d' },
    'montenegro': { name: 'Montenegro', country: 'ME', temp: 16.5, description: 'few clouds', humidity: 65, wind: 2.2, icon: '02d' },
    'morocco': { name: 'Morocco', country: 'MA', temp: 20.0, description: 'clear sky', humidity: 50, wind: 3.0, icon: '01d' },
    'mozambique': { name: 'Mozambique', country: 'MZ', temp: 27.0, description: 'scattered clouds', humidity: 70, wind: 3.8, icon: '03d' },
    'myanmar': { name: 'Myanmar', country: 'MM', temp: 30.0, description: 'moderate rain', humidity: 88, wind: 4.1, icon: '10d' },

    // N
    'namibia': { name: 'Namibia', country: 'NA', temp: 24.5, description: 'sunny and dry', humidity: 40, wind: 2.5, icon: '01d' },
    'nauru': { name: 'Nauru', country: 'NR', temp: 28.0, description: 'tropical heat', humidity: 80, wind: 3.5, icon: '01d' },
    'nepal': { name: 'Nepal', country: 'NP', temp: 18.0, description: 'partly cloudy', humidity: 65, wind: 1.5, icon: '03d' },
    'netherlands': { name: 'Netherlands', country: 'NL', temp: 9.8, description: 'foggy', humidity: 95, wind: 1.0, icon: '50d' },
    'new zealand': { name: 'New Zealand', country: 'NZ', temp: 15.0, description: 'chilly and rainy', humidity: 75, wind: 5.0, icon: '10d' },
    'nicaragua': { name: 'Nicaragua', country: 'NI', temp: 28.5, description: 'thunderstorm', humidity: 85, wind: 4.0, icon: '11d' },
    'niger': { name: 'Niger', country: 'NE', temp: 35.0, description: 'hot and clear', humidity: 20, wind: 2.5, icon: '01d' },
    'nigeria': { name: 'Nigeria', country: 'NG', temp: 29.1, description: 'heavy rain', humidity: 90, wind: 3.5, icon: '10d' },
    'north korea': { name: 'North Korea', country: 'KP', temp: 10.0, description: 'overcast', humidity: 70, wind: 3.0, icon: '04d' },
    'north macedonia': { name: 'North Macedonia', country: 'MK', temp: 14.0, description: 'few clouds', humidity: 65, wind: 2.7, icon: '02d' },
    'norway': { name: 'Norway', country: 'NO', temp: 5.0, description: 'light snow', humidity: 80, wind: 5.5, icon: '13d' },

    // O
    'oman': { name: 'Oman', country: 'OM', temp: 31.0, description: 'clear sky', humidity: 40, wind: 2.0, icon: '01d' },

    // P
    'pakistan': { name: 'Pakistan', country: 'PK', temp: 26.0, description: 'sunny', humidity: 50, wind: 3.2, icon: '01d' },
    'palau': { name: 'Palau', country: 'PW', temp: 29.5, description: 'tropical showers', humidity: 88, wind: 4.0, icon: '09d' },
    'palestine': { name: 'Palestine', country: 'PS', temp: 21.0, description: 'partly cloudy', humidity: 55, wind: 2.0, icon: '03d' },
    'panama': { name: 'Panama', country: 'PA', temp: 28.0, description: 'rainy', humidity: 90, wind: 3.5, icon: '09d' },
    'papua new guinea': { name: 'Papua New Guinea', country: 'PG', temp: 27.5, description: 'heavy rain', humidity: 92, wind: 4.5, icon: '10d' },
    'paraguay': { name: 'Paraguay', country: 'PY', temp: 24.0, description: 'scattered clouds', humidity: 75, wind: 3.1, icon: '03d' },
    'peru': { name: 'Peru', country: 'PE', temp: 18.0, description: 'misty coastal', humidity: 70, wind: 2.0, icon: '50d' },
    'philippines': { name: 'Philippines', country: 'PH', temp: 30.5, description: 'thunderstorm', humidity: 85, wind: 4.8, icon: '11d' },
    'poland': { name: 'Poland', country: 'PL', temp: 9.0, description: 'broken clouds', humidity: 75, wind: 3.8, icon: '04d' },
    'portugal': { name: 'Portugal', country: 'PT', temp: 18.0, description: 'clear sky', humidity: 60, wind: 4.0, icon: '01d' },

    // Q
    'qatar': { name: 'Qatar', country: 'QA', temp: 32.0, description: 'hot and clear', humidity: 30, wind: 1.5, icon: '01d' },

    // R
    'romania': { name: 'Romania', country: 'RO', temp: 14.0, description: 'few clouds', humidity: 70, wind: 3.0, icon: '02d' },
    'russia': { name: 'Russia', country: 'RU', temp: 5.1, description: 'heavy snow', humidity: 92, wind: 6.2, icon: '13d' },
    'rwanda': { name: 'Rwanda', country: 'RW', temp: 22.0, description: 'light rain', humidity: 75, wind: 2.5, icon: '10d' },

    // S
    'saint kitts and nevis': { name: 'Saint Kitts and Nevis', country: 'KN', temp: 29.0, description: 'sunny', humidity: 78, wind: 4.0, icon: '01d' },
    'saint lucia': { name: 'Saint Lucia', country: 'LC', temp: 28.5, description: 'tropical showers', humidity: 88, wind: 4.5, icon: '09d' },
    'saint vincent and the grenadines': { name: 'Saint Vincent and the Grenadines', country: 'VC', temp: 30.0, description: 'partly cloudy', humidity: 85, wind: 5.0, icon: '03d' },
    'samoa': { name: 'Samoa', country: 'WS', temp: 27.5, description: 'heavy rain', humidity: 90, wind: 4.8, icon: '10d' },
    'san marino': { name: 'San Marino', country: 'SM', temp: 17.0, description: 'few clouds', humidity: 60, wind: 1.5, icon: '02d' },
    'sao tome and principe': { name: 'Sao Tome and Principe', country: 'ST', temp: 28.0, description: 'overcast', humidity: 85, wind: 3.5, icon: '04d' },
    'saudi arabia': { name: 'Saudi Arabia', country: 'SA', temp: 28.0, description: 'clear and hot', humidity: 30, wind: 3.0, icon: '01d' },
    'senegal': { name: 'Senegal', country: 'SN', temp: 31.0, description: 'clear sky', humidity: 55, wind: 4.2, icon: '01d' },
    'serbia': { name: 'Serbia', country: 'RS', temp: 15.0, description: 'broken clouds', humidity: 70, wind: 3.5, icon: '04d' },
    'seychelles': { name: 'Seychelles', country: 'SC', temp: 29.5, description: 'scattered clouds', humidity: 80, wind: 4.0, icon: '03d' },
    'sierra leone': { name: 'Sierra Leone', country: 'SL', temp: 27.0, description: 'heavy rain', humidity: 95, wind: 4.8, icon: '10d' },
    'singapore': { name: 'Singapore', country: 'SG', temp: 29.8, description: 'thunderstorm', humidity: 88, wind: 4.1, icon: '11d' },
    'slovakia': { name: 'Slovakia', country: 'SK', temp: 11.0, description: 'overcast', humidity: 78, wind: 3.0, icon: '04d' },
    'slovenia': { name: 'Slovenia', country: 'SI', temp: 14.5, description: 'light rain', humidity: 75, wind: 2.5, icon: '10d' },
    'solomon islands': { name: 'Solomon Islands', country: 'SB', temp: 28.5, description: 'tropical showers', humidity: 90, wind: 4.0, icon: '09d' },
    'somalia': { name: 'Somalia', country: 'SO', temp: 32.0, description: 'clear and windy', humidity: 40, wind: 5.5, icon: '01d' },
    'south africa': { name: 'South Africa', country: 'ZA', temp: 18.0, description: 'windy and sunny', humidity: 65, wind: 7.5, icon: '01d' },
    'south korea': { name: 'South Korea', country: 'KR', temp: 11.5, description: 'clear', humidity: 60, wind: 2.5, icon: '01d' },
    'south sudan': { name: 'South Sudan', country: 'SS', temp: 30.0, description: 'scattered clouds', humidity: 65, wind: 3.0, icon: '03d' },
    'spain': { name: 'Spain', country: 'ES', temp: 16.9, description: 'clear sky', humidity: 50, wind: 4.0, icon: '01d' },
    'sri lanka': { name: 'Sri Lanka', country: 'LK', temp: 29.0, description: 'moderate rain', humidity: 88, wind: 4.0, icon: '10d' },
    'sudan': { name: 'Sudan', country: 'SD', temp: 33.5, description: 'hot and dry', humidity: 25, wind: 2.8, icon: '01d' },
    'suriname': { name: 'Suriname', country: 'SR', temp: 28.0, description: 'rainy', humidity: 92, wind: 3.5, icon: '09d' },
    'sweden': { name: 'Sweden', country: 'SE', temp: 6.0, description: 'overcast', humidity: 80, wind: 4.0, icon: '04d' },
    'switzerland': { name: 'Switzerland', country: 'CH', temp: 12.0, description: 'few clouds', humidity: 70, wind: 2.0, icon: '02d' },
    'syria': { name: 'Syria', country: 'SY', temp: 20.0, description: 'partly cloudy', humidity: 50, wind: 3.0, icon: '03d' },

    // T
    'taiwan': { name: 'Taiwan', country: 'TW', temp: 25.5, description: 'drizzle', humidity: 80, wind: 3.5, icon: '09d' },
    'tajikistan': { name: 'Tajikistan', country: 'TJ', temp: 13.0, description: 'broken clouds', humidity: 60, wind: 2.5, icon: '04d' },
    'tanzania': { name: 'Tanzania', country: 'TZ', temp: 24.0, description: 'scattered clouds', humidity: 70, wind: 3.0, icon: '03d' },
    'thailand': { name: 'Thailand', country: 'TH', temp: 31.0, description: 'heavy rain', humidity: 90, wind: 4.0, icon: '10d' },
    'timor-leste': { name: 'Timor-Leste', country: 'TL', temp: 28.0, description: 'tropical heat', humidity: 85, wind: 3.5, icon: '01d' },
    'togo': { name: 'Togo', country: 'TG', temp: 29.0, description: 'partly cloudy', humidity: 80, wind: 3.8, icon: '03d' },
    'tonga': { name: 'Tonga', country: 'TO', temp: 26.5, description: 'tropical showers', humidity: 88, wind: 4.5, icon: '09d' },
    'trinidad and tobago': { name: 'Trinidad and Tobago', country: 'TT', temp: 30.0, description: 'thunderstorm', humidity: 85, wind: 5.0, icon: '11d' },
    'tunisia': { name: 'Tunisia', country: 'TN', temp: 22.0, description: 'clear sky', humidity: 55, wind: 2.5, icon: '01d' },
    'turkey': { name: 'Turkey', country: 'TR', temp: 15.6, description: 'moderate breeze', humidity: 68, wind: 3.8, icon: '02d' },
    'turkmenistan': { name: 'Turkmenistan', country: 'TM', temp: 18.0, description: 'sunny', humidity: 40, wind: 3.0, icon: '01d' },
    'tuvalu': { name: 'Tuvalu', country: 'TV', temp: 27.5, description: 'tropical heat', humidity: 90, wind: 4.0, icon: '01d' },

    // U
    'uganda': { name: 'Uganda', country: 'UG', temp: 23.0, description: 'light rain', humidity: 75, wind: 2.8, icon: '10d' },
    'ukraine': { name: 'Ukraine', country: 'UA', temp: 10.0, description: 'overcast', humidity: 80, wind: 4.0, icon: '04d' },
    'united arab emirates': { name: 'United Arab Emirates', country: 'AE', temp: 35.7, description: 'hot and clear', humidity: 30, wind: 1.8, icon: '01d' },
    'united kingdom': { name: 'United Kingdom', country: 'GB', temp: 12.1, description: 'overcast clouds', humidity: 85, wind: 5.5, icon: '04d' },
    'united states': { name: 'United States', country: 'US', temp: 15.2, description: 'clear sky', humidity: 55, wind: 3.5, icon: '01d' },
    'uruguay': { name: 'Uruguay', country: 'UY', temp: 19.0, description: 'few clouds', humidity: 70, wind: 3.0, icon: '02d' },
    'uzbekistan': { name: 'Uzbekistan', country: 'UZ', temp: 15.0, description: 'partly cloudy', humidity: 55, wind: 2.5, icon: '03d' },

    // V
    'vanuatu': { name: 'Vanuatu', country: 'VU', temp: 26.0, description: 'heavy rain', humidity: 92, wind: 4.0, icon: '10d' },
    'vatican city': { name: 'Vatican City', country: 'VA', temp: 17.5, description: 'clear sky', humidity: 60, wind: 1.0, icon: '01d' },
    'venezuela': { name: 'Venezuela', country: 'VE', temp: 28.0, description: 'thunderstorm', humidity: 80, wind: 3.8, icon: '11d' },
    'vietnam': { name: 'Vietnam', country: 'VN', temp: 27.0, description: 'moderate rain', humidity: 88, wind: 3.5, icon: '10d' },

    // Y
    'yemen': { name: 'Yemen', country: 'YE', temp: 24.0, description: 'clear sky', humidity: 45, wind: 2.5, icon: '01d' },

    // Z
    'zambia': { name: 'Zambia', country: 'ZM', temp: 26.0, description: 'scattered clouds', humidity: 65, wind: 3.0, icon: '03d' },
    'zimbabwe': { name: 'Zimbabwe', country: 'ZW', temp: 22.0, description: 'partly cloudy', humidity: 55, wind: 2.2, icon: '03d' },
    
    // Remaining UN Member/Observer States (For a complete 195 list)
    'georgia': { name: 'Georgia', country: 'GE', temp: 15.0, description: 'rain', humidity: 70, wind: 3.0, icon: '10d' },
    'ghana': { name: 'Ghana', country: 'GH', temp: 29.0, description: 'partly cloudy', humidity: 75, wind: 4.1, icon: '03d' },
    'greece': { name: 'Greece', country: 'GR', temp: 19.5, description: 'clear sky', humidity: 55, wind: 3.5, icon: '01d' },
    'guinea': { name: 'Guinea', country: 'GN', temp: 27.0, description: 'overcast', humidity: 85, wind: 3.6, icon: '04d' },
    'guinea-bissau': { name: 'Guinea-Bissau', country: 'GW', temp: 29.5, description: 'scattered clouds', humidity: 78, wind: 3.9, icon: '03d' },
    'iran': { name: 'Iran', country: 'IR', temp: 20.0, description: 'clear sky', humidity: 40, wind: 2.8, icon: '01d' },
    'iraq': { name: 'Iraq', country: 'IQ', temp: 25.0, description: 'sunny', humidity: 30, wind: 3.5, icon: '01d' },
    'laos': { name: 'Laos', country: 'LA', temp: 29.0, description: 'moderate rain', humidity: 88, wind: 3.7, icon: '10d' },
    'lebanon': { name: 'Lebanon', country: 'LB', temp: 19.0, description: 'clear sky', humidity: 55, wind: 2.5, icon: '01d' },
    'libya': { name: 'Libya', country: 'LY', temp: 26.0, description: 'clear sky', humidity: 35, wind: 2.0, icon: '01d' },
    'lithuania': { name: 'Lithuania', country: 'LT', temp: 7.0, description: 'light snow', humidity: 80, wind: 4.8, icon: '13d' },
    'moldova': { name: 'Moldova', country: 'MD', temp: 13.0, description: 'broken clouds', humidity: 75, wind: 3.5, icon: '04d' },
    'myanmar': { name: 'Myanmar', country: 'MM', temp: 30.0, description: 'moderate rain', humidity: 88, wind: 4.1, icon: '10d' },
    'oman': { name: 'Oman', country: 'OM', temp: 31.0, description: 'clear sky', humidity: 40, wind: 2.0, icon: '01d' },
    'palestine': { name: 'Palestine', country: 'PS', temp: 21.0, description: 'partly cloudy', humidity: 55, wind: 2.0, icon: '03d' },
    'sao tome and principe': { name: 'Sao Tome and Principe', country: 'ST', temp: 28.0, description: 'overcast', humidity: 85, wind: 3.5, icon: '04d' },
    'serbia': { name: 'Serbia', country: 'RS', temp: 15.0, description: 'broken clouds', humidity: 70, wind: 3.5, icon: '04d' },
    'sierra leone': { name: 'Sierra Leone', country: 'SL', temp: 27.0, description: 'heavy rain', humidity: 95, wind: 4.8, icon: '10d' },
    'syria': { name: 'Syria', country: 'SY', temp: 20.0, description: 'partly cloudy', humidity: 50, wind: 3.0, icon: '03d' },
    'tajikistan': { name: 'Tajikistan', country: 'TJ', temp: 13.0, description: 'broken clouds', humidity: 60, wind: 2.5, icon: '04d' },
    'united arab emirates': { name: 'United Arab Emirates', country: 'AE', temp: 35.7, description: 'hot and clear', humidity: 30, wind: 1.8, icon: '01d' },
    'vatican city': { name: 'Vatican City', country: 'VA', temp: 17.5, description: 'clear sky', humidity: 60, wind: 1.0, icon: '01d' },
    'yemen': { name: 'Yemen', country: 'YE', temp: 24.0, description: 'clear sky', humidity: 45, wind: 2.5, icon: '01d' },
};


/**
 * Retrieves and displays weather data from the local database based on Country.
 */
function getWeather(country) {
    // Normalize the search query by converting to lowercase and removing spaces
    const countryClean = country.toLowerCase().replace(/\s/g, '');
    
    let data = localWeatherDB[countryClean];

    const weatherCard = document.getElementById('weather-card');
    const errorMessage = document.getElementById('error-message');

    if (data) {
        // Update the UI
        document.getElementById('city-name').textContent = `${data.name}, ${data.country}`;
        document.getElementById('temp').textContent = data.temp.toFixed(1);
        document.getElementById('description').textContent = data.description;
        document.getElementById('humidity').textContent = data.humidity;
        document.getElementById('wind').textContent = data.wind.toFixed(1);
        
        // The icon URL still points to OpenWeatherMap's CDN
        document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
        
        // Show weather card and hide error
        weatherCard.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    } else {
        // Handle 'Country not found' error
        errorMessage.textContent = 'Weather data for this country could not be found in the database. Check spelling or try one of the major countries.';
        errorMessage.classList.remove('hidden');
        weatherCard.classList.add('hidden');
    }
}

// ===================================================
// 3. Event Listeners (Simplified for one input)
// ===================================================

const countryInput = document.getElementById('country-input');
const searchBtn = document.getElementById('search-btn');
const errorMessage = document.getElementById('error-message');
const weatherCard = document.getElementById('weather-card');


function handleSearch() {
    const country = countryInput.value.trim();

    if (country) {
        getWeather(country);
    } else {
        errorMessage.textContent = 'Please enter a country name.';
        errorMessage.classList.remove('hidden');
        weatherCard.classList.add('hidden');
    }
}

searchBtn.addEventListener('click', handleSearch);

// Allow pressing Enter in the input field to trigger the search
countryInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        handleSearch();
    }
});
