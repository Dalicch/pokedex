// App.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from './components/NavBar/NavBar';
import PokemonList from './components/PokemonList/PokemonList';
import Favoritos from './components/Favoritos/FavoritosList';
import PokemonModal from './components/PokemonModal/PokemonModal'; 
import './styles/global.css';
import { useFavorites } from './components/favoritesContext/FavoritesContext';
import './PokemonDetailsContext'

function App() {
  const [pokemons, setPokemons] = useState([]);
  const { favorites, toggleFavorite } = useFavorites();
  const [offset, setOffset] = useState(0);
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    // Obtener la lista de Pokémon
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => {
        setPokemons(response.data.results);
        // Obtener detalles adicionales para cada Pokémon
        response.data.results.forEach((pokemon) => {
          axios.get(pokemon.url).then((detailResponse) => {
            setPokemonDetails((prevDetails) => ({
              ...prevDetails,
              [pokemon.name]: {
                image: detailResponse.data.sprites.front_default,
                description: "Cargando descripción...",
                types: detailResponse.data.types.map((type) => type.type.name),
              },
            }));
            // Obtener la descripción del Pokémon
            axios.get(detailResponse.data.species.url).then((speciesResponse) => {
              const description = speciesResponse.data.flavor_text_entries.find(
                (entry) => entry.language.name === "es"
              )?.flavor_text || "Descripción no disponible";
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
      .catch((error) => console.error("Error al obtener Pokémon", error));
  }, []);

  // Función para abrir el modal con los detalles del Pokémon
  const openPokemonDetails = (pokemonName) => {
    setSelectedPokemon(pokemonName);
  };

  // Función para cerrar el modal
  const closePokemonDetails = () => {
    setSelectedPokemon(null);
  };

  return (
    <div>
      {/* Contenedor principal (se aplicará el desenfoque) */}
      <div className={selectedPokemon ? "blur-background" : ""}>
        <h1>Pokédex</h1>
        <Navbar/>
        {/* Componente Favoritos */}
        <Favoritos
          favorites={favorites}
          openPokemonDetails={openPokemonDetails}
          toggleFavorite={toggleFavorite}
          pokemonDetails={pokemonDetails} // Pasa pokemonDetails al componente Favoritos.
        />

        <h2>Todos los Pokémon</h2>
        <PokemonList
          pokemons={pokemons}
          offset={offset}
          toggleFavorite={toggleFavorite}
          openPokemonDetails={openPokemonDetails}
          favorites={favorites}
          pokemonDetails={pokemonDetails}
        />
        <div className="pagination-buttons">
          {offset > 0 && (
            <button onClick={() => setOffset((prev) => Math.max(prev - 8, 0))}>
              Anteriores
            </button>
          )}
          {offset + 8 < pokemons.length && (
            <button onClick={() => setOffset((prev) => prev + 8)}>
              Siguientes
            </button>
          )}
        </div>
      </div>

      {/* Componente PokemonModal */}
      <PokemonModal
        selectedPokemon={selectedPokemon}
        pokemonDetails={pokemonDetails}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        closePokemonDetails={closePokemonDetails}
      />
    </div>
  );
}

export default App;