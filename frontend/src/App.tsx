import React, { useState } from 'react';
import Login from './login/Login';
import Register from './register/Register';
import './App.css';

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div
  className="auth-container"
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    padding: '0 5%',
  }}
>
  <div
    className="form-box"
    style={{
      width: '100%',
      maxWidth: 500,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginRight: '50vw',
    }}
  >
    <div style={{ marginBottom: 30, textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: 10, color: 'white' }}>
        Tech Overhaul
      </h1>
      <div>
        <button
          onClick={() => setShowLogin(true)}
          className="modern-button">
          Iniciar sesión
        </button>
        <button
          onClick={() => setShowLogin(false)}
          className="modern-button">
          Registrarse
        </button>
      </div>
    </div>

    {showLogin ? <Login /> : <Register />}
  </div>
</div>

  );
}

export default App;
