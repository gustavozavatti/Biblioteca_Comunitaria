import { useEffect, useState } from "react";
import type { Livro } from "./Models/Livro";

function ListarLivros() {

    const [livros, setLivros] = useState<Livro[]>([]);

    useEffect(() => {
        async function buscarLivros() {
            try {
                const resposta = await fetch(
                    "http://localhost:5175/api/livro/listar"
                );

                if (!resposta.ok) {
                    alert("Erro ao buscar livros");
                    return;
                }

                const dados: Livro[] = await resposta.json();

                setLivros(dados);

            } catch (erro) {
                console.log("Erro na requisição:", erro);
            }
        }

        buscarLivros();
    }, []);

    return (
        <div className="acervo">

            <div className="acervo-header">
                <div className="acervo-titulo">
                    <span className="acervo-subtitle">
                        BIBLIOTECA COMUNITÁRIA
                    </span>

                    <h1>Livros cadastrados</h1>

                    <p>
                        Explore os livros disponíveis em nosso acervo comunitário.
                    </p>
                </div>

                <div className="acervo-contador">
                    <span>{livros.length}</span>
                    <p>Livros no acervo</p>
                </div>
            </div>

            {livros.length === 0 ? (
                <div className="acervo-vazio">
                    <div className="acervo-vazio-icon">📚</div>
                    <h2>Nenhum livro encontrado</h2>
                    <p>Os livros cadastrados aparecerão aqui.</p>
                </div>
            ) : (
                <div className="livros-grid">

                    {livros.map((livro) => (
                        <div className="livro-card" key={livro.id}>

                            <div className="livro-card-topo">
                                <div className="livro-icon">
                                    📖
                                </div>

                                <span className={`livro-status ${livro.disponivel ? "disponivel" : "emprestado"}`}>
                                    <span className="livro-status-dot"></span>
                                    {livro.disponivel ? "Disponível" : "Emprestado"}
                                </span>
                            </div>

                            <div className="livro-informacoes">
                                <h2>{livro.nome}</h2>
                                <p className="livro-autor">
                                    {livro.autor}
                                </p>
                            </div>

                            <div className="livro-card-footer">
                                <div className="livro-proprietario-icon">
                                    👤
                                </div>

                                <div>
                                    <span className="livro-label">
                                        Disponibilizado por
                                    </span>

                                    <p>{livro.disponibilizadoPor}</p>
                                </div>
                            </div>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}

export default ListarLivros;