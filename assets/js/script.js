//API Key
var APIKey= "060e7e9eba72369f7f70faf21f68c505";

//document variables
var searchForm = document.querySelector("form")
var searchInput= document.getElementById("search");
var searchBtn= document.getElementById("search-button");
var cityList= document.getElementById("list-buttons");

// current city variables
var currentCitySec= document.querySelector("section");
var citySelected= document.getElementById("city");
var today= document.getElementById("date");
var cityTemp= document.getElementById("temp");
var cityWeather = document.getElementById("weather");
var cityWind= document.getElementById("wind");
var cityHumidity=document.getElementById("humidity");
var icon = document.getElementById("weather-icon"); 

// five-day forecast variables
var forecastDate = document.querySelectorAll("#forecast-date");
var forecastWeather = document.querySelectorAll("#forecast-weather");
var forecastTemp = document.querySelectorAll("#forecast-temp");
var forecastWind= document.querySelectorAll("#forecast-wind");
var forecastHumidity=document.querySelectorAll("#forecast-humidity");
var forecastIcon = document.querySelectorAll("#forecast-icon");

//setInterval for time
setInterval(function(){
    var dateTime= dayjs().format('MMMM D, YYYY [at] HH:mm:ss');
    $('#currentTime').text(dateTime);
}, 1000);

//fetch weather & five-day forecast
function fetchWeather() {
    currentCitySec.setAttribute("id", "")

    const citySearchVal = searchInput.value;
    const cityURL = `https://api.openweathermap.org/data/2.5/weather?q=${citySearchVal}&appid=${APIKey}&units=imperial`
    
    console.log(citySearchVal)

    fetch(cityURL).then(res => res.json()).then(data => {
        lat = data.coord.lat;
        lon = data.coord.lon;

        const geoURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;

        fetch(geoURL).then(res => res.json()).then(data => {
            const city = data.name;
            const country = data.sys.country;
            const temp = data.main.temp;
            const weather = data.weather[0].main;
            const weatherIcon = data.weather[0].icon;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            citySelected.textContent = city + ', ' + country;
            cityTemp.textContent = 'Current Temperature: ' + temp + '°F';
            cityWeather.textContent = 'Weather: ' + weather;
            cityWind.textContent = 'Wind Speed: ' + windSpeed + 'mph';
            cityHumidity.textContent = 'Humidity: ' + humidity + '%';
            icon.src = 'http://openweathermap.org/img/w/' + weatherIcon + '.png'
        })

        //5-day forecast
        const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`
        
        fetch(forecastURL).then(res => res.json()).then(data => {
            for (var i = 0; i <= 5; i ++) {
                const forecastData = data.list;
                
                const dayDate = dayjs.unix(forecastData[i*8].dt).format('MM/DD/YYYY');
                const dayWeather = forecastData[i*8].weather[0].main;
                const dayTemp = 'Temp: ' + forecastData[i*8].main.temp + '°F';
                const dayWind = 'Wind Speed: ' + forecastData[i*8].wind.speed + 'mph';
                const dayHumidity = 'Humidity: ' + forecastData[i*8].main.humidity + '%';
                const dayIcon = 'http://openweathermap.org/img/w/' + forecastData[i*8].weather[0].icon + '.png';

                forecastDate[i].textContent = dayDate;
                forecastWeather[i].textContent = dayWeather;
                forecastTemp[i].textContent = dayTemp;
                forecastWind[i].textContent = dayWind;
                forecastHumidity[i].textContent = dayHumidity;
                forecastIcon[i].src = dayIcon;
            }
        })
    })
}

//saves search as buttons to revisit
function recentSearch() {
    const searchInputVal = document.getElementById("search").value;
    const citySearchArr = JSON.parse(localStorage.getItem("city-search")) || [];
    const searchHistoryBtn = document.createElement("button");
    
    searchHistoryBtn.textContent = searchInputVal;
    document.getElementById("list-buttons").appendChild(searchHistoryBtn);
    searchHistoryBtn.addEventListener("click", renderCity);

    citySearchArr.push(searchInputVal);
    localStorage.setItem("city-search", JSON.stringify(citySearchArr));
}

//render city from search buttons
function renderCity(event) {
    event.preventDefault();
    searchInput.value = event.target.textContent;
    fetchWeather();
    clearSubmit();
}

//clear input form
function clearSubmit() {
    document.getElementById("search").value=('');
}

//event listeners for search button
searchBtn.addEventListener("click", function (event){
    event.preventDefault();
    recentSearch();
    fetchWeather();
    clearSubmit();
})