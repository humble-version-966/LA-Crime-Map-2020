import NavBar from './NavBar.js';
import React, { useState } from 'react';
import axios from 'axios';

function Search() {
  // const [query, setQuery] = useState('');
  // const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch_Type = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/crimes_type/?type=${query}`);
      console.log(response.data);

      if ('error' in response.data) {
        setMessage(response.data.error);
        setResults([]);
      } else {
        setMessage('');
        setResults(response.data.results);
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while searching');
      setResults([]);
    }
  };

  const handleSearch_EventID = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/crimes_eventid/?eventid=${query}`);
      console.log(response.data);

      if ('error' in response.data) {
        setMessage(response.data.error);
        setResults([]);
      } else {
        setMessage('');
        setResults(response.data.results);
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while searching');
      setResults([]);
    }
  };


  const handleSearch_Date = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/crimes_date/?date=${query}`);
      console.log(response.data);

      if ('error' in response.data) {
        setMessage(response.data.error);
        setResults([]);
      } else {
        setMessage('');
        setResults(response.data.results);
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while searching');
      setResults([]);
    }
  };


  const handleSearch_Area = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/crimes_area/?area=${query}`);
      console.log(response.data);

      if ('error' in response.data) {
        setMessage(response.data.error);
        setResults([]);
      } else {
        setMessage('');
        setResults(response.data.results);
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while searching');
      setResults([]);
    }
  };
  return (
    <div>
      <NavBar />
      <h1>Search</h1>
      <div>
        <input type="text" value={query} onChange={(event) => setQuery(event.target.value)} />
        <button onClick={handleSearch_Type}>Search by Type</button>
        <button onClick={handleSearch_EventID}>Search by EventID</button>
        <button onClick={handleSearch_Date}>Search by Date</button>
        <button onClick={handleSearch_Area}>Search by Area</button>
      </div>

      {message && <div>{message}</div>}
      {results.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>EventID</th>
              <th>Date Reported</th>
              <th>Date Occurred</th>
              <th>Area Name</th>
              <th>Street Name</th>
              <th>Crime Type</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                <td>{result.eventid}</td>
                <td>{result.datereported}</td>
                <td>{result.dateoccurred}</td>
                <td>{result.area_name}</td>
                <td>{result.location}</td>
                <td>{result.crime_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}


    </div>
  );
}

export default Search;
