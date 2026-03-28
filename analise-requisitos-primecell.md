# Primecell OS - Análise de Requisitos

### 1. Resumo Executivo (Briefing Consolidado)

**Visão Geral do Sistema:**
O Primecell OS é um sistema web responsivo projetado para simplificar e digitalizar a gestão de Ordens de Serviço (OS) de uma assistência técnica de celulares. O foco do sistema é substituir controles manuais ou planilhas por uma plataforma centralizada e de fácil uso.

**Objetivos:**
- Registrar rapidamente a entrada de aparelhos na assistência.
- Manter um histórico organizado dos serviços prestados por cliente e por aparelho.
- Facilitar o acompanhamento do status do reparo tanto para a equipe quanto (futuramente) para o cliente.

**Escopo do MVP:**
O MVP contempla exclusivamente o fluxo principal da assistência: cadastro e autenticação de usuários (funcionários), cadastro básico de clientes, e o ciclo de vida completo (CRUD) de uma Ordem de Serviço (Abertura, Atualização de Status, Fechamento/Entrega e Consulta). Módulos de controle de estoque de peças, emissão de nota fiscal complexa e controle financeiro avançado estão **fora do escopo do MVP**.

---

### 2. Atores do Sistema

- **Atendente / Recepcionista:** Responsável por cadastrar clientes, abrir novas Ordens de Serviço e consultar status para informar aos clientes.
- **Técnico:** Responsável por analisar o aparelho, registrar o laudo técnico, atualizar o status da OS e inserir o valor do serviço.
- **Administrador (Gerente):** Possui acesso total ao sistema, incluindo cadastro de novos usuários (funcionários), alteração de permissões e exclusão de registros (se necessário).

---

### 3. Lista de Requisitos

#### Requisitos Funcionais (RF)
- **RF01 - Autenticação:** O sistema deve permitir o login e logout de usuários cadastrados com e-mail e senha.
- **RF02 - Gestão de Usuários:** O sistema deve permitir que o Administrador cadastre, edite, inative e liste os usuários do sistema (funcionários).
- **RF03 - Gestão de Clientes:** O sistema deve permitir cadastrar, editar, consultar e listar clientes (Nome, CPF, Telefone).
- **RF04 - Abertura de OS:** O sistema deve permitir a criação de uma nova Ordem de Serviço vinculada a um cliente, contendo: aparelho, marca, modelo e descrição do problema relatado.
- **RF05 - Acompanhamento e Edição de OS:** O sistema deve permitir a consulta, listagem e edição das Ordens de Serviço.
- **RF06 - Atualização de Status:** O sistema deve permitir a alteração do status da OS (ex: *Recebido, Em Análise, Aguardando Aprovação, Em Reparo, Finalizado, Entregue, Cancelado*).
- **RF07 - Inserção de Laudo:** O sistema deve permitir que o técnico insira um laudo técnico e o valor final do serviço na OS.
- **RF08 - Exclusão de OS:** O sistema deve permitir que apenas o Administrador exclua uma OS do sistema (deleção lógica ou física, a definir na arquitetura).

#### Requisitos Não Funcionais (RNF)
- **RNF01 - Usabilidade:** A interface deve ser simples, intuitiva e responsiva (adaptável para uso em tablets e monitores de balcão).
- **RNF02 - Desempenho:** O sistema deve carregar as listagens de OS e clientes em menos de 3 segundos em condições normais de rede.
- **RNF03 - Persistência:** Os dados devem ser armazenados em um banco de dados relacional (ex: PostgreSQL ou MySQL).
- **RNF04 - Rastreabilidade:** Toda OS deve registrar a data e hora de criação e a data e hora da última modificação automaticamente.

---

### 4. Lista de Regras de Negócio (RN)

- **RN01 - Dados Obrigatórios para OS:** Não é possível abrir uma OS sem que ela esteja vinculada a um cliente previamente cadastrado. Campos obrigatórios na OS: Cliente, Aparelho, Marca, Modelo e Descrição do Problema.
- **RN02 - Unicidade de Cliente:** O sistema não deve permitir o cadastro de dois clientes com o mesmo CPF.
- **RN03 - Restrição de Exclusão:** Uma OS com status "Entregue" ou "Finalizado" não pode ser excluída, apenas arquivada/inativada, para fins de histórico. Exclusões reais só podem ser feitas por Administradores em OS com status "Recebido" ou "Cancelado".
- **RN04 - Geração de Identificador:** Toda OS gerada deve receber um número de identificação único, sequencial e legível (ex: OS-0001, OS-0002) para facilitar a comunicação com o cliente.

---

### 5. Casos de Uso Resumidos (UC)

- **UC01 - Realizar Login:** O usuário insere credenciais; o sistema valida e concede acesso ao painel principal baseado no seu perfil (Atendente, Técnico, Admin).
- **UC02 - Cadastrar Cliente:** O Atendente preenche Nome, CPF e Telefone; o sistema valida o CPF e salva o registro.
- **UC03 - Abrir Ordem de Serviço:** O Atendente seleciona um cliente, insere os dados do aparelho e o problema relatado; o sistema gera o número da OS, define a "Data de Entrada" e o status inicial como "Recebido".
- **UC04 - Atualizar Laudo e Status:** O Técnico acessa uma OS "Em Análise", insere o parecer técnico, define o valor do conserto e altera o status para "Aguardando Aprovação" ou "Em Reparo".
- **UC05 - Consultar OS:** Qualquer ator busca uma OS pelo número identificador, pelo CPF do cliente ou filtra por status na listagem geral para verificar a situação atual.

---

### 6. Modelo de Dados (Conceitual/Lógico Simplificado)

Para o MVP, a estrutura de tabelas relacionais deve ser a mais enxuta possível:

**Tabela: `Usuario`**
- `id` (PK, Inteiro, Auto-incremento)
- `nome` (String)
- `email` (String, Único)
- `senha_hash` (String)
- `perfil` (Enum: ADMIN, ATENDENTE, TECNICO)

**Tabela: `Cliente`**
- `id` (PK, Inteiro, Auto-incremento)
- `nome` (String)
- `cpf` (String, Único)
- `telefone` (String)
- `data_cadastro` (DateTime)

**Tabela: `OrdemServico`**
- `id` (PK, Inteiro, Auto-incremento)
- `numero_os` (String, Único) -> *Ex: "OS-1004"*
- `cliente_id` (FK -> Cliente.id)
- `usuario_id` (FK -> Usuario.id) -> *Usuário que abriu a OS*
- `aparelho` (String) -> *Ex: Smartphone*
- `marca` (String) -> *Ex: Samsung*
- `modelo` (String) -> *Ex: Galaxy S21*
- `descricao_problema` (Text)
- `laudo_tecnico` (Text, Nullable)
- `valor_servico` (Decimal, Nullable)
- `status` (Enum: RECEBIDO, EM_ANALISE, AGUARDANDO_APROVACAO, EM_REPARO, FINALIZADO, ENTREGUE, CANCELADO)
- `data_entrada` (DateTime)
- `data_saida` (DateTime, Nullable)
