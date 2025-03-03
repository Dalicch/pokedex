// components/PokemonList/PokemonList.jsx
import React from 'react';
import { useFavorites } from '../../components/favoritesContext/FavoritesContext'; // Importa el hook personalizado.
import PokemonCard from '../PokemonCard/PokemonCard';

const PokemonList = ({ pokemons, offset, openPokemonDetails, pokemonDetails }) => {
  const { favorites, toggleFavorite } = useFavorites(); // Obtiene los favoritos y la función toggleFavorite.

  return (
    <div className="pokemon-list-container">
      <div className="pokemon-list">
        {pokemons.slice(offset, offset + 8).map((pokemon, index) => (
          <PokemonCard
          key={index}
          name={pokemon.name}
          image={pokemonDetails[pokemon.name]?.image}
          toggleFavorite={toggleFavorite}
          isFavorite={favorites.includes(pokemon.name)}
          openPokemonDetails={openPokemonDetails}
        />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
// /* aqui muestro la lista de pokemons con su imagen nombre y un boton para agregar a favoritos */                                         