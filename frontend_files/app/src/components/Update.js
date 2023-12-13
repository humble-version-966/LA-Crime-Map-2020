import NavBar from './NavBar.js';
import React, { useState } from 'react';
import axios from 'axios';

function Update() {
  const [query, setQuery] = useState('');
  const [updateData, setUpdateData] = useState({ id: '', crime_type: '', area_name: '', street_name: '', date_reported: '', date_occurred: '' });
  const [message, setMessage] = useState('');

  const handleUpdate = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/crimes/update/?id=${updateData.id}&crime_type=${updateData.crime_type}&area_name=${updateData.area_name}&street_name=${updateData.street_name}&date_reported=${updateData.date_reported}&date_occurred=${updateData.date_occurred}`)
      console.log(response.data);
      setMessage(response.data);
      setUpdateData({ id: '', crime_type: '', area_name: '', street_name: '', date_reported: '', date_occurred: '' });
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while updating');
    }
  };

  return (
    <div>
      <NavBar/>   
      <div>
        <h2>Update</h2>
        <div>
          <label>ID:</label>
          <input type="text" value={updateData.id} onChange={(event) => setUpdateData({ ...updateData, id: event.target.value })} />
        </div>
        <div>
          <label>Crime Type:</label>
          <input type="text" value={updateData.crime_type} onChange={(event) => setUpdateData({ ...updateData, crime_type: event.target.value })} />
        </div>
        <div>
          <label>Area Name:</label>
          <input type="text" value={updateData.area_name} onChange={(event) => setUpdateData({ ...updateData, area_name: event.target.value })} />
        </div>
        <div>
          <label>Street Name:</label>
          <input type="text" value={updateData.street_name} onChange={(event) => setUpdateData({ ...updateData, street_name: event.target.value })} />
        </div>
        <div>
          <label>Date Reported:</label>
          <input type="text" value={updateData.date_reported} onChange={(event) => setUpdateData({ ...updateData, date_reported: event.target.value })} />
        </div>
        <div>
          <label>Date Occurred:</label>
          <input type="text" value={updateData.date_occurred} onChange={(event) => setUpdateData({ ...updateData, date_occurred: event.target.value })} />
        </div>
        <button onClick={handleUpdate}>Update</button>
      </div>
      <div>{message}</div>
    </div>
  );
}

export default Update;
