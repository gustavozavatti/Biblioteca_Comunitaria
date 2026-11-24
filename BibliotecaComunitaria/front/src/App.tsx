import React, { useState } from 'react';

import CadastrarUsuario from './CadastrarUsuario';
import BuscarUsuario from './BuscarUsuario';
import DeletarUsuario from './DeletarUsuario';

import CadastrarLivro from './CadastrarLivro';
import ListarLivros from './ListarLivros';
import BuscarLivro from './BuscarLivro';
import AlterarLivro from './AlterarLivro';
import DeletarLivro from './DeletarLivro';
import EmprestarLivro from './EmprestarLivro';
import DevolverLivro from './DevolverLivro';

import Login from './Login';

function App() {
    const [pagina, setPagina] = useState('listarLivros');
    const [usuariosAberto, setUsuariosAberto] = useState(true);
    const [livrosAberto, setLivrosAberto] = useState(true);

    const titulos: Record<string, string> = {
        login: 'Acesso ao sistema',
        cadastrarUsuario: 'Cadastrar usuário',
        buscarUsuario: 'Buscar usuário',
        deletarUsuario: 'Excluir usuário',
        cadastrarLivro: 'Cadastrar livro',
        listarLivros: 'Acervo de livros',
        buscarLivro: 'Buscar livro',
        alterarLivro: 'Alterar livro',
        deletarLivro: 'Excluir livro',
        emprestarLivro: 'Emprestar livro',
        devolverLivro: 'Devolver livro'
    };

    function navegar(novaPagina: string) {
        setPagina(novaPagina);
    }

    return (
        <div className="app-container">

            <aside className="sidebar">

                <div className="brand">
                    <div className="brand-icon">B</div>
                    <div>
                        <h2>Biblioteca</h2>
                        <span>COMUNITÁRIA</span>
                    </div>
                </div>

                <div className="menu-label">MENU PRINCIPAL</div>

                <nav className="sidebar-nav">

                    <button
                        className={`menu-item ${pagina === 'listarLivros' ? 'active' : ''}`}
                        onClick={() => navegar('listarLivros')}
                    >
                        <span className="menu-icon">⌂</span>
                        <span>Início / Acervo</span>
                    </button>

                    <div className="menu-group">

                        <button
                            className="menu-category"
                            onClick={() => setUsuariosAberto(!usuariosAberto)}
                            aria-expanded={usuariosAberto}
                        >
                            <span>
                                <span className="menu-icon">♙</span>
                                Usuários
                            </span>
                            <span className={`arrow ${usuariosAberto ? 'rotated' : ''}`}>⌄</span>
                        </button>

                        {usuariosAberto && (
                            <div className="submenu">
                                <button className={pagina === 'cadastrarUsuario' ? 'active' : ''} onClick={() => navegar('cadastrarUsuario')}>
                                    Cadastrar usuário
                                </button>
                                <button className={pagina === 'buscarUsuario' ? 'active' : ''} onClick={() => navegar('buscarUsuario')}>
                                    Buscar usuário
                                </button>
                                <button className={pagina === 'deletarUsuario' ? 'active' : ''} onClick={() => navegar('deletarUsuario')}>
                                    Excluir usuário
                                </button>
                            </div>
                        )}

                    </div>

                    <div className="menu-group">

                        <button
                            className="menu-category"
                            onClick={() => setLivrosAberto(!livrosAberto)}
                            aria-expanded={livrosAberto}
                        >
                            <span>
                                <span className="menu-icon">▤</span>
                                Livros
                            </span>
                            <span className={`arrow ${livrosAberto ? 'rotated' : ''}`}>⌄</span>
                        </button>

                        {livrosAberto && (
                            <div className="submenu">
                                <button className={pagina === 'cadastrarLivro' ? 'active' : ''} onClick={() => navegar('cadastrarLivro')}>
                                    Cadastrar livro
                                </button>
                                <button className={pagina === 'buscarLivro' ? 'active' : ''} onClick={() => navegar('buscarLivro')}>
                                    Buscar livro
                                </button>
                                <button className={pagina === 'alterarLivro' ? 'active' : ''} onClick={() => navegar('alterarLivro')}>
                                    Alterar livro
                                </button>
                                <button className={pagina === 'deletarLivro' ? 'active' : ''} onClick={() => navegar('deletarLivro')}>
                                    Excluir livro
                                </button>
                            </div>
                        )}

                    </div>

                    <div className="menu-label operations-label">OPERAÇÕES</div>

                    <button
                        className={`menu-item ${pagina === 'emprestarLivro' ? 'active' : ''}`}
                        onClick={() => navegar('emprestarLivro')}
                    >
                        <span className="menu-icon">⇧</span>
                        <span>Emprestar livro</span>
                    </button>

                    <button
                        className={`menu-item ${pagina === 'devolverLivro' ? 'active' : ''}`}
                        onClick={() => navegar('devolverLivro')}
                    >
                        <span className="menu-icon">⇩</span>
                        <span>Devolver livro</span>
                    </button>

                    <div className="menu-label operations-label">CONTA</div>

                    <button
                        className={`menu-item ${pagina === 'login' ? 'active' : ''}`}
                        onClick={() => navegar('login')}
                    >
                        <span className="menu-icon">⇥</span>
                        <span>Login</span>
                    </button>

                </nav>

                <div className="sidebar-footer">
                    <span className="status-dot"></span>
                    Sistema conectado
                </div>

            </aside>

            <main className="main-content">

                <header className="topbar">
                    <div>
                        <span className="breadcrumb">BIBLIOTECA / SISTEMA</span>
                        <h1>{titulos[pagina]}</h1>
                    </div>

                    <div className="topbar-info">
                        <span className="online-indicator"></span>
                        <span>Área administrativa</span>
                    </div>
                </header>

                <section className="content-area">
                    <div className="content-card">

                        {pagina === 'login' && <Login />}

                        {pagina === 'cadastrarUsuario' && <CadastrarUsuario />}
                        {pagina === 'buscarUsuario' && <BuscarUsuario />}
                        {pagina === 'deletarUsuario' && <DeletarUsuario />}

                        {pagina === 'cadastrarLivro' && <CadastrarLivro />}
                        {pagina === 'listarLivros' && <ListarLivros />}
                        {pagina === 'buscarLivro' && <BuscarLivro />}
                        {pagina === 'alterarLivro' && <AlterarLivro />}
                        {pagina === 'deletarLivro' && <DeletarLivro />}

                        {pagina === 'emprestarLivro' && <EmprestarLivro />}
                        {pagina === 'devolverLivro' && <DevolverLivro />}

                    </div>
                </section>

                <footer className="main-footer">
                    Biblioteca Comunitária · Sistema de gerenciamento
                </footer>

            </main>

        </div>
    );
}

export default App;