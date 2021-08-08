console.log("Hello");

var searchBtn = document.querySelector("#search-btn");
var searchInput = document.getElementById("search-input");
var currentCity = document.querySelector("#current-city");
var weatherForEachDay = document.querySelector("#days");
var weatherInfoDiv = document.querySelector("#infoDiv");

var selectedCity = function (event) {
  event.preventDefault(); //for now
  console.log("button");
  var search = searchInput.value; //what the user typed

  if (search) {
    console.log("search input: " + search);
    localStorage.setItem("search", search); //set search input in local storage
    getWeatherForCity(search);
  } else {
    console.log("nothing typed in");
    return;
  }
};

searchBtn.addEventListener("click", selectedCity);

function getWeatherForCity(city) {
  console.log("get weather for city");
  console.log(city);

  var APIKey = "5f25c58cb505af133f8cf0057ac725a0";

  var WeatherAPI =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;

  fetch(WeatherAPI).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        console.log(data.coord);
        console.log(data.coord.lat);
        console.log(data.coord.lon);
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        displayCurrentCity(data);

        var WeatherDaysAPI =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=" +
          APIKey;

        fetch(WeatherDaysAPI).then(function (response) {
          if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
              console.log(data);
              displayCurrentWeather(data);
              displayDays(data);
            });
          }
        });
      });
    } else {
      console.log("not ok");
    }
  });
}
function displayCurrentCity(data) {
  var cityName = document.createElement("h2");
  cityName.textContent = data.name;

  currentCity.appendChild(cityName); //add date too
}

function displayCurrentWeather(data) {
  var temp = document.createElement("p");
  temp.textContent = "Temp: " + data.current.temp + " *F"; // do we need main is it ferenhight

  var wind = document.createElement("p");
  wind.textContent = "Wind: " + data.current.wind_speed + " MPH"; // do we need main is it mph?

  var humidity = document.createElement("p");
  humidity.textContent = "Humidity: " + data.current.humidity + "%"; // do we need main

  var uvIndex = document.createElement("p");
  uvIndex.textContent = "UV Index: " + data.current.uvi; // do we need main

  currentCity.appendChild(temp);
  currentCity.appendChild(wind);
  currentCity.appendChild(humidity);
  currentCity.appendChild(uvIndex);
}
function displayDays(data) {
  for (let i = 0; i < 5; i++) {
    console.log(data.daily[i]);
    
    var iconCode = data.daily[i].weather[0].icon 
    var iconUrl = "http://openweathermap.org/img/w/"+iconCode+".png"
    var icon = document.createElement("img")
    icon.setAttribute("src",iconUrl)

    var dayDiv = document.createElement("div");
    dayDiv.classList = "dayDivs col-12 col-md-3";
    var temp = document.createElement("p");
    temp.textContent = "Temp: " + data.daily[i].temp.day + " *F";

    var wind = document.createElement("p");
    wind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH"; // do we need main is it mph?

    var humidity = document.createElement("p");
    humidity.textContent = "Humidity: " + data.daily[i].humidity + "%";

    weatherForEachDay.appendChild(dayDiv);
    dayDiv.appendChild(icon)
    dayDiv.appendChild(temp);
    dayDiv.appendChild(wind);
    dayDiv.appendChild(humidity);
  }
}
//needs current city so  .name
// temp is main.temp
//wind wind.speed
//main/humidity
//weather.description and put icons depending

/*
<h2 id = "city">CURRENT CITY AND DAY</h2>

                <p id = "temp">Temp:</p>
                <p id = "wind">Wind:</p>
                <p id = "humidity">Humidity:</p>
                <p id = "uv-index">UV Index:</p>

*/


//things to do 
//clear div if type a new one 
//weatherInfoDiv.innerHTML = "HI ";