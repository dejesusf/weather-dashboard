//API Key
var APIKey= "060e7e9eba72369f7f70faf21f68c505";

//variables
var searchInput= document.getElementById("search");
var searchBtn= document.getElementById("search-button");
var cityList= document.getElementById("list-buttons")
var currentCityEl= document.getElementById("current-city");
var citySel= document.getElementById("city");
var cityTemp= document.getElementById("temp");
var cityWind= document.getElementById("wind");
var cityHumidity=document.getElementById("humidity");
//icon for weather
//temp, humidity, weather for 5 day forecast
var queryURL= ('https://api.openweathermap.org/data/2.5/weather?q={input}&appid={APIKey}')

//search history
//save input in localStorage (set, get)
function saveSearchHistory() {
    var citySearch= searchInput.value;
    localStorage.setItem("city-search", JSON.stringify(citySearch)); 
}

//display input from localStorage as a list below search input
function renderSearchHistory() {
    var cityValue=JSON.parse(localStorage.getItem('city-search'))
    if (cityValue !== null) {
       var newLi= document.createElement("li");
            cityList.appendChild(newLi);
            var newBtn= document.createElement("button");
            newBtn.innerHTML=cityValue;
            newLi.appendChild(newBtn);

    } else {
      return;
    }
}

//clear input form
function clearSubmit() {
    document.getElementById("search").value=('');
}

//event listener for search button
searchBtn.addEventListener("click", function (event){
    event.preventDefault();
    saveSearchHistory();
    renderSearchHistory();
    clearSubmit();
})