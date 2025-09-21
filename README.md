## criar copia ou renomear
    - /api/.env.local para /api/.env
    - /front/.env.local /front/.env
## Rodar     
    - docker compose up --build

## Api 
    - http://127.0.0.1:4000/
    - Swagger: http://127.0.0.1:4000/docs

## Front
    - http://127.0.0.1:3000/

---

# Desafio Técnico – Desenvolvedor Pleno (Full-stack Auth: Node API + React)

---

## 1) O Produto

Aplicação simples de **autenticação** com:

- Cadastro (sign up)
- Login (sign in)
- Logout
- Página protegida exibindo dados do usuário logado

---

## 2) Back-end (API)

**Stack sugerida:** Node.js + TypeScript  + MySQL

### Endpoints

- `POST /auth/signup` – cria usuário.
- `POST /auth/login` – valida e retorna **JWT**.
- `GET /me` (auth) – retorna dados básicos do usuário.

### Requisitos

- **Dockerfile** para a API.

---

## 3) Front-end (React)

**Stack sugerida:** React + TypeScript (Vite ou Next.js).

### Telas

- **Cadastro**: email, senha, confirmação.
- **Login**: email e senha.
- **Perfil**: mostra `/me`, acessível apenas logado.
- **Logout**.

### Requisitos

- **Dockerfile** para o front.

---

## 4) Docker

- É **obrigatório** entregar um **docker-compose.yml** que permita subir API, banco e front com um único comando:
    
    ```bash
    docker compose up --build
    
    ```
    
- Cada serviço deve ter seu **Dockerfile** separado.
- Fornecer `.env.example` para API e front.

---

## 5) Critérios de Avaliação

- **Organização** do código (API e front).
- **Segurança básica** (hash, JWT, rotas protegidas).
- **UX simples e funcional** (validação, feedbacks).
- **Uso correto do Docker Compose** (subir tudo de forma integrada).

---

## 6) Bônus

- Documentação da API (Swagger ou README detalhado).

---

## 7) Entrega

- Repositório com **README** explicando:
    - Como rodar com **Docker Compose** (obrigatório).
