// Importaciones necesarias
import React from 'react';
import { Link } from 'react-router-dom';

// Definición del componente Favoritos
const Favoritos = ({ favorites, toggleFavorite }) => {
  return (
    <div>
      <h2>Favoritos</h2>
      {favorites.length === 0 ? (
        <p>No tienes Pokémon favoritos aún.</p>
      ) : (
        <ul className="favorites-list">
          {favorites.map((name, index) => (
            <li key={index}>
              <Link to={`/pokemon/${name}`}>{name}</Link>
              <button onClick={() => toggleFavorite(name)}>★</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Exportación del componente
export default Favoritos;

// /* aqui muestro los pokemons favoritos en una lista con un boton para quitarlos de favoritos */
