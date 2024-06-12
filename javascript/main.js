"use strict";

let daysTempList = [];
let daysList = [];

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

    console.log(temperature)
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
    }
    console.log(daysTempList);
    console.log(daysList);
});


export {daysTempList, daysList};