import { useState, useEffect } from "react";
import type { Usuario } from "./Models/Usuario";

function Login() {

    const [nomeUsuario, setNomeUsuario] = useState("");
    const [cpf, setCpf] = useState("");
    const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(null);

    useEffect(() => {
        const id = localStorage.getItem("usuarioId");
        const nome = localStorage.getItem("nomeUsuario");
        const cpfSalvo = localStorage.getItem("cpf");

        if (id && nome && cpfSalvo) {
            setUsuarioLogado({
                id: id,
                nomeUsuario: nome,
                cpf: cpfSalvo,
                dataCadastro: "",
                livros: []
            });
        }
    }, []);

    async function fazerLogin() {
        try {
            const resposta = await fetch(
                "http://localhost:5175/api/usuario/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        NomeUsuario: nomeUsuario,
                        CPF: cpf
                    })
                }
            );

            if (!resposta.ok) {
                const erro = await resposta.text();
                alert(erro);
                return;
            }

            const usuario: Usuario = await resposta.json();

            if (!usuario.id || !usuario.nomeUsuario) {
                alert("Dados do usuário inválidos.");
                return;
            }

            localStorage.setItem("usuarioId", usuario.id);
            localStorage.setItem("nomeUsuario", usuario.nomeUsuario);
            localStorage.setItem("cpf", cpf);

            setUsuarioLogado({
                ...usuario,
                cpf: cpf
            });

            setNomeUsuario("");
            setCpf("");

            alert("Login realizado com sucesso!");

        } catch (erro) {
            console.log("Erro no login:", erro);
            alert("Erro ao conectar com o servidor.");
        }
    }

    function sair() {
        localStorage.removeItem("usuarioId");
        localStorage.removeItem("nomeUsuario");
        localStorage.removeItem("cpf");

        setUsuarioLogado(null);

        alert("Você saiu da conta.");
    }

    return (
        <div>
            {usuarioLogado ? (
                <div>
                    <h1>Bem-vindo!</h1>

                    <h2>
                        {usuarioLogado.nomeUsuario}
                    </h2>

                    <p>ID: {usuarioLogado.id}</p>

                    <button onClick={sair}>
                        Sair da conta
                    </button>
                </div>
            ) : (
                <div>
                    <h1>Login</h1>

                    <input
                        type="text"
                        placeholder="Nome de usuário"
                        value={nomeUsuario}
                        onChange={(e) => setNomeUsuario(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="CPF"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                    />

                    <button onClick={fazerLogin}>
                        Entrar
                    </button>
                </div>
            )}
        </div>
    );
}

export default Login;