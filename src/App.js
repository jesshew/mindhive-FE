// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './Map';
import Search from './Search';
import { API_BASE_URL, ENDPOINTS } from './constants';



const App = () => {
  const [outlets, setOutlets] = useState([]);


  useEffect(() => {
    const fetchOutlets = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.GET_ALL_OUTLETS}`); 
        setOutlets(response.data.filter(outlet => outlet.latitude && outlet.longitude));
      } catch (error) {
        console.error('Error fetching outlets:', error);
      }
    };

    fetchOutlets();
  }, []);


  return (
    <div className="container">
      <h1 className="title">Kuala Lumpur Subway Outlets Map</h1>
      
      <Search />
  
      <Map outlets={outlets} />
      {/* {console.log(outlets)} */}
    </div>
  );
};

export default App;
