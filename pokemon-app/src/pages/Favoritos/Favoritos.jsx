// pages/Favoritos.jsx
import React from 'react';
import Navbar from '../../components/NavBar/NavBar';
import Favoritos from '../../components/Favoritos/FavoritosList';
import { useFavorites } from '../../components/favoritesContext/FavoritesContext'; // Importa el hook personalizado.
import { usePokemonDetails } from '../../PokemonDetailsContext';

const FavoritosPage = () => {
  const { favorites } = useFavorites(); // Obtiene los favoritos del contexto.
  const { pokemonDetails } = usePokemonDetails();

  return (
    <div>
      <Navbar />
      <h1>Mis Pokémon Favoritos</h1>
      <Favoritos
        favorites={favorites} // Pasa los favoritos al componente FavoritosList.
        openPokemonDetails={(name) => console.log("Abrir detalles de:", name)} // Ejemplo de función.
        toggleFavorite={(name) => console.log("Alternar favorito:", name)} // Ejemplo de función.
        pokemonDetails={pokemonDetails} // Pasa los detalles de los Pokémon (puedes obtenerlos del contexto o de otro lugar).
      />
    </div>
  );
};

export default FavoritosPage;