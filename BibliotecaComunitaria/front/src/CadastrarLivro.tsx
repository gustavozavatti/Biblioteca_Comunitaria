import { useState } from "react";

function CadastrarLivro() {

    const [nome, setNome] = useState("");
    const [autor, setAutor] = useState("");

    async function cadastrarLivro() {
        try {
            const usuarioId = localStorage.getItem("usuarioId");

            if (!usuarioId) {
                alert("Faça login antes de cadastrar um livro.");
                return;
            }

            const resposta = await fetch(
                `http://localhost:5175/api/livro/cadastrar/${encodeURIComponent(usuarioId)}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Nome: nome,
                        Autor: autor
                    })
                }
            );

            if (!resposta.ok) {
                const erro = await resposta.text();
                alert(erro);
                return;
            }

            alert("Livro cadastrado com sucesso!");

            setNome("");
            setAutor("");

        } catch (erro) {
            console.log("Erro na requisição:", erro);
            alert("Erro ao conectar com o servidor.");
        }
    }

    return (
        <div>
            <h1>Cadastrar Livro</h1>

            <input
                type="text"
                placeholder="Nome do livro"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />

            <input
                type="text"
                placeholder="Autor"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
            />

            <button onClick={cadastrarLivro}>
                Cadastrar Livro
            </button>
        </div>
    );
}

export default CadastrarLivro;