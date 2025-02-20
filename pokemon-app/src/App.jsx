import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ThemeProvider } from './ThemeContext';
import Navbar from './NavBar';
import './styles.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [offset, setOffset] = useState(0);
  const [pokemonDetails, setPokemonDetails] = useState({}); // Almacena detalles adicionales de cada Pokémon

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
                description: "Cargando descripción...", // Inicialmente, mostramos un mensaje de carga
              },
            }));
            // Obtener la descripción del Pokémon
            axios.get(detailResponse.data.species.url).then((speciesResponse) => {
              const description = speciesResponse.data.flavor_text_entries.find(
                (entry) => entry.language.name === "es" // Filtra la descripción en español
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

  // Función para cargar los siguientes Pokémon
  const loadMorePokemon = () => {
    setOffset((prevOffset) => prevOffset + 20);
  };

  // Función para cargar los Pokémon anteriores
  const loadPreviousPokemon = () => {
    setOffset((prevOffset) => Math.max(prevOffset - 20, 0));
  };

  return (
    <div>
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
              <Link to={`/pokemon/${name}`}>{name}</Link>
              <button onClick={() => toggleFavorite(name)}>★</button>
            </li>
          ))}
        </ul>
      )}
  
      <h2>Todos los Pokémon</h2>
      <div className="pokemon-list-container">
        <div className="pokemon-list">
          {pokemons.slice(offset, offset + 20).map((pokemon, index) => (
            <div key={index} className="pokemon-card">
              <div className="pokemon-image">
                <img
                  src={pokemonDetails[pokemon.name]?.image || "https://via.placeholder.com/96"}
                  alt={pokemon.name}
                />
              </div>
              <div className="pokemon-name">
                <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
              </div>
              <div className="pokemon-description">
                {pokemonDetails[pokemon.name]?.description}
              </div>
              <button
                onClick={() => toggleFavorite(pokemon.name)}
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
          <button onClick={loadPreviousPokemon}>Anteriores</button>
        )}
        {offset + 20 < pokemons.length && (
          <button onClick={loadMorePokemon}>Siguientes</button>
        )}
      </div>
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
