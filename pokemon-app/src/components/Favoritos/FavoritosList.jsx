// components/Favoritos/FavoritosList.jsx
import React from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';


const Favoritos = ({ favorites, openPokemonDetails, toggleFavorite, pokemonDetails }) => {
  return (
    <div>
      <h2>Favoritos</h2>
      {favorites.length === 0 ? (
        <p>No tienes Pokémon favoritos aún.</p>
      ) : (
        <div className="pokemon-list-container">
          <div className="pokemon-list">
            {favorites.map((name, index) => (
              <PokemonCard
              key={index}
              name={name}
              image={pokemonDetails[name]?.image}
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.includes(name)}
              openPokemonDetails={openPokemonDetails}
            />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favoritos;
// /* aqui muestro la lista de pokemons favoritos con su imagen nombre y un boton para agregar a favoritos */ 