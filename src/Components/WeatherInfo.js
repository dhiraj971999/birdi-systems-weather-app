import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const WeatherInfo = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [chartData, setChartData] = useState({ series: [], options: {} });

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: city.name,
          appid: "c58a2b6cb5a8ae250eb430d44e79bf37",
          units: 'metric',
        },
      });
      setWeatherData(response.data);
      updateChartData(response.data);
    };

    fetchWeather();
  }, [city]);

  const updateChartData = (data) => {
    setChartData({
      series: [{
        name: 'Temperature',
        data: [data.main.temp], 
      }],
      options: {
        chart: {
          type: 'line',
        },
        xaxis: {
          categories: ['Now'], 
        },
      },
    });
  };

  return (
    weatherData && (
      <div>
        <h1>{weatherData.name}</h1>
        <p>Temperature: {weatherData.main.temp}°C</p>
        <p>Humidity: {weatherData.main.humidity}%</p>
        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        <p>Description: {weatherData.weather[0].description}</p>
        <Chart options={chartData.options} series={chartData.series} type="line" width="500" />
      </div>
    )
  );
};

export default WeatherInfo;
