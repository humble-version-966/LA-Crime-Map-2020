import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Update from './components/Update.js';
import Search from './components/Search.js';
import Delete from './components/Delete.js';
import Report from './components/Report.js';
import Statistics from './components/Statistics.js';
import Combine from './components/Combine.js';
import Description from './components/Description.js';

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Header/>}/>
          <Route exact path="/search" element={<Search/>}/>
          <Route exact path="/report" element={<Report/>}/>
          <Route exact path="/update" element={<Update/>}/>
          <Route exact path="/delete" element={<Delete/>}/>
          <Route exact path="/statistics" element={<Statistics/>}/>
          <Route exact path="/combine" element={<Combine/>}/>
          <Route exact path="/description" element={<Description/>}/>
        </Routes>
    </Router>
  );
}

export default App;



