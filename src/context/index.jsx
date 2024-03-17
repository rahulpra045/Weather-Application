/* eslint-disable react/prop-types */

import { createContext, useEffect, useState, useCallback, useContext } from 'react';
import axios from 'axios';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [place, setPlace] = useState('');

  const fetchWeather = useCallback(async (cities) => {
    try {
      const API_KEY = import.meta.env.VITE_API_KEY; 
      const responses = await Promise.all(cities.map(city =>
        axios.get("http://api.weatherapi.com/v1/forecast.json", {
          params: {
            key: API_KEY,
            alerts: "yes",
            days:7,
            q: city
          }
        })
      ));

      const weatherData = responses.map(response => response.data);
      setWeatherData(weatherData);
      // console.log("Weather data Index:", weatherData);
      
      setPlace(cities.join(', '));
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, []);

  useEffect(() => {
    const defaultCities = ['Noida', 'Jaipur', 'New York', 'Bhopal']; // Default cities
    fetchWeather(defaultCities);
  }, [fetchWeather]);

  return (
    <StateContext.Provider value={{ weatherData, place, setPlace, fetchWeather }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);





