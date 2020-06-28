var apiKey = "1d4b1aacf5896d38bf0400bb7ba7aced";

var getCurrentWeather = function(location) {
    // format the github api url
    var apiUrl = "api.openweathermap.org/data/2.5/weather?q=" + location "&appid=" + apiKey}


    // make a request to the url
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
        response.json().then(function(data){
            displayRepos(data,location);
        });
    }   else {
        alert("Error: " + response.statusText);
    }  
    })
    .catch(function(error) {
        // notice this '.catch()' getting chained onto the end of the '.then()' method
        alert("Unable to connect to GitHub");
    });