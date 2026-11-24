import { useState } from "react";
import type { Usuario } from "./Models/Usuario";

function CadastrarUsuario() {

    const [usuario, setUsuario] = useState<Usuario>({
        nomeUsuario: "",
        cpf: "",
        dataCadastro: new Date().toISOString(),
        livros: []
    });

    async function cadastrar() {
        try {
            const resposta = await fetch("http://localhost:5257/api/usuario/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    NomeUsuario: usuario.nomeUsuario,
                    CPF: usuario.cpf
                })
            });

            if (!resposta.ok) {
                alert("Erro ao cadastrar usuário");
                return;
            }

            alert("Usuário cadastrado com sucesso!");

        } catch (erro) {
            console.log("Erro na requisição:", erro);
        }
    }

    return (
        <div>
            <h1>Cadastrar Usuário</h1>

            <input
                type="text"
                placeholder="Nome"
                value={usuario.nomeUsuario}
                onChange={(e) => setUsuario({
                    ...usuario,
                    nomeUsuario: e.target.value
                })}
            />

            <input
                type="text"
                placeholder="CPF"
                value={usuario.cpf}
                onChange={(e) => setUsuario({
                    ...usuario,
                    cpf: e.target.value
                })}
            />

            <button onClick={cadastrar}>
                Cadastrar
            </button>
        </div>
    );
}

export default CadastrarUsuario;