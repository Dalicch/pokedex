// components/PokemonCard/PokemonCard.jsx
import React from 'react';

const PokemonCard = ({ name, image, toggleFavorite, isFavorite, openPokemonDetails }) => {
  return (
    <div className="pokemon-card" onClick={() => openPokemonDetails(name)}>
      <div className="pokemon-image">
        <img src={image || "https://via.placeholder.com/96"} alt={name} />
      </div>
      <div className="pokemon-name">{name}</div>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Evita que el clic en el botón active el evento del contenedor.
          toggleFavorite(name);
        }}
        className="favorite-button"
      >
        {isFavorite ? "★" : "☆"}
      </button>
    </div>
  );
};

export default PokemonCard;