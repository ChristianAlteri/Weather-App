

let recentSearches = [];

let exampleUrl = "http://api.openweathermap.org/data/2.5/weather?q=denver&appid=37d5a1d043d687cb9e9c0189aad1636a"
const APIKey = '37d5a1d043d687cb9e9c0189aad1636a'
// let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
url = "http://api.openweathermap.org/data/2.5/weather?q=denver&appid37d5a1d043d687cb9e9c0189aad1636a"


function citySearch(event) {
    event.preventDefault()
    let inputElement = document.getElementById('input-search');
    let city =  inputElement.value;
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    console.log(city);
    // Retrieves the data for the city
        fetch(queryURL)
        .then(function (response) {
            return response.json();
            
        }).then(function (result){
            console.log(result);
            cityName = result.name
            longitude = result.coord.lon
            latitude = result.coord.lat
            temp = result.main.temp
            wind = result.wind.speed
            humidity = result.main.humidity
            $("#weather-card-container").empty();
            $("#display-card").empty();
            displayCurrentDayWeather();
            displayForecast();
            createCityList();
            recentSearches.push({ Name: cityName, longitude: longitude , latitude: latitude});
            localStorage.setItem('recentSearches', JSON.stringify(recentSearches));

               
        })
    
    } 
   
    // pushing the city searched into an array

    // 
    


    function displayForecast(){
        
        const card = $(
        // template literal for current day weather displayed 
        `<div class="row">
                        <div class="col-12">
                            <div class="card mr-3">
                                <div class="card-body">
                                    <h4 id="current-day-city" class="card-title">Search for a city! <br></br> ${cityName} </h4>
                                    <img id="weather-icon" alt="">

                                    <div class="card-text">
                                        <p>Temperature:  <span id="current-day-temp"></span>${temp} </p>
                                        <p>Wind: <span id="current-day-wind"></span>${wind} </p>
                                        <p>Humidity: <span id="current-day-humidity"></span>${humidity} </p>
                                    </div>
                                </div>
                            </div>
                        </div>`);
                        $("#display-card").append(card);
    }                

    function displayCurrentDayWeather(){
        
        const currentWeatherCard = $(                
        // template literal for weather card 
        `<div class="row mx-auto  card">
        <div class="card-body">
        <h6 class="forecast-day-date">2001</h6>
        <div class="card-text">
            <p>Temp: <span id="forecast-day-temp"></span>${temp} </p>
            <p>Wind: <span id="forecast-day-wind"></span>${wind} </p>
            <p>Humidity: <span id="forecast-day-humidity"></span>${humidity} </p>
        </div>
        </div>`);
        $("#weather-card-container").append(currentWeatherCard);
        };



        function createCityList(){ 
        const recentSearchesStr = localStorage.getItem('recentSearches');
        const recentSearches = JSON.parse(recentSearchesStr);
        recentName = recentSearches.Name;
        console.log(recentSearches);
        console.log(recentName);
        // const recentSearchesNames = recentSearches.map(search => search.Name);



        const table = $(
            `<table class="col table table-sm table-light mx-auto">
            <thead>
                <tr>
                    <td>
                        <button type="submit" class="m-3 d-flex btn btn-secondary d-block mx-auto" onclick="citySearch()"></button>
                    </td>
                </tr>
            </thead>
            </table>`);
            $("#city-list").append(table);
        };



