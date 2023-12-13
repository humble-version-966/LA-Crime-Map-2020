import NavBar from './NavBar.js';
import React, { useState } from 'react';
import axios from 'axios';

function Report() {
    const [query, setQuery] = useState('');
    const [insertData, setInsertData] = useState({ crime_type: '', area_name: '', street_name: '', date_reported: '', date_occurred: '' });
    const [message, setMessage] = useState('');

    const handleInsert = async () => {
        try {
            //const response = await axios.post('http://127.0.0.1:8000/crimes/report', insertData);
            const response = await axios.get(`http://127.0.0.1:8000/crimes/report/?crime_type=${insertData.crime_type}&area_name=${insertData.area_name}&street_name=${insertData.street_name}&date_reported=${insertData.date_reported}&date_occurred=${insertData.date_occurred}`);
            console.log(response.data);
            setMessage(response.data);
            setInsertData({ crime_type: '', area_name: '', street_name: '', date_reported: '', date_occurred: '' });
        } catch (error) {
            console.error(error);
            setMessage('An error occurred while inserting');
        }
        };

  return (
    <div>
      <NavBar/>   
      <div>
        <h2>Report</h2>
        <div>
          <label>Crime Type:</label>
          <input type="text" value={insertData.crime_type} onChange={(event) => setInsertData({ ...insertData, crime_type: event.target.value })} />
        </div>
        <div>
          <label>Area Name:</label>
          <input type="text" value={insertData.area_name} onChange={(event) => setInsertData({ ...insertData, area_name: event.target.value })} />
        </div>
        <div>
          <label>Street Name:</label>
          <input type="text" value={insertData.street_name} onChange={(event) => setInsertData({ ...insertData, street_name: event.target.value })} />
        </div>
        <div>
          <label>Date Reported:</label>
          <input type="text" value={insertData.date_reported} onChange={(event) => setInsertData({ ...insertData, date_reported: event.target.value })} />
        </div>
        <div>
          <label>Date Occurred:</label>
          <input type="text" value={insertData.date_occurred} onChange={(event) => setInsertData({ ...insertData, date_occurred: event.target.value })} />
        </div>
        <button onClick={handleInsert}>Insert</button>
      </div>
      <div>{message}</div>
    </div>
  );
}

export default Report;
