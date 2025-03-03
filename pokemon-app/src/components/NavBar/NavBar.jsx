  // Navbar.js
import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-buttons">
        <Link to="/" className="nav-button">
          Inicio
        </Link>
        <br/>
        <Link to="/favoritos" className="nav-button">
          Favoritos
        </Link>
        <div/>
        <Link to="/crear-pokemon" className="nav-button">
          Crear Pokémon
        </Link>
      </div>
      <button onClick={toggleTheme}>
           {theme === 'light' ? '☀️🌑' : '🌕☀️'}
        </button>
    </nav>
  );
};

export default Navbar;

  /* nav bar consume ThemeContext para cambiar el tema de la pagina */