const apikey = '366976a66ad1185735c56200253e6ae3';
const locationElement = document.getElementById('city');
const cityElement = document.querySelector('.city');
const temperatureElement = document.querySelector('.temp-div');
const searchButton = document.querySelector('.search-button');
const imageElement = document.querySelector('.image-div');
const minElement = document.querySelector('.min-temp');
const maxElement = document.querySelector('.max-temp');
searchButton.addEventListener('click' , ()=>{
    if(locationElement.value) {
        fetchWeather(locationElement.value);
    }
    else {
        alert('Enter a city');
    }
});

locationElement.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        fetchWeather(locationElement.value);
    }
});

function fetchWeather(location) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.cod === '404') {
            alert('City not found');
        }
        else{
            let icon = data.weather[0].icon;
            temperatureElement.innerHTML = data.main.temp + '&deg;C';
            cityElement.textContent = data.name;
            minElement.innerHTML = `
                Min
                <p class="min-temp">${data.main.temp_min + '&deg;C'}</p>
                `;
            maxElement.innerHTML = `
                Max
                <p class="min-temp">${data.main.temp_max + '&deg;C'}</p>
                `;
            imageElement.innerHTML = `
            <img src="https://openweathermap.org/img/wn/${
                icon
              }@2x.png" alt="">
            `;
        }

    })
}