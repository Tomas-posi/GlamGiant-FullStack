import React, { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
}

const CreateProductTest: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [testerId, setTesterId] = useState('');
  const [productId, setProductId] = useState('');
  const [reaction, setReaction] = useState('');
  const [rating, setRating] = useState(1);
  const [survivalStatus, setSurvivalStatus] = useState(true);

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Cargar usuarios y productos
  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then((res) => res.json())
      .then(setUsers);

    fetch('http://localhost:3001/products')
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    if (!testerId || !productId || !reaction || rating < 1 || rating > 10) {
      setError('Por favor, completa todos los campos correctamente.');
      return;
    }

    const data = { testerId, productId, reaction, rating, survivalStatus };

    try {
      const res = await fetch('http://localhost:3001/product-tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || 'Error al crear prueba.');
        return;
      }

      setSuccess('✅ Prueba creada con éxito.');
      setTesterId('');
      setProductId('');
      setReaction('');
      setRating(1);
      setSurvivalStatus(true);
    } catch (e) {
      setError('No se pudo conectar al servidor.');
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
      <h2>🧪 Crear prueba de producto</h2>

      {error && <p style={{ color: '#ff5e5e' }}>{error}</p>}
      {success && <p style={{ color: '#66ff99' }}>{success}</p>}

      <label>Tester:</label>
      <select value={testerId} onChange={(e) => setTesterId(e.target.value)}>
        <option value="">Selecciona un tester</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>

      <label>Producto:</label>
      <select value={productId} onChange={(e) => setProductId(e.target.value)}>
        <option value="">Selecciona un producto</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>{product.name}</option>
        ))}
      </select>

      <label>Reacción observada:</label>
      <textarea
        value={reaction}
        onChange={(e) => setReaction(e.target.value)}
        rows={3}
        style={{ width: '100%' }}
      />

      <label>Calificación (1-10):</label>
      <input
        type="number"
        min={1}
        max={10}
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      />

      <label>¿Sobrevivió?</label>
      <div>
        <button
          className={`toggle-button ${survivalStatus ? 'active' : ''}`}
          onClick={() => setSurvivalStatus(true)}
        >Sí</button>
        <button
          className={`toggle-button ${!survivalStatus ? 'active' : ''}`}
          onClick={() => setSurvivalStatus(false)}
        >No</button>
      </div>

      <button onClick={handleSubmit} style={{ marginTop: 20 }}>
        Crear prueba
      </button>
    </div>
  );
};

export default CreateProductTest;
