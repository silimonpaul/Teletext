import React, { useState, useEffect } from "react";
import styled from "styled-components";

const WeatherContainer = styled.div`
  padding: 2rem;
`;

const WeatherBox = styled.div`
  border: 1px solid #00f;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #000;
`;

const WeatherTitle = styled.h2`
  color: #0f0;
  margin-bottom: 1rem;
`;

const WeatherData = styled.div`
  color: #fff;
  font-size: 1.2rem;
  line-height: 1.5;
`;

function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFakeWeather = () => {
      const locations = [
        "Pixelville",
        "Digital City",
        "Cyberton",
        "Tech Town",
        "Binary Bay",
      ];
      const conditions = [
        "Digital Drizzle",
        "Binary Sunshine",
        "Pixel Storm",
        "Virtual Fog",
        "Cloud Computing",
        "Data Rain",
      ];

      const getRandomTemp = (min, max) =>
        Math.floor(Math.random() * (max - min + 1) + min);
      const getRandomItem = (array) =>
        array[Math.floor(Math.random() * array.length)];

      const fakeWeather = {
        location: getRandomItem(locations),
        current: {
          temp: getRandomTemp(15, 30),
          condition: getRandomItem(conditions),
          humidity: getRandomTemp(40, 90),
          windSpeed: getRandomTemp(5, 25),
        },
        forecast: [
          {
            day: "Monday",
            condition: getRandomItem(conditions),
            high: getRandomTemp(20, 28),
            low: getRandomTemp(10, 18),
          },
          {
            day: "Tuesday",
            condition: getRandomItem(conditions),
            high: getRandomTemp(20, 28),
            low: getRandomTemp(10, 18),
          },
          {
            day: "Wednesday",
            condition: getRandomItem(conditions),
            high: getRandomTemp(20, 28),
            low: getRandomTemp(10, 18),
          },
        ],
      };

      setTimeout(() => {
        setWeather(fakeWeather);
        setLoading(false);
      }, 1000);
    };

    getFakeWeather();
  }, []);

  if (loading)
    return (
      <WeatherContainer>
        <p>Loading weather data...</p>
      </WeatherContainer>
    );

  return (
    <WeatherContainer>
      <WeatherBox>
        <WeatherTitle>Current Weather in {weather.location}</WeatherTitle>
        <WeatherData>
          Temperature: {weather.current.temp}°C
          <br />
          Condition: {weather.current.condition}
          <br />
          Humidity: {weather.current.humidity}%<br />
          Wind Speed: {weather.current.windSpeed} km/h
        </WeatherData>
      </WeatherBox>

      <WeatherBox>
        <WeatherTitle>3-Day Forecast</WeatherTitle>
        {weather.forecast.map((day, index) => (
          <WeatherData key={index}>
            {day.day}:<br />
            {day.condition}
            <br />
            High: {day.high}°C Low: {day.low}°C
            <br />
            <br />
          </WeatherData>
        ))}
      </WeatherBox>
    </WeatherContainer>
  );
}

export default Weather;
