// PokemonDetail.jsx
// PokemonDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../NavBar/NavBar";

function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => setPokemon(response.data))
      .catch((error) => console.error("Error al obtener detalles", error));
  }, [name]);

  if (!pokemon) return <p>Cargando...</p>;

  return (
    <div>
      <Navbar />
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Altura: {pokemon.height}</p>
      <p>Peso: {pokemon.weight}</p>
    </div>
  );
}

export default PokemonDetail; 
// Ensure this is a default export
// /* aqui muestro nombre peso y altura de los pokemons seleccionados en una pagina separada
// usando react para consumir la api solicitamos el poquemon seleccionado consumiendo el nombre desde la url  con use params */ 


/* aqui muestro nombre peso y altura de los pokemons seleccionados en una pagina separada
usando react para consumir la api solicitamos el poquemon seleccionado consumiendo el nombre desde la url  con use params
 */

/*<div key={index} className="pokemon-card">
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
            </div>*/