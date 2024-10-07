import { useEffect, useState } from 'react';
import axios from 'axios';

function Weather() {
  const [city, setCity] = useState('Kashipur');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputText, setInputText] = useState('');
  const [imgpath, setImgpath] = useState('');

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city || city.trim() === '') {
        setError('Please enter a city name.');
        return;
      }
      setLoading(true);
      try {
        const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get(api);
        setWeatherData(response.data);
        const imgURL = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
        setImgpath(imgURL);
        setError(null);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('City not found. Please enter a valid city name.');
        } else {
          setError('An error occurred. Please try again.');
        }
        setWeatherData(null);
      }
      setLoading(false);
    };
    const debounceFetchWeather = setTimeout(() => {
      fetchWeather();
    }, 500);

    return () => clearTimeout(debounceFetchWeather);
  }, [city]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    if (e.target.value.trim() !== '') {
      setError(null);
    }
  };

  const handleSearch = () => {
    if (inputText.trim() !== '') {
      setCity(inputText);
    } else {
      setError('Please enter a valid city name');
    }
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <>
      <div className="border flex-col justify-center items-center w-auto rounded-xl p-4">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleEnter}
          placeholder="Enter city name"
          className="border p-2 rounded w-full mb-4 outline-none"
        />
        <div className="flex justify-center items-center rounded-xl">
          <button onClick={handleSearch} className="bg-blue-500 text-white py-2 px-4 rounded hover:scale-110 hover:bg-blue-600 duration-300">
            Search
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && weatherData && (
          <div className="text-xl">
            <div className="flex items-center justify-center">
              <img src={imgpath} alt="Weather icon" />
            </div>
            <h1 className="flex items-center justify-center text-3xl uppercase">{city}</h1>
            <div>
              <h2>Temp: {weatherData.main.temp}°C</h2>
              <div className="flex space-x-10 justify-between">
                <h2>Max Temp: {weatherData.main.temp_max}°C</h2>
                <h2>Min Temp: {weatherData.main.temp_min}°C</h2>
              </div>
              <h2>Feels like: {weatherData.main.feels_like}°C</h2>
            </div>
            <div className="flex space-x-10 justify-between">
              <h2>Wind: {weatherData.wind.speed} m/s</h2>
              <h2>Humidity: {weatherData.main.humidity}%</h2>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Weather;
