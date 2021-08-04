console.log("Hello")

var searchBtn = document.querySelector("#search-btn"); 
var searchInput = document.getElementById("search-input");


var selectedCity = function (event) {
    event.preventDefault(); //for now
    console.log("button");
    var search = searchInput.value; //what the user typed
   
  
    if (search) {
      
      console.log("search input: " + search);
      localStorage.setItem("search",search)//set search input in local storage
      getWeatherForCity(search)
    } else {
      console.log("nothing typed in");
      return;
    }
  };
  
  searchBtn.addEventListener("click", selectedCity);

  function getWeatherForCity (city){
      console.log("get weather for city")
      console.log(city)

      var APIKey = "5f25c58cb505af133f8cf0057ac725a0";

      var WeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+APIKey;

      fetch(WeatherAPI).then(function (response){
          if (response.ok){
              console.log(response)
              response.json().then(function(data){
                  console.log(data)
                  

              })
          }else{
              console.log("not ok")
          }
      })

  }
//needs current city so  .name
// temp is main.temp
//wind wind.speed
//main/humidity
//weather.description and put icons depending 