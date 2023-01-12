//API Key
var APIKey= "060e7e9eba72369f7f70faf21f68c505";

//variables
var searchInput= document.getElementById("search");
var searchBtn= document.getElementById("search-button");
var cityList= document.getElementById("list-buttons")
var currentCityEl= document.getElementById("current-city");
var citySel= document.getElementById("city");
var today= document.getElementById("date");
var cityTemp= document.getElementById("temp");
var cityWind= document.getElementById("wind");
var cityHumidity=document.getElementById("humidity");
//icon for weather
//temp, humidity, weather for 5 day forecast
var queryURL= ('https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${APIKey}')

//search history
//save input in localStorage (set, get)
function saveSearchHistory() {
    var citySearch= searchInput.value;

    localStorage.setItem("city-search", JSON.stringify(citySearch)); 
}

//display input from localStorage as a list below search input
function renderSearchHistory() {
    var cityValue=JSON.parse(localStorage.getItem('city-search'));

    if (cityValue !== "") {
        var newLi= document.createElement("li");

        cityList.appendChild(newLi);
        var newBtn= document.createElement("button");

        newBtn.innerHTML=cityValue;
        newLi.appendChild(newBtn);
        
        fetch ('https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${APIKey}', {
            cache:'reload',
        })
        .then(function (response) {
            return response.JSON();
        })
        .then (function (data) {
            console.log(data);
            var date= dayjs().format('MMMM D, YYYY');
            
            citySel.textContent(data.name);
            today.textContent('Date: '+date);
            cityTemp.textContent('Temp: '+data.temp);
            cityWind.textContent('Wind Speed: '+data.wind.speed);cityHumidity.textContent('Humidity: '+data.main.humidity);})
    }
}

//clear input form
function clearSubmit() {
    document.getElementById("search").value=('');
}

//setInterval for time
setInterval(function(){
    var dateTime= dayjs().format('MMMM D, YYYY [at] HH:mm:ss');
    $('#currentTime').text(dateTime);
  }, 1000);

//event listener for search button
searchBtn.addEventListener("click", function (event){
    event.preventDefault();
    saveSearchHistory();
    renderSearchHistory();
    clearSubmit();
})