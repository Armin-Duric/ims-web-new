import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // These should match your Blog.jsx environment variables
  const ADMIN_USER = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
  const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD || 'password';
  const TOKEN_SECRET = import.meta.env.VITE_AUTH_TOKEN_SECRET || 'fallback-secret-2025';

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      // Create a simple b64 token (matching your Blog.jsx decode logic)
      const token = btoa(`${username}:${password}:auth:${TOKEN_SECRET}`);
      localStorage.setItem('authToken', token);
      navigate('/blog'); // Redirect to blog after login
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-wrapper">
      <style>{`
        .login-wrapper {
          background: #0f172a;
          background-image: radial-gradient(at 50% 50%, rgba(0, 255, 204, 0.05) 0px, transparent 50%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .login-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 40px;
          padding: 50px 40px;
          width: 100%;
          max-width: 450px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .form-control-glass {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 15px;
          color: white;
          margin-bottom: 20px;
          transition: 0.3s;
        }
        .form-control-glass:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: #00ffcc;
          box-shadow: 0 0 15px rgba(0, 255, 204, 0.2);
          outline: none;
        }
        .btn-login {
          background: #00ffcc;
          color: #0f172a;
          border: none;
          border-radius: 15px;
          padding: 15px;
          font-weight: 700;
          width: 100%;
          transition: 0.3s;
        }
        .btn-login:hover {
          background: white;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 255, 204, 0.2);
        }
        .cyan-text { color: #00ffcc; }
      `}</style>

      <div className="login-card animate__animated animate__fadeInUp">
        <div className="text-center mb-4">
          <div className="cyan-text fw-bold small mb-2" style={{letterSpacing: '3px'}}>SECURE ACCESS</div>
          <h2 className="fw-bold text-white">Admin <span className="cyan-text">Portal</span></h2>
        </div>

        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            className="form-control-glass w-100" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input 
            type="password" 
            className="form-control-glass w-100" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {error && <p className="text-danger small text-center mb-3">{error}</p>}

          <button type="submit" className="btn-login">AUTHORIZE SESSION</button>
        </form>
        
        <div className="text-center mt-4">
          <button onClick={() => navigate('/blog')} className="btn btn-link btn-sm text-secondary text-decoration-none">
            ← Return to Blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
