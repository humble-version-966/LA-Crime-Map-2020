import NavBar from './NavBar.js';
import React, { useState } from 'react';
import axios from 'axios';
import './Combine.css';  

function Combine() {
  const [district, setDistrict] = useState('Hollywood');
  const [ageMin, setAgeMin] = useState('18');
  const [ageMax, setAgeMax] = useState('30');
  const [data, setData] = useState({
    victims_by_district: [],
    unique_victims_by_crime_type: [],
  });

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/crimes/combined_crime_data/${district}/${ageMin}/${ageMax}/`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavBar />
      <h1>Combined Crime Data</h1>
      <div>
        <input type="text" value={district} onChange={(event) => setDistrict(event.target.value)} placeholder="District" />
        <input type="number" value={ageMin} onChange={(event) => setAgeMin(event.target.value)} placeholder="Minimum Age" />
        <input type="number" value={ageMax} onChange={(event) => setAgeMax(event.target.value)} placeholder="Maximum Age" />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="tablesContainer">
        <div>
          <h1>Victims by District</h1>
          <table>
            <thead>
              <tr>
                <th>Area Name</th>
                <th>Number of Victims</th>
              </tr>
            </thead>
            <tbody>
              {data.victims_by_district.map((item) => (
                <tr key={item.AreaName}>
                  <td>{item.AreaName}</td>
                  <td>{item.Number_of_Victims}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h1>Unique Victims by Crime Type</h1>
          <table>
            <thead>
              <tr>
                <th>Area Name</th>
                <th>Crime Type</th>
                <th>Number of Unique Victims</th>
              </tr>
            </thead>
            <tbody>
              {data.unique_victims_by_crime_type.map((item) => (
                <tr key={`${item.AreaName}-${item.Crime_Type}`}>
                  <td>{item.AreaName}</td>
                  <td>{item.Crime_Type}</td>
                  <td>{item.Number_of_Unique_Victims}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Combine;
