import NavBar from './NavBar.js';
import React, { useState } from 'react';
import axios from 'axios';

function Delete() {
    const [query, setQuery] = useState('');
    const [deleteData, setDeleteData] = useState({ id: '' });
    const [message, setMessage] = useState('');

    const handleDelete = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/crimes/delete/?id=${deleteData.id}`);
          console.log(response.data);
          setMessage(response.data)
          setDeleteData({ id: '' });
        } catch (error) {
          console.error(error);
          setMessage('An error occurred while deleting');
        }
      };

  return (
    <div>
      <NavBar/>   
      <div>
        <h2>Delete</h2>
        <div>
          <label>ID:</label>
          <input type="text" value={deleteData.id} onChange={(event) => setDeleteData({ ...deleteData, id: event.target.value })} />
        </div>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <div>{message}</div>
    </div>
  );
}

export default Delete;
