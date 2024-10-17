import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GerenciamentoChamados from './pages/GerenciamentoChamados';
import CadastrarChamado from './pages/CadastrarChamado';
import CadastrarColaborador from './pages/CadastrarColaborador';
import EditarChamado from './pages/EditarChamado';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<GerenciamentoChamados />} />
        <Route path="/cadastrar-chamado" element={<CadastrarChamado />} />
        <Route path="/cadastrar-colaborador" element={<CadastrarColaborador />} />
        <Route path="/editar-chamado/:id" element={<EditarChamado />} />
      </Routes>
    </Router>
  );
}

export default App;