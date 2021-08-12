var searchBtn = document.querySelector("#search-btn");
var searchInput = document.getElementById("search-input");
var currentCity = document.querySelector("#current-city");
var weatherForEachDay = document.querySelector("#days");
var weatherInfoDiv = document.querySelector("#infoDiv");
var lastSearched = document.querySelector("#last-searched");
var btnLastSearches = document.getElementsByClassName("last-searches");
var daysheading = document.querySelector("#daysHeading");

var arrayOfLastSearches =
  JSON.parse(localStorage.getItem("pastSearches")) || [];
console.log(arrayOfLastSearches);
console.log(localStorage.getItem("pastSearches"));
displayLastSearched();

var selectedCity = function (event) {
  event.preventDefault();

  currentCity.textContent = " ";
  weatherForEachDay.textContent = " ";

  console.log("button");
  var search = searchInput.value; //what the user typed

  if (search) {
    console.log("search input: " + search);
    localStorage.setItem("search", search); 
    searchInput.value = " ";
    getWeatherForCity(search);

  } else {
    console.log("nothing typed in");
    return;
  }
};

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
          displayLastSearched();
        });
      });
    } else {
      console.log("not ok"); 
      alert("Error..Try Again")
    }
  });
}
function displayCurrentCity(data) {
  var cityName = document.createElement("h2");
  cityName.textContent = data.name + " ";
  var date = document.createElement("h2");
  date.textContent = moment.unix(data.dt).format("MM/DD/YYYY"); //unix
  var iconCode = data.weather[0].icon;
  var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
  var icon = document.createElement("img");
  icon.setAttribute("src", iconUrl);

  currentCity.appendChild(cityName); 
  cityName.appendChild(date);
  cityName.appendChild(icon);

  if (arrayOfLastSearches.includes(data.name)) {
    return;
  } else {
    arrayOfLastSearches.push(data.name); //trying to push
  }

  localStorage.setItem("pastSearches", JSON.stringify(arrayOfLastSearches));

  arrayOfLastSearches = JSON.parse(localStorage.getItem("pastSearches"));
  if (arrayOfLastSearches.length > 8) {
    arrayOfLastSearches.shift();
  }
}

function displayCurrentWeather(data) {
  var temp = document.createElement("p");
  temp.textContent = "Temp: " + data.current.temp + " *F"; 

  var wind = document.createElement("p");
  wind.textContent = "Wind: " + data.current.wind_speed + " MPH"; 

  var humidity = document.createElement("p");
  humidity.textContent = "Humidity: " + data.current.humidity + "%";

  var uvi = data.current.uvi;
  var uvIndex = document.createElement("p");
  uvIndex.textContent = "UV Index: "; 

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
  daysheading.textContent = "5-Day Forecast:";

  for (let i = 0; i < 5; i++) {
    console.log(data.daily[i]);

    var iconCode = data.daily[i].weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    var icon = document.createElement("img");
    icon.setAttribute("src", iconUrl);

    var dayDiv = document.createElement("div");
    dayDiv.classList = "dayDivs col-sm"; 
    var temp = document.createElement("p");
    temp.textContent = "Temp: " + data.daily[i].temp.day + " *F";

    var wind = document.createElement("p");
    wind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH"; 

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
  var pastSearches = JSON.parse(localStorage.getItem("pastSearches")) || [];
  console.log(pastSearches);
  console.log(pastSearches.length);
  console.log("cliked");
  if (pastSearches.length !== 0) {
 
    lastSearched.innerHTML = "";
    for (var i = 0; i < pastSearches.length; i++) {
      console.log(pastSearches[i]);
      var lastSearch = document.createElement("button");
      lastSearch.textContent = pastSearches[i];
      lastSearch.classList = "btn last-searches";

      lastSearched.appendChild(lastSearch);
    }
    document.querySelectorAll(".last-searches").forEach((item) => {
  item.addEventListener("click", function (event) {
    event.preventDefault();

    var value = event.target.textContent;
    console.log(event.target.textContent);
    getWeatherForCity(value);
    currentCity.textContent = " ";
    weatherForEachDay.textContent = " ";
  });
});
  }
}


searchBtn.addEventListener("click", selectedCity);
