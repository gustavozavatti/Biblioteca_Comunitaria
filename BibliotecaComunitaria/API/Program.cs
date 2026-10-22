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

app.Run();