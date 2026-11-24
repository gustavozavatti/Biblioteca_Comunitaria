import React from 'react';
import CadastrarUsuario from './CadastrarUsuario';
import BuscarUsuario from './BuscarUsuario';
import DeletarUsuario from './DeletarUsuario';
import CadastrarLivro from './CadastrarLivro';
import ListarLivros from './ListarLivros';
import Login from './Login';
import BuscarLivro from './BuscarLivro';
import AlterarLivro from './AlterarLivro';
import DeletarLivro from './DeletarLivro';
import EmprestarLivro from './EmprestarLivro';

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
      <BuscarLivro />
      <AlterarLivro />
      <DeletarLivro />
      <EmprestarLivro />

    </div>
  );
}

export default App;
