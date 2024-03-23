const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

document.addEventListener('DOMContentLoaded', function() {
    weatherFn('Algiers');
});

async function weatherFn(cityName) {
    const apiUrl = `${url}?q=${cityName}&appid=${apiKey}&units=metric`;
    try {
        const response = await axios.get(apiUrl);
        if (!response.data) {
            throw new Error('City not found. Please try again.');
        }
        weatherShowFn(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert(error.message);
    }
}

function weatherShowFn(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('date').textContent = moment().format('MMMM Do YYYY, h:mm:ss a');
    document.getElementById('temperature').innerHTML = `${data.main.temp}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('wind-speed').innerHTML = `Wind Speed: ${data.wind.speed} m/s`;
    const iconId = data.weather[0].icon;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconId}.png`;
    document.getElementById('weather-info').style.display = 'block';
}
