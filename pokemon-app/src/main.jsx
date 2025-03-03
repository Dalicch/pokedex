// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import FavoritosPage from './pages/Favoritos/Favoritos';
import CrearPokemon from './pages/CrearPokemon/CrearPokemon';
import { ThemeProvider } from './ThemeContext';
import { FavoritesProvider } from '../src/components/favoritesContext/FavoritesContext'; // Importa el proveedor de favoritos.
import './index.css';
import { PokemonDetailsProvider } from './PokemonDetailsContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FavoritesProvider>
    <ThemeProvider> 
      <PokemonDetailsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/pokemon/:name" element={<PokemonDetail />} />
            <Route path="/favoritos" element={<FavoritosPage />} />
            <Route path="/crear-pokemon" element={<CrearPokemon />} />
          </Routes>
        </Router>
      </PokemonDetailsProvider>
    </ThemeProvider>
    </FavoritesProvider>
  </React.StrictMode>
);
/* Navegacion de la pagina principal a la de detalles de pokemon */