  // Navbar.js
  import React, { useContext } from 'react';
  import { ThemeContext } from './ThemeContext';

  const Navbar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
      <nav className={`navbar ${theme}`}>
        <h1>Pokédex</h1>
        <button onClick={toggleTheme}>
          Cambiar a {theme === 'light' ? 'Oscuro' : 'Claro'}
        </button>
      </nav>
    );
  };

  export default Navbar;

  /* nav bar consume ThemeContext para cambiar el tema de la pagina */