import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDaApi } from '../api';

function FormularioUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdicao = Boolean(id);

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '', /* Senha apenas no novo, opcional no editar dependendo da API */
    perfil: 'ATENDENTE'
  });

  useEffect(() => {
    if (isEdicao) {
      carregarUsuarioParaEditar();
    }
  }, [id]);

  async function carregarUsuarioParaEditar() {
    try {
      setCarregando(true);
      const usuario = await fetchDaApi(`/usuarios/${id}`);
      setForm({
        nome: usuario.nome,
        email: usuario.email,
        senha: '',
        perfil: usuario.perfil || 'ATENDENTE'
      });
    } catch (e) {
      setErro('Erro ao carregar dados do usuário');
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

    const corpo = { 
      nome: form.nome,
      email: form.email,
      senha_hash: form.senha, // Mapeia "senha" do form para "senha_hash" na API
      perfil: form.perfil
    };
    if (isEdicao && !corpo.senha_hash) {
      delete corpo.senha_hash; // não atualiza a senha se não for informada
    }

    try {
      if (isEdicao) {
        await fetchDaApi(`/usuarios/${id}`, {
          method: 'PUT',
          body: JSON.stringify(corpo)
        });
      } else {
        await fetchDaApi('/usuarios', {
          method: 'POST',
          body: JSON.stringify(corpo)
        });
      }
      navigate('/usuarios');
    } catch (e) {
      setErro('Falha ao salvar usuário. Verifique se o email já está cadastrado.');
    } finally {
      setCarregando(false);
    }
  }

  if (carregando && isEdicao) return <p>Carregando usuário...</p>;

  return (
    <div className="formulario">
      <h2>{isEdicao ? 'Editar Usuário' : 'Novo Usuário'}</h2>
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
          <label>E-mail</label>
          <input 
            type="email" 
            name="email" 
            value={form.email} 
            onChange={handleInputChange} 
            required 
          />
        </div>

        <div className="grupo-form">
          <label>Senha {isEdicao && '(Deixe em branco para não alterar)'}</label>
          <input 
            type="password" 
            name="senha" 
            value={form.senha} 
            onChange={handleInputChange} 
            required={!isEdicao} 
          />
        </div>

        <div className="grupo-form">
          <label>Perfil de Acesso</label>
          <select 
            name="perfil" 
            value={form.perfil} 
            onChange={handleInputChange}
          >
            <option value="ATENDENTE">Atendente</option>
            <option value="TECNICO">Técnico</option>
            <option value="ADMIN">Administrador</option>
          </select>
        </div>

        <div className="acoes-form">
          <button type="submit" className="botao-primario" disabled={carregando}>
            {carregando ? 'Salvando...' : 'Salvar Usuário'}
          </button>
          <button type="button" className="botao-secundario" onClick={() => navigate('/usuarios')} style={{ marginLeft: '10px' }}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioUsuario;
