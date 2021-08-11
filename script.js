console.log("Hello");

var searchBtn = document.querySelector("#search-btn");
var searchInput = document.getElementById("search-input");
var currentCity = document.querySelector("#current-city");
var weatherForEachDay = document.querySelector("#days");
var weatherInfoDiv = document.querySelector("#infoDiv");
var lastSearched = document.querySelector("#last-searched");
var btnLastSearches = document.querySelectorAll(".last-searches")

arrayOfLastSearches = [];

console.log(arrayOfLastSearches);
console.log(localStorage.getItem("pastSearches"));
displayLastSearched();

var selectedCity = function (event) {
  event.preventDefault();
  displayLastSearched();

  //weatherInfoDiv.innerHTML = "";
  currentCity.textContent = " ";
  weatherForEachDay.textContent = " ";

  console.log("button");
  var search = searchInput.value; //what the user typed

  if (search) {
    console.log("search input: " + search);
    localStorage.setItem("search", search); //set search input in local storage
    searchInput.value = " ";
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

  var iconCode = data.weather[0].icon;
  var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
  var icon = document.createElement("img");
  icon.setAttribute("src", iconUrl);

  arrayOfLastSearches.push(data.name); //trying to push
  localStorage.setItem("pastSearches", JSON.stringify(arrayOfLastSearches));
  currentCity.appendChild(cityName); //add date too and icon
  cityName.appendChild(icon);
}

function displayCurrentWeather(data) {
  var temp = document.createElement("p");
  temp.textContent = "Temp: " + data.current.temp + " *F"; // do we need main is it ferenhight

  var wind = document.createElement("p");
  wind.textContent = "Wind: " + data.current.wind_speed + " MPH"; // do we need main is it mph?

  var humidity = document.createElement("p");
  humidity.textContent = "Humidity: " + data.current.humidity + "%"; // do we need main

  var uvi = data.current.uvi;
  var uvIndex = document.createElement("p");
  uvIndex.textContent = "UV Index: "; // do we need main

  var uviBox = document.createElement("span");
  uviBox.textContent = uvi;

  if (uvi > 0 && uvi <= 2) {
    console.log("green");
    uviBox.classList = "uviGreen";
  } else if (uvi >= 3 && uvi <= 5) {
    console.log("yellow");
    uviBox.classList = "uviYellow";
  } else if (uvi >= 6 && uvi <= 7) {
    console.log("orange");
    uviBox.classList = "uviOrange";
  } else if (uvi >= 8 && uvi <= 10) {
    console.log("red");
    uviBox.classList = "uviRed";
  } else if (uvi > 11) {
    console.log("violet");
    uviBox.classList = "uviViolet";
  }

  currentCity.appendChild(temp);
  currentCity.appendChild(wind);
  currentCity.appendChild(humidity);
  currentCity.appendChild(uvIndex);
  uvIndex.appendChild(uviBox);
}
function displayDays(data) {
  for (let i = 0; i < 5; i++) {
    console.log(data.daily[i]);

    var iconCode = data.daily[i].weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    var icon = document.createElement("img");
    icon.setAttribute("src", iconUrl);

    var dayDiv = document.createElement("div");
    dayDiv.classList = "dayDivs col-sm"; //col-12 col-md-2 col-lg-3
    var temp = document.createElement("p");
    temp.textContent = "Temp: " + data.daily[i].temp.day + " *F";

    var wind = document.createElement("p");
    wind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH"; // do we need main is it mph?

    var humidity = document.createElement("p");
    humidity.textContent = "Humidity: " + data.daily[i].humidity + "%";

    weatherForEachDay.appendChild(dayDiv);
    dayDiv.appendChild(icon);
    dayDiv.appendChild(temp);
    dayDiv.appendChild(wind);
    dayDiv.appendChild(humidity);
    console.log(arrayOfLastSearches);
  }
}

function displayLastSearched() {
    var pastSearches = JSON.parse(localStorage.getItem("pastSearches"));

    if (pastSearches != null){

    
  for (var i = 0; i < pastSearches.length; i++) {
    console.log(pastSearches[i]);
    var lastSearch = document.createElement("button");
    lastSearch.textContent = pastSearches[i];
    lastSearch.classList = "btn last-searches";

    lastSearched.appendChild(lastSearch);
  }
}
}


//things to do
//clear div if type a new one
//weatherInfoDiv.innerHTML = "";
//uv index
//last seraches
//date
//icon next to date

/*
  <button class = " btn last-searches">New York</button>
                  <button class = "last-searches"></button>
                  <button class = "last-searches"></button>
                  <button class = "last-searches"></button>
                  <button class = "last-searches"></button>
                  <button class = "last-searches"></button>
*/
