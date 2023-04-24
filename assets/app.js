

let recentSearches = [];

const apiKey = '37d5a1d043d687cb9e9c0189aad1636a'

function citySearch() {
    
    // Retrieves the data for the city
    function getOneCallApi(lon, lat) {
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}`)
            .then(function (response) {
                return response.json();
            });
    } 

    // Find the coordinates of the city I've searched
    function getWeatherData(city) {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (currentWeather) {
                console.log(this); 
                return getOneCallApi(currentWeather.coord.lon, currentWeather.coord.lat);
            });
    } 

    // pushing the city searched into an array
    recentSearches.push({ cityName: "John", longitude: 30 , latitude: 30 });   
    displayCurrentDayWeather();
    displayForecast();
    createCityList();
}

    function displayForecast(){
        console.log("active");
        const card = $(
        // template literal for current day weather displayed 
        `<div class="row">
                        <div class="col-12">
                            <div class="card mr-3">
                                <div class="card-body">
                                    <h4 id="current-day-city" class="card-title">Search for a city!</h4>
                                    <img id="weather-icon" alt="">

                                    <div class="card-text">
                                        <p>Temperature: <span id="current-day-temp"></span> </p>
                                        <p>Wind: <span id="current-day-wind"></span> </p>
                                        <p>Humidity: <span id="current-day-humidity"></span> </p>
                                        <div class=" d-block" id="uv-color">
                                            <p>UV index: <span id="current-day-UV"></span> </p></div> 
                                    </div>
                                </div>
                            </div>
                        </div>`);
                        $("#display-card").append(card);
    }                

    function displayCurrentDayWeather(){
        console.log("active");
        const currentWeatherCard = $(                
        // template literal for weather card 
        `<div class="col-2 card">
        <div class="card-body">
        <h6 class="forecast-day-date">2022-06-01 icon</h6>
        <div class="card-text">
            <p>Temp: <span id="forecast-day-temp"></span> </p>
            <p>Wind: <span id="forecast-day-wind"></span> </p>
            <p>Humidity: <span id="forecast-day-humidity"></span> </p>
        </div>
        </div>`);
        $("#weather-card-container").append(currentWeatherCard);
        };



        function createCityList(){ 
        console.log("active");
        const table = $(
            `<table class="col table table-sm table-dark mx-auto">
                            <thead>
                            <tr>
                                <button type="submit" class="m-3 d-flex btn btn-secondary d-block mx-auto" onclick="citySearch(${cityName})">${cityName}</button>
                            </tr>
                            </thead>
                        </table>`);
                        $("#city-list").append(table);
        };



// displayCityList(){

//     createCityList()

// };



// getPastSearches()

// storePastSearches()