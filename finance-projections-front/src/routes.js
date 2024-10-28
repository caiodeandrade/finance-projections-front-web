import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Busca from './pages/Busca';
import Ativo from './pages/Ativo';
import Carteira from './pages/Carteira';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/busca" element={<Busca />} />
        <Route path="/ativo/:ticker" element={<Ativo />} />
        <Route path="/carteira" element={<Carteira />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
