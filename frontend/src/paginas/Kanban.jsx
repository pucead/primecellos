import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchDaApi } from '../api';

const STATUS_ORDEM = [
  'RECEBIDO',
  'EM_ANALISE',
  'AGUARDANDO_APROVACAO',
  'EM_REPARO',
  'FINALIZADO',
  'ENTREGUE'
];

const STATUS_NOMES = {
  'RECEBIDO': 'Recebido',
  'EM_ANALISE': 'Em Análise',
  'AGUARDANDO_APROVACAO': 'Aguardando Aprovação',
  'EM_REPARO': 'Em Reparo',
  'FINALIZADO': 'Finalizado',
  'ENTREGUE': 'Entregue',
  'CANCELADO': 'Cancelado'
};

function Kanban() {
  const navigate = useNavigate();
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
      alert('Erro ao carregar Ordens de Serviço no Kanban');
    } finally {
      setCarregando(false);
    }
  }

  async function moverCard(os, novoStatus) {
    if (!novoStatus) return;
    
    try {
      // Fazendo o PATCH para a rota /ordens/:id/status conforme definido no backend
      await fetchDaApi(`/ordens/${os.id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: novoStatus })
      });
      
      // Atualiza a interface localmente para refletir a mudança
      setOrdens(ordens.map(item => 
        item.id === os.id ? { ...item, status: novoStatus } : item
      ));
    } catch (erro) {
      alert('Erro ao atualizar o status da OS. Verifique se a API possui a rota PATCH /ordens/:id/status implementada.');
    }
  }

  // Funções para Drag and Drop nativo (HTML5)
  function handleDragStart(e, osId) {
    e.dataTransfer.setData('osId', osId.toString());
  }

  function handleDragOver(e) {
    e.preventDefault(); // Necessário para permitir o drop
  }

  function handleDrop(e, statusKey) {
    e.preventDefault();
    const osId = e.dataTransfer.getData('osId');
    if (!osId) return;
    
    const osParaMover = ordens.find(item => item.id.toString() === osId);
    if (osParaMover && osParaMover.status !== statusKey) {
      moverCard(osParaMover, statusKey);
    }
  }

  function renderizarColuna(statusKey) {
    const ordensColuna = ordens.filter(os => os.status === statusKey);
    const indexAtual = STATUS_ORDEM.indexOf(statusKey);

    return (
      <div 
        key={statusKey} 
        className="kanban-coluna"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, statusKey)}
      >
        <div className={`kanban-titulo-coluna status-borda-${statusKey.toLowerCase()}`}>
          {STATUS_NOMES[statusKey]}
        </div>
        <div className="kanban-cards">
          {ordensColuna.map(os => (
            <div 
              key={os.id} 
              className="kanban-card"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, os.id)}
              onClick={() => navigate(`/os/editar/${os.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="kanban-card-cabecalho">
                <strong>{os.numero_os || `OS #${os.id}`}</strong>
              </div>
              <div className="kanban-card-corpo">
                <p>{os.aparelho}</p>
                <p className="kanban-cliente">{os.cliente?.nome || 'Sem Cliente'}</p>
              </div>
              
              <div className="kanban-card-acoes">
                <span className="botao-acao-pequeno">
                  Ver Detalhes
                </span>
              </div>
            </div>
          ))}
          {ordensColuna.length === 0 && (
            <div className="kanban-vazio">Nenhuma OS</div>
          )}
        </div>
      </div>
    );
  }

  if (carregando) return <p>Carregando Quadro Kanban...</p>;

  return (
    <div>
      <div className="titulo-pagina">
        <h2>Quadro Kanban de OS</h2>
        <div>
          <Link to="/lista-os" className="botao-secundario">Ver em Tabela</Link>
          <Link to="/os/nova" className="botao-primario">Nova OS</Link>
        </div>
      </div>

      <div className="kanban-container">
        {STATUS_ORDEM.map(renderizarColuna)}
      </div>
    </div>
  );
}

export default Kanban;
