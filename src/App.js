import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login/Login.js';
import Callback from './login/Callback.js';
import PlaylistGenerator from './playlist/PlaylistGenerator.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/playlist" element={<PlaylistGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;
