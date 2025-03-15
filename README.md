# 📌 API de Receitas  

API REST para gerenciamento de receitas, permitindo cadastro, listagem, edição e exclusão de receitas e ingredientes.  

## 🚀 Tecnologias Utilizadas  
- [Node.js](https://nodejs.org/)  
- [Express.js](https://expressjs.com/)  
- [PostgreSQL](https://www.postgresql.org/)  
- [Sequelize (ORM)](https://sequelize.org/)  
- [JWT (Json Web Token)](https://jwt.io/)  
- [Bcrypt](https://www.npmjs.com/package/bcrypt)  
- [Dotenv](https://www.npmjs.com/package/dotenv)  

## 📦 Instalação  
Clone o repositório e instale as dependências:  
```bash
git clone https://github.com/sabsfreitas/nodejs-rest-api.git
cd nodejs-rest-api
npm install
```

## 🔧 Configuração  
Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente necessárias:  
```env
DATABASE_URL=postgres://usuario:senha@localhost:5432/nomedobanco
JWT_SECRET=seu_segredo_jwt
PORT=3000
```

## ▶️ Uso  
Para rodar a API em ambiente de desenvolvimento:  
```bash
npm run dev
```

## 📖 Endpoints  

### 🛠 Autenticação e Usuários  
```http
POST /usuarios  # Cadastro de usuários
POST /auth  # Autenticação/Login
GET /list  # Listagem de usuários
PUT /updateAccount  # Atualização de dados do usuário
DELETE /deleteAccount  # Exclusão de conta
```

#### 🔹 Exemplo de requisição - Criar Usuário  
```json
{
  "email": "usuario@email.com",
  "nome": "Usuário Teste",
  "senha": "123456"
}
```

### 🍽 Receitas  
```http
POST /receitas  # Cadastro de receitas (Requer autenticação JWT)
GET /receitas/list  # Listagem de receitas
GET /receitas/:id  # Detalhes de uma receita específica
PUT /receitas/:id  # Atualização de uma receita (Requer autenticação JWT)
DELETE /receitas/:id  # Exclusão de uma receita (Requer autenticação JWT)
```

#### 🔹 Exemplo de requisição - Criar Receita com Ingredientes  
```json
{
  "rcp": {
    "nome": "Strogonoff do Chef",
    "descricao": "Delicioso e cremoso!",
    "modoDeFazer": "Doure a cebola e o alho com tempero, adicione a carne e cozinhe até dourar.",
    "imagem": "https://exemplo.com/imagem.jpg"
  }, 
  "ing": {
    "ingredientes": [
      { "texto": "1 lata de creme de leite" },
      { "texto": "500g de carne" },
      { "texto": "1 cebola picada" },
      { "texto": "1 dente de alho picado" },
      { "texto": "Sal a gosto" }
    ]
  }
}
```

### 🥕 Ingredientes  
```http
PUT /ingredientes/:id  # Atualização de um ingrediente (Requer autenticação JWT)
DELETE /ingredientes/:id  # Exclusão de um ingrediente (Requer autenticação JWT)
```
