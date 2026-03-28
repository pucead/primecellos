import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Kanban from './paginas/Kanban';
import ListaOS from './paginas/ListaOS';
import FormularioOS from './paginas/FormularioOS';
import ListaClientes from './paginas/ListaClientes';
import FormularioCliente from './paginas/FormularioCliente';
import ListaUsuarios from './paginas/ListaUsuarios';
import FormularioUsuario from './paginas/FormularioUsuario';

function Menu() {
  return (
    <nav className="menu">
      <div className="logo-container">
        <h1>Primecell OS</h1>
      </div>
      <ul className="menu-links">
        <li><Link to="/">Dashboard (Kanban)</Link></li>
        <li><Link to="/lista-os">Lista de OS</Link></li>
        <li><Link to="/clientes">Clientes</Link></li>
        <li><Link to="/usuarios">Usuários</Link></li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="container-app">
        <Menu />
        <main className="conteudo-principal">
          <Routes>
            {/* O Kanban é a tela inicial agora */}
            <Route path="/" element={<Kanban />} />
            
            <Route path="/lista-os" element={<ListaOS />} />
            <Route path="/os/nova" element={<FormularioOS />} />
            <Route path="/os/editar/:id" element={<FormularioOS />} />

            <Route path="/clientes" element={<ListaClientes />} />
            <Route path="/clientes/novo" element={<FormularioCliente />} />
            <Route path="/clientes/editar/:id" element={<FormularioCliente />} />

            <Route path="/usuarios" element={<ListaUsuarios />} />
            <Route path="/usuarios/novo" element={<FormularioUsuario />} />
            <Route path="/usuarios/editar/:id" element={<FormularioUsuario />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
