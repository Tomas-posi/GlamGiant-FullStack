import React, { useState } from 'react';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [testSubject, setTestSubject] = useState<boolean | null>(null);
  const [allergicReactions, setAllergicReactions] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [adminKey, setAdminKey] = useState('');

  const expectedAdminKey = 'GlamgiantAdmin2025';
  const expectedEmployeeKey = 'GlamgiantEmpleado2025';

  const handleRegister = async () => {
    setError('');
    setSuccess('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Correo electrónico inválido.');
      return;
    }

    if (!name || !email || !password || !confirmPassword || !role || testSubject === null) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (role === 'Admin' && adminKey !== expectedAdminKey) {
      setError('Clave de administrador incorrecta.');
      return;
    }

    if (role === 'Empleado' && adminKey !== expectedEmployeeKey) {
      setError('Clave de empleado incorrecta.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          testSubject,
          allergicReactions: testSubject ? allergicReactions : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Error al registrar usuario.');
      } else {
        setSuccess('Registro exitoso. Ahora puedes iniciar sesión.');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setRole('');
        setTestSubject(null);
        setAllergicReactions('');
        setAdminKey('');
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
      <h2 style={{ textAlign: 'left', marginBottom: 20 }}>Registro</h2>

      {error && <p style={{ color: '#ff5e5e', fontWeight: 'bold' }}>{error}</p>}
      {success && <p style={{ color: '#66ff99', fontWeight: 'bold' }}>{success}</p>}

      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />

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
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />

      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      >
        <option value="">Selecciona un rol</option>
        <option value="Client">Cliente</option>
        <option value="Approver">Aprobador</option>
        <option value="Admin">Administrador</option>
        <option value="Empleado">Empleado</option>
      </select>

      {(role === 'Admin' || role === 'Empleado') && (
        <input
          type="password"
          placeholder={`Clave de ${role}`}
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
          style={{ display: 'block', marginBottom: 10, width: '100%' }}
        />
      )}

      <div style={{ marginBottom: 10 }}>
        <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>
          ¿Es sujeto de prueba?
        </label>
        <div>
         <button
            type="button"
            className={`toggle-button ${testSubject === true ? 'active' : ''}`}
            onClick={() => setTestSubject(true)}
          >
           Sí
          </button>
          <button
           type="button"
            className={`toggle-button ${testSubject === false ? 'active' : ''}`}
           onClick={() => setTestSubject(false)}
          >
            No
          </button>
        </div>

      </div>

      {testSubject && (
        <textarea
          placeholder="Describe tus reacciones alérgicas"
          value={allergicReactions}
          onChange={(e) => setAllergicReactions(e.target.value)}
          style={{
            display: 'block',
            marginBottom: 10,
            width: '100%',
            minHeight: '60px',
            resize: 'vertical',
          }}
        />
      )}

      <button
        onClick={handleRegister}
        className="modern-button">
        Registrarse
      </button>
    </div>
  );
};

export default Register;

