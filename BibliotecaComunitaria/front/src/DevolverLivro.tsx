import { useState } from "react";

function DevolverLivro() {

    const [idLivro, setIdLivro] = useState("");

    async function devolverLivro() {
        try {
            const usuarioId = localStorage.getItem("usuarioId");

            if (!usuarioId) {
                alert("Faça login antes de devolver um livro.");
                return;
            }

            if (!idLivro) {
                alert("Informe o ID do livro.");
                return;
            }

            const resposta = await fetch(
                `http://localhost:5175/api/livro/devolver/${encodeURIComponent(usuarioId)}/${encodeURIComponent(idLivro)}`,
                {
                    method: "PUT"
                }
            );

            if (!resposta.ok) {
                const erro = await resposta.text();
                alert(erro);
                return;
            }

            alert("Livro devolvido com sucesso!");

            setIdLivro("");

        } catch (erro) {
            console.log("Erro na requisição:", erro);
            alert("Erro ao conectar com o servidor.");
        }
    }

    return (
        <div>
            <h1>Devolver Livro</h1>

            <input
                type="text"
                placeholder="ID do livro"
                value={idLivro}
                onChange={(e) => setIdLivro(e.target.value)}
            />

            <button onClick={devolverLivro}>
                Devolver Livro
            </button>
        </div>
    );
}

export default DevolverLivro;