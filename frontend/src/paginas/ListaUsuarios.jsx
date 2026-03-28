import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchDaApi } from '../api';

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    try {
      const dados = await fetchDaApi('/usuarios');
      setUsuarios(dados);
    } catch (erro) {
      alert('Erro ao carregar usuários');
    } finally {
      setCarregando(false);
    }
  }

  if (carregando) return <p>Carregando usuários...</p>;

  return (
    <div>
      <div className="titulo-pagina">
        <h2>Usuários (Funcionários)</h2>
        <Link to="/usuarios/novo" className="botao-primario">Novo Usuário</Link>
      </div>

      <table className="tabela-simples">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Perfil</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0 ? (
            <tr><td colSpan="5">Nenhum usuário encontrado.</td></tr>
          ) : (
            usuarios.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.perfil}</td>
                <td>
                  <Link to={`/usuarios/editar/${user.id}`} className="botao-acao">Editar</Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaUsuarios;
