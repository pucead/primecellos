# 📱 Primecell OS - Gerenciador de Ordens de Serviço

Sabe aquela bagunça de papéis, post-its e planilhas confusas que costuma rolar no balcão de uma assistência técnica de celulares? A ideia desse projeto nasceu justamente para acabar com isso. 

Desenvolvemos o **Primecell OS** como um sistema web para organizar o dia a dia de uma loja de consertos. O foco principal desde o começo foi: tem que ser muito fácil de usar e direto ao ponto. Nada de dezenas de menus complicados.

---

## 💡 O que o sistema faz na prática?
A gente pensou no caminho que o celular faz desde o momento que o cliente entra na loja até a hora que ele sai feliz com o aparelho consertado. Para isso, o sistema permite:

- **Saber quem é quem:** Cadastrar os clientes (donos dos aparelhos) e a própria equipe da loja (os técnicos e atendentes).
- **Abrir a Ordem de Serviço (OS):** Anotar a marca, o modelo, qual é o defeito que o cliente relatou e, mais tarde, o valor do conserto e o laudo técnico.
- **O Quadro Visual (O coração do sistema):** Em vez de uma lista chata de texto, criamos um quadro interativo (estilo Kanban). Os celulares viram "cartões" na tela. Se o celular do João estava na coluna de "Em Análise" e o técnico terminou de avaliar, é só clicar no cartão com o mouse, segurar e arrastar para a coluna "Aguardando Aprovação". Bem intuitivo!

---

## 🛠️ Como construímos tudo isso? (Nossa "Stack" Tecnológica)
Como este é um projeto acadêmico, nós precisávamos de uma base que fosse moderna, mas ao mesmo tempo fácil de rodar na hora de apresentar para os professores, sem depender de servidores caros ou configurações complexas.

1. **A Interface (Frontend):** Usamos o **React** (com a ferramenta Vite, que deixa o carregamento super rápido). Todo o visual e as cores foram feitos por nós mesmos escrevendo **CSS puro**. Isso ajuda muito a entender como cada pedacinho da tela funciona por debaixo dos panos.
2. **O Motor (Backend):** Toda a lógica e a comunicação da tela com os dados foi feita usando **Node.js** com a biblioteca **Express**.
3. **O Armazém de Dados (Banco de Dados):** Aqui foi a nossa escolha mais estratégica. Ao invés de usar bancos de dados pesados, optamos pelo **SQLite**. Ele salva todas as informações das ordens de serviço em um único arquivo de texto dentro da nossa própria pasta (`banco.sqlite`). É só dar o play no código que o banco já está lá, funcionando.

---

## 🚀 Como testar no seu computador (Passo a Passo)

Olá, professor(a)! Para avaliar o nosso projeto rodando na sua máquina, preparamos este guia rápido e direto. O nosso sistema é dividido em duas partes principais que precisam rodar ao mesmo tempo: o "Motor" (Backend) e a "Interface" (Frontend). 

**⚠️ Importante antes de começar:** 
Você vai precisar ter o **Node.js** instalado no seu computador. Ele é o ambiente que permite que o nosso código JavaScript funcione fora do navegador, e é essencial para rodarmos os comandos `npm install` que baixarão as ferramentas que utilizamos. Se ainda não tiver, é só baixar a versão recomendada (LTS) no site oficial: [nodejs.org](https://nodejs.org/).

---

### Abrindo o Terminal

Primeiro, você precisará abrir o terminal (aquela tela de linha de comando) na pasta principal do nosso projeto:
- **Se você usa Windows:** Abra a pasta do projeto no Explorador de Arquivos, clique na barra de endereços no topo, digite `cmd` ou `powershell` e aperte Enter. 
- **Se você usa Mac ou Linux:** Clique com o botão direito dentro da pasta do projeto e selecione "Abrir no Terminal" (Open in Terminal).

> 💡 **Dica rápida sobre o comando `cd`:** Nos passos abaixo, vamos usar o comando `cd` (que significa *Change Directory*, ou "Mudar de Diretório"). Ele serve simplesmente para dizer ao terminal para entrar dentro de uma pasta específica.

---

### Passo 1: Ligando o Motor (Backend)
No terminal que você acabou de abrir, siga estes passos:

1. Entre na pasta do backend digitando: `cd backend`
2. Instale as ferramentas e bibliotecas que o nosso projeto precisa rodando: `npm install` (isso pode levar alguns segundinhos).
3. Por fim, ligue o servidor digitando: `node server.js`
*(Se aparecer "Servidor rodando na porta 3000", deu tudo certo! O banco de dados já está configurado para rodar junto com ele).*

---

### Passo 2: Ligando a Interface (Frontend)
Agora vamos ligar a tela do sistema. **Deixe o terminal anterior aberto rodando quietinho**, e abra um **novo terminal** na pasta principal do projeto (seguindo as mesmas instruções de cima).

1. Neste novo terminal, entre na pasta da interface digitando: `cd frontend`
2. Novamente, instale as dependências visuais com o comando: `npm install`
3. Para iniciar a tela, rode: `npm run dev`

*(Ele vai te mostrar um link na tela, que geralmente é `http://localhost:5173`. É só segurar o 'Ctrl' (ou 'Cmd' no Mac) e clicar no link, ou copiar e colar no seu navegador preferido!)*

---

### 🔑 Usuários para Teste
Para testar o acesso ao sistema, utilize as credenciais abaixo (no MVP, as senhas não possuem criptografia complexa para facilitar a validação):

- **Gerente**
  - **E-mail:** `admin@primecell.com`
  - **Senha:** `admin`

- **Atendente**
  - **E-mail:** `atendente@primecell.com`
  - **Senha:** `123456`

---

### 🧪 Roteiro Sugerido para Teste (O fluxo completo)

Olá, professor(a)! Para testar o sistema na prática e ver como ele ajudaria uma assistência técnica no dia a dia, preparamos este roteiro passo a passo:

1. **Faça o Login:** Acesse a tela inicial e utilize um dos usuários de teste (por exemplo, o Gerente com `admin@primecell.com`).
2. **Cadastre um Cliente:** No menu lateral, clique em **"Clientes"** e depois em "Novo Cliente". Preencha com dados fictícios (nome, CPF, telefone) para simular alguém chegando na loja. Salve o cadastro.
3. **Abra a Ordem de Serviço:** Vá na aba **"Lista de OS"** e clique em "Nova Ordem de Serviço". Selecione o cliente que você acabou de criar. Preencha os dados do aparelho (marca, modelo) e o defeito relatado. Clique em salvar.
4. **Acompanhe no Painel:** Acesse o **"Dashboard (Kanban)"**. Você verá um novo cartão representando essa OS na primeira coluna, chamada **"Recebido"**.
5. **Movimente o Conserto:** Simule o andamento do trabalho do técnico! Clique e segure o cartão da OS, arrastando-o pelas colunas seguintes: **"Em Análise"**, **"Aguardando Aprovação"** e **"Em Reparo"**.
6. **Atualize o Laudo e Valor:** Dê um clique no cartão da OS para abri-lo no modo de edição. Preencha o campo de **"Laudo Técnico"** com o diagnóstico e informe o **"Valor do Serviço"**. Clique em salvar.
7. **Finalize a OS:** Para terminar, arraste o cartão até a última coluna, **"Entregue"**, simulando que o cliente buscou o aparelho consertado e pagou pelo serviço. Pronto!

---

## 📖 Diário de Bordo (Histórico de Atualizações)
Aqui a gente vai documentar a evolução do projeto, para os professores (e nós mesmos) acompanharmos como a ideia foi crescendo ao longo do tempo.

* **28/03/2026 - Protegendo a casa (Tela de Login)**
  * Criamos a tela de autenticação do sistema. Agora ninguém acessa direto!
  * Adicionamos a rota `/login` no backend que verifica se o e-mail e a senha batem com os cadastros do banco.
  * O sistema agora "lembra" de quem logou (salvando no navegador) e exibe o nome do usuário no menu principal com a opção de Sair.

* **28/03/2026 - O pontapé inicial (Versão 1.0)**
  * Criamos a estrutura do banco de dados (SQLite) para guardar clientes, usuários e as ordens de serviço.
  * Subimos a API no Node.js que faz o meio de campo (cadastra, lista, atualiza e apaga dados).
  * Desenhamos as telas de formulários no React para dar entrada nos consertos.
  * Entregamos a funcionalidade mais legal: o painel visual (Kanban) onde dá para arrastar e soltar os cartões de conserto pra trocar o status deles.
  * Demos um tapa no visual dos cartões pra mostrar o nome do cliente direto de cara e deixamos o cartão inteiro clicável pra facilitar a navegação.
  * Deixamos o repositório do Git organizado e pronto para apresentações acadêmicas.