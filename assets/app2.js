

// let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
let recentSearches = [];
const days = [];
for (let i = 0; i < 5; i++) {
  const day = dayjs().add(i, 'day').format('dddd');
  days.push(day);
}

console.log(days);

let exampleUrl = "http://api.openweathermap.org/data/2.5/weather?q=denver&appid=37d5a1d043d687cb9e9c0189aad1636a"
const APIKey = '37d5a1d043d687cb9e9c0189aad1636a'
// let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
url = "http://api.openweathermap.org/data/2.5/weather?q=denver&appid37d5a1d043d687cb9e9c0189aad1636a"


function citySearch(event) {
    event.preventDefault()
    let inputElement = document.getElementById('input-search');
    let city =  inputElement.value;
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    // Retrieves the data for the city
        fetch(queryURL)
        .then(function (response) {
            return response.json();
            
        }).then(function (result){
            console.log(result);
            let cityName = result.name
            let longitude = result.coord.lon
            let latitude = result.coord.lat
            let temp = result.main.temp
            let wind = result.wind.speed
            let humidity = result.main.humidity
            recentSearches.push({Name: cityName});
            localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
            $("#weather-card-container").empty();
            $("#display-card").empty();
            displayCurrentDayWeather(temp, wind, humidity);
            displayForecast(cityName, temp, wind, humidity);
            createCityList(cityName);
            // recentSearches.push({ Name: cityName, longitude: longitude , latitude: latitude, temp: temp, wind: wind, humidity: humidity});
            

               
        })
    
    } 


    function displayForecast(cityName, temp, wind, humidity){
        
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

    function displayCurrentDayWeather(temp, wind, humidity){
        for (let i = 0; i < 5; i++) {
            let fiveDay = days[i]
        const currentWeatherCard = $(                
        // template literal for weather card 
        `<div class="row mx-auto justify-content-center card">
        <div class="card-body mx-auto">
        <h6 class="forecast-day-date">${fiveDay}</h6>
        <div class="card-text mx-auto">
            <p>Temp: <span id="forecast-day-temp"></span>${temp} </p>
            <p>Wind: <span id="forecast-day-wind"></span>${wind} </p>
            <p>Humidity: <span id="forecast-day-humidity"></span>${humidity} </p>
        </div>
        </div>`);
        $("#weather-card-container").append(currentWeatherCard);
        };
    }

        function cityButtonClick(){
            let cityButton = document.getElementById('city-button');
            cityButton.addEventListener("click", createCityList())
            console.log("cityButton");
        };



        function createCityList(){   
        const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        if(recentSearches){
        let recentName = recentSearches[0].Name;
        const table = $(
            `<table class="col table table-sm table-light mx-auto">
            <thead>
                <tr>
                    <td>
                        <button id="city-button" type="submit" class="m-1 d-flex btn btn-secondary d-block mx-auto">${recentName}</button>
                    </td>
                </tr>
            </thead>
            </table>`);
            $("#city-list").append(table);
        }else{

        }
        };




