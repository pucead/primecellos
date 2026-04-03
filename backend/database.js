const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

// Caminho estável independente do diretório de trabalho (deploy / PM2)
const DB_PATH = process.env.SQLITE_PATH || path.join(__dirname, 'banco.sqlite');

// Função para abrir o banco de dados e criar tabelas se não existirem
async function abrirBanco() {
  const db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database
  });

  // Tabela Usuario
  await db.exec(`
    CREATE TABLE IF NOT EXISTS Usuario (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha_hash TEXT NOT NULL,
      perfil TEXT NOT NULL
    )
  `);

  // Tabela Cliente
  await db.exec(`
    CREATE TABLE IF NOT EXISTS Cliente (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cpf TEXT NOT NULL UNIQUE,
      telefone TEXT NOT NULL,
      data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela OrdemServico
  await db.exec(`
    CREATE TABLE IF NOT EXISTS OrdemServico (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      numero_os TEXT NOT NULL UNIQUE,
      cliente_id INTEGER NOT NULL,
      usuario_id INTEGER NOT NULL,
      aparelho TEXT NOT NULL,
      marca TEXT NOT NULL,
      modelo TEXT NOT NULL,
      descricao_problema TEXT NOT NULL,
      laudo_tecnico TEXT,
      valor_servico DECIMAL(10,2),
      status TEXT NOT NULL,
      data_entrada DATETIME DEFAULT CURRENT_TIMESTAMP,
      data_saida DATETIME,
      FOREIGN KEY(cliente_id) REFERENCES Cliente(id),
      FOREIGN KEY(usuario_id) REFERENCES Usuario(id)
    )
  `);

  // Popula os usuários de teste automaticamente caso o banco esteja vazio
  const qtdUsuarios = await db.get('SELECT COUNT(*) as count FROM Usuario');
  if (qtdUsuarios.count === 0) {
    await db.run(
      "INSERT INTO Usuario (nome, email, senha_hash, perfil) VALUES ('Gerente Prime', 'admin@primecell.com', 'admin', 'GERENTE')"
    );
    await db.run(
      "INSERT INTO Usuario (nome, email, senha_hash, perfil) VALUES ('Atendente', 'atendente@primecell.com', '123456', 'ATENDENTE')"
    );
    console.log('✅ Usuários de teste criados com sucesso!');
  }

  return db;
}

module.exports = abrirBanco;
