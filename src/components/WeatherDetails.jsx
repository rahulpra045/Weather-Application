/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useDate } from '../Utils/useDate'
import sun from '../assets/icons/sun.png'
import cloud from '../assets/icons/cloud.png'
import fog from '../assets/icons/fog.png'
import rain from '../assets/icons/rain.png'
import snow from '../assets/icons/snow.png'
import storm from '../assets/icons/storm.png'
import wind from '../assets/icons/windy.png'
import '../index.css'

export const WeatherDetails = ({ weatherData , iconString}) => {

  const [icon, setIcon] = useState(sun)
  const { time } = useDate()

    useEffect(() => {
        // console.log("WeatherData:", weatherData);
        // console.log(weatherData.forecast?.forecastday[0]?.hour.heatindex_c);
    if (iconString) {
      if (iconString.toLowerCase().includes('cloud')) {
        setIcon(cloud)
      } else if (iconString.toLowerCase().includes('rain')) {
        setIcon(rain)
      } else if (iconString.toLowerCase().includes('clear')) {
        setIcon(sun)
      } else if (iconString.toLowerCase().includes('thunder')) {
        setIcon(storm)
      } else if (iconString.toLowerCase().includes('fog')) {
        setIcon(fog)
      } else if (iconString.toLowerCase().includes('snow')) {
        setIcon(snow)
      } else if (iconString.toLowerCase().includes('wind')) {
        setIcon(wind)
      }
    }
  }, [iconString])

  const getDayName = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[new Date(date).getDay()]
  }
 
  return (
    <div className='w-[22rem] min-w-[22rem] h-[32rem] glassCard p-4'>
      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>Close</button> */}

      <div className='flex w-full just-center, items-center gap-4 mt-12 mb-4'>
        <img src={icon} alt="weather_icon" />
        <div>
          <p className='font-bold text-5xl flex justify-center items-center' >{weatherData.current.temp_c} &deg;C</p>
          <p className='text-2xl'>{getDayName(weatherData.location.localtime)}</p>
        </div>
      </div>
      <div className='font-bold text-center text-xl'>
        {weatherData.location.name} ,  {weatherData.location.country}
      </div>
      <div className='w-full flex justify-between items-center mt-4'>
        <p className='flex-1 text-center p-2'>{new Date().toDateString()}</p>
        <p className='flex-1 text-center p-2'>{time}</p>
      </div>
      <div className='w-full flex justify-between items-center mt-4 gap-4'>
        <p className='flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg'>Wind Speed <p className='font-normal'>{weatherData.current.wind_mph} km/h</p></p>
        <p className='flex-1 text-center p-2 font-bold rounded-lg bg-green-600'>Humidity <p className='font-normal'>{weatherData.current.humidity} gm/m&#179;</p></p>
      </div>
      <div className='w-full p-3 mt-4 flex justify-between items-center'>
        <p className='font-semibold text-lg'>Heat Index</p>
        <p className='text-lg'>{weatherData.forecast.forecastday?.day?.hour?.heatindex_c ? weatherData.forecast.forecastday?.day?.hour?.heatindex_c : 'N/A'}</p>
      </div>
      <hr className='bg-slate-600' />
      <div className='w-full p-4 flex justify-center items-center text-3xl font-semibold'>
        {weatherData.current.condition.text}
      </div>
    </div>
  )
}
