import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Altura: {pokemon.height}</p>
      <p>Peso: {pokemon.weight}</p>
    </div>
  );
}

export default PokemonDetail;


/* aqui muestro nombre peso y altura de los pokemons seleccionados en una pagina separada
usando react para consumir la api solicitamos el poquemon seleccionado consumiendo el nombre desde la url  con use params
 */