# 📱 Primecell OS - Sistema de Gestão de Ordens de Serviço

Este projeto propõe uma solução web para o gerenciamento de processos em assistências técnicas de aparelhos celulares. O objetivo central é substituir controles manuais e planilhas por um sistema centralizado, focando em usabilidade e objetividade para o uso diário em balcão.

---

## 💡 Principais Funcionalidades

O sistema foi desenhado para acompanhar todo o ciclo de vida de um conserto:

- **Dashboard Gerencial:** Tela inicial contendo indicadores rápidos como Total de OS, métricas de OS em andamento, métricas por status e somatório de faturamento (OS Entregues).
- **Gestão de Cadastros:** Controle de clientes (proprietários dos aparelhos) e usuários do sistema (técnicos e atendentes).
- **Abertura de Ordem de Serviço (OS):** Registro detalhado do aparelho, incluindo marca, modelo e defeito relatado, com a posterior adição de laudo técnico e valores.
- **Quadro Kanban Interativo:** Acompanhamento visual das ordens de serviço. Os consertos são representados por cartões que podem ser movimentados (via *Drag and Drop*) entre as etapas do processo: *Recebido, Em Análise, Aguardando Aprovação, Em Reparo, Finalizado e Entregue*.

---

## 🛠️ Arquitetura e Tecnologias Utilizadas

Sendo um projeto acadêmico, a arquitetura foi planejada para ser moderna, leve e de fácil execução, sem a necessidade de infraestruturas complexas para a avaliação da banca.

1. **Frontend (Interface):** Desenvolvido em **React** utilizando a ferramenta **Vite** para otimização de performance. A estilização foi construída com **CSS puro**, garantindo um código legível e sem dependências externas excessivas.
2. **Backend (API):** Desenvolvido em **Node.js** com o micro-framework **Express**, responsável pelas regras de negócio, rotas da aplicação e comunicação com o banco de dados.
3. **Banco de Dados:** **SQLite** persistido em arquivo local (`banco.sqlite`), acessado pelo módulo nativo **`node:sqlite`** do Node.js (sem drivers nativos npm), o que simplifica deploy e avaliação local.

---

## 🚀 Instruções de Execução (Ambiente Local)

Para executar o sistema em seu computador, é necessário inicializar o Backend e o Frontend em terminais de comando distintos.

**⚠️ Pré-requisito:** 
Certifique-se de ter o **Node.js 22.5 ou superior** instalado (necessário para o módulo embutido `node:sqlite` no backend). Download: [nodejs.org](https://nodejs.org/).

### Preparando o Terminal

Abra o terminal (ou prompt de comando) na pasta raiz do projeto:

- **No Windows:** Navegue até a pasta pelo Explorador de Arquivos, digite `cmd` ou `powershell` na barra de endereços e pressione Enter. 
- **No Mac ou Linux:** Clique com o botão direito dentro da pasta do projeto e selecione "Abrir no Terminal".

> 💡 **Nota sobre navegação:** Utilize o comando `cd` (Change Directory) nos passos abaixo para acessar os diretórios correspondentes.

### Passo 1: Inicializando o Backend (API)

No terminal aberto, execute os seguintes comandos:

1. Acesse a pasta correspondente: `cd backend`
2. Instale as dependências da aplicação: `npm install`
3. Inicie o servidor: `node server.js`

*(A mensagem "Servidor rodando na porta 3000" indicará o sucesso da operação. O banco de dados SQLite é inicializado automaticamente neste processo).*

### Passo 2: Inicializando o Frontend (Interface)

Mantenha o terminal do Backend em execução. Abra um **novo terminal** na pasta raiz do projeto e execute:

1. Acesse a pasta correspondente: `cd frontend`
2. Instale as dependências: `npm install`
3. Inicie a aplicação local: `npm run dev`

*(Um link de acesso será gerado, tipicamente `http://localhost:5173`. Acesse-o através do seu navegador web).*

> Em desenvolvimento, o Vite encaminha as chamadas para `/api/...` ao backend em `http://localhost:3000`. Para testar a API diretamente no Node (sem o Vite), use o prefixo `/api` — por exemplo: `http://localhost:3000/api/usuarios`.

---

## 🌐 Publicar na internet (Render)

O repositório inclui o arquivo [`render.yaml`](render.yaml) para um **único Web Service**: o build gera o `frontend/dist` e o Express serve a API e os arquivos estáticos no mesmo domínio (HTTPS).

1. Acesse [render.com](https://render.com), conecte o GitHub e escolha **New → Blueprint** apontando para este repositório (o Render detecta o `render.yaml`), ou crie um **Web Service** manual com os mesmos comandos do blueprint.
2. **Build Command:** `npm install --prefix frontend && npm run build --prefix frontend && npm install --prefix backend`
3. **Start Command:** `cd backend && NODE_ENV=production node server.js`
4. Após o deploy, use a URL pública. Verificação rápida: `GET /health` deve responder `ok`.

**Nota:** em planos com disco efêmero, o SQLite pode ser recriado a cada reinício (dados somente para demonstração). Variável opcional `SQLITE_PATH` define onde salvar o arquivo do banco.

Se no futuro a API ficar em **outro domínio**, faça o build do frontend com `VITE_API_URL=https://sua-api.exemplo.com` (as rotas continuam com prefixo `/api` nesse host).

---

### 🔑 Credenciais de Acesso (Ambiente de Teste)

Para fins de avaliação acadêmica e validação do MVP, o banco de dados é inicializado automaticamente com os seguintes perfis:

- **Gerente**
  - **E-mail:** `admin@primecell.com`
  - **Senha:** `admin`
- **Atendente**
  - **E-mail:** `atendente@primecell.com`
  - **Senha:** `123456`

*(Nota técnica: as senhas foram mantidas sem algoritmos de hash criptográfico nesta versão MVP para simplificar o processo de validação em banco de dados pelos avaliadores).*

---

### 🧪 Roteiro de Teste Prático (Fluxo Completo)

Sugerimos o seguinte roteiro para a avaliação funcional do ciclo de vida da aplicação:

1. **Autenticação:** Acesse a aplicação no navegador e realize o login utilizando as credenciais de Gerente fornecidas acima.
2. **Cadastro de Entidade:** Navegue pelo menu lateral até a opção **"Clientes"** > "Novo Cliente" e registre um perfil com dados fictícios.
3. **Abertura de OS:** Acesse a aba **"Lista de OS"** e clique em "Nova Ordem de Serviço". Selecione o cliente recém-cadastrado no formulário e preencha as informações técnicas do aparelho e relato do problema.
4. **Acompanhamento Visual:** Navegue até a tela inicial **"Dashboard (Kanban)"**. A nova OS estará disponível na coluna de entrada ("Recebido").
5. **Movimentação de Estágios:** Clique e arraste o cartão da OS pelas etapas seguintes ("Em Análise", "Aguardando Aprovação", "Em Reparo") para validar a funcionalidade de *Drag and Drop* que atualiza o status no banco de dados.
6. **Atualização de Diagnóstico:** Clique sobre o cartão da OS no Kanban para abrir o modo de edição. Insira um diagnóstico técnico no campo "Laudo", informe um "Valor do Serviço" e salve as alterações.
7. **Finalização do Fluxo:** Mova o cartão atualizado até a coluna final ("Entregue"), concluindo a simulação da esteira de serviços da loja.

---

## 👥 Equipe e responsabilidades *(06/04/2026)*

Registro da divisão de **funções no produto** e **pessoas responsáveis** acordada na documentação do projeto.

| Pessoa | Papel | Funcionalidades e âmbito de responsabilidade |
|--------|--------|-----------------------------------------------|
| **Maria** | Tech Leader | Direção técnica da equipe, priorização de entregas, alinhamento de arquitetura (frontend, backend e integração) e qualidade da solução como um todo. |
| **Ivan** | UX | Experiência do usuário: fluxos de telas, usabilidade em balcão, consistência de navegação e critérios de boa interação nas jornadas (login, cadastros, OS, Kanban, dashboard). |
| **Samuel** | Frontend | Implementação e manutenção da interface (React/Vite): componentes, rotas, consumo da API, formulários, listas, Kanban e dashboard no cliente. |
| **Gabriel** | Backend | API (Node/Express), modelo de dados, persistência SQLite, endpoints, regras de negócio no servidor e segurança básica de acesso (ex.: autenticação no MVP). |
| **Airton** | Fullstack | Atuação ponta a ponta: features que envolvem front e back, integração entre camadas, ajustes transversais e apoio a deploy/ambiente quando necessário. |

---

## 📖 Histórico de Atualizações (Changelog)

- **06/04/2026 - Equipe e responsabilidades**
  - Documentação formal dos papéis (Tech Leader, UX, Frontend, Backend, Fullstack) e do escopo de atuação de cada integrante no Primecell OS.
- **03/04/2026 - Documentação oficial**
  - Reunião da equipe para elaboração da documentação oficial da aplicação.
- **03/04/2026 - Hospedagem e API**
  - Rotas da API sob o prefixo `/api` (compatível com React Router no mesmo host).
  - Modo produção: Express serve o `frontend/dist` e aceita `PORT` do provedor; checagem `/health`.
  - Desenvolvimento: proxy do Vite para o backend; SQLite via **`node:sqlite`** (Node 22+, sem pacote `sqlite3` — evita incompatibilidade de GLIBC em hospedagens).
  - Blueprint [`render.yaml`](render.yaml) para deploy no Render.
- **28/03/2026 - Evolução de Interface e Dashboard**
  - Desmembramento da aba Dashboard/Kanban. Agora possuem telas e rotas isoladas.
  - Implementação do Dashboard Gerencial consumindo estatísticas reais da base de dados (Faturamento e Status).
- **28/03/2026 - Adequação Acadêmica e Processos**
  - Refinamento de linguagem da documentação para padrão técnico e acadêmico.
  - Inclusão de roteiro de validação de fluxo sistêmico para a banca avaliadora.
- **28/03/2026 - Autenticação e Restrição de Acesso**
  - Implementação da interface de Login e mecanismos de proteção de rotas (acesso restrito a usuários autenticados).
  - Configuração de *database seeding* para criação automática de usuários de teste.
- **28/03/2026 - Versão Inicial (MVP v1.0)**
  - Estruturação do modelo de dados relacional com a engine SQLite.
  - Construção da API RESTful no ecossistema Node.js com Express.
  - Implementação da interface web (SPA) em React com rotinas de CRUD.
  - Desenvolvimento do painel Kanban interativo integrado aos endpoints de status.

