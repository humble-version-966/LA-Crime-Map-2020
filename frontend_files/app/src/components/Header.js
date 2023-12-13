import NavBar from './NavBar.js';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

function Header() {
  const position = [34.0522, -118.2437];
  const [markers, setMarkers] = useState([]);
  const [date, setDate] = useState('');

  useEffect(() => {
    fetchMarkers();
  }, [date]);

  const fetchMarkers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/crimes/', {
        params: {
          date: date,
        },
      });
      console.log('response.data:', response.data);
      setMarkers(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <h1>Crime Map in LA</h1>
        <input type="date" value={date} onChange={handleDateChange} />
      </header>

      <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, index) => (
          <CircleMarker center={[marker.latitude, marker.longtitude]} color="red" radius={5} key={index}>
            <Popup>

              Event ID: {marker.eventid}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Header;
