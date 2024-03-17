import './App.css';
import { StateContextProvider } from './context';
import WeatherApp from './WeatherApp'; 


function App() {
  return (
    <StateContextProvider>
    
      <WeatherApp /> 
    </StateContextProvider>
  );
}

export default App;


