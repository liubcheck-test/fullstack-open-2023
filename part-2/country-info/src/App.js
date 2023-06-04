import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Filter';
import CountryList from './CountryList';
import Country from './Country';

const App = () => {
  const [data, setData] = useState([])
  const [country, setCountry] = useState('')

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then((response) => {
      setData(response.data)
      console.log('Data:', response.data)
    });
  }, []);

  const filterItems = (array, term) => {
    return array.filter(
      (el) =>
        typeof term === 'string' &&
        el.name.common.toLowerCase().startsWith(term.toLowerCase())
    );
  };

  const countriesToShow = filterItems(data, country);

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleShowCountry = (countryName) => {
    setCountry(countryName);
  };

  return (
    <div className="App">
      <Filter value={country} onChange={handleCountryChange} />
      {countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <>
          {countriesToShow.length === 1 ? (
            <Country country={countriesToShow[0]} />
          ) : (
            <CountryList countries={countriesToShow} onShowCountry={handleShowCountry} />
          )}
        </>
      )}
    </div>
  )
}

export default App;