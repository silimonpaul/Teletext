import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import News from './pages/News';
import Sports from './pages/Sports';
import Weather from './pages/Weather';

const AppContainer = styled.div`
  background-color: #000;
  color: #fff;
  min-height: 100vh;
  font-family: 'Courier New', monospace;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
