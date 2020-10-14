selectedCitiesEl = document.querySelector("#selectedCities");
searchCityInputEl = document.querySelector("#searchCityInput");
var selectedCitiesAr = [];

// add a city to the list
var addCityToList = function(cityName) {
    var liEl = document.createElement("li");
    liEl.innerHTML = cityName;
    liEl.className= "list-group-item";
    liEl.setAttribute("data-city", cityName);
    selectedCitiesEl.appendChild(liEl);
}
// // save to local storage
var addNewCityToLocalStorage = function(cityName) {
    selectedCitiesAr.push(cityName);
    localStorage.setItem("citiesWeather", JSON.stringify(selectedCitiesAr));
}

// read city from the list
var readCitiesList = function() {
    var listItems = localStorage.getItem("citiesWeather");
    if (listItems){
        selectedCitiesAr = JSON.parse(listItems);

        for (i = 0; i < selectedCitiesAr.length; i++){
            addCityToList(selectedCitiesAr[i]);
        }
    }
}

// get current weather
var getCurrentWeather = function(cityName, needToAddList) {

    // errorEl.innerHTML="";

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=1d4b1aacf5896d38bf0400bb7ba7aced";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
        response.json().then(function(data){
            var containerCurrentWeather = document.getElementById("containerCurrentWeather");
            containerCurrentWeather.className = containerCurrentWeather.className.replace(/\binvisible\b/g, "visble");
            document.getElementById("cityNameWeather").innerHTML = data.name + "&nbsp;(" + moment().format("M/DD/YYYY") + ")";
            document.getElementById("currentWeatherIcon").src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
            document.getElementById("temperature").innerHTML = data.main.temp + "&deg;F";
            document.getElementById("humidity").innerHTML = data.main.temp + "%";
            document.getElementById("windSpeed").innerHTML = data.wind.speed + "MPH";
            document.getElementById("UVIndex").innerHTML = data.main.temp;

        if (needToAddList && !selectedCitiesAr.includes(data.name)){
            addCityToList(data.name);
            addNewCityToLocalStorage(data.name);
        }
        });
    } else {
        displayError(response.statusText, data.name);
        } 
    })
        .catch(function(error){
    displayError("Unable to connect to the server", cityName);
    });
}
// get 5 day forecast
var get5DayWeather = function(cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=1d4b1aacf5896d38bf0400bb7ba7aced";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data){
                console.log(data);

                var j = 1;
                for (i=0; i< data.list.length; i++){
                    // get weather conditions at 3pm
                    if (data.list[i].dt_txt.include("15:00")){
                        var container5DayWeather = document.getElementById("container5DayWeather");
                        container5DayWeather.className = container5DayWeather.className.replace(/\binvisible\b/g, "visible");

                        var container5DayHeading = document.getElementById("container5DayHeading");
                        container5DayHeading.className = container5DayHeading.className.replace(/\binvisible\b/g, "visible");
                        
                        var cardEl = document.getElementById("card" + j);
                        cardEl.className = "card-body bg-primary text-white rounded-sm";
                        cardEl.innerHTML="";

                        var h5El = document.createElement("h5");
                        h5El.innerHTML= moment(data.list[i].dt_txt).format("MM/DD/YYYY");
                        cardEl.appendChild(h5El);

                        var imgIcon = document.createElement("img");
                        imgIcon.src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
                        cardEl.appendChild(imgIcon);
                        
                        var tempEl = document.createElement("div");
                        tempEl.innerHTML = "Temp:&nbsp;&nbsp;" + data.list[i].main.temp + "&degF";
                        cardEl.appendChild(tempEl);

                        var humidityEl = document.createElement("div");
                        humidityEl.innerHTML = "Humidity:&nbsp;&nbsp;" + data.list[i].main.humidity + "%";
                        cardEl.appendChild(humidityEl);
                    
                    j++;
                }
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

// search city on click
var searchCity = function (){
    if (!searchCityInputEl.value){ 
        return;
    }
    var cityName = searchCityInputEl.value.trim();

    // API call
    getCurrentWeather(cityName, true);
    get5DayWeather(cityName);

    searchCityInputEl.value = "";
}

// create search city
var selectCityFromList = function(event) {
    var targetEl = event.target;
    var cityName = event.target.getAttribute("data-city");
    getCurrentWeather(cityName, false);
    get5DayWeather(cityName);
}

selectedCitiesEl.addEventListener("onclick", selectCityFromList);

readCitiesList();