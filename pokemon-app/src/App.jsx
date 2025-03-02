import { useEffect, useState } from "react";
import axios from "axios";
import { ThemeProvider } from './ThemeContext';
import Navbar from './NavBar';
import './styles.css';
import PokemonList from './PokemonList';
import Favoritos from './Favoritos';
import PokemonModal from './PokemonModal'; 

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [offset, setOffset] = useState(0);
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    // Cargar favoritos desde el almacenamiento local al iniciar
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);

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

  // Función para manejar el marcado/desmarcado de favoritos
  const toggleFavorite = (pokemonName) => {
    let updatedFavorites;
    if (favorites.includes(pokemonName)) {
      updatedFavorites = favorites.filter((name) => name !== pokemonName);
    } else {
      updatedFavorites = [...favorites, pokemonName];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

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
        <ThemeProvider>
          <Navbar />
        </ThemeProvider>

        {/* Componente Favoritos */}
        <Favoritos
          favorites={favorites}
          openPokemonDetails={openPokemonDetails}
          toggleFavorite={toggleFavorite}
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