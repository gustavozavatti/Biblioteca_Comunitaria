import { Livro } from "./Livro";

export interface Usuario {
    id?: string;
    nomeUsuario: string;
    cpf: string;
    dataCadastro: string;
    livros: Livro[];
}