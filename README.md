# 💰 Financy — Backend GraphQL & Frontend React

Bem-vindo ao **Financy**, um aplicativo completo de gestão financeira pessoal desenvolvido como projeto de conclusão para a pós-graduação. O sistema conta com controle de autenticação, gerenciamento de categorias customizadas e fluxo completo de transações financeiras com inteligência de dashboard e paginação.

O projeto foi estruturado em arquitetura de microsserviços divididos em:
- `/backend`: API GraphQL robusta utilizando Node.js, Fastify, Apollo Server, Type-GraphQL e Prisma ORM com banco SQLite.
- `/frontend`: Interface reativa de alta performance utilizando React, Vite, Tailwind CSS, Shadcn/ui e Apollo Client.

---

## 🚀 Como Executar o Projeto (Via Docker Compose)

A forma mais rápida e recomendada de executar a aplicação completa é utilizando o **Docker**, pois ele configura o banco de dados, o servidor backend e o servidor frontend com Nginx automaticamente, sem que você precise instalar o Node.js na sua máquina.

### 📋 Pré-requisitos

Você precisará apenas do **Docker** e do **Docker Compose** instalados. Caso não possua, siga as instruções oficiais abaixo para o seu sistema operacional:
- [Instalar Docker no Windows](https://docs.docker.com/desktop/install/windows-install/) *(Recomendável instalar junto com o WSL2)*
- [Instalar Docker no macOS](https://docs.docker.com/desktop/install/mac-install/)
- [Instalar Docker no Linux (Ubuntu)](https://docs.docker.com/engine/install/ubuntu/)

---

### 🛠️ Passo a Passo para Execução

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/ftr-desafio-financy.git](https://github.com/seu-usuario/ftr-desafio-financy.git)
   cd ftr-desafio-financy
   ```

2. **Inicie a aplicação com o Docker Compose:**

   Na raiz do projeto (onde está o arquivo docker-compose.yml), execute o comando abaixo:
   ```bash
   docker compose up --build
   ```
   _Nota: O parâmetro --build garante que o Docker monte as imagens compilando o TypeScript e injetando as variáveis de ambiente corretas na primeira execução._

3. **Acesse as aplicações:**

   Assim que as mensagens de log estabilizarem no terminal, as aplicações estarão prontas nos seguintes endereços:
   - 💻 **Frontend (Interface Web):** http://localhost
   - ⚙️ **Backend (Apollo Sandbox/Playground):** http://localhost:4000/graphql

4. **Para encerrar a aplicação:**

   Pressione Ctrl + C no terminal ou, em outra aba na raiz do projeto, execute:
   ```bash
   docker compose down
   ```
   _O banco de dados SQLite está protegido por um volume do Docker, o que significa que seus dados de teste não serão perdidos quando você desligar os containers._

---

## 🛠️ Tecnologias Utilizadas
### Backend
   - **Node.js** (Ambiente de execução)
   - **Fastify** (Servidor HTTP de alta performance)
   - **Apollo Server & GraphQL** (Manipulação do Grafo e Queries/Mutations)
   - **Type-GraphQL** (Criação de schemas GraphQL orientada a classes e decoradores TypeScript)
   - **Prisma ORM** (Modelagem de dados e comunicação com o banco)
   - **Better-SQLite3** (Driver nativo de alta velocidade para o SQLite)
   - **JWT & BcryptJS** (Segurança, criptografia de senhas e autenticação de rotas)

### Frontend
   - **React 19 & TypeScript** (Construção da interface)
   - **Vite** (Bundler e ambiente de desenvolvimento ultra veloz)
   - **Apollo Client** (Gerenciamento de estado, queries e cache local do GraphQL)
   - **Tailwind CSS v4 & Shadcn/ui** (Estilização e componentes de UI modernos)
   - **React Router Dom** (Sistema de rotas SPA)
   - **Zustand** (Gerenciamento de estados globais simples)

---

## ⚙️ Desenvolvimento Local (Sem Docker)

Caso queira rodar os serviços separadamente em modo de desenvolvimento na sua máquina local:
### Requisitos:
   - Node.js v24 ou superior instalado
   - Instalar dependências em ambas as pastas via npm install

### Executando o Backend:
   1. Acesse a pasta `/backend`.
   1. Crie um arquivo `.env` com base no `.env.example`.
   1. Execute o comando para rodar as migrations do Prisma: `npx prisma migrate dev`.
   1. Inicie o servidor: `npm run dev`.

### Executando o Frontend:
   1. Acesse a pasta `/frontend`.
   1. Crie um arquivo `.env` apontando para o seu IP do backend local.
   1. Inicie o servidor Vite: `npm run dev`.

---