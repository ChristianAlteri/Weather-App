

// let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
let recentSearches = [];
let recentSearchesData = [];
const days = [];
for (let i = 1; i < 6; i++) {
  const day = dayjs().add(i, 'day').format('dddd');
  days.push(day);
}

      




const APIKey = '37d5a1d043d687cb9e9c0189aad1636a'

let inputElement = document.getElementById('input-search');
    
    
    

function citySearch(event) {
    event.preventDefault()
    cityCord();
    // setNewCity(newCity);
    createCityList();
    
    
    } 


    function displayForecast(newCity){
        
        const card = $(
        // template literal for current day weather displayed 
        `<div class="row">
                        <div class="col-12">
                            <div class="card mr-3">
                                <div class="card-body">
                                    <h4 id="current-day-city" class="card-title">Search for a city! <br></br> ${newCity.CityName} </h4>
                                    

                                    <div class="card-text">
                                        <p> Temperature:  <span id="current-day-temp"></span>${newCity.temp}&#xb0; </p>
                                        <p>Wind: <span id="current-day-wind"></span>${newCity.wind}km/h </p>
                                        <p>Humidity: <span id="current-day-humidity"></span>${newCity.humidity}% </p>
                                    </div>
                                </div>
                            </div>
                        </div>`);
                        $("#display-card").append(card);
    }                
    function displayCurrentDayWeather(newCity){
        
        const currentWeatherCard = $(                
        // template literal for weather card 
        `<div class="row mx-auto justify-content-center card">
        <div class="card-body mx-auto">
        <h6 class="forecast-day-date">${newCity.fiveDay}</h6>
        <div class="card-text mx-auto">
            <p>Temp: <span id="forecast-day-temp"></span>${newCity.temp}&#xb0; </p>
            <p>Wind: <span id="forecast-day-wind"></span>${newCity.wind}km/h </p>
            <p>Humidity: <span id="forecast-day-humidity"></span>${newCity.humidity}% </p>
        </div>
        </div>`);
        $("#weather-card-container").append(currentWeatherCard);
        
    }
    function createCityList(){ 
    // let newCity =  inputElement.value; 
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    // // recentSearches.push(newCity)
    if(recentSearches){
        let recentName = recentSearches;
        // console.log(recentName);
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


                let newCity = {
                    CityName: inputElement.value.toUpperCase(),
                    temp: (weatherArray[i].main.temp - 273.15).toFixed(1),
                    wind: weatherArray[i].wind.speed.toFixed(1),
                    humidity: weatherArray[i].main.humidity,
                    fiveDay:  days[i],
                        
                        
                    // const iconID = weatherData.current.weather[0]['icon'];
            //         const iconURL = "http://openweathermap.org/img/w/" + iconID + ".png";
                    };
                    console.log(days);
                    console.log(newCity);

                    
                localStorage.setItem('newCity', JSON.stringify(newCity));
                recentSearchesData.push(newCity);
                // recentSearches.push({ Name: cityName, temp: temp, wind: wind, humidity: humidity});
                // console.log(recentSearchesData); 
                // $("#weather-card-container").empty();
                displayCurrentDayWeather(newCity);
                $("#display-card").empty();
                displayForecast(newCity);
                
                }
                
            }
            
            });
        
        }
    
        // function setNewCity(newCity) {
        //     localStorage.setItem('recentSearches', JSON.stringify(newCity.CityName));
        //     recentSearches.push(newCity.CityName);
        //     console.log(recentSearches);         
        // }
