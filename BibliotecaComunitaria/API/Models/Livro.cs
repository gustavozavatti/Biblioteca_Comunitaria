public class Livro
{
    public string Id {get; set; } = Guid.NewGuid().ToString();
    public string? Nome {get; set; }
    public string? Autor {get; set; }
    public string? DisponibilizadoPor { get; set; }
    public bool Disponivel {get; set; } = true;
    public string? UsuarioId { get; set; }
}