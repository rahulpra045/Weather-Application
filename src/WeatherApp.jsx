import { useStateContext } from './context';
import { BackgroundLayout, WeatherCard } from './components';



const WeatherApp = () => {
    const { fetchWeather, weatherData } = useStateContext();
    return (
      <div className='w-full h-screen text-white px-8'>
        <nav className='w-full p-3 flex justify-between items-center'>
          <h1 className='font-bold tracking-wide text-3xl'>Weather App</h1>
        </nav>
       
        <BackgroundLayout></BackgroundLayout>
       <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
         <WeatherCard
          weatherData={weatherData}
          fetchWeather={fetchWeather}
        />
      </main>
      </div>
    );
  };
  
  export default WeatherApp;










