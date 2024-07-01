import React, { useState } from 'react';
import axios from 'axios';

const CitySearch = ({ onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (query) => {
    if (query.length < 3) return;
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct`, {
      params: {
        q: query,
        limit: 5,
        appid: "c58a2b6cb5a8ae250eb430d44e79bf37",
      },
    });
    setSuggestions(response.data);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    fetchSuggestions(e.target.value);
  };

  const handleSuggestionClick = (city) => {
    setQuery(city.name);
    setSuggestions([]);
    onCitySelect(city);
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleInputChange} placeholder="Search city..." />
      <ul>
        {suggestions.map((city, index) => (
          <li key={index} onClick={() => handleSuggestionClick(city)}>
            {city.name}, {city.country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitySearch;
