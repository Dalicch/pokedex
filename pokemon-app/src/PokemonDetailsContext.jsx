// PokemonDetailsContext.js
import React, { createContext, useState, useContext } from 'react';

const PokemonDetailsContext = createContext();

export const PokemonDetailsProvider = ({ children }) => {
  const [pokemonDetails, setPokemonDetails] = useState({});

  return (
    <PokemonDetailsContext.Provider value={{ pokemonDetails, setPokemonDetails }}>
      {children}
    </PokemonDetailsContext.Provider>
  );
};

export const usePokemonDetails = () => {
  return useContext(PokemonDetailsContext);
};