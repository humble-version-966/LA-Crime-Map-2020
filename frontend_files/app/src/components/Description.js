import NavBar from './NavBar.js';
import React, { useState } from 'react';
import axios from 'axios';




function Description() {
    const [crimeType, setCrimeType] = useState('473');
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/crimes/crimes_type_description/${crimeType}/`);
            console.log(response.data);

            if ('error' in response.data) {
              setMessage(response.data.error);
              setResults([]);
            } else {
              setMessage('');
              setResults(response.data.description);
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
            <h1>Crimes Type Description</h1>
            <div>
                <input type="number" value={crimeType} onChange={(event) => setCrimeType(event.target.value)} placeholder="Crime Type" />
                <button onClick={handleSearch}>Search</button>
            </div>

            <h1>Crimes Type Description</h1>
            <table>
                <thead>
                    <tr>
                        <th>Crime Type Description</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((item) => (
                        <tr key={item.description}>
                            <td>{item}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Description;