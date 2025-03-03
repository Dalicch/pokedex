// FavoritesContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Cargar favoritos desde localStorage al iniciar.
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    console.log("Cargando favoritos desde localStorage:", savedFavorites)
    setFavorites(savedFavorites);
  }, []);

  // Guardar favoritos en localStorage cada vez que cambien.
  useEffect(() => {
    console.log("Guardando favoritos en localStorage:", favorites);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemonName) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(pokemonName)) {
        return prevFavorites.filter((name) => name !== pokemonName);
      } else {
        return [...prevFavorites, pokemonName];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};