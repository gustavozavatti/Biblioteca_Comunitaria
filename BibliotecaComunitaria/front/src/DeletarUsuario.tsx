import { useState } from "react";

function DeletarUsuario() {

    const [cpf, setCpf] = useState("");

    async function deletarUsuario() {
        try {
            const resposta = await fetch(
                `http://localhost:5257/api/usuario/deletar/${encodeURIComponent(cpf)}`,
                {
                    method: "DELETE"
                }
            );

            if (!resposta.ok) {
                alert("Erro ao deletar usuário");
                return;
            }

            alert("Usuário deletado com sucesso!");
            setCpf("");

        } catch (erro) {
            console.log("Erro na requisição:", erro);
        }
    }

    return (
        <div>
            <h1>Deletar Usuário</h1>

            <input
                type="text"
                placeholder="Digite o CPF do usuário"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
            />

            <button onClick={deletarUsuario}>
                Deletar
            </button>
        </div>
    );
}

export default DeletarUsuario;