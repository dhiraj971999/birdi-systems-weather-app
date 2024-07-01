import React, { useState } from 'react';
import CitySearch from './Components/CitySearch';
import WeatherInfo from './Components/WeatherInfo';
import './App.css';

const App = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <div className="App">
      <h1>Real-Time Weather Dashboard</h1>
      <CitySearch onCitySelect={setSelectedCity} />
      {selectedCity && <WeatherInfo city={selectedCity} />}
    </div>
  );
};

export default App;
