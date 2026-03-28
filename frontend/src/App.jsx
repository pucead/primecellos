import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';

import Dashboard from './paginas/Dashboard';
import Kanban from './paginas/Kanban';
import ListaOS from './paginas/ListaOS';
import FormularioOS from './paginas/FormularioOS';
import ListaClientes from './paginas/ListaClientes';
import FormularioCliente from './paginas/FormularioCliente';
import ListaUsuarios from './paginas/ListaUsuarios';
import FormularioUsuario from './paginas/FormularioUsuario';
import Login from './paginas/Login';

function Menu({ usuarioLogado, aoSair }) {
  return (
    <nav className="menu">
      <div className="logo-container">
        <h1>Primecell OS</h1>
      </div>
      <ul className="menu-links">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/kanban">Kanban</Link></li>
        <li><Link to="/lista-os">Lista de OS</Link></li>
        <li><Link to="/clientes">Clientes</Link></li>
        <li><Link to="/usuarios">Usuários</Link></li>
      </ul>
      <div className="menu-usuario">
        <span style={{color: 'white', marginRight: '15px'}}>Olá, {usuarioLogado?.nome}</span>
        <button onClick={aoSair} className="botao-secundario" style={{padding: '5px 10px', fontSize: '12px'}}>Sair</button>
      </div>
    </nav>
  );
}

function RotaProtegida({ children, usuarioLogado }) {
  if (!usuarioLogado) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [carregandoAuth, setCarregandoAuth] = useState(true);

  useEffect(() => {
    // Verifica se tem usuário logado no LocalStorage quando abre o site
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    if (usuarioSalvo) {
      setUsuarioLogado(JSON.parse(usuarioSalvo));
    }
    setCarregandoAuth(false);
  }, []);

  const handleSair = () => {
    localStorage.removeItem('usuarioLogado');
    setUsuarioLogado(null);
  };

  if (carregandoAuth) return <div>Carregando...</div>;

  return (
    <BrowserRouter>
      {usuarioLogado ? (
        <div className="container-app">
          <Menu usuarioLogado={usuarioLogado} aoSair={handleSair} />
          <main className="conteudo-principal">
            <Routes>
              {/* O Dashboard agora é a tela inicial / */}
              <Route path="/" element={<RotaProtegida usuarioLogado={usuarioLogado}><Dashboard /></RotaProtegida>} />
              <Route path="/kanban" element={<RotaProtegida usuarioLogado={usuarioLogado}><Kanban /></RotaProtegida>} />
              
              <Route path="/lista-os" element={<RotaProtegida usuarioLogado={usuarioLogado}><ListaOS /></RotaProtegida>} />
              <Route path="/os/nova" element={<RotaProtegida usuarioLogado={usuarioLogado}><FormularioOS /></RotaProtegida>} />
              <Route path="/os/editar/:id" element={<RotaProtegida usuarioLogado={usuarioLogado}><FormularioOS /></RotaProtegida>} />

              <Route path="/clientes" element={<RotaProtegida usuarioLogado={usuarioLogado}><ListaClientes /></RotaProtegida>} />
              <Route path="/clientes/novo" element={<RotaProtegida usuarioLogado={usuarioLogado}><FormularioCliente /></RotaProtegida>} />
              <Route path="/clientes/editar/:id" element={<RotaProtegida usuarioLogado={usuarioLogado}><FormularioCliente /></RotaProtegida>} />

              <Route path="/usuarios" element={<RotaProtegida usuarioLogado={usuarioLogado}><ListaUsuarios /></RotaProtegida>} />
              <Route path="/usuarios/novo" element={<RotaProtegida usuarioLogado={usuarioLogado}><FormularioUsuario /></RotaProtegida>} />
              <Route path="/usuarios/editar/:id" element={<RotaProtegida usuarioLogado={usuarioLogado}><FormularioUsuario /></RotaProtegida>} />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login setUsuarioLogado={setUsuarioLogado} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
