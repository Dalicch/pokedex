// PokemonList.jsx
import React from 'react';

const PokemonList = ({ pokemons, offset, toggleFavorite, openPokemonDetails, favorites, pokemonDetails }) => {
  return (
    <div className="pokemon-list-container">
      <div className="pokemon-list">
        {pokemons.slice(offset, offset + 8).map((pokemon, index) => (
          <div
            key={index}
            className="pokemon-card"
            onClick={() => openPokemonDetails(pokemon.name)}
          >
            <div className="pokemon-image">
              <img
                src={pokemonDetails[pokemon.name]?.image || "https://via.placeholder.com/96"}
                alt={pokemon.name}
              />
            </div>
            <div className="pokemon-name">{pokemon.name}</div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(pokemon.name);
              }}
              className="favorite-button"
            >
              {favorites.includes(pokemon.name) ? "★" : "☆"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
// /* aqui muestro la lista de pokemons con su imagen nombre y un boton para agregar a favoritos */                                         