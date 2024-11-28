# FSBR React

Este é um projeto de frontend desenvolvido em **React** utilizando uma estrutura moderna com suporte a rotas protegidas, autenticação via token JWT, gerenciamento global de estado com **Redux Toolkit**, e componentes estilizados com **Ant Design**.

---

## 🛠️ **Tecnologias Utilizadas**

### **Frontend**
- **React**: Biblioteca principal para a construção da interface do usuário.
- **React Router DOM**: Gerenciamento de rotas e navegação.
- **Ant Design**: Biblioteca de componentes UI para estilização e usabilidade.
- **TypeScript**: Tipagem estática para maior segurança no desenvolvimento.
- **Redux Toolkit**: Gerenciamento de estado global simplificado.
- **RTK Query**: Realização de requisições assíncronas e gerenciamento de cache.
- **LocalStorage**: Persistência de dados de autenticação no navegador.

---

## 📂 **Estrutura do Projeto**

```plaintext
src/
├── app/                    # Configurações gerais da aplicação
│   ├── store.ts            # Configuração do Redux Toolkit
├── assets/  
│   ├── fonts.ts            
│   ├── imagens.ts          
│   ├── styles.ts           
├── components/             # Componentes reutilizáveis
│   ├── EditableModal.tsx   # Componente genérico de modal com campos editáveis
│   ├── EditableTable.tsx   # Tabela editável reutilizável
│   ├── PrivateRoute.tsx    # Componente para proteger rotas
├── layout/                 # Layout principal da aplicação
│   ├── LayoutPrincipal.tsx # Layout com menu e conteúdo dinâmico
├── pages/                  # Páginas do sistema
│   ├── Crud/               # Páginas para CRUD
│   │   ├── Produtos.tsx    # Gerenciamento de produtos
│   │   ├── Categorias.tsx  # Gerenciamento de categorias
│   ├── Home/               # Páginas públicas
│   │   ├── Login.tsx       # Página de login
│   │   ├── Register.tsx    # Página de registro
├── services/               # API e hooks customizados
│   ├── apiSlice.ts         # Configuração e endpoints da API
│   ├── useAuth.ts          # Hook customizado para autenticação
├── types/                  # Tipos TypeScript para o projeto
│   ├── Product.ts          # Definição do tipo Produto
│   ├── Category.ts         # Definição do tipo Categoria
│   ├── Usuario.ts          # Tipos para autenticação de usuário
├── index.tsx               # Entrada principal do React
├── reportWebVitals.ts      # Ferramenta de medição de performance
```

---

## 🚀 **Funcionalidades**

### **Autenticação**
- Implementada com tokens JWT.
- Persistência em `localStorage` com suporte à expiração.
- Hook `useAuth` para login, logout e validação do token.

### **Rotas Protegidas**
- Utilização de um componente `PrivateRoute` para garantir acesso apenas a usuários autenticados.
- Redirecionamento automático para `/login` quando não autenticado.

### **CRUD**
- **Produtos**:
  - Listagem de produtos com nome, preço e categoria.
  - Adição, edição e remoção de produtos.
  - Seleção de categoria diretamente do modal de edição.
- **Categorias**:
  - Listagem de categorias.
  - Adição, edição e remoção de categorias.

### **Gerenciamento de Estado**
- **Redux Toolkit**:
  - Armazenamento global de dados.
  - Configuração simplificada com `apiSlice` para operações assíncronas.
- **RTK Query**:
  - Atualização em tempo real dos dados de `Produtos` e `Categorias`.

---

## 🔗 **Rotas do Projeto**

### **Públicas**
| Caminho      | Descrição                       |
|--------------|---------------------------------|
| `/login`     | Página de login.               |
| `/register`  | Página de registro de usuários.|

### **Protegidas**
| Caminho         | Descrição                     |
|-----------------|-------------------------------|
| `/produtos`     | Gerenciamento de produtos.    |
| `/categorias`   | Gerenciamento de categorias.  |

---

## 🔧 **Configuração e Execução**

### **Pré-requisitos**
- Node.js instalado.
- Gerenciador de pacotes (npm ou yarn).

### **Passos**
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/fsbr-react.git
   cd fsbr-react
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o projeto:
   ```bash
   npm start
   ```
4. Acesse o sistema em [http://localhost:3000](http://localhost:3000).

---

## 📌 **Pontos de Destaque**

- **Segurança**: Rotas protegidas garantem que apenas usuários autenticados possam acessar as páginas privadas.
- **Interface Moderna**: Ant Design facilita a criação de componentes elegantes e responsivos.
- **Eficiência**: RTK Query gerencia cache de forma otimizada, reduzindo a necessidade de chamadas repetidas à API.
- **Flexibilidade**: Estrutura modular facilita a escalabilidade do sistema.

---

## ✨ **Melhorias Futuras**
- Implementar testes unitários para componentes e hooks.
- Adicionar paginação nas tabelas de Produtos e Categorias.
- Melhorar o gerenciamento de expiração do token com interceptadores no RTK Query.

---

## 📄 **Licença**
Este projeto está licenciado sob a MIT License. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
