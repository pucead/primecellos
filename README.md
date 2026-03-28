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

Para ver o sistema rodando, você vai precisar abrir dois terminais (aquelas telas pretas de comando), porque o "Motor" e a "Interface" rodam separados.

**Passo 1: Ligando o Motor (Backend)**
1. Abre o terminal, entra na pasta do backend digitando: `cd backend`
2. Na primeira vez, instala as coisas que o projeto precisa com: `npm install`
3. Liga a chave do servidor com: `node server.js`
*(Se aparecer "Servidor rodando na porta 3000", deu tudo certo!)*

**Passo 2: Ligando a Interface (Frontend)**
1. Abre um **novo** terminal (deixa o outro lá rodando quietinho) e entra na pasta: `cd frontend`
2. Instala as dependências visuais digitando: `npm install`
3. Roda o comando mágico: `npm run dev`
*(Ele vai te mostrar um link na tela, geralmente `http://localhost:5173`. É só clicar e usar o sistema no seu navegador!)*

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