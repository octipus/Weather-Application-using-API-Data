/*Oconti01 - WDFMA 2018
Task2 - – Create a Weather Application based on API Data*/

$(document).ready(function() {

	$("#country").change(function() {
    var cityName;
		var select = $("#country option:selected").val(); //get selected input value/switch case for countries list
		switch (select) {
			case "England":
			   cityName = "england";
			   city(cityName);
			   break;
			case "Scotland":
			   cityName = "scotland";
			   city(cityName);
			   break;
			case "Wales":
			   cityName = "wales";
			   city(cityName);
			   break;
			case "Northern Ireland":
			   cityName = "nireland";
			   city(cityName);
			   break;
			default:
			   $("#city").empty();

			break;
		}
	});

	$("#city").change(function() { //get city by name
		var cityValue = $("#city").val();
			getWeatherApi(cityValue);
	});


	function city(country) {
		$("#city").empty(); // initialize empty
		$("#city").append("<option>--Select--</option>");
		$.get(country+"-cities.html", function( cities) { //get the html file containin cities
			$("#city").append(cities);
		});
	}

	function getWeatherApi(cityValue){ // get api data by cityname
		var apiKey = '776c2da7715936b010d5b7394595eb34';
		$.ajax( {
				 url:'http://api.openweathermap.org/data/2.5/weather?q='+cityValue+'&APPID='+apiKey ,
				 type: 'GET' ,
				 dataType: 'json' ,
				 success: function(response){
					 var sTxt = '' ;
					 var cond;
					 var temp ;
					 var windSpeed;
					 var windDeg;
					 var apiDate;
					 var name;
           var icon;
					 $('#weatherInfo').html(' ');

				 $.each(response.weather, function(index, value) { // fetching required json data and exiting loop
				       cond = response.weather[index].main;

//tofix: chrome problem on loading weather icons - icons show up only on second load for each city

               switch (cond) { //switch case for icons
                 case "Clouds":
                    icon = '<img src="./weather_icons/cloud.png" alt="cloud" width="100px" height="100%"/>';
                    break;
                 case "Hail":
                    icon = '<img src="./weather_icons/hail.png" alt="hail" width="100px" height="100%"/>';
                    break;
                 case "Heavy Cloud":
                    icon = '<img src="./weather_icons/heavy cloud.png" alt="heavy-clouds" width="100px" height="100%"/>';
                    break;
                 case "Heavy Rain":
                    icon = '<img src="./weather_icons/heavy rain.png" alt="heavy-rain" width="100px" height="100%"/>';
                    break;
                 case "Rain":
                    icon = '<img src="./weather_icons/rain.png" alt="rain" width="100px" height="100%"/>';
                    break;
                 case "Sleet":
                    icon = '<img src="./weather_icons/sleet.png" alt="sleet" width="100px" height="100%"/>';
                    break;
                 case "Snow":
                    icon = '<img src="./weather_icons/snow.png" alt="snow" width="100px" height="100%"/>';
                    break;
                 case "Sun":
                    icon = '<img src="./weather_icons/sun.png" alt="sun" width="100px" height="100%"/>';
                    break;
                 case "Sun and Clouds":
                    icon = '<img src="./weather_icons/sun and cloud.png" alt="sun-cloud" width="100px" height="100%"/>';
                    break
                 case "Thunderstorm":
                  icon = '<img src="./weather_icons/thunderstorm.png" alt="thunderstorm" width="100px" height="100%"/>';
                  break;
								default: //fix for missing icons (clear, mist, drizzle icons missing)
									icon = '';
									break;
               }
				 });

				 //assign api to local vars

				 $.each(response.main, function(index, value) {
				       temp = response.main.temp;
				           return false;
				 });

				 $.each(response.wind, function(index, value) {
				       windSpeed = response.wind.speed;
				       windDeg = response.wind.deg;
				       return false;
				 });

				 $.each(response, function(index) {
				       apiDate = response.dt ;
				       name = response.name;
				       return false;
				 });


				 sTxt += "<h2>"+name+", UK<br><span>"+unixToDate(apiDate)+"</span></h2>"+icon+"<p id=temp>"+ toCelsius(temp)+"&#8451;<br>"+ cond+"</p><p id=right><img src=./weather_icons/wind.svg></img> "+ toMph(windSpeed)+"mph</p><p id=left><img src=./weather_icons/compass.svg></img>"+ degConv(windDeg)+"</p>";
				 $(' #weatherInfo').append(sTxt);

				 },

				 error: function() {
				 $(' #info').html(' <p>An error has occurred while retriving the data</p>');
				}
  		});


//Conversions

		function unixToDate(unix_timestamp){ // unix time to date conversion e.g. 14/02/2015
			var date = new Date(unix_timestamp*1000);
			var year = date.getFullYear();
			var month = ("0"+(date.getMonth()+1)).substr(-2);
			var day = ("0"+date.getDate()).substr(-2);
			return day+"/"+month+"/"+year;
		}

    function toCelsius(kelvin){ // kelvin to celsius conversion
  		var celsius = kelvin - 273.15; // 0(kelvin) = -273.15 Celsius
			var degree = Math.round(celsius)
  		return degree;
  	}

  	function toMph(knots){ // mph conversion
  		var mph = knots * 1.15078;
			var speed = Math.round(mph);
  		return speed;
  	}

  	function degConv(deg){ //get wind direction as int and convert it to string
  		if (deg>0 && deg<25){
  			return "Northerly";
  		}else if (deg>25 && deg<65){
  			return "North easterly";
  		}else if (deg>65 && deg<115){
  			return "Easterly";
  		}else if (deg>115 && deg<155){
  			return "South easterly";
  		}else if (deg>155 && deg<205){
  			return "Southerly";
  		}else if (deg>205 && deg<245){
  			return "South westerly";
      }else if (deg>245 && deg<295){
  			return "Westerly";
  		}else if (deg>295 && deg<335){
  			return "North westerly";
  		}else if (deg>335){
  			return "Northerly";
  		}
  	}
  }
});
