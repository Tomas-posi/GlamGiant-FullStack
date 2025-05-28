import React, { useEffect, useState } from 'react';

interface ProductTest {
  id: string;
  tester: { name: string };
  product: { name: string };
  reaction: string;
  rating: number;
  survivalStatus: boolean;
}

const ProductTestsList: React.FC = () => {
  const [tests, setTests] = useState<ProductTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/product-tests')
      .then((res) => res.json())
      .then((data) => {
        setTests(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar las pruebas.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando pruebas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>📅 Calendario de pruebas</h2>
      {tests.length === 0 ? (
        <p>No hay pruebas registradas.</p>
      ) : (
        <ul style={{ paddingLeft: 0 }}>
          {tests.map((test) => (
            <li key={test.id} style={{ background: '#222', padding: 10, marginBottom: 10, borderRadius: 8 }}>
              <p><strong>Tester:</strong> {test.tester.name}</p>
              <p><strong>Producto:</strong> {test.product.name}</p>
              <p><strong>Reacción:</strong> {test.reaction}</p>
              <p><strong>Rating:</strong> {test.rating}/10</p>
              <p><strong>¿Sobrevivió?:</strong> {test.survivalStatus ? 'Sí' : 'No'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductTestsList;
