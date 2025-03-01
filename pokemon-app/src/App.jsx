import { useEffect, useState } from "react";
import axios from "axios";
import { ThemeProvider } from './ThemeContext';
import Navbar from './NavBar';
import './styles.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [offset, setOffset] = useState(0);
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Estado para el Pokémon seleccionado

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
                types: detailResponse.data.types.map((type) => type.type.name), // Tipos del Pokémon
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
    
        <h2>Todos los Pokémon</h2>
        <div className="pokemon-list-container">
          <div className="pokemon-list">
            {pokemons.slice(offset, offset + 20).map((pokemon, index) => (
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
        <div className="pagination-buttons">
          {offset > 0 && (
            <button onClick={() => setOffset((prev) => Math.max(prev - 20, 0))}>
              Anteriores
            </button>
          )}
          {offset + 20 < pokemons.length && (
            <button onClick={() => setOffset((prev) => prev + 20)}>
              Siguientes
            </button>
          )}
        </div>
      </div>
  
      {/* Modal (fuera del contenedor principal) */}
      {selectedPokemon && (
        <div className="pokemon-modal-overlay">
          <div className="pokemon-modal">
            <button className="close-modal" onClick={closePokemonDetails}>
              &times;
            </button>
            <div className="modal-content">
              <img
                src={pokemonDetails[selectedPokemon]?.image}
                alt={selectedPokemon}
              />
              <h2>{selectedPokemon}</h2>
              <p><strong>Descripción:</strong> {pokemonDetails[selectedPokemon]?.description}</p>
              <p><strong>Tipos:</strong> {pokemonDetails[selectedPokemon]?.types.join(", ")}</p>
              {/* Botón de favoritos en el modal */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Evitar que el clic cierre el modal
                  toggleFavorite(selectedPokemon);
                }}
                className="favorite-button"
              >
                {favorites.includes(selectedPokemon) ? "★" : "☆"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;   

// /* aqui muestro los pokemons en una lista con su imagen nombre y descripcion
// con un boton para ver detalles y otro para agregar a favoritos */                    