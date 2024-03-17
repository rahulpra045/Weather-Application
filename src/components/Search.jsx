import { useState } from 'react';
import { useStateContext } from '../context/index';
// import PropTypes from 'prop-types';
import searchIcon from '../assets/icons/search.svg';

const Search = () => {
  const [inputs, setInputs] = useState(['', '', '', '']);
  const { fetchWeather } = useStateContext();

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleSearch = () => {
    fetchWeather(inputs.filter(city => city !== ''));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
      setInputs(['', '', '', '']);
    }
  };

  return (
    <div className='flex justify-center flex-wrap gap-4'>
      {inputs.map((input, index) => (
        <div key={index} className='bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
          <img src={searchIcon} alt="search" className='w-[1.5rem] h-[1.5rem]' />
          <input
            type="text"
            placeholder={`Search city ${index + 1}`}
            className='focus:outline-none w-full text-[#212121] text-lg'
            value={input}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyUp={handleKeyPress} // Trigger search on Enter key press
          />
        </div>
      ))}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};



export default Search;
