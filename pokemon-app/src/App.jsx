import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Cargar favoritos desde el almacenamiento local al iniciar
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);

    // Obtener la lista de Pokémon
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((response) => setPokemons(response.data.results))
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

  return (
    <div>
      <h1>Pokédex</h1>
  
      <h2>Favoritos</h2>
      {favorites.length === 0 ? (
        <p>No tienes Pokémon favoritos aún.</p>
      ) : (
        <ul>
          {favorites.map((name, index) => (
            <li key={index}>
              <Link to={`/pokemon/${name}`}>{name}</Link>
              <button onClick={() => toggleFavorite(name)}>★</button>
            </li>
          ))}
        </ul>
      )}
  
      <h2>Todos los Pokémon</h2>
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={index}>
            <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
            <button onClick={() => toggleFavorite(pokemon.name)}>
              {favorites.includes(pokemon.name) ? "★" : "☆"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );  
}

export default App;


/* Aqui se consume la api de pokemon usando use state and use effect de react mostrando una lista de 30 pokemons
 con un link para ver sus detalles 
 Se añade una seccion favoritos donde se alojan todos los favoritos
 se usa local storage para guardar una lista de favoritos
 se incluye na funcion toggle favourites para añadir o eliminar favoritos usando persistencia para mantener la informacion aun refrescando la pagina
 */
