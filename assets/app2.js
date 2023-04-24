
const inputElement = document.getElementById('input-search');
let recentSearches = [];
// let cityName = currentCityName
// let longitute = currentlongitude
// let latitude = currentlatitude


let city =  inputElement.value;
const APIKey = '37d5a1d043d687cb9e9c0189aad1636a'
let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;



function citySearch(event) {
    event.preventDefault()
    // Retrieves the data for the city
        fetch(queryURL)
        .then(function (response) {
            return response.json();
            console.log(queryURL);
        });

    } 
    // let currentCityName = 
    // let weekTemp = 
    // let wind = 
    // let humidity = 
    // let uvIndex = 
    // let currentlatitude = currentWeather.coord.lon
    // let currentlongitude = currentWeather.coord.lat
    // pushing the city searched into an array

    // recentSearches.push({ cityName: "John", longitude: 30 , latitude: 30 });   
    // displayCurrentDayWeather();
    // displayForecast();
    // createCityList();


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
                                        <p>Temperature:  <span id="current-day-temp"></span> </p>
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