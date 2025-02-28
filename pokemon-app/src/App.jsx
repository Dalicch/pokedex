// App.jsx
// App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Favoritos from './Favoritos';
import Navbar from './Navbar';
import { ThemeProvider } from './ThemeContext';
import './App.css';
import './styles.css';
import PokemonCard from './PokemonCard';
import PokemonDetailModal from './PokemonDetailModal'; // Nuevo componente para el modal

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [offset, setOffset] = useState(0);
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Estado para el Pokémon seleccionado

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);

    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then((response) => {
        setPokemons(response.data.results);
        response.data.results.forEach((pokemon) => {
          axios.get(pokemon.url).then((detailResponse) => {
            setPokemonDetails((prevDetails) => ({
              ...prevDetails,
              [pokemon.name]: {
                image: detailResponse.data.sprites.front_default,
                description: 'Cargando descripción...',
              },
            }));
            axios.get(detailResponse.data.species.url).then((speciesResponse) => {
              const description =
                speciesResponse.data.flavor_text_entries.find(
                  (entry) => entry.language.name === 'es'
                )?.flavor_text || 'Descripción no disponible';
              setPokemonDetails((prevDetails) => ({
                ...prevDetails,
                [pokemon.name]: {
                  ...prevDetails[pokemon.name],
                  description,
                },
              }));
            });
          });
        });
      })
      .catch((error) => console.error('Error al obtener Pokémon', error));
  }, []);

  const toggleFavorite = (pokemonName) => {
    let updatedFavorites;
    if (favorites.includes(pokemonName)) {
      updatedFavorites = favorites.filter((name) => name !== pokemonName);
    } else {
      updatedFavorites = [...favorites, pokemonName];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const loadMorePokemon = () => {
    setOffset((prevOffset) => prevOffset + 20);
  };

  const loadPreviousPokemon = () => {
    setOffset((prevOffset) => Math.max(prevOffset - 20, 0));
  };

  const handleCardClick = (pokemonName) => {
    setSelectedPokemon(pokemonName);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className={selectedPokemon ? 'modal-open' : ''}>
      <h1>Pokédex</h1>
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
      <Favoritos favorites={favorites} toggleFavorite={toggleFavorite} />
      <h2>Todos los Pokémon</h2>
      <div className="pokemon-list-container">
        <div className="pokemon-list">
          {pokemons.slice(offset, offset + 20).map((pokemon, index) => (
            <PokemonCard
              key={index}
              pokemon={pokemon}
              details={pokemonDetails[pokemon.name]}
              isFavorite={favorites.includes(pokemon.name)}
              onToggleFavorite={toggleFavorite}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
      <div className="pagination-buttons">
        {offset > 0 && (
          <button onClick={loadPreviousPokemon}>Anteriores</button>
        )}
        {offset + 20 < pokemons.length && (
          <button onClick={loadMorePokemon}>Siguientes</button>
        )}
      </div>
      {selectedPokemon && (
        <PokemonDetailModal
          pokemonName={selectedPokemon}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;
    

/* Aqui se consume la api de pokemon usando use state and use effect de react mostrando una lista de 30 pokemons
 con un link para ver sus detalles 
 Se añade una seccion favoritos donde se alojan todos los favoritos
 se usa local storage para guardar una lista de favoritos
 se incluye na funcion toggle favourites para añadir o eliminar favoritos usando persistencia para mantener la informacion aun refrescando la pagina
 q*/
