import React from 'react';
import { FaWallet, FaCog, FaUser, FaSearch } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  return (
    <div className="header-wrapper"> {/* Contêiner que se estende até as extremidades da tela */}
      <div className="header">
        <div className="header__logo">
          <a href="/" className="header__logo-link"> {/* Redireciona para a Home */}
            <h1>Finance Projections</h1>
          </a>
        </div>
        <div className="header__icons">
          <a href="/busca" className="header__icon"> {/* Ícone de lupa para a página de Busca */}
            <FaSearch />
          </a>
          <a href="/carteira" className="header__icon">
            <FaWallet />
          </a>
          <a href="/" className="header__icon"> {/* Redireciona para a Home */}
            <FaCog />
          </a>
          <a href="/" className="header__icon"> {/* Redireciona para a Home */}
            <FaUser />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
