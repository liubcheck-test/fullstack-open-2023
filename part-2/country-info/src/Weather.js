import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState(null)
    const [weatherIcon, setWeatherIcon] = useState('')
  
    useEffect(() => {
      const apiKey = process.env.REACT_APP_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`;
  
      axios
        .get(url)
        .then((response) => {
          setWeather(response.data)
          const iconCode = response.data.weather[0].icon
          const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`
          setWeatherIcon(iconUrl)
          console.log(response.data)
        })
        .catch((error) => {
          console.log('Error:', error)
        });
    }, [capital])
  
    return (
      <>
        {weather ? (
          <div>
            <h3>Weather in {capital}</h3>
            <p>
              <b>Temperature: </b>
              {weather.main.temp} Celsius
            </p>
            <p>
              <img alt="Weather Icon" src={weatherIcon} />
            </p>
            <p>
              <b>Wind: </b>
              {weather.wind.speed} m/s
            </p>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </>
    )
  }

  export default Weather