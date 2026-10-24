using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
var app = builder.Build();

//POST: http://localhost:5257/api/usuario/cadastrar
app.MapPost("/api/usuario/cadastrar", ([FromBody] Usuario? usuario, [FromServices] AppDataContext ctx) => 
{
    if(usuario is null)
        return Results.BadRequest("Usuário Inválido");

    if(string.IsNullOrWhiteSpace(usuario.NomeUsuario) || string.IsNullOrWhiteSpace(usuario.CPF))
        return Results.BadRequest("Preencha todos os campos obrigatórios.");

    if (!usuario.ValidarCPF())
        return Results.BadRequest("CPF inválido.");

    if (ctx.Usuarios.FirstOrDefault(u => u.NomeUsuario == usuario.NomeUsuario) != null)
        return Results.Conflict("Nome de usuário já em uso!");

    if(ctx.Usuarios.FirstOrDefault(usuariosCadastrados => usuariosCadastrados.CPF == usuario.CPF) != null)
        return Results.Conflict("Usuário já cadastrado!");

    ctx.Usuarios.Add(usuario);
    ctx.SaveChanges();
    return Results.Created("", usuario);
});

//GET: http://localhost:5257/api/usuario/buscar/nome_usuario
app.MapGet("/api/usuario/buscar/{nome}", ([FromRoute] string nome, [FromServices] AppDataContext ctx) =>
{
    Usuario? usuarioEncontrado = ctx.Usuarios
        .Include(usuario => usuario.Livros)
        .FirstOrDefault(usuario => usuario.NomeUsuario == nome);

    if (usuarioEncontrado != null)
    {
        return Results.Ok(new
        {
            usuarioEncontrado.NomeUsuario,
            usuarioEncontrado.Id,
            Livros = usuarioEncontrado.Livros.Select(l => new { l.Id, l.Nome, l.Autor, l.DisponibilizadoPor })
        });
    }

    return Results.NotFound("Usuário não encontrado");
    
});

//DELETE: http://localhost:5257/api/usuario/deletar/cpf_usuario
app.MapDelete("/api/usuario/deletar/{cpf}", ([FromRoute] string cpf, [FromServices] AppDataContext ctx) => 
{
    Usuario? usuarioDeletar = ctx.Usuarios.FirstOrDefault(usuario => usuario.CPF == cpf);

    if(usuarioDeletar != null)
    {
        ctx.Usuarios.Remove(usuarioDeletar);
        ctx.SaveChanges();
        return Results.Ok("Usuário deletado com sucesso!");
    }

    return Results.NotFound("Usuário não encontrado");

});

//POST: http://localhost:5257/api/livro/cadastrar/id_usuario
app.MapPost("/api/livro/cadastrar/{idUsuario}", ([FromRoute] string idUsuario, [FromBody] Livro? livro, [FromServices] AppDataContext ctx) =>
{
    if (livro == null)
        return Results.BadRequest("Livro inválido");

    if(string.IsNullOrWhiteSpace(livro.Nome) || string.IsNullOrWhiteSpace(livro.Autor))
        return Results.BadRequest("Preencha todos os campos obrigatórios.");
    
    if (ctx.Livros.FirstOrDefault(l => l.Nome == livro.Nome && l.Autor == livro.Autor) != null)
        return Results.Conflict("Esse livro já foi cadastrado");
    
    Usuario? usuario = ctx.Usuarios.FirstOrDefault(u => u.Id == idUsuario);

    if (usuario == null)
        return Results.NotFound("Usuário não encontrado");

    livro.DisponibilizadoPor = usuario.NomeUsuario;

    ctx.Livros.Add(livro);
    ctx.SaveChanges();
    return Results.Created("", livro);
});

//GET: http://localhost:5257/api/livro/listar
app.MapGet("/api/livro/listar", ([FromServices] AppDataContext ctx) => {
    if(ctx.Livros.Any())
        return Results.Ok(ctx.Livros.ToList());
    
    return Results.NotFound("Lista de livros vazia!");
});

//GET: http://localhost:5257/api/livro/buscar/nome_livro
app.MapGet("/api/livro/buscar/{nome}", ([FromRoute] string nome, [FromServices] AppDataContext ctx) =>
{
    Livro? livroBuscar = ctx.Livros.FirstOrDefault(x => x.Nome == nome);

    if(livroBuscar == null)
        return Results.NotFound("Livro não encontrado!");

    return Results.Ok(livroBuscar);
});

//PUT: http://localhost:5257/api/livro/alterar/id_usuario/id_livro
app.MapPut("/api/livro/alterar/{idUsuario}/{idLivro}", ([FromRoute] string idUsuario,[FromRoute] string idLivro, [FromBody] Livro? livroAlterado, [FromServices] AppDataContext ctx) =>
{
    Usuario? usuario = ctx.Usuarios.FirstOrDefault(u => u.Id == idUsuario);

    if (usuario == null)
        return Results.NotFound("Usuário inválido");

    Livro? livro = ctx.Livros.FirstOrDefault(l => l.Id == idLivro);

    if (livro == null)
        return Results.NotFound("Livro não encontrado");

    if (livroAlterado == null)
        return Results.BadRequest("Livro inválido");

    if (livro.DisponibilizadoPor != usuario.NomeUsuario)
        return Results.BadRequest("Você não tem permissão para alterar este livro.");

    if (string.IsNullOrWhiteSpace(livroAlterado.Nome) || string.IsNullOrWhiteSpace(livroAlterado.Autor))
        return Results.BadRequest("Preencha todos os campos obrigatórios.");

    if (ctx.Livros.FirstOrDefault(l => l.Nome == livroAlterado.Nome && l.Autor == livroAlterado.Autor && l.Id != idLivro) != null)
    return Results.Conflict("Esse livro já foi cadastrado");

    livro.Nome = livroAlterado.Nome;
    livro.Autor = livroAlterado.Autor;

    ctx.SaveChanges();

    return Results.Ok(livro);
});

//DELETE: http://localhost:5257/api/livro/deletar/id_usuario/id_livro
app.MapDelete("/api/livro/deletar/{idUsuario}/{idLivro}", ([FromRoute] string idUsuario, [FromRoute] string idLivro, [FromServices] AppDataContext ctx) =>
{
    Usuario? usuario = ctx.Usuarios.FirstOrDefault(u => u.Id == idUsuario);

    if (usuario == null)
        return Results.NotFound("Usuário inválido");

    Livro? livroDeletar = ctx.Livros.FirstOrDefault(l => l.Id == idLivro);

    if (livroDeletar == null)
        return Results.NotFound("Livro não encontrado");

    if (livroDeletar.DisponibilizadoPor != usuario.NomeUsuario)
        return Results.BadRequest("Você não tem permissão para excluir este livro.");

    if (!livroDeletar.Disponivel)
        return Results.BadRequest("Não é possível excluir um livro emprestado.");

    ctx.Livros.Remove(livroDeletar);
    ctx.SaveChanges();
    return Results.Ok("Livro deletado com sucesso!");

});




app.Run();



