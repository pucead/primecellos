# 📱 Primecell OS - Sistema de Gestão de Ordens de Serviço

Bem-vindo ao repositório do **Primecell OS**! Este projeto foi desenvolvido como um sistema web simples, limpo e funcional para gerenciar os consertos e manutenções de celulares de uma loja (assistência técnica).

---

## 🎯 O que é o projeto?
A Primecell precisava de uma forma mais organizada de acompanhar os celulares que entram para conserto. Antes, tudo podia se perder em papéis ou planilhas difíceis de ler. 

Com este sistema, a loja consegue:
1. **Cadastrar Clientes:** Saber de quem é o celular e como entrar em contato.
2. **Cadastrar Usuários:** Identificar qual funcionário (atendente ou técnico) está responsável por cada etapa.
3. **Criar Ordens de Serviço (OS):** Registrar exatamente qual é o aparelho, o defeito relatado pelo cliente e o valor do conserto.
4. **Acompanhar o Conserto Visualmente (Kanban):** Mover o celular por diferentes "colunas" (etapas) como *Recebido, Em Análise, Em Reparo, Finalizado e Entregue*, apenas arrastando e soltando os cartões na tela.

---

## 🛠️ Tecnologias Utilizadas
O projeto foi construído pensando em simplicidade e performance, dividindo a aplicação em duas partes:

* **Backend (O "Motor" e o Banco de Dados):**
  * Desenvolvido em **Node.js** utilizando o micro-framework **Express**.
  * O banco de dados escolhido foi o **SQLite**, que é perfeito para projetos acadêmicos e MVPs porque salva todos os dados em um único arquivo local (`banco.sqlite`), sem precisar instalar programas pesados de banco de dados.

* **Frontend (A Interface do Usuário):**
  * Desenvolvido em **React** utilizando a ferramenta **Vite** (que deixa o site muito rápido).
  * O visual foi feito com **CSS puro**, mantendo o código fácil de ler e sem depender de bibliotecas externas complexas.
  * O quadro de tarefas (Kanban) utiliza a função nativa de *Drag and Drop* (Arrastar e soltar) do próprio navegador.

---

## 🚀 Como rodar o projeto no seu computador

Você precisará abrir **dois terminais** (telas de comando), um para ligar o banco de dados/servidor e outro para ligar o site.

### Passo 1: Ligando o Backend
1. Abra um terminal e entre na pasta do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências necessárias (só precisa fazer na primeira vez):
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   node server.js
   ```
   *(Você verá a mensagem: "Servidor rodando na porta 3000")*

### Passo 2: Ligando o Frontend
1. Abra um **novo** terminal e entre na pasta do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências visuais (só precisa fazer na primeira vez):
   ```bash
   npm install
   ```
3. Inicie o site:
   ```bash
   npm run dev
   ```
   *(O terminal mostrará um link, geralmente `http://localhost:5173`. Clique nele para abrir o sistema no navegador!)*

---

## 📖 Histórico de Atualizações (Changelog)
A partir de agora, manteremos aqui o registro de todas as ideias e novas funcionalidades implementadas no sistema.

* **28/03/2026 - Versão Inicial (v1.0)**
  * Criação do Banco de Dados SQLite (Tabelas: Cliente, Usuário, Ordem de Serviço).
  * Construção da API REST no Backend (Node.js/Express) com rotas para criar, ler, atualizar e deletar dados.
  * Criação das telas de listagem e formulários de cadastro.
  * Implementação da tela principal em formato Kanban.
  * Adição da funcionalidade de Arrastar e Soltar (Drag and Drop) para mudar o status da OS.
  * Melhoria no Kanban: Nome do cliente sendo exibido no cartão e possibilidade de clicar no cartão inteiro para ver detalhes.
  * Configuração do repositório Git com `.gitignore` higienizado para entregas acadêmicas.