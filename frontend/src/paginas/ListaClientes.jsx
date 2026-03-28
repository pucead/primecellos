import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchDaApi } from '../api';

function ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarClientes();
  }, []);

  async function carregarClientes() {
    try {
      const dados = await fetchDaApi('/clientes');
      setClientes(dados);
    } catch (erro) {
      alert('Erro ao carregar clientes');
    } finally {
      setCarregando(false);
    }
  }

  if (carregando) return <p>Carregando clientes...</p>;

  return (
    <div>
      <div className="titulo-pagina">
        <h2>Clientes</h2>
        <Link to="/clientes/novo" className="botao-primario">Novo Cliente</Link>
      </div>

      <table className="tabela-simples">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length === 0 ? (
            <tr><td colSpan="5">Nenhum cliente encontrado.</td></tr>
          ) : (
            clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.telefone}</td>
                <td>
                  <Link to={`/clientes/editar/${cliente.id}`} className="botao-acao">Editar</Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaClientes;
