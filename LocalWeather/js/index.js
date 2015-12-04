$(document).ready(function(){
  getLocation();
  var appId = '01ffc2b8227e5302ffa7f8555ba7738e';
  
  //create function getLocation
  function getLocation(){
    $.get("http://ip-api.com/json",function(location){
      
      console.log(location);
      $('.location')
        .append(location.city+", ")
        .append(location.regionName);
      var units = getUnits(location.country);
      getWeather(location.lat,location.lon,units);
    });
    
    //Here's getWeather
    
    function getWeather(lat,lon,units){
      var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&units='+units+'&APPID='+appId;
      console.log(weatherUrl);
      $.get(weatherUrl,function(weather){
        
        var wind = convertWind(weather.wind.deg);
        var temp = weather.main.temp;
        var unitsLabel;
        if(units === 'imperial'){
          unitsLabel = 'C';
        }else{
          unitsLabel = 'F';
        }
        $('#icon').append("<img src='http://openweathermap.org/img/w/"+weather.weather[0].icon+".png'>");
        $('#temp').append(temp+" "+unitsLabel);
        $('#wind').append(wind + " "+ weather.wind.speed+"km/h");
        $('#conditions').append(weather.weather[0].description)
        $('#weather-main').append(weather.weather[0].main)      
      });
    }
    
    //It's convertWind to Direction
    function convertWind(dir){
      var direc = ['N','NE','E','SE','S','SW','W','NW'];
      var point = Math.floor(dir/45);
      return direc[point];
    }
    
    
    //getUnits function :D
    function getUnits(country){
      var imperialCountry = ['US','UK'];
      if(imperialCountry.indexOf(country)===-1){
        var units = 'imperial';
      }else{
        units = 'mertric';
      }
      console.log(country,units);
      return units;
    }
  }




});