# Sacolaum

Uma aplicação full-stack para gerenciamento de produtos, construída com React no frontend e Node.js/Express no backend, utilizando PostgreSQL para armazenamento de dados e implantada no Vercel.

## ✨ Funcionalidades

- ✅ **Visualizar todos os produtos** - Lista completa de produtos do banco de dados
- ✅ **Criar novos produtos** - Formulário para adicionar produtos com validação
- ✅ **Atualizar produtos existentes** - Edição inline de produtos
- ✅ **Deletar produtos** - Remoção com confirmação
- ✅ **Interface responsiva** com Chakra UI
- ✅ **Animações suaves** com Framer Motion
- ✅ **Gerenciamento de estado** com Zustand
- ✅ **API RESTful** com operações CRUD completas
- ✅ **Banco de dados PostgreSQL** com Prisma ORM
- ✅ **Implantação no Vercel** com funções serverless

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React 18** - Biblioteca JavaScript para interfaces de usuário
- **Vite** - Ferramenta de build rápida e moderna
- **Chakra UI** - Biblioteca de componentes acessíveis
- **Framer Motion** - Biblioteca de animações performáticas
- **React Router** - Roteamento declarativo
- **Zustand** - Gerenciamento de estado leve e poderoso

### Backend

- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web minimalista
- **PostgreSQL** - Banco de dados relacional robusto
- **Prisma** - ORM moderno e type-safe
- **Vercel Functions** - Funções serverless para API

### Infraestrutura

- **Vercel** - Plataforma de implantação com CI/CD
- **Neon** - PostgreSQL serverless na nuvem
- **Git** - Controle de versão

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Conta no GitHub e Vercel
- Banco de dados PostgreSQL (Neon recomendado)

## 🚀 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd sacolaum
```

### 2. Instale as dependências

```bash
# Instalar dependências do backend e frontend
npm run install-backend
npm run install-frontend
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database Configuration
DATABASE_URL="postgresql://neondb_owner:your_password@ep-wild-mountain-act69b6m-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require"

# Frontend API Configuration (para desenvolvimento local)
VITE_API_BASE_URL="http://localhost:8080"
```

### 4. Configure o banco de dados

```bash
# Gerar cliente Prisma
npm run prisma:generate

# Executar migrações no banco
npm run prisma:push

# Popular banco com dados iniciais
npm run prisma:seed
```

### 5. Execute a aplicação

```bash
# Desenvolvimento local
cd frontend && npm run dev
# Em outro terminal
node backend/server.js

# Produção (Vercel)
npm run build
```

## 🌐 Implantação no Vercel

### Configuração Automática

1. **Conecte seu repositório** no Vercel Dashboard
2. **Configure variáveis de ambiente**:
   ```
   DATABASE_URL = postgresql://neondb_owner:your_password@ep-wild-mountain-act69b6m-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require
   VITE_API_BASE_URL = [deixe vazio para usar URLs relativas]
   ```
3. **Deploy automático** será executado

### Verificação da Implantação

- ✅ **Frontend**: Acesse `https://your-app.vercel.app`
- ✅ **API**: Teste `https://your-app.vercel.app/api/products`
- ✅ **Database**: Produtos devem aparecer automaticamente

## 📖 Uso

### Desenvolvimento Local

1. Acesse `http://localhost:5173` (frontend)
2. API disponível em `http://localhost:8080/api/products`
3. Navegue pela lista de produtos
4. Clique em "Criar Produto" para adicionar novos itens
5. Use os botões de editar/deletar nos cards dos produtos

### Produção (Vercel)

1. Acesse sua URL do Vercel
2. Todas as funcionalidades funcionam identicamente
3. Dados são persistidos no PostgreSQL

## 🔌 API Endpoints

| Método | Endpoint              | Descrição                    | Exemplo |
|--------|----------------------|-----------------------------|---------|
| GET    | `/api/products`      | Obter todos os produtos    | `fetch('/api/products')` |
| POST   | `/api/products`      | Criar novo produto         | `fetch('/api/products', { method: 'POST', body: JSON })` |
| PUT    | `/api/products?id=1` | Atualizar produto          | `fetch('/api/products?id=1', { method: 'PUT', body: JSON })` |
| DELETE | `/api/products?id=1` | Deletar produto            | `fetch('/api/products?id=1', { method: 'DELETE' })` |

### Exemplo de Payload

```json
{
  "name": "Produto Exemplo",
  "price": 29.99,
  "image": "https://example.com/image.jpg"
}
```

## 🗂️ Estrutura do Projeto

```
sacolaum/
├── api/                    # Vercel API Routes (Serverless Functions)
│   └── products/
│       └── index.js       # CRUD operations for products
├── backend/               # Local development backend
│   ├── config/
│   │   └── db.js         # Database configuration
│   ├── controllers/
│   │   └── product.controller.js
│   ├── models/
│   │   └── product.model.js
│   ├── routes/
│   │   └── product.route.js
│   └── server.js         # Express server
├── frontend/             # React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   └── CreatePage.jsx
│   │   ├── store/
│   │   │   └── product.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── prisma/               # Database schema and migrations
│   ├── schema.prisma
│   └── seed.js          # Database seeding script
├── screenshots/         # Project screenshots
├── vercel.json          # Vercel deployment configuration
├── package.json
└── README.md
```

## 📸 Capturas de Tela

### Aplicação Implantada no Vercel

![Página Inicial - Lista de Produtos](./screenshots/vercel-homepage.png)
*Página inicial mostrando lista de produtos carregados do banco de dados PostgreSQL*

![Criação de Produto](./screenshots/vercel-create-product.png)
*Formulário para criação de novos produtos com validação*

![API Funcionando](./screenshots/vercel-api-response.png)
*Resposta da API RESTful mostrando produtos em formato JSON*

![Interface Responsiva](./screenshots/vercel-responsive.png)
*Interface adaptável para dispositivos móveis e desktop*

### Como Capturar Novas Screenshots

1. **Certifique-se que a aplicação está funcionando** no Vercel
2. **Acesse diferentes páginas**:
   - Página inicial com lista de produtos
   - Página de criação (`/create`)
   - Teste operações CRUD
3. **Capture screenshots** de:
   - Interface principal
   - Formulários
   - Estados de loading/sucesso
   - API responses (usando browser dev tools)
4. **Salve em** `screenshots/` com nomes descritivos
5. **Anotações**: Use ferramentas como Snagit ou Lightshot para adicionar setas e destaques

## 🎮 Scripts Disponíveis

### Desenvolvimento Local

```bash
# Backend
node backend/server.js              # Inicia servidor Express local
npm run prisma:generate            # Gera cliente Prisma
npm run prisma:push                # Aplica schema no banco
npm run prisma:seed                # Popula banco com dados

# Frontend
cd frontend && npm run dev         # Servidor de desenvolvimento
cd frontend && npm run build       # Build para produção
cd frontend && npm run preview     # Preview da build
```

### Produção (Vercel)

```bash
npm run install-backend           # Instala dependências backend
npm run install-frontend          # Instala dependências frontend
npm run build-frontend           # Build do frontend
npm run build                    # Build completo
```

## 🔧 Solução de Problemas

### Erro: "ERR_CONNECTION_REFUSED"

**Sintomas**: Frontend não consegue conectar com a API
**Solução**:
1. Verifique se o backend está rodando: `node backend/server.js`
2. Confirme `VITE_API_BASE_URL` no `.env`
3. Para Vercel, certifique-se que `VITE_API_BASE_URL` está vazio

### Erro: "Database connection failed"

**Sintomas**: API retorna erro de conexão com banco
**Solução**:
1. Verifique `DATABASE_URL` no `.env` (local) ou Vercel env vars
2. Execute `npm run prisma:push` para aplicar schema
3. Teste conexão: `npm run prisma:studio`

### Erro: "Products not loading"

**Sintomas**: Interface mostra "Nenhum produto encontrado"
**Solução**:
1. Execute `npm run prisma:seed` para popular banco
2. Verifique se API está respondendo: `curl http://localhost:8080/api/products`
3. Confirme variáveis de ambiente

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.
