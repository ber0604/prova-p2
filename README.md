# 🐾 API de Adoção de Pets

Esta é uma API RESTful para gerenciamento de usuários, pets e adoções. Desenvolvida em Node.js com autenticação via JWT, permitindo operações CRUD protegidas com controle de acesso por **role** (`admin` ou `adopter`).

---

## 🚀 Início Rápido

### 🔧 Banco de dados

`Entrar no arquivo src\config\database.sql e rodar no seu banco de preferência, depois no .env configura-lo`

`Entrar no arquivo src\config\createUserAdmin.js e rodar o script(criar primeiro usuário admin): node src/config/createUserAdmin.js`

### 🔧 Instalação

`npm install`

### ▶️ Executar o projeto

`npm run dev`

A API será iniciada em:  
`http://localhost:3000`

---

## 🔐 Autenticação

A autenticação é feita via **JWT**. Após o login, use o token retornado para acessar rotas protegidas, incluindo no header, para buscar os pets disponíveis ou criar usuários, não é necessário o uso:

**Authorization:** Bearer SEU_TOKEN_AQUI

---

## 📦 Endpoints disponíveis

### 👤 Usuários

**Cadastro**  
POST /users  
Body:

- name
- email
- password
- role (padrão: adopter)

**Login**  
POST /login  
Body:

- email
- password

**Listar todos os usuários (admin)**  
GET /users

**Buscar usuário por ID (admin ou próprio adopter logado)**  
GET /users/:id

**Atualizar usuário (admin ou próprio adopter logado)**  
PUT /users/:id  
Body com os campos a atualizar

**Deletar usuário (admin)**  
DELETE /users/:id

---

### 🐶 Pets

**Listar todos os pets (admin)**  
GET /pets

**Listar apenas pets disponíveis (todos)**  
GET /pets/available

**Buscar pet por ID (admin)**  
GET /pets/:id

**Criar pet (admin)**  
POST /pets  
Body:

- name
- species
- status (padrão: available)
- size
- description
- age

**Atualizar pet (admin)**  
PUT /pets/:id  
Body com os campos a atualizar

**Deletar pet (admin)**  
DELETE /pets/:id

---

### 🐾 Adoções

**Listar adoções (admin)**  
GET /adoptions

**Realizar adoção (adopter)**  
POST /adoptions  
Body:

- pet_id
- user_id

---

## 🔒 Regras de acesso

- Apenas `admin` pode criar, atualizar e deletar **pets** e visualizar todos os usuários.
- Apenas `adopter` pode realizar adoções.
- Todos os usuários autenticados podem acessar e editar **seus próprios dados**.

---

## 🛠️ Tecnologias usadas

- Node.js
- Express
- MySQL
- JWT (autenticação)
- Bcrypt (criptografia de senha)
