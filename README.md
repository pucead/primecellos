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
3. **Banco de Dados:** Optou-se pelo uso do **SQLite**. Por ser um banco de dados embutido, todas as informações são salvas em um arquivo local (`banco.sqlite`), o que elimina a necessidade de configurações de servidores de banco de dados para a equipe de avaliação.

---

## 🚀 Instruções de Execução (Ambiente Local)

Para executar o sistema em seu computador, é necessário inicializar o Backend e o Frontend em terminais de comando distintos.

**⚠️ Pré-requisito:** 
Certifique-se de ter o **Node.js** instalado em seu ambiente para a execução do servidor e gerenciamento de pacotes. Caso não possua, o download pode ser feito no site oficial: [nodejs.org](https://nodejs.org/).

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

## 📖 Histórico de Atualizações (Changelog)

- **03/04/2026 - Documentação oficial**
  - Reunião da equipe para elaboração da documentação oficial da aplicação.
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

