// PokemonDetailModal.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PokemonDetailModal({ pokemonName, onClose }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => setPokemon(response.data))
      .catch((error) => console.error('Error al obtener detalles', error));
  }, [pokemonName]);

  if (!pokemon) return <div className="modal">Cargando...</div>;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h1>{pokemon.name}</h1>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p>Altura: {pokemon.height}</p>
        <p>Peso: {pokemon.weight}</p>
      </div>
    </div>
  );
}

export default PokemonDetailModal;
