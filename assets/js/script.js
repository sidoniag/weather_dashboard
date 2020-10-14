// var userFormEl = document.querySelector("#user-form");
// apiKey
var apiKey = "1d4b1aacf5896d38bf0400bb7ba7aced";


// // create current locale and date container
// function getForecast(location) {
//     fetch(apiUrl)
//     .then(function(response) {
//         return response.json();
//     })
// }

// create recent searches container

// create api function
var getCurrentWeather = function(cityName, needToAddList) {
    // format the weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "+&appid=" + apiKey;

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
        response.json().then(function(data){
            var containerCurrentWeather = document.getElementById("containerCurrentWeather");
            containerCurrentWeather.className = containerCurrentWeather.className.replace(/\binvisible\b/g, "visble");
            document.getElementById("")

        if (needToAddList && !selectedCitiesAr.includes(data.name)){
            addCityToList(data.name);
            addNewCityToLocalStorage(data.name);
        }
        });
    }
        else {
        alert("Error: " + response.statusText);
    }  
})

    .catch(function(error) {
        // notice this '.catch()' getting chained onto the end of the '.then()' method
        alert("Unable to connect to Weather Data");
    });
}

// create 5 day forecast container
var get5DaysWeather = function(forecast) {
    if (forecast.length === 0) {
        forecastContainerEl.textContent = "No data";
        return;
    }
},

// get current weather
var searchCity = function () {
    if (!searchCityInputEl.value){ 
    return;
    }
    var cityName = searchCityInputEl.value.trim();

    getCurrentWeather(cityName, ture);
    get5DaysWeather(cityName);

    searchCityInputEl.value = "";
}

// create search city
var selectCityFromList = function(event) {
    var targetEl = event.target;
    var cityName = event.target.getAttribute("data-city");
    getCurrentWeather(cityName, false);
    get5DaysWeather(cityName);
}

selectedCitiesEl.addEventListener("click", selectCityFromList);

read CitiesList();