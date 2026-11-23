import { useState } from "react";
import type { Usuario } from "./Models/Usuario";

function BuscarUsuario() {

    const [nomeBusca, setNomeBusca] = useState("");
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    async function buscarUsuario() {
        try {
            const resposta = await fetch(
                `http://localhost:5175/api/usuario/buscar/${encodeURIComponent(nomeBusca)}`
            );

            if (!resposta.ok) {
                alert("Usuário não encontrado");
                setUsuario(null);
                return;
            }

            const dados = await resposta.json();

            setUsuario(dados);

        } catch (erro) {
            console.log("Erro na requisição:", erro);
        }
    }

    return (
        <div>
            <h1>Buscar Usuário</h1>

            <input
                type="text"
                placeholder="Digite o nome do usuário"
                value={nomeBusca}
                onChange={(e) => setNomeBusca(e.target.value)}
            />

            <button onClick={buscarUsuario}>
                Buscar
            </button>

            {usuario && (
                <div>
                    <h2>Usuário encontrado</h2>

                    <p>Nome: {usuario.nomeUsuario}</p>
                    <p>ID: {usuario.id}</p>

                    <h3>Livros</h3>

                    {usuario.livros && usuario.livros.length > 0 ? (
                        usuario.livros.map((livro) => (
                            <div key={livro.id}>
                                <p>Nome: {livro.nome}</p>
                                <p>Autor: {livro.autor}</p>
                                <hr />
                            </div>
                        ))
                    ) : (
                        <p>Esse usuário não possui livros emprestados.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default BuscarUsuario;