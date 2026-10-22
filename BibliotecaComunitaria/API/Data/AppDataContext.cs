using Microsoft.EntityFrameworkCore;

public class AppDataContext : DbContext
{
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Livro> Livros { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=Biblioteca.db");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Usuario>()
            .HasIndex(u => u.CPF)
            .IsUnique();
        modelBuilder.Entity<Usuario>()
            .HasIndex(u => u.NomeUsuario)
            .IsUnique();
    }
}