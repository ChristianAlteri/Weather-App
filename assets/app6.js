// --- Global Variables --- //
const APIKey = "37d5a1d043d687cb9e9c0189aad1636a";
let recentSearches = [];
let recentSearchesData = [];
let searchHistoryArrays = [];
const days = [];
for (let i = 1; i < 6; i++) {
  const day = dayjs().add(i, "day").format("dddd");
  days.push(day);
}
let inputElement = document.getElementById("input-search");

// load list
displayCities();
//  --- Main Function --- //
function citySearch(event) {
  event.preventDefault();
  saveFriend()
  let city = inputElement.value;
  cityCord(city);
}

function displayForecast(newCity) {
  
  const card = $(
    // template literal for current day weather displayed
    `<div class="row mx-auto">
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
                        </div>`
  );
  $("#display-card").append(card);
}

function displayCurrentDayWeather(newCity) {
  
  const currentWeatherCard = $(
    // template literal for weather card
    `<div class="row mx-auto justify-content-center text-center card">
        <div class="card-body mx-auto">
        <h6 class="forecast-day-date">${newCity.fiveDay}</h6>
        <div class="card-text mx-auto">
            <p>Temp: <span id="forecast-day-temp"></span>${newCity.temp}&#xb0; </p>
            <p>Wind: <span id="forecast-day-wind"></span>${newCity.wind}km/h </p>
            <p>Humidity: <span id="forecast-day-humidity"></span>${newCity.humidity}% </p>
        </div>
        </div>`
  );
  $("#weather-card-container").append(currentWeatherCard);
}

function saveFriend() {
  let city = $("#input-search").val();
  if (!city) {
    alert("Please enter a city");
    return;
  }
  let savedCities = JSON.parse(localStorage.getItem("cities")) || [];
  if (savedCities.includes(city)) {
    alert(`You've already searched  ${city}`);
    return;
  }
  savedCities.push(city);
  localStorage.setItem("cities", JSON.stringify(savedCities));
  displayCities(city);
}

function displayCities() {
  var savedCities = JSON.parse(localStorage.getItem("cities")) || [];
  $("#city-list").empty();

  for (const city of savedCities) {
    var btnHTML = $(`
    <button class="m-3 d-flex btn btn-secondary d-block mx-auto" 
    onclick="cityCord('${city}')">${city}</button>
    `);

    $("#city-list").append(btnHTML);
  }
}


// Find the coordinates of the city I've searched
function cityCord(city) {
  let queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      let lon = result.coord.lon;
      let lat = result.coord.lat;
      let newURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=37d5a1d043d687cb9e9c0189aad1636a`;
      weatherData(newURL);
    });
}

function weatherData(newURL) {
  fetch(newURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      const weatherArray = result.list;
      let currentDay = 0;
      $("#weather-card-container").empty();
      $("#display-card").empty();
      for (let i = 0; i < weatherArray.length; i++) {
        // slice the dt_txt property so we only have the 12th character which will leave us with all the times at noon
        if (weatherArray[i].dt_txt.slice(11, 13) == "12") {
          
          let newCity = {
            CityName: inputElement.value.toUpperCase(),
            temp: (weatherArray[i].main.temp - 273.15).toFixed(1),
            wind: weatherArray[i].wind.speed.toFixed(1),
            humidity: weatherArray[i].main.humidity,
            fiveDay: days[currentDay++],
            // const iconID = weatherData.current.weather[0]['icon'];
            //         const iconURL = "http://openweathermap.org/img/w/" + iconID + ".png";
          };
          if(currentDay === 1) {
            displayForecast(newCity);
          }
          console.log(newCity);

          // localStorage.setItem("newCity", JSON.stringify(newCity));
          // recentSearchesData.push(newCity);
          // localStorage.setItem("recentSearches", JSON.stringify(recentSearchesData));
          // recentSearches.push(newCity);
          // $("#display-card").empty();
          displayCurrentDayWeather(newCity);
        }
          
      }
    });
}
