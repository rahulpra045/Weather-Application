import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for props validation
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';

const MiniCard = ({ weatherData }) => {
  const [icons] = useState({
    'Sunny': sun,
    'Partly cloudy': cloud,
    'Clear': sun,
    'Thunderstorms': storm,
    'Fog': fog,
    'Snow': snow,
    'Windy': wind,
    'Rain': rain
  });

  const getIcon = (conditionText) => {
    const lowerCaseCondition = conditionText.toLowerCase();
    for (const [key, value] of Object.entries(icons)) {
      if (lowerCaseCondition.includes(key.toLowerCase())) {
        return value;
      }
    }
    return sun; // Default icon
  };

  // Get the forecast data for the next 6 days starting from tomorrow
  const forecastData = weatherData.forecast.forecastday.slice(1, 7);

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-20 mt-8'>
      {forecastData.map((day, index) => (
        <div key={index} className='glassCard w-[10rem] h-[12rem] p-4 flex flex-col'>
          <p className='text-center'>{new Date(day.date_epoch * 1000).toLocaleDateString('en', { weekday: 'long' })}</p>
          <hr />
          <div className='w-full flex justify-center items-center flex-1'>
            <img src={getIcon(day.day.condition.text)} alt="forecast not available" className='w-[4rem] h-[4rem]' />
          </div>
          <p className='text-center font-bold'>{day.day.avgtemp_c}&deg;C</p>
          <p className='text-center'>{day.day.condition.text}</p>
        </div>
      ))}
    </div>
  );
};

// Props validation using PropTypes
MiniCard.propTypes = {
  weatherData: PropTypes.shape({
    forecast: PropTypes.shape({
      forecastday: PropTypes.arrayOf(PropTypes.shape({
        date_epoch: PropTypes.number.isRequired,
        day: PropTypes.shape({
          condition: PropTypes.shape({
            text: PropTypes.string.isRequired
          }).isRequired,
          avgtemp_c: PropTypes.number.isRequired
        }).isRequired
      })).isRequired
    }).isRequired
  }).isRequired
};

export default MiniCard;
