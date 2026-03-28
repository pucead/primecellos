import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchDaApi } from '../api';

function ListaOS() {
  const [ordens, setOrdens] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarOS();
  }, []);

  async function carregarOS() {
    try {
      const dados = await fetchDaApi('/ordens');
      setOrdens(dados);
    } catch (erro) {
      alert('Erro ao carregar Ordens de Serviço');
    } finally {
      setCarregando(false);
    }
  }

  function getClasseStatus(status) {
    switch (status) {
      case 'RECEBIDO': return 'status-badge status-recebido';
      case 'EM_ANALISE': return 'status-badge status-analise';
      case 'EM_REPARO': return 'status-badge status-reparo';
      case 'FINALIZADO': return 'status-badge status-finalizado';
      case 'CANCELADO': return 'status-badge status-cancelado';
      default: return 'status-badge status-recebido';
    }
  }

  if (carregando) return <p>Carregando...</p>;

  return (
    <div>
      <div className="titulo-pagina">
        <h2>Ordens de Serviço</h2>
        <Link to="/os/nova" className="botao-primario">Nova OS</Link>
      </div>

      <table className="tabela-simples">
        <thead>
          <tr>
            <th>Nº OS</th>
            <th>Cliente</th>
            <th>Aparelho</th>
            <th>Data Entrada</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {ordens.length === 0 ? (
            <tr><td colSpan="6">Nenhuma OS encontrada.</td></tr>
          ) : (
            ordens.map((os) => (
              <tr key={os.id}>
                <td>{os.numero_os}</td>
                <td>{os.cliente?.nome || 'Cliente não encontrado'}</td>
                <td>{os.marca} {os.modelo}</td>
                <td>{new Date(os.data_entrada).toLocaleDateString('pt-BR')}</td>
                <td><span className={getClasseStatus(os.status)}>{os.status}</span></td>
                <td>
                  <Link to={`/os/editar/${os.id}`} className="botao-acao">Editar</Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaOS;
