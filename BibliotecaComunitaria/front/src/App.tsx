import React from 'react';
import CadastrarUsuario from './CadastrarUsuario';
import BuscarUsuario from './BuscarUsuario';
import DeletarUsuario from './DeletarUsuario';
import CadastrarLivro from './CadastrarLivro';
import ListarLivros from './ListarLivros';

function App() {
  return (
    <div>
      <h1>Biblioteca Comunitaria</h1>
      <Login />
      <CadastrarUsuario />
      <BuscarUsuario />
      <DeletarUsuario />
      <CadastrarLivro />
      <ListarLivros />
    </div>
  );
}

export default App;
