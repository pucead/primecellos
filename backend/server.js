const express = require('express');
const cors = require('cors');
const abrirBanco = require('./database.js');

const app = express();
app.use(cors());
app.use(express.json());

// Inicia o banco de dados
let db;
abrirBanco().then(banco => {
  db = banco;
  console.log('Banco de dados conectado e tabelas verificadas.');
}).catch(erro => {
  console.error('Erro ao conectar ao banco:', erro);
});

// ==========================================
// ROTAS DE AUTENTICACAO
// ==========================================

app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    // Procura o usuário pelo email e senha (como é MVP, comparamos direto com senha_hash que salva em texto plano)
    const usuario = await db.get('SELECT id, nome, email, perfil FROM Usuario WHERE email = ? AND senha_hash = ?', [email, senha]);
    
    if (usuario) {
      // Retorna sucesso e os dados do usuário para o frontend salvar na sessão (localStorage)
      res.json({ sucesso: true, usuario });
    } else {
      res.status(401).json({ erro: 'Email ou senha inválidos' });
    }
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao realizar login', detalhes: erro.message });
  }
});

// ==========================================
// ROTAS PARA USUARIO
// ==========================================

// Criar Usuario (C)
app.post('/usuarios', async (req, res) => {
  try {
    const { nome, email, senha_hash, perfil } = req.body;
    const resultado = await db.run(
      'INSERT INTO Usuario (nome, email, senha_hash, perfil) VALUES (?, ?, ?, ?)',
      [nome, email, senha_hash, perfil]
    );
    res.status(201).json({ id: resultado.lastID, mensagem: 'Usuário criado com sucesso!' });
  } catch (erro) {
    res.status(400).json({ erro: 'Erro ao criar usuário', detalhes: erro.message });
  }
});

// Listar Usuarios (R)
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await db.all('SELECT * FROM Usuario');
    res.json(usuarios);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar usuários', detalhes: erro.message });
  }
});

// Buscar Usuario por ID (R)
app.get('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await db.get('SELECT * FROM Usuario WHERE id = ?', [req.params.id]);
    if (usuario) res.json(usuario);
    else res.status(404).json({ erro: 'Usuário não encontrado' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar usuário', detalhes: erro.message });
  }
});

// Atualizar Usuario (U)
app.put('/usuarios/:id', async (req, res) => {
  try {
    const { nome, email, senha_hash, perfil } = req.body;
    await db.run(
      'UPDATE Usuario SET nome = ?, email = ?, senha_hash = ?, perfil = ? WHERE id = ?',
      [nome, email, senha_hash, perfil, req.params.id]
    );
    res.json({ mensagem: 'Usuário atualizado com sucesso!' });
  } catch (erro) {
    res.status(400).json({ erro: 'Erro ao atualizar usuário', detalhes: erro.message });
  }
});

// Deletar Usuario (D)
app.delete('/usuarios/:id', async (req, res) => {
  try {
    await db.run('DELETE FROM Usuario WHERE id = ?', [req.params.id]);
    res.json({ mensagem: 'Usuário deletado com sucesso!' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao deletar usuário', detalhes: erro.message });
  }
});

// ==========================================
// ROTAS PARA CLIENTE
// ==========================================

// Criar Cliente (C)
app.post('/clientes', async (req, res) => {
  try {
    const { nome, cpf, telefone } = req.body;
    const resultado = await db.run(
      'INSERT INTO Cliente (nome, cpf, telefone) VALUES (?, ?, ?)',
      [nome, cpf, telefone]
    );
    res.status(201).json({ id: resultado.lastID, mensagem: 'Cliente criado com sucesso!' });
  } catch (erro) {
    res.status(400).json({ erro: 'Erro ao criar cliente', detalhes: erro.message });
  }
});

// Listar Clientes (R)
app.get('/clientes', async (req, res) => {
  try {
    const clientes = await db.all('SELECT * FROM Cliente');
    res.json(clientes);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar clientes', detalhes: erro.message });
  }
});

// Buscar Cliente por ID (R)
app.get('/clientes/:id', async (req, res) => {
  try {
    const cliente = await db.get('SELECT * FROM Cliente WHERE id = ?', [req.params.id]);
    if (cliente) res.json(cliente);
    else res.status(404).json({ erro: 'Cliente não encontrado' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar cliente', detalhes: erro.message });
  }
});

// Atualizar Cliente (U)
app.put('/clientes/:id', async (req, res) => {
  try {
    const { nome, cpf, telefone } = req.body;
    await db.run(
      'UPDATE Cliente SET nome = ?, cpf = ?, telefone = ? WHERE id = ?',
      [nome, cpf, telefone, req.params.id]
    );
    res.json({ mensagem: 'Cliente atualizado com sucesso!' });
  } catch (erro) {
    res.status(400).json({ erro: 'Erro ao atualizar cliente', detalhes: erro.message });
  }
});

// Deletar Cliente (D)
app.delete('/clientes/:id', async (req, res) => {
  try {
    await db.run('DELETE FROM Cliente WHERE id = ?', [req.params.id]);
    res.json({ mensagem: 'Cliente deletado com sucesso!' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao deletar cliente', detalhes: erro.message });
  }
});

// ==========================================
// ROTAS PARA ORDEM DE SERVICO (OS)
// ==========================================

// Dashboard - Estatisticas
app.get('/ordens/estatisticas', async (req, res) => {
  try {
    const totalOS = await db.get('SELECT COUNT(*) as count FROM OrdemServico');
    const osEmAndamento = await db.get("SELECT COUNT(*) as count FROM OrdemServico WHERE status NOT IN ('ENTREGUE', 'CANCELADO')");
    const faturamento = await db.get("SELECT SUM(valor_servico) as total FROM OrdemServico WHERE status = 'ENTREGUE'");
    
    // Status para os gráficos
    const osPorStatus = await db.all("SELECT status, COUNT(*) as count FROM OrdemServico GROUP BY status");

    res.json({
      total: totalOS.count || 0,
      andamento: osEmAndamento.count || 0,
      faturamento: faturamento.total || 0,
      porStatus: osPorStatus
    });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar estatísticas', detalhes: erro.message });
  }
});

// Criar OS (C)
app.post('/ordens', async (req, res) => {
  try {
    const { cliente_id, usuario_id, aparelho, marca, modelo, descricao_problema } = req.body;
    
    // Gera um numero de OS simples baseado no timestamp atual
    const numero_os = 'OS-' + Date.now();
    const status = 'RECEBIDO';

    const resultado = await db.run(
      `INSERT INTO OrdemServico 
      (numero_os, cliente_id, usuario_id, aparelho, marca, modelo, descricao_problema, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [numero_os, cliente_id, usuario_id, aparelho, marca, modelo, descricao_problema, status]
    );
    res.status(201).json({ id: resultado.lastID, numero_os, mensagem: 'Ordem de serviço criada com sucesso!' });
  } catch (erro) {
    res.status(400).json({ erro: 'Erro ao criar ordem de serviço', detalhes: erro.message });
  }
});

// Listar OS (R)
app.get('/ordens', async (req, res) => {
  try {
    const ordens = await db.all(`
      SELECT o.*, c.nome as cliente_nome, c.cpf as cliente_cpf 
      FROM OrdemServico o
      LEFT JOIN Cliente c ON o.cliente_id = c.id
    `);
    
    const ordensFormatadas = ordens.map(o => ({
      ...o,
      cliente: {
        id: o.cliente_id,
        nome: o.cliente_nome,
        cpf: o.cliente_cpf
      }
    }));
    
    res.json(ordensFormatadas);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar ordens de serviço', detalhes: erro.message });
  }
});

// Buscar OS por ID (R)
app.get('/ordens/:id', async (req, res) => {
  try {
    const ordem = await db.get('SELECT * FROM OrdemServico WHERE id = ?', [req.params.id]);
    if (ordem) res.json(ordem);
    else res.status(404).json({ erro: 'Ordem de serviço não encontrada' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar ordem de serviço', detalhes: erro.message });
  }
});

// Atualizar OS (U)
app.put('/ordens/:id', async (req, res) => {
  try {
    const { aparelho, marca, modelo, descricao_problema, laudo_tecnico, valor_servico, status, data_saida } = req.body;
    await db.run(
      `UPDATE OrdemServico SET 
        aparelho = ?, marca = ?, modelo = ?, descricao_problema = ?, 
        laudo_tecnico = ?, valor_servico = ?, status = ?, data_saida = ? 
      WHERE id = ?`,
      [aparelho, marca, modelo, descricao_problema, laudo_tecnico, valor_servico, status, data_saida, req.params.id]
    );
    res.json({ mensagem: 'Ordem de serviço atualizada com sucesso!' });
  } catch (erro) {
    res.status(400).json({ erro: 'Erro ao atualizar ordem de serviço', detalhes: erro.message });
  }
});

// Atualizar apenas o status da OS (PATCH) para o Kanban
app.patch('/ordens/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ erro: 'O campo status é obrigatório' });
    }
    
    await db.run(
      'UPDATE OrdemServico SET status = ? WHERE id = ?',
      [status, req.params.id]
    );
    res.json({ mensagem: 'Status da ordem de serviço atualizado com sucesso!' });
  } catch (erro) {
    res.status(400).json({ erro: 'Erro ao atualizar status', detalhes: erro.message });
  }
});

// Deletar OS (D)
app.delete('/ordens/:id', async (req, res) => {
  try {
    await db.run('DELETE FROM OrdemServico WHERE id = ?', [req.params.id]);
    res.json({ mensagem: 'Ordem de serviço deletada com sucesso!' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao deletar ordem de serviço', detalhes: erro.message });
  }
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
