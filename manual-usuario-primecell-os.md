# Manual do Usuario - Primecell OS (MVP)

## 1. Visao geral

O Primecell OS e um sistema web para assistencia tecnica de celulares.

No estado atual, ele permite:

- login de usuario
- cadastro e edicao de clientes
- cadastro e edicao de usuarios
- abertura e edicao de ordens de servico (OS)
- acompanhamento das OS no Kanban
- consulta de indicadores no Dashboard

Este manual descreve somente o comportamento real observado no frontend e no backend atuais.

## 2. Como acessar

### 2.1 Subir o backend

```bash
cd backend
npm install
node server.js
```

API em `http://localhost:3000`.

### 2.2 Subir o frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicacao em `http://localhost:5173` (ou porta exibida pelo Vite).

### 2.3 Login

1. Acesse a URL do frontend.
2. Informe e-mail e senha.
3. Clique em `Entrar`.

Credenciais de teste existentes no seed do banco:

- `admin@primecell.com` / `admin`
- `atendente@primecell.com` / `123456`

Se o login for valido, o sistema abre em `Dashboard`.

## 3. Uso por tela

### 3.1 Login

- objetivo: autenticar usuario
- entrada: e-mail e senha
- saida: acesso ao sistema e gravacao de sessao no navegador

### 3.2 Dashboard

Mostra indicadores de OS:

- `Total de OS (Historico)`
- `Em Andamento`
- `Faturamento (Entregues)`
- `OS por Status`

Regras aplicadas:

- em andamento = status diferente de `ENTREGUE` e `CANCELADO`
- faturamento = soma de `valor_servico` apenas das OS `ENTREGUE`

### 3.3 Kanban

Colunas disponiveis:

- `Recebido`
- `Em Analise`
- `Aguardando Aprovacao`
- `Em Reparo`
- `Finalizado`
- `Entregue`

Uso:

- arrastar card entre colunas altera o status da OS imediatamente
- clicar no card abre a tela de edicao da OS
- cada card mostra numero da OS, aparelho e cliente

### 3.4 Lista de OS

Exibe tabela com:

- numero da OS
- cliente
- aparelho
- data de entrada
- status
- acao `Editar`

Uso:

- consultar OS cadastradas
- abrir tela de edicao
- criar OS pela acao `Nova OS`

### 3.5 Nova OS e Editar OS

Na criacao (`/os/nova`), campos principais:

- cliente
- usuario responsavel
- aparelho
- marca
- modelo
- descricao do problema

Comportamento:

- status inicial da OS = `RECEBIDO`
- ao salvar, redireciona para o `Dashboard`

Na edicao (`/os/editar/:id`):

- cliente fica bloqueado para alteracao
- permite preencher `laudo tecnico` e `valor do servico`
- ao salvar, redireciona para o `Dashboard`

### 3.6 Clientes

Tela de lista (`/clientes`) e formulario (`/clientes/novo`, `/clientes/editar/:id`).

Comportamento observado:

- permite cadastrar e editar
- CPF nao pode repetir
- sem botao de exclusao na interface

### 3.7 Usuarios

Tela de lista (`/usuarios`) e formulario (`/usuarios/novo`, `/usuarios/editar/:id`).

Comportamento observado:

- permite cadastrar e editar
- perfis disponiveis no formulario: `ATENDENTE`, `TECNICO`, `ADMIN`
- sem botao de exclusao na interface

## 4. Fluxo recomendado de operacao

Fluxo pratico para uso do MVP:

1. Fazer login.
2. Cadastrar cliente.
3. Abrir nova OS.
4. Acompanhar e mover status no Kanban.
5. Editar OS para preencher laudo e valor.
6. Mover OS para `ENTREGUE`.
7. Consultar Dashboard para acompanhamento geral.

## 5. Limitacoes atuais percebidas (MVP)

- nao ha busca, filtro ou ordenacao nas listas
- nao ha exclusao de cliente, usuario e OS pelo frontend
- nao ha controle de acesso por perfil na interface (menus liberados para qualquer usuario logado)
- validacoes de entrada sao basicas (sem mascara de CPF/telefone)
- mensagens de erro para usuario sao genericas em parte dos fluxos
- nao ha autenticacao por token nem protecao de rotas da API por sessao
- nao ha campo operacional na interface para `data_saida`

## 6. Observacoes de QA para evitar interpretacoes erradas do MVP

- O sistema entrega o ciclo principal de OS (abrir, acompanhar, editar e concluir), mas ainda nao e uma versao de producao.
- O campo de perfil existe, porem nao representa autorizacao efetiva por tela/acao no comportamento atual.
- A atualizacao de status no Kanban impacta diretamente Dashboard e operacao diaria; uso consistente do Kanban e importante.
- Em `Editar Usuario`, deixar senha em branco pode gerar falha ao salvar (limite tecnico atual da integracao frontend/backend).
- O Dashboard reflete os dados gravados no banco; se o status nao for atualizado corretamente, os indicadores ficam desalinhados.
- O foco do MVP e validacao funcional do processo, nao seguranca completa, governanca de perfis ou experiencia avancada de atendimento.
