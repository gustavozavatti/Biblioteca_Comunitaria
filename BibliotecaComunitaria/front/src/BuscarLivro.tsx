import { useState } from "react";
import type { Livro } from "./Models/Livro";

function BuscarLivro() {

    const [nome, setNome] = useState("");
    const [livro, setLivro] = useState<Livro | null>(null);

    async function buscarLivro() {
        try {
            const resposta = await fetch(
                'http://localhost:5175/api/livro/buscar/${encodeURIComponent(nome)}'
            );

            if (!resposta.ok) {
                alert("Livro não encontrado.");
                setLivro(null);
                return;
            }

            const dados: Livro = await resposta.json();

            setLivro(dados);

        } catch (erro) {
            console.log("Erro na requisição:", erro);
            alert("Erro ao conectar com o servidor.");
        }
    }

    return (
        <div>
            <h1>Buscar Livro</h1>

            <input
                type="text"
                placeholder="Nome do livro"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />

            <button onClick={buscarLivro}>
                Buscar
            </button>

            {livro && (
                <div>
                    <h2>{livro.nome}</h2>
                    <p>Autor: {livro.autor}</p>
                    <p>Disponível: {livro.disponivel ? "Sim" : "Não"}</p>
                    <p>Disponibilizado por: {livro.disponibilizadoPor}</p>
                </div>
            )}
        </div>
    );
}

export default BuscarLivro;