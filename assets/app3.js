

// let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
let recentSearches = [];
const days = [];
for (let i = 0; i < 5; i++) {
  const day = dayjs().add(i, 'day').format('dddd');
  days.push(day);
}

console.log(days);


const APIKey = '37d5a1d043d687cb9e9c0189aad1636a'
// let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
// "https://api.openweathermap.org/data/2.5/onecall?appid=37d5a1d043d687cb9e9c0189aad1636a&q=" + city + "&units=imperial&exclude=minutely,hourly"

    let inputElement = document.getElementById('input-search');
    
    
    

function citySearch(event) {
    event.preventDefault()
    cityCord();
    // weatherData(new);
    

    // // Retrieves the data for the city
    //     fetch(queryURL)
    //     .then(function (response) {
    //         return response.json();
            
    //     }).then(function (result){
    //         console.log(result);
    //         
    //     }   fetch(newURL)
    //         .then(function) (result){
    //         // 
            
    //         let cityName = result.name
    //         let temp = result.main.temp
    //         let wind = result.wind.speed
    //         let humidity = result.main.humidity
    //         const iconID = weatherData.current.weather[0]['icon'];
    //         const iconURL = "http://openweathermap.org/img/w/" + iconID + ".png";
    //         console.log(iconURL)

    //         $("#weather-card-container").empty();
    //         $("#display-card").empty();
    //         displayCurrentDayWeather(temp, wind, humidity);
    //         displayForecast(cityName, temp, wind, humidity);
    //         createCityList(cityName);
    //         console.log(result);

    //         }    
    //     })
    
    } 


    function displayForecast(cityName, temp, wind, humidity){
        
        const card = $(
        // template literal for current day weather displayed 
        `<div class="row">
                        <div class="col-12">
                            <div class="card mr-3">
                                <div class="card-body">
                                    <h4 id="current-day-city" class="card-title">Search for a city! <br></br> ${cityName} </h4>
                                    

                                    <div class="card-text">
                                        <p> Temperature:  <span id="current-day-temp"></span>${temp}&#xb0; </p>
                                        <p>Wind: <span id="current-day-wind"></span>${wind}km/h </p>
                                        <p>Humidity: <span id="current-day-humidity"></span>${humidity}% </p>
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
            <p>Temp: <span id="forecast-day-temp"></span>${temp}&#xb0; </p>
            <p>Wind: <span id="forecast-day-wind"></span>${wind}km/h </p>
            <p>Humidity: <span id="forecast-day-humidity"></span>${humidity}% </p>
        </div>
        </div>`);
        $("#weather-card-container").append(currentWeatherCard);
        };
    }
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

        // function cityButtonClick(){
        //     let cityButton = document.getElementById('city-button');
        //     cityButton.addEventListener("click", createCityList())
        //     console.log("cityButton");
        // };

        
        // Find the coordinates of the city I've searched
        function cityCord() {
            let city =  inputElement.value;
            let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
             fetch(queryURL)
              .then(function (response) {
                return response.json();
              })
              .then(function (result) {
                let lon = result.coord.lon;
                let lat = result.coord.lat;
                let newURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=37d5a1d043d687cb9e9c0189aad1636a`;
                weatherData(newURL);
                // return weatherData(newURL); 

              });
          }
          
          
              function weatherData(newURL) {
                fetch(newURL)
                  .then(function (response) {
                    return response.json();
                  })
                  .then(function (result) {
                    const weatherArray = result.list;
                    for (let i = 0; i < weatherArray.length; i++) {
                      // WITHIN EACH OBJECT WE SEE A PROPERTY CALLED dt_txt
                      if (weatherArray[i].dt_txt.slice(11, 13) == "12") {
                        console.log(weatherArray[i]);
                        let cityName = inputElement.value
                        let tempKel = weatherArray[i].main.temp
                        let temp = (tempKel - 273.15).toFixed(1)
                        let wind = weatherArray[i].wind.speed.toFixed(1)
                        let humidity = weatherArray[i].main.humidity
                        recentSearches.push({ Name: cityName, temp: temp, wind: wind, humidity: humidity});
                        localStorage.setItem('recentSearches', JSON.stringify(recentSearches)); 
                        console.log(recentSearches);
                        $("#weather-card-container").empty();
                        $("#display-card").empty();
                        displayCurrentDayWeather(temp, wind, humidity);
                        displayForecast(cityName, temp, wind, humidity);
                        createCityList(cityName);
                      }
                      
                    }
                    
                  });
              }

          
          