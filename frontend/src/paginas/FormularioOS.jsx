import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDaApi } from '../api';

function FormularioOS() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdicao = Boolean(id);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [form, setForm] = useState({
    cliente_id: '',
    usuario_id: '',
    aparelho: '',
    marca: '',
    modelo: '',
    descricao_problema: '',
    laudo_tecnico: '',
    valor_servico: '',
    status: 'RECEBIDO'
  });

  useEffect(() => {
    carregarDependencias();
    if (isEdicao) {
      carregarOSParaEditar();
    }
  }, [id]);

  async function carregarDependencias() {
    try {
      const cli = await fetchDaApi('/clientes');
      const usu = await fetchDaApi('/usuarios');
      setClientes(cli);
      setUsuarios(usu);
    } catch (e) {
      setErro('Erro ao carregar clientes ou usuários');
    }
  }

  async function carregarOSParaEditar() {
    try {
      setCarregando(true);
      const os = await fetchDaApi(`/ordens/${id}`);
      setForm({
        cliente_id: os.cliente_id || '',
        usuario_id: os.usuario_id || '',
        aparelho: os.aparelho || '',
        marca: os.marca || '',
        modelo: os.modelo || '',
        descricao_problema: os.descricao_problema || '',
        laudo_tecnico: os.laudo_tecnico || '',
        valor_servico: os.valor_servico || '',
        status: os.status || 'RECEBIDO'
      });
    } catch (e) {
      setErro('Erro ao carregar os dados da OS');
    } finally {
      setCarregando(false);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm(antigo => ({ ...antigo, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setCarregando(true);
    setErro(null);

    const corpo = { ...form };
    if (!corpo.valor_servico) delete corpo.valor_servico; // se vazio nao envia
    
    try {
      if (isEdicao) {
        await fetchDaApi(`/ordens/${id}`, {
          method: 'PUT',
          body: JSON.stringify(corpo),
        });
      } else {
        await fetchDaApi('/ordens', {
          method: 'POST',
          body: JSON.stringify(corpo),
        });
      }
      navigate('/');
    } catch (e) {
      setErro('Falha ao salvar a Ordem de Serviço.');
    } finally {
      setCarregando(false);
    }
  }

  if (carregando && isEdicao) return <p>Carregando OS...</p>;

  return (
    <div className="formulario">
      <h2>{isEdicao ? 'Editar OS' : 'Nova Ordem de Serviço'}</h2>
      {erro && <p className="mensagem-erro">{erro}</p>}

      <form onSubmit={handleSubmit}>
        <div className="grupo-form">
          <label>Cliente</label>
          <select 
            name="cliente_id" 
            value={form.cliente_id} 
            onChange={handleInputChange} 
            required
            disabled={isEdicao} /* Geralmente não se troca cliente de OS já aberta */
          >
            <option value="">Selecione um cliente...</option>
            {clientes.map(c => (
              <option key={c.id} value={c.id}>{c.nome} (CPF: {c.cpf})</option>
            ))}
          </select>
        </div>

        <div className="grupo-form">
          <label>Usuário Responsável (Atendente/Técnico)</label>
          <select 
            name="usuario_id" 
            value={form.usuario_id} 
            onChange={handleInputChange} 
            required
          >
            <option value="">Selecione um usuário...</option>
            {usuarios.map(u => (
              <option key={u.id} value={u.id}>{u.nome}</option>
            ))}
          </select>
        </div>

        <div className="grupo-form">
          <label>Aparelho (Ex: Smartphone)</label>
          <input 
            type="text" 
            name="aparelho" 
            value={form.aparelho} 
            onChange={handleInputChange} 
            required 
          />
        </div>

        <div className="grupo-form">
          <label>Marca (Ex: Samsung)</label>
          <input 
            type="text" 
            name="marca" 
            value={form.marca} 
            onChange={handleInputChange} 
            required 
          />
        </div>

        <div className="grupo-form">
          <label>Modelo (Ex: Galaxy S21)</label>
          <input 
            type="text" 
            name="modelo" 
            value={form.modelo} 
            onChange={handleInputChange} 
            required 
          />
        </div>

        <div className="grupo-form">
          <label>Descrição do Problema</label>
          <textarea 
            name="descricao_problema" 
            rows="3" 
            value={form.descricao_problema} 
            onChange={handleInputChange} 
            required 
          />
        </div>

        {isEdicao && (
          <>
            <div className="grupo-form">
              <label>Laudo Técnico</label>
              <textarea 
                name="laudo_tecnico" 
                rows="3" 
                value={form.laudo_tecnico || ''} 
                onChange={handleInputChange} 
              />
            </div>

            <div className="grupo-form">
              <label>Valor do Serviço (R$)</label>
              <input 
                type="number" 
                step="0.01" 
                name="valor_servico" 
                value={form.valor_servico || ''} 
                onChange={handleInputChange} 
              />
            </div>
          </>
        )}

        <div className="acoes-form">
          <button type="submit" className="botao-primario" disabled={carregando}>
            {carregando ? 'Salvando...' : 'Salvar OS'}
          </button>
          <button type="button" className="botao-secundario" onClick={() => navigate('/')} style={{ marginLeft: '10px' }}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioOS;
