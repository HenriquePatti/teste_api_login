# Testes Automatizados para API de Login

Este projeto contém testes automatizados para uma API de autenticação, utilizando [Mocha](https://mochajs.org/) e [SuperTest](https://github.com/ladjs/supertest). Os testes cobrem os fluxos principais de login e reset de senha.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm
- A API de autenticação deve estar rodando localmente em `http://localhost:3000`

## Instalação

1. Clone este repositório:
   ```bash
   git clone <url-do-repositorio>
   cd teste_api_login
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

## Como executar os testes

Execute o comando abaixo para rodar todos os testes automatizados:

```bash
npm test
```

Os relatórios dos testes serão gerados na pasta `mochawesome-report/`.

## Estrutura dos testes

Os testes estão localizados em `rest/test/` e cobrem os seguintes cenários:

### Login (`POST /login`)
- **Login com dados válidos:** Deve retornar 200 e mensagem de sucesso.
- **Login com senha inválida:** Deve retornar 401 e mensagem de erro.
- **Login com usuário inexistente:** Deve retornar 401 e mensagem de erro.
- **Login com 3 tentativas inválidas:** Após três tentativas inválidas, o usuário deve ser bloqueado (retorna 423).

### Reset de Senha (`POST /reset-password`)
- **Reset com dados válidos:** Deve retornar 200 e mensagem de sucesso.
- **Reset com usuário inexistente:** Deve retornar 404 e mensagem de erro.

## Dependências principais
- [Mocha](https://mochajs.org/): Framework de testes.
- [SuperTest](https://github.com/ladjs/supertest): Testes de requisições HTTP.

## Licença

ISC 