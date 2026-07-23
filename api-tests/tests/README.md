# API Tests — JSONPlaceholder

Suíte de testes automatizados para a API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/), cobrindo os métodos HTTP fundamentais de uma API REST (GET, POST, PATCH, DELETE).

## Stack

- **Vitest** — test runner
- **Supertest** — requisições HTTP

## Como rodar

\`\`\`bash
npm run test:api
\`\`\`

## Estrutura

\`\`\`
api-tests/
└── tests/
    ├── users.test.js   # testes do recurso /users
    └── posts.test.js   # testes do recurso /posts (+ relação com /comments)
\`\`\`

## Cobertura

### `users.test.js`

| Teste | O que valida |
|---|---|
| `returns a list of users` | GET retorna array com 10 usuários |
| `returns a single user by id` | GET de um usuário específico retorna as propriedades esperadas (`id`, `name`, `email`) |
| `returns 404 for a non-existent user` | Requisição para um id inexistente retorna status 404 |

### `posts.test.js`

| Teste | O que valida |
|---|---|
| `returns comments for a specific post` | GET de uma rota aninhada (`/posts/1/comments`) retorna array de comentários, todos vinculados ao `postId` correto |
| `creates a new post` | POST retorna status 201 e os dados enviados são preservados na resposta |
| `updates an existing post` | PATCH atualiza parcialmente um recurso, mantendo o restante dos dados intacto |
| `deletes a post` | DELETE retorna status 200 |
| `handles a post creation with missing fields` | Documenta o comportamento da API fake ao receber dados incompletos (não valida, aceita e retorna 201 mesmo sem `userId`) |

## Observações

- Como o JSONPlaceholder é uma API fake, operações de escrita (POST/PATCH/DELETE) **não persistem** os dados — a resposta simula o comportamento esperado, mas um GET subsequente não vai refletir as mudanças.
- O teste `handles a post creation with missing fields` existe justamente para documentar essa limitação: a API não faz validação real de campos obrigatórios.