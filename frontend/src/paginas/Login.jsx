import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDaApi } from '../api';
import './Login.css';

function Login({ setUsuarioLogado }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    try {
      const resposta = await fetchDaApi('/login', {
        method: 'POST',
        body: JSON.stringify({ email, senha })
      });

      if (resposta.sucesso) {
        // Salva os dados do usuário no LocalStorage
        localStorage.setItem('usuarioLogado', JSON.stringify(resposta.usuario));
        setUsuarioLogado(resposta.usuario);
        navigate('/');
      }
    } catch (err) {
      setErro(err.message || 'Falha ao realizar login. Verifique suas credenciais.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <h2>📱 Primecell OS</h2>
          <p>Acesse o sistema</p>
        </div>
        
        {erro && <div className="mensagem-erro">{erro}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="grupo-form">
            <label>E-mail</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Digite seu e-mail"
              required 
            />
          </div>
          <div className="grupo-form">
            <label>Senha</label>
            <input 
              type="password" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              placeholder="Digite sua senha"
              required 
            />
          </div>
          <button type="submit" className="botao-primario login-btn" disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
