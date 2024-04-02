import logo from './logo.svg';
import './App.css';
import  { useState, useEffect } from 'react';
import axios from "axios";

const SearchBox = ({onSearch}) => {
  const [city,setCity] = useState("");

  const handleSearch = () => {
    onSearch(city);
  }

  return (
    <div className="search-box">
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter City Name" />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

const WeatherCard =({title,data}) => {
  return (
    <div className='weather-card'>
      <h3>{title}</h3>
      <p>{data}</p>
    </div> 
  )
}

const WeatherDisplay = ({city}) => {
  const [weatherData,setWeatherData] = useState(null);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    if(city) {
      setLoading(true);
      axios.get("https://api.weatherapi.com/v1/current.json", {
        params: {
          key : "24a27182d9ec4fcf831102004240101",
          q : city,
        }
      }).then((res) => setWeatherData(res.data)).catch((err) => {
        console.log("Error fetching data");
        alert("Failed to fetch weather data")
      }).finally(() => {
        setLoading(false);
      })
    }
  },[city]);

  return (
    <div className="weather-display">
      {loading && <p>Loading data...</p>}
      {!loading && weatherData && (
        <div className="weather-cards">
          <WeatherCard title="Temperature" data={`${weatherData.current.temp_c}°C`} />
          <WeatherCard title="Humidity" data={`${weatherData.current.humidity}%`} />
          <WeatherCard title="Condition" data={weatherData.current.condition.text} />
          <WeatherCard title="Wind Speed" data={`${weatherData.current.wind_kph}kph`} />
        </div>
      )}
    </div>
  )
}

function App() {
  const [city,setCity] = useState("");

  const handleSearch = (searchCity) => {
    setCity(searchCity);
  }

  return (
    <div className="App">
      <SearchBox onSearch={handleSearch} />
      <WeatherDisplay city={city} />
    </div>
  );
}

export default App;
