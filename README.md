# 📚 Biblioteca Comunitária

## 1. Identificação do Projeto

| Informação | Descrição |
|---|---|
| *Projeto* | Biblioteca Comunitária |
| *Integrantes* | Gustavo Zavatti, Pedro Serra, Fabricio K. e Bernardo |
| *Curso* | Ciência da Computação |
| *Período* | 4º período |
| *Disciplina* | Desenvolvimento de Software Visual |

## 2. Resumo

A Biblioteca Comunitária tem como objetivo democratizar o acesso à leitura, conectando pessoas e incentivando o compartilhamento de livros em diferentes localidades do Brasil. A aplicação consiste em uma API desenvolvida em C# com ASP.NET Core, utilizando o SQLite para armazenar os dados dos usuários e dos livros, e o Entity Framework Core para realizar a comunicação com o banco de dados.

O projeto aplica operações CRUD (criação, consulta, atualização e exclusão), validações de dados e relacionamentos entre entidades. Além disso, disponibiliza funcionalidades para o gerenciamento de usuários, o cadastro de livros e o controle de empréstimos e devoluções.

A aplicação também possui uma interface gráfica desenvolvida com React e TypeScript, permitindo que os usuários interajam com as funcionalidades disponibilizadas pela API.

## 3. Funcionalidades

- Cadastro de usuários.
- Login de usuários utilizando nome de usuário e CPF.
- Consulta de usuários pelo nome.
- Exclusão de usuários por CPF.
- Cadastro de livros.
- Listagem de livros cadastrados.
- Busca de livros pelo nome.
- Alteração de informações dos livros.
- Exclusão de livros.
- Empréstimo e devolução de livros.
- Armazenamento de dados utilizando SQLite.
- Relacionamento entre usuários e livros.
- Validação de CPF e de campos obrigatórios.
- Verificação de registros duplicados.
- Controle de permissões para alteração e exclusão de livros.
- Verificação da disponibilidade dos livros para empréstimo.
- Interface gráfica para interação com as funcionalidades da aplicação.

## 4. Descrição das Funcionalidades

### 4.1. Cadastro de Usuários

Permite cadastrar novos usuários na aplicação. Durante o processo, são realizadas validações para verificar se o objeto recebido é válido, se os campos obrigatórios foram preenchidos, se o CPF possui um formato válido e se o nome de usuário ou o CPF já estão cadastrados. Caso todas as verificações sejam aprovadas, o usuário é registrado no banco de dados.

### 4.2. Consulta de Usuários

Permite consultar usuários cadastrados por meio do nome de usuário. Quando o registro é encontrado, a API retorna as informações disponibilizadas pelo endpoint, incluindo o nome de usuário, o identificador (ID) e os livros relacionados ao usuário, conforme a implementação. Caso não exista um usuário correspondente à pesquisa, a aplicação retorna uma resposta informando que o registro não foi encontrado.

### 4.3. Exclusão de Usuários

Possibilita excluir usuários por meio do CPF informado. A API verifica se existe um usuário associado ao CPF recebido. Caso o registro seja encontrado, a exclusão é realizada; caso contrário, é retornada uma resposta indicando que o usuário não foi encontrado.

### 4.4. Cadastro de Livros

Permite cadastrar novos livros no banco de dados. Durante o processo, a aplicação verifica se o objeto recebido é válido, se existem informações obrigatórias não preenchidas, se o livro já está cadastrado e se o usuário responsável pela operação existe. Após a aprovação das validações, o livro é registrado, armazenando o nome do usuário responsável por disponibilizar a obra na biblioteca.

### 4.5. Listagem e Busca de Livros

A listagem permite consultar os livros cadastrados na biblioteca, apresentando suas respectivas informações. A busca possibilita localizar um livro pelo nome. Antes de retornar os dados, a aplicação verifica se o registro pesquisado existe. Caso contrário, retorna uma resposta informando que o livro não foi encontrado.

### 4.6. Alteração e Exclusão de Livros

Permite alterar ou excluir livros cadastrados na aplicação. Para realizar essas operações, são utilizados os identificadores do usuário e do livro.

Antes de executar a operação, a API verifica se os registros existem e se os dados recebidos são válidos. Na alteração, também é verificado se o usuário possui permissão para modificar o livro. Na exclusão, a aplicação verifica se o livro está emprestado, impedindo sua remoção enquanto estiver nessa condição, conforme as regras implementadas.

### 4.7. Empréstimo e Devolução de Livros

Permite realizar o empréstimo e a devolução de livros cadastrados na biblioteca. Para isso, a aplicação identifica o usuário e o livro por meio de seus respectivos IDs.

Durante o processo, são realizadas verificações para confirmar se o usuário e o livro existem, se o livro já está emprestado e se o usuário que disponibilizou a obra está tentando realizar o empréstimo do próprio livro.

Quando o empréstimo é realizado, o ID do usuário que recebeu o livro é associado ao registro da obra, e sua disponibilidade é alterada para falso. Na devolução, a aplicação verifica se o livro está emprestado para o usuário informado. Caso a verificação seja aprovada, o relacionamento do empréstimo é removido e o livro volta a ficar disponível.

### 4.8. Login de Usuários

Permite que usuários cadastrados acessem a aplicação utilizando o nome de usuário e o CPF. A API verifica se os campos foram preenchidos e procura um registro que corresponda às duas informações fornecidas.

Caso os dados sejam encontrados, o sistema retorna o ID e o nome de usuário, permitindo o acesso às funcionalidades da aplicação. Caso contrário, retorna uma mensagem informando que o usuário não foi encontrado.

## 5. Banco de Dados e Relacionamento entre Entidades

A aplicação utiliza o SQLite para armazenar os dados e o Entity Framework Core para realizar o mapeamento das entidades e as operações de persistência.

O banco de dados possui duas entidades principais: Usuario e Livro. O relacionamento entre elas é do tipo *um para muitos (1:N)*, no qual um usuário pode estar relacionado a vários livros emprestados.

### 5.1. Entidade Usuario

| Campo | Descrição |
|---|---|
| Id | Identificador único do usuário, gerado automaticamente. |
| CPF | CPF utilizado para identificar o usuário. |
| DataCadastro | Data de cadastro do usuário, preenchida automaticamente. |
| NomeUsuario | Nome de usuário utilizado na aplicação. |
| Livros | Lista de livros relacionados ao usuário por meio dos empréstimos. |

### 5.2. Entidade Livro

| Campo | Descrição |
|---|---|
| Id | Identificador único do livro, gerado automaticamente. |
| Nome | Nome ou título do livro. |
| Autor | Nome do autor da obra. |
| Disponivel | Indica se o livro está disponível para empréstimo. |
| UsuarioId | Identificador do usuário que está com o livro emprestado. |
| DisponibilizadoPor | Nome do usuário que disponibilizou o livro na biblioteca. |

### 5.3. Funcionamento do Relacionamento

O relacionamento entre usuários e livros permite identificar os empréstimos realizados na biblioteca comunitária. A propriedade UsuarioId estabelece a associação entre as entidades, identificando o usuário que está atualmente com determinado livro.

Já a propriedade DisponibilizadoPor registra o nome do usuário responsável por disponibilizar a obra na biblioteca.

Dessa forma, um usuário pode estar relacionado a vários livros por meio dos empréstimos realizados. Quando um livro é devolvido, o UsuarioId é definido como nulo, removendo a associação do empréstimo e permitindo que a obra fique disponível novamente.

Essa estrutura permite organizar os livros, consultar os dados relacionados e aplicar regras de autorização para determinadas operações, como a alteração e a exclusão de uma obra.

## 6. Validações e Integridade dos Dados

A aplicação possui diversas validações para evitar registros inválidos e preservar a consistência das informações armazenadas.

| Validação | Descrição |
|---|---|
| *Campos obrigatórios* | Verifica se os campos necessários foram preenchidos. |
| *Validação de CPF* | Verifica o formato do CPF e os critérios implementados para validar seus dígitos. |
| *Usuários duplicados* | Impede o cadastro de usuários com CPF ou nome de usuário já registrado. |
| *Livros duplicados* | Verifica se o livro já está cadastrado antes de permitir um novo registro. |
| *Existência dos registros* | Confirma se o usuário ou o livro existe antes de executar determinadas operações. |
| *Permissões de alteração* | Verifica se o usuário possui autorização para alterar o livro. |
| *Permissões de exclusão* | Verifica se o usuário possui autorização para excluir o livro. |
| *Disponibilidade para empréstimo* | Verifica se o livro está disponível antes de permitir o empréstimo. |
| *Exclusão de livros emprestados* | Verifica se o livro está emprestado antes de permitir sua exclusão. |
| *Validação de devolução* | Verifica se o livro está emprestado e se pertence ao usuário que está solicitando a devolução. |
| *Validação de login* | Verifica se o nome de usuário e o CPF correspondem a um cadastro existente. |

Essas validações contribuem para a confiabilidade da aplicação, reduzem inconsistências nos dados e ajudam a garantir que as operações sejam executadas conforme as regras definidas no sistema.

## 7. Tecnologias Utilizadas

| Tecnologia | Finalidade |
|---|---|
| *C#* | Linguagem utilizada no desenvolvimento da API. |
| *ASP.NET Core* | Framework utilizado para desenvolver a API. |
| *Entity Framework Core* | Responsável pelo mapeamento das entidades e pela comunicação com o banco de dados. |
| *SQLite* | Banco de dados utilizado para armazenar as informações. |
| *React* | Biblioteca utilizada para desenvolver a interface gráfica da aplicação. |
| *TypeScript* | Linguagem utilizada no desenvolvimento dos componentes da interface. |
| *CSS* | Utilizado para estilizar a interface gráfica. |
| *Git* | Ferramenta utilizada para controle de versão. |
| *GitHub* | Plataforma utilizada para hospedar o repositório e colaborar no desenvolvimento do projeto. |

## 8. Repositório

O código-fonte da Biblioteca Comunitária está disponível no GitHub, onde podem ser consultados os arquivos da aplicação e a implementação das funcionalidades descritas neste documento.

*Link do repositório:* https://github.com/gustavozavatti/Biblioteca_Comunitaria

## 9. Uso de IA

### 9.1. Ferramenta Utilizada

- *ChatGPT*, da OpenAI.

### 9.2. Forma de Uso

A Inteligência Artificial foi utilizada como ferramenta de apoio na elaboração e organização da documentação do projeto. Seu uso teve como objetivo corrigir problemas gramaticais, melhorar a fluidez do texto, organizar as informações e aplicar a formatação Markdown adequada para o GitHub. Também foi utilizada para estruturar as tabelas de entidades, tecnologias e validações, facilitando a compreensão das funcionalidades da aplicação.

*Prompt utilizado:*

> Arrume e melhore a gramática e a fluidez do texto, além de transformar em linguagem Markdown apropriada para GitHub e adicionamento de tabelas para melhor interpretação do projeto.

### 9.3. Revisões Realizadas pela Equipe

A equipe realizou a revisão da documentação, verificando se as informações apresentadas estão de acordo com o código-fonte do projeto. Foram conferidas as descrições das funcionalidades, os relacionamentos entre as entidades, as validações e as tecnologias utilizadas, buscando garantir que o conteúdo represente corretamente a aplicação desenvolvida.
