// PokemonModal.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import './PokemonModal.css';

const PokemonModal = ({ selectedPokemon, pokemonDetails, favorites, toggleFavorite, closePokemonDetails }) => {
  if (!selectedPokemon) return null; // No renderizar si no hay un Pokémon seleccionado

  return (
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
          {/* Convierte el nombre en un enlace */}
          <Link to={`/pokemon/${selectedPokemon}`} className="pokemon-name-link">
            <h2>{selectedPokemon}</h2>
          </Link>
          <p><strong>Descripción:</strong> {pokemonDetails[selectedPokemon]?.description}</p>
          <p><strong>Tipos:</strong> {pokemonDetails[selectedPokemon]?.types.join(", ")}</p>
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
  );
};

export default PokemonModal;