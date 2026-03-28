const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

// Função para abrir o banco de dados e criar tabelas se não existirem
async function abrirBanco() {
  const db = await open({
    filename: './banco.sqlite',
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

  return db;
}

module.exports = abrirBanco;
