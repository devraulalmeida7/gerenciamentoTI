import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Gerenciamento de Chamados</Link></li>
          <li><Link to="/cadastrar-chamado">Cadastrar Chamado</Link></li>
          <li><Link to="/cadastrar-colaborador">Cadastrar Colaborador</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;