import { useState } from "react";

function AlterarLivro() {

    const [idLivro, setIdLivro] = useState("");
    const [nome, setNome] = useState("");
    const [autor, setAutor] = useState("");

    async function alterarLivro() {
        try {
            const usuarioId = localStorage.getItem("usuarioId");

            if (!usuarioId) {
                alert("Faça login antes de alterar um livro.");
                return;
            }

            const resposta = await fetch(
                `http://localhost:5257/api/livro/alterar/${encodeURIComponent(usuarioId)}/${encodeURIComponent(idLivro)}`,
                {
                    method: "PUT",
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

            alert("Livro alterado com sucesso!");

            setIdLivro("");
            setNome("");
            setAutor("");

        } catch (erro) {
            console.log("Erro na requisição:", erro);
            alert("Erro ao conectar com o servidor.");
        }
    }

    return (
        <div>
            <h1>Alterar Livro</h1>

            <input
                type="text"
                placeholder="ID do livro"
                value={idLivro}
                onChange={(e) => setIdLivro(e.target.value)}
            />

            <input
                type="text"
                placeholder="Novo nome do livro"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />

            <input
                type="text"
                placeholder="Novo autor"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
            />

            <button onClick={alterarLivro}>
                Alterar Livro
            </button>
        </div>
    );
}

export default AlterarLivro;