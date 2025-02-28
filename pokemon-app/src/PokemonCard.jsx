// PokemonCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function PokemonCard({ pokemon, details, isFavorite, onToggleFavorite, onClick }) {
  return (
    <div className="pokemon-card">
      <div className="pokemon-image">
        <img
          src={details?.image || "https://via.placeholder.com/96"}
          alt={pokemon.name}
        />
      </div>
      <div className="pokemon-name">
        <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
      </div>
      <div className="pokemon-description">
        {details?.description}
      </div>
      <button
        onClick={() => onToggleFavorite(pokemon.name)}
        className="favorite-button"
      >
        {isFavorite ? "★" : "☆"}
      </button>
      <button onClick={() => onClick(pokemon.name)} className="details-button">
        Ver Detalles
      </button>
    </div>
  );
}

export default PokemonCard;

// /* aqui muestro los pokemons en una tarjeta con su imagen nombre y descripcion
//  con un boton para ver detalles y otro para agregar a favoritos */