import React, { useState } from 'react';

interface Props {
  onLoginSuccess: () => void;
}

const Login: React.FC<Props> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async () => {
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/users');
      const users = await response.json();

      const foundUser = users.find(
        (user: any) => user.email === email && user.password === password
      );

      if (foundUser) {
        localStorage.setItem('loggedUser', JSON.stringify(foundUser));
        setSuccess('Inicio de sesión exitoso.');
        setEmail('');
        setPassword('');
        onLoginSuccess(); // ✅ Notifica a App que el login fue exitoso
      } else {
        setError('Credenciales inválidas. Verifica tu correo y contraseña.');
      }
    } catch (err) {
      setError('Error al conectar con el servidor.');
    }
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 450,
        padding: 30,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: 16,
        border: '1px solid rgba(255, 255, 255, 0.3)',
        color: 'white',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
      }}
    >
      <h2 style={{ textAlign: 'left', marginBottom: 20 }}>Iniciar Sesión</h2>

      {error && <p style={{ color: '#ff5e5e', fontWeight: 'bold' }}>{error}</p>}
      {success && <p style={{ color: '#66ff99', fontWeight: 'bold' }}>{success}</p>}

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: 20, width: '100%' }}
      />

      <button onClick={handleLogin} className="modern-button">
        Iniciar sesión
      </button>
    </div>
  );
};

export default Login;

