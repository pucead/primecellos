import React, { useState, useEffect } from 'react';
import { fetchDaApi } from '../api';
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregarEstatisticas() {
      try {
        const dados = await fetchDaApi('/ordens/estatisticas');
        setStats(dados);
      } catch (err) {
        setErro('Não foi possível carregar as estatísticas.');
      } finally {
        setCarregando(false);
      }
    }

    carregarEstatisticas();
  }, []);

  if (carregando) return <div className="dashboard-container"><p>Carregando informações...</p></div>;
  if (erro) return <div className="dashboard-container"><p className="mensagem-erro">{erro}</p></div>;

  return (
    <div className="dashboard-container">
      <div className="titulo-pagina">
        <h2>Dashboard</h2>
      </div>

      <div className="cards-resumo">
        <div className="card-estatistica azul">
          <h3>Total de OS (Histórico)</h3>
          <p className="numero-grande">{stats.total}</p>
        </div>

        <div className="card-estatistica laranja">
          <h3>Em Andamento</h3>
          <p className="numero-grande">{stats.andamento}</p>
        </div>

        <div className="card-estatistica verde">
          <h3>Faturamento (Entregues)</h3>
          <p className="numero-grande">
            R$ {stats.faturamento ? stats.faturamento.toFixed(2).replace('.', ',') : '0,00'}
          </p>
        </div>
      </div>

      <div className="grafico-simples">
        <h3>OS por Status</h3>
        <div className="lista-status">
          {stats.porStatus.map((item, index) => (
            <div key={index} className="item-status">
              <span className={`status-badge status-${item.status.toLowerCase().replace('_', '-')}`}>
                {item.status.replace('_', ' ')}
              </span>
              <span className="quantidade-status">{item.count}</span>
            </div>
          ))}
          {stats.porStatus.length === 0 && <p>Nenhuma ordem de serviço cadastrada.</p>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
