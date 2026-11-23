export interface Livro {
    id?: string;
    nome: string;
    autor: string;
    disponibilizadoPor: string;
    disponivel: boolean;
    usuarioId: string;
}