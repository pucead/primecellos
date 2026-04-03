# Manual do Usuario - Primecell OS (Versao Academica)

## 1. Apresentacao do sistema

O Primecell OS e uma aplicacao web para apoio a operacao de assistencias tecnicas de celulares.
No MVP atual, o sistema concentra o ciclo principal de Ordem de Servico (OS): autenticacao, cadastro de entidades, abertura de OS, acompanhamento por status e consulta de indicadores.

A solucao e composta por:

- Frontend em React (Vite), responsavel pelas telas e navegacao.
- Backend em Node.js com Express, responsavel pelas rotas e regras basicas.
- Banco de dados SQLite local, utilizado para persistencia.

## 2. Objetivo do manual

Este manual tem como objetivo orientar o uso funcional do Primecell OS na versao MVP, com linguagem tecnica simples e aderente ao comportamento real implementado.

O documento foi estruturado para apoio de validacao academica, sem incluir promessas de funcionalidades nao existentes na versao atual.

## 3. Requisitos de acesso

Para execucao local, sao necessarios:

- Node.js instalado.
- Navegador web atualizado.
- Dois terminais (um para backend e outro para frontend).

Portas padrao observadas:

- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5173`

## 4. Procedimento de inicializacao

### 4.1 Inicializacao do backend

```bash
cd backend
npm install
node server.js
```

Resultado esperado: servidor ativo na porta 3000 e inicializacao automatica do banco SQLite.

### 4.2 Inicializacao do frontend

```bash
cd frontend
npm install
npm run dev
```

Resultado esperado: aplicacao disponivel na URL exibida pelo Vite (normalmente `http://localhost:5173`).

## 5. Autenticacao

O acesso ao sistema ocorre na tela de login (`/login`), com campos de e-mail e senha.

Credenciais de teste semeadas automaticamente quando a tabela de usuarios esta vazia:

- `admin@primecell.com` / `admin`
- `atendente@primecell.com` / `123456`

Comportamento observado:

- Login valido redireciona para o Dashboard.
- Sessao do usuario e armazenada localmente no navegador.
- A opcao `Sair` remove a sessao local.

## 6. Descricao das telas e operacoes

### 6.1 Dashboard (`/`)

Apresenta indicadores consolidados:

- Total historico de OS.
- Quantidade de OS em andamento.
- Faturamento das OS entregues.
- Distribuicao de OS por status.

Regra atual de calculo:

- Em andamento: status diferente de `ENTREGUE` e `CANCELADO`.
- Faturamento: soma de `valor_servico` apenas para status `ENTREGUE`.

### 6.2 Kanban (`/kanban`)

Exibe OS por coluna de status:

- `RECEBIDO`
- `EM_ANALISE`
- `AGUARDANDO_APROVACAO`
- `EM_REPARO`
- `FINALIZADO`
- `ENTREGUE`

Operacoes:

- Arrastar e soltar card para alterar status.
- Abrir edicao da OS ao clicar no card.
- Acesso rapido para nova OS e visualizacao em tabela.

### 6.3 Lista de OS (`/lista-os`)

Exibe tabela com numero da OS, cliente, aparelho, data de entrada, status e acao de edicao.

Operacoes:

- Consultar ordens cadastradas.
- Acessar formulario de criacao (`Nova OS`).
- Acessar formulario de edicao (`Editar`).

### 6.4 Formulario de OS (`/os/nova` e `/os/editar/:id`)

Na criacao, campos principais:

- Cliente
- Usuario responsavel
- Aparelho
- Marca
- Modelo
- Descricao do problema

Comportamento na criacao:

- Status inicial definido como `RECEBIDO`.

Comportamento na edicao:

- Campo cliente permanece bloqueado.
- Inclusao/atualizacao de laudo tecnico e valor do servico.

### 6.5 Clientes (`/clientes`, `/clientes/novo`, `/clientes/editar/:id`)

Operacoes disponiveis:

- Cadastro de cliente.
- Edicao de cliente.
- Consulta em lista.

Regra observada:

- CPF com restricao de unicidade no banco.

### 6.6 Usuarios (`/usuarios`, `/usuarios/novo`, `/usuarios/editar/:id`)

Operacoes disponiveis:

- Cadastro de usuario.
- Edicao de usuario.
- Consulta em lista.

Perfis presentes no formulario:

- `ATENDENTE`
- `TECNICO`
- `ADMIN`

Observacao funcional:

- O perfil e cadastrado, porem nao ha restricao de menus por perfil no frontend atual.

## 7. Fluxo operacional sugerido

Para validacao e uso diario no escopo MVP, recomenda-se o fluxo:

1. Autenticar no sistema.
2. Cadastrar cliente.
3. Abrir nova OS.
4. Acompanhar evolucao no Kanban.
5. Registrar laudo tecnico e valor na edicao da OS.
6. Concluir movimentacao ate `ENTREGUE`.
7. Consultar Dashboard para acompanhamento dos indicadores.

## 8. Limitacoes conhecidas do MVP

Limitacoes funcionais observadas:

- Nao ha busca, filtro ou paginacao nas listagens.
- Nao ha acao de exclusao no frontend para clientes, usuarios e OS.
- Nao ha controle de permissao por perfil na interface.
- Validacoes de formulario sao basicas (ex.: sem mascaras de CPF/telefone).
- Mensagens de erro podem ser genericas em alguns cenarios.
- API sem mecanismo de autenticacao por token/autorizacao por rota.
- Campo `data_saida` existe no backend, mas nao possui operacao dedicada na interface.

Nota de QA:

- Em edicao de usuario, deixar senha em branco pode resultar em falha de salvamento dependendo da composicao dos dados enviados.

## 9. Conclusao

O Primecell OS, na versao MVP atual, atende ao objetivo de demonstrar o fluxo essencial de gestao de Ordem de Servico em assistencia tecnica.

Para contexto academico, o sistema esta adequado para validacao funcional do processo principal. Para evolucao de produto, os proximos ganhos estao concentrados em seguranca, controle de acesso por perfil, experiencia de consulta (filtros/busca) e robustez de validacoes.
