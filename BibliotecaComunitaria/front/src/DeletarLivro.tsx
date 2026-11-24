import { useState } from "react";

function DeletarLivro() {

    const [idLivro, setIdLivro] = useState("");

    async function deletarLivro() {
        try {
            const usuarioId = localStorage.getItem("usuarioId");

            if (!usuarioId) {
                alert("Faça login antes de deletar um livro.");
                return;
            }

            if (!idLivro) {
                alert("Informe o ID do livro.");
                return;
            }

            const confirmar = window.confirm(
                "Tem certeza que deseja deletar este livro?"
            );

            if (!confirmar) {
                return;
            }

            const resposta = await fetch(
                `http://localhost:5257/api/livro/deletar/${encodeURIComponent(usuarioId)}/${encodeURIComponent(idLivro)}`,
                {
                    method: "DELETE"
                }
            );

            if (!resposta.ok) {
                const erro = await resposta.text();
                alert(erro);
                return;
            }

            alert("Livro deletado com sucesso!");

            setIdLivro("");

        } catch (erro) {
            console.log("Erro na requisição:", erro);
            alert("Erro ao conectar com o servidor.");
        }
    }

    return (
        <div>
            <h1>Deletar Livro</h1>

            <input
                type="text"
                placeholder="ID do livro"
                value={idLivro}
                onChange={(e) => setIdLivro(e.target.value)}
            />

            <button onClick={deletarLivro}>
                Deletar Livro
            </button>
        </div>
    );
}

export default DeletarLivro;