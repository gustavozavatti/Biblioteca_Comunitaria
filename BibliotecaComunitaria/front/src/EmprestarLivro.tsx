import { useState } from "react";

function EmprestarLivro() {

    const [idLivro, setIdLivro] = useState("");

    async function emprestarLivro() {
        try {
            const usuarioId = localStorage.getItem("usuarioId");

            if (!usuarioId) {
                alert("Faça login antes de emprestar um livro.");
                return;
            }

            if (!idLivro) {
                alert("Informe o ID do livro.");
                return;
            }

            const resposta = await fetch(
                `http://localhost:5175/api/livro/emprestar/${encodeURIComponent(usuarioId)}/${encodeURIComponent(idLivro)}`,
                {
                    method: "PUT"
                }
            );

            if (!resposta.ok) {
                const erro = await resposta.text();
                alert(erro);
                return;
            }

            alert("Livro emprestado com sucesso!");

            setIdLivro("");

        } catch (erro) {
            console.log("Erro na requisição:", erro);
            alert("Erro ao conectar com o servidor.");
        }
    }

    return (
        <div>
            <h1>Emprestar Livro</h1>

            <input
                type="text"
                placeholder="ID do livro"
                value={idLivro}
                onChange={(e) => setIdLivro(e.target.value)}
            />

            <button onClick={emprestarLivro}>
                Emprestar Livro
            </button>
        </div>
    );
}

export default EmprestarLivro;