import React, { useEffect, useState } from 'react';

interface Order {
  id: number;
  client_id: number;
  products: string[]; // IDs por ahora
  total_amount: number;
  payment_status: string;
}

const OrdersList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/orders')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error al obtener las órdenes');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando órdenes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>📦 Órdenes registradas</h2>
      {orders.length === 0 ? (
        <p>No hay órdenes disponibles.</p>
      ) : (
        <ul style={{ paddingLeft: 0 }}>
          {orders.map((order) => (
            <li key={order.id} style={{ background: '#222', padding: 10, marginBottom: 10, borderRadius: 8 }}>
              <p><strong>ID:</strong> {order.id}</p>
              <p><strong>Cliente ID:</strong> {order.client_id}</p>
              <p><strong>Productos:</strong> {order.products.join(', ')}</p>
              <p><strong>Total:</strong> ${order.total_amount}</p>
              <p><strong>Estado:</strong> {order.payment_status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersList;
