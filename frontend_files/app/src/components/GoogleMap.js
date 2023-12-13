import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GoogleMap.css';

const libraries = ["places"];
const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
};
const center = {
    lat: 34.0522,
    lng: -118.2437
};
const options = {
    // styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
};

export default function Map() {
    const { isLoaded, loadError } = useLoadScript({
        googlemapsApiKey: 'AIzaSyBh8hTyPe0nwD1sHAFClyiEm7xSE28J4dY',
    });

    if (loadError) return "Loading Google Map Error";
    if (!isLoaded) return "Loading Google Map...";
    return (
        <div>
            <h1>Crime Map in LA</h1>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
                options={options}
            >
            </GoogleMap>
        </div>
    );
}