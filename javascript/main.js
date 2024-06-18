"use strict";

let daysTempList = [];
let daysList = [];
let highTemp = [];
let lowTemp = [];
let newDaysList = [];

document.addEventListener("DOMContentLoaded", async function() {
    const response = await fetch("https://api.weather.gov/points/37.1041,-113.5841");
    const data = await response.json();
    console.log(data);

    // hourly 
    const forecastUrl = data.properties.forecastHourly;
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();
    const currentWeather = forecastData.properties.periods[0];
    
    const temperature = currentWeather.temperature;
    const windSpeed = currentWeather.windSpeed;
    const windDirection = currentWeather.windDirection;
    const shortForecast = currentWeather.shortForecast;

    console.log(temperature);
    console.log(windSpeed);
    console.log(windDirection);
    console.log(shortForecast);

    document.getElementById('temperature').textContent = temperature;
    document.getElementById('windSpeed').textContent = windSpeed;
    document.getElementById('windDirection').textContent = windDirection;
    document.getElementById('shortForecast').textContent = shortForecast;

    // daily
    const dailyForecastUrl = data.properties.forecast;
    const dailyForecastResponse = await fetch(dailyForecastUrl);
    const dailyForecastData = await dailyForecastResponse.json();
    console.log(dailyForecastData);
    const dailyForecast = dailyForecastData.properties.periods;
    console.log(dailyForecast);

    for (let i = 0; i < 14; i++) {
        const day = dailyForecast[i];
        const dayTemp = day.temperature;
        daysTempList.push(dayTemp);
        const dayName = day.name;
        daysList.push(dayName);
    };
    
    for (let i = 0; i < daysTempList.length; i++) {
        if (i % 2 === 0) {
            highTemp.push(daysTempList[i]);
        } else{
            lowTemp.push(daysTempList[i]);
        }
    };

    newDaysList = [daysList[0], daysList[2], daysList[4], daysList[6], daysList[8], daysList[10], daysList[12]];

    console.log(highTemp);
    console.log(lowTemp);
    console.log(daysTempList);
    console.log(daysList);
    console.log(newDaysList);
    
    // Data and configuration for the chart
    const data1 = {
      labels: newDaysList,
      datasets: [
        {
          label: "Highs",
          data: highTemp,
          backgroundColor: "rgba(49, 108, 244, .6)",
          borderColor: "rgba(49, 108, 244, 1)",
          borderWidth: 4,
        },{
          label: "Lows",
          data: lowTemp,
          backgroundColor: "rgba(49, 108, 244, 1)",
          borderColor: "rgba(49, 108, 244, 1)",
          borderWidth: 1,
        },
      ],
    };

    const config = {
      type: 'bar',
      data: data1,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Temperature Forecast'
          }
        },
        maintainAspectRatio: false,
      },
    };

    // Render the chart
    const ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, config);
});
