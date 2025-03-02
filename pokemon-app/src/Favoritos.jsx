// Favoritos.jsx
import React from 'react';

const Favoritos = ({ favorites, openPokemonDetails, toggleFavorite }) => {
  return (
    <div>
      <h2>Favoritos</h2>
      {favorites.length === 0 ? (
        <p>No tienes Pokémon favoritos aún.</p>
      ) : (
        <ul className="favorites-list">
          {favorites.map((name, index) => (
            <li key={index}>
              <button onClick={() => openPokemonDetails(name)}>{name}</button>
              <button onClick={() => toggleFavorite(name)}>★</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favoritos;