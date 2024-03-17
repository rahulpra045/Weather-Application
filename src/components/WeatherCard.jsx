import  { useState } from 'react';
import PropTypes from 'prop-types';
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';
import { WeatherDetails } from './WeatherDetails';
import MiniDetails from './MiniDetails';
import Search from './Search';
import '../index.css';

const WeatherCard = ({ weatherData }) => {
  const [selectedCityData, setSelectedCityData] = useState(null);


  
  
  const getIcon = (iconString) => {
    if (iconString) {
      if (iconString.toLowerCase().includes('cloud')) {
        return cloud;
      } else if (iconString.toLowerCase().includes('rain')) {
        return rain;
      } else if (iconString.toLowerCase().includes('clear')) {
        return sun;
      } else if (iconString.toLowerCase().includes('thunder')) {
        return storm;
      } else if (iconString.toLowerCase().includes('fog')) {
        return fog;
      } else if (iconString.toLowerCase().includes('snow')) {
        return snow;
      } else if (iconString.toLowerCase().includes('wind')) {
        return wind;
      }
    }
    // Default icon if condition is not matched
    return sun;
  };

  const handleCardClick = (data) => {
    setSelectedCityData(data);
  };

  const handleCloseDetails = () => {
    setSelectedCityData(null);
  };

  return (
    <div>
    <div className='mb-10'>
      {!selectedCityData && <Search />}</div>
    <div className="weather-card-grid">
      {!selectedCityData ? (
        // Render weather cards if no city is selected
        weatherData.map((data, index) => {
          const icon = getIcon(data.current.condition.text);
          return (
            <div key={index} className='glassCard p-4 flex flex-col justify-between' onClick={() => handleCardClick(data)} style={{ cursor: 'pointer' }}> 
              <div className='flex flex-row items-center justify-between mb-4'>
                <div>
                  <img src={icon} alt="weather_icon" />
                </div>
                <div className='flex flex-col'>
                  <div className='font-bold text-center text-3xl'>{data.location.name}, {data.location.country}</div>
                  <div className='font-bold text-center text-3xl mb-4'>
                    <p><span className='font-normal'>{data.current.condition.text}</span></p>
                  </div>
                  <div className='flex flex-row items-center justify-between mb-4 gap-4'>
                    <div className='font-bold text-3xl'>{data.current.temp_c} &deg;C</div>
                    <div className='font-normal text-2xl'>Humidity {data.current.humidity} gm/m&#179;</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
          
            <div>
              <div className="flex gap-20 weatherdetails">
                  <div className="weather-details-column flex justify-center mb-4">
                    
                    <WeatherDetails weatherData={selectedCityData}
                      onClose={handleCloseDetails} />
                    
                  </div>
            
                  <div className="flex justify-center gap-8 flex-wrap">
                    <div className="selected-city-details mb-2">
                      <MiniDetails weatherData={selectedCityData} iconString={selectedCityData.current.condition.text} />
                    </div>
                  </div>

              </div>

              <div className='flex justify-center button'>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleCloseDetails()}>Close</button>
              </div>
           </div>
          
      )}
      </div>
      </div>
  );
};

WeatherCard.propTypes = {
  weatherData: PropTypes.arrayOf(
    PropTypes.shape({
      location: PropTypes.shape({
        name: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired
      }),
      current: PropTypes.shape({
        condition: PropTypes.shape({
          text: PropTypes.string.isRequired
        }).isRequired,
        temp_c: PropTypes.number.isRequired,
        humidity: PropTypes.number.isRequired
      }).isRequired
    })
  ).isRequired
};

export default WeatherCard;










