public class Usuario
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string? NomeUsuario { get; set; }
    public string? CPF { get; set; }
    public DateTime DataCadastro { get; set; } = DateTime.Now;
    public List<Livro> Livros { get; set; } = new List<Livro>();

    public bool ValidarCPF()
    {
        if (string.IsNullOrWhiteSpace(CPF))
            return false;

        string cpf = CPF.Replace(".", "").Replace("-", "").Trim();

        if (cpf.Length != 11 || !cpf.All(char.IsDigit))
            return false;

        if (cpf.Distinct().Count() == 1)
            return false;

        int soma = 0;

        for (int i = 0; i < 9; i++)
            soma += (cpf[i] - '0') * (10 - i);

        int resto = soma % 11;
        int digito1 = resto < 2 ? 0 : 11 - resto;

        if (digito1 != cpf[9] - '0')
            return false;

        soma = 0;

        for (int i = 0; i < 10; i++)
            soma += (cpf[i] - '0') * (11 - i);

        resto = soma % 11;
        int digito2 = resto < 2 ? 0 : 11 - resto;

        return digito2 == cpf[10] - '0';
    }
}