// pages/CrearPokemon.jsx
import React, { useState } from 'react';
import Navbar from '../../components/NavBar/NavBar';

const CrearPokemon = () => {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la creación del Pokémon (e.g., enviar a una API o guardar en el estado global)
    console.log('Pokémon creado:', { nombre, tipo });
  };

  return (
    <div>
      <Navbar />
      <h1>Crear un Pokémon</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>
        <label>
          Tipo:
          <input
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />
        </label>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CrearPokemon;