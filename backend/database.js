const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const DB_PATH = process.env.SQLITE_PATH || path.join(__dirname, 'banco.sqlite');

/**
 * Adaptador com a mesma forma de uso do pacote `sqlite` (get/all/run/exec em Promise),
 * usando SQLite embutido do Node 22 — sem addon nativo npm (compatível com Render).
 */
function criarDbAssincrono(syncDb) {
  const bindParams = (params) => (Array.isArray(params) ? params : []);

  return {
    exec: async (sql) => {
      syncDb.exec(sql);
    },
    get: async (sql, params = []) => {
      const stmt = syncDb.prepare(sql);
      return stmt.get(...bindParams(params));
    },
    all: async (sql, params = []) => {
      const stmt = syncDb.prepare(sql);
      return stmt.all(...bindParams(params));
    },
    run: async (sql, params = []) => {
      const stmt = syncDb.prepare(sql);
      const r = stmt.run(...bindParams(params));
      const lid = r.lastInsertRowid;
      return {
        lastID: lid == null ? 0 : Number(lid),
        changes: Number(r.changes),
      };
    },
  };
}

async function abrirBanco() {
  const syncDb = new DatabaseSync(DB_PATH);
  const db = criarDbAssincrono(syncDb);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS Usuario (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha_hash TEXT NOT NULL,
      perfil TEXT NOT NULL
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS Cliente (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cpf TEXT NOT NULL UNIQUE,
      telefone TEXT NOT NULL,
      data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

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
