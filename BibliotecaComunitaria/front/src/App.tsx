import React from 'react';
import CadastrarUsuario from './CadastrarUsuario';
import BuscarUsuario from './BuscarUsuario';
import DeletarUsuario from './DeletarUsuario';

function App() {
  return (
    <div>
      <h1>Biblioteca Comunitaria</h1>
      <CadastrarUsuario />
      <BuscarUsuario />
      <DeletarUsuario />
    </div>
  );
}

export default App;
