selectedCitiesEl = document.querySelector("#selectedCities");
searchCityInputEl = document.querySelector("#searchCityInput");
var selectedCitiesAr = [];

var addCityToList = function(cityName) {
    var liEl = document.createElement("li");
    liEl.innerHTML = cityName;
    liEl.className= "list-group-item";
    liEl.setAttribute("data-city", cityName);
    selectedCitiesEl.appendChild(liEl);
}
// // create current locale and date container
var addNewCityToLocalStorage = function(cityName) {
    selectedCitiesAr.push(cityName);
    localStorage.setItem("citiesWeather", JSON.stringify(selectedCitiesAr));
}

// read list
var readCitiesList = function() {
    var listItems = localStorage.getItem("citiesWeather");
    if (listItems){
        selectedCitiesAr = JSON.parse(listItems);

        for (i = 0; i < selectedCitiesAr.length; i++){
            addCityToList(selectedCitiesAr[i]);
        }
    }
}

// create api function
var getCurrentWeather = function(cityName, needToAddList) {
    // format the weather api url
    // errorEl.innerHTML="";

var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial+&appid=1d4b1aacf5896d38bf0400bb7ba7aced";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        console.log(response);
        if (response.ok) {
        response.json().then(function(data){
            var containerCurrentWeather = document.getElementById("containerCurrentWeather");
            containerCurrentWeather.className = containerCurrentWeather.className.replace(/\binvisible\b/g, "visble");
            document.getElementById("cityNameWeather").innerHTML = data.name + "&nbsp;&nbsp;(" + moment().format("M/DD/YYYY") + ")";
            document.getElementById("currentWeatherIcon").src = "http://openweathermap.org/img/wn" + data.weather[0].icon + ".png";
            document.getElementById("temperature").innerHTML = data.main.temp + "F";
            document.getElementById("humidity").innerHTML = data.main.temp + "%";
            document.getElementById("windSpeed").innerHTML = data.wind.speed + "MPH";
            document.getElementById("UVIndex").innerHTML = data.main.temp;

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

//     .catch(function(error) {
//         // notice this '.catch()' getting chained onto the end of the '.then()' method
//         alert("Unable to connect to Weather Data");
//     });
// }

// create 5 day forecast container
var get5DaysWeather = function(cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial+&appid=1d4b1aacf5896d38bf0400bb7ba7aced";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data){

                console.log(data);

                var j = 1;
                for (i=0; i< data.list.length; i++){
                    
                    j++;
                }
            });
} else {
    displayError(response.statusText, cityName);
    }
})
.catch(function(error){
        displayError("Unable to connect to the server", cityName);
    });
}
};

// get current weather
var searchCity = function (){
    if (!searchCityInputEl.value){ 
        return;
    }
    var cityName = searchCityInputEl.value.trim();

    // API call
    getCurrentWeather(cityName, true);
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

selectedCitiesEl.addEventListener("onclick", selectCityFromList);

readCitiesList();