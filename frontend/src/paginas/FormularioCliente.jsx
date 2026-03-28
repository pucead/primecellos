import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDaApi } from '../api';

function FormularioCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdicao = Boolean(id);

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    telefone: ''
  });

  useEffect(() => {
    if (isEdicao) {
      carregarClienteParaEditar();
    }
  }, [id]);

  async function carregarClienteParaEditar() {
    try {
      setCarregando(true);
      const cliente = await fetchDaApi(`/clientes/${id}`);
      setForm({
        nome: cliente.nome,
        cpf: cliente.cpf,
        telefone: cliente.telefone || ''
      });
    } catch (e) {
      setErro('Erro ao carregar dados do cliente');
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

    try {
      if (isEdicao) {
        await fetchDaApi(`/clientes/${id}`, {
          method: 'PUT',
          body: JSON.stringify(form)
        });
      } else {
        await fetchDaApi('/clientes', {
          method: 'POST',
          body: JSON.stringify(form)
        });
      }
      navigate('/clientes');
    } catch (e) {
      setErro('Falha ao salvar cliente. Verifique se o CPF já está cadastrado.');
    } finally {
      setCarregando(false);
    }
  }

  if (carregando && isEdicao) return <p>Carregando cliente...</p>;

  return (
    <div className="formulario">
      <h2>{isEdicao ? 'Editar Cliente' : 'Novo Cliente'}</h2>
      {erro && <p className="mensagem-erro">{erro}</p>}

      <form onSubmit={handleSubmit}>
        <div className="grupo-form">
          <label>Nome Completo</label>
          <input 
            type="text" 
            name="nome" 
            value={form.nome} 
            onChange={handleInputChange} 
            required 
          />
        </div>

        <div className="grupo-form">
          <label>CPF (somente números)</label>
          <input 
            type="text" 
            name="cpf" 
            value={form.cpf} 
            onChange={handleInputChange} 
            required 
          />
        </div>

        <div className="grupo-form">
          <label>Telefone</label>
          <input 
            type="text" 
            name="telefone" 
            value={form.telefone} 
            onChange={handleInputChange} 
          />
        </div>

        <div className="acoes-form">
          <button type="submit" className="botao-primario" disabled={carregando}>
            {carregando ? 'Salvando...' : 'Salvar Cliente'}
          </button>
          <button type="button" className="botao-secundario" onClick={() => navigate('/clientes')} style={{ marginLeft: '10px' }}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioCliente;
