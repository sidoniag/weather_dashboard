// apiKey
var apiKey = "1d4b1aacf5896d38bf0400bb7ba7aced";
var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '+&appid=' + apiKey;
// create input form 
$("#searchBtn").on("click", function() {
    var location = $("#location").val();
    if(location === ''){
        alert("Please enter a city");
    }
    $("#location").val("");
    getForecast(location);
});

// create current locale and date container
function getForecast(location) {
    fetch(apiUrl)
    .then(function(response) {
        return response.json();
    })
}
// create 5 day forecast container

var displayWeather = function(forecast) {
    if (forecast.length === 0) {
        forecastContainerEl.textContent = "No data";
        return;
    }

}
// create recent searches container

// create api function
var getCurrentWeather = function(location) {
    // format the weather api url
    var apiUrl = "api.openweathermap.org/data/2.5/weather?q=" + location "&appid=" + apiKey}


    // make a request to the url
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
        response.json().then(function(data){
            displayCurrentWeather(data,location);
        });
    }   else {
        alert("Error: " + response.statusText);
    }  
    })
    .catch(function(error) {
        // notice this '.catch()' getting chained onto the end of the '.then()' method
        alert("Unable to connect to Weather Data");
    });

    // store in localStorage

