import React, { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
}

const BuyPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(res => res.json())
      .then(data => {
        const validProducts = data.filter((p: any) => p.price !== undefined && !isNaN(Number(p.price)));
        const parsed = validProducts.map((p: any) => ({
          ...p,
          price: parseFloat(p.price),
        }));
        setProducts(parsed);
      })
      .catch(() => setMessage('Error cargando productos'));
  }, []);

  const addToCart = (item: Product) => {
    setCart([...cart, item]);
  };

  const handleBuy = async () => {
    setMessage('');
    const user = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    if (!user || !user.id) {
      setMessage('Usuario no autenticado.');
      return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const productIds = cart.map(item => item.id);

    try {
      const response = await fetch('http://localhost:3001/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: user.id,
          products: productIds,
          payment_status: 'Paid',
        }),
      });

      if (response.ok) {
        setCart([]);
        setMessage('Compra realizada con éxito.');
      } else {
        setMessage('Error al realizar la compra.');
      }
    } catch (error) {
      setMessage('Fallo en la conexión con el servidor.');
    }
  };

  return (
    <div style={{ padding: 30, color: 'white' }}>
      <h2>Comprar productos</h2>
      {message && <p style={{ color: 'orange' }}>{message}</p>}

      <div>
        <h3>Productos</h3>
        {products.map(p => (
          <div key={p.id}>
            {p.name} - ${p.price.toFixed(2)}
            <button onClick={() => addToCart(p)} style={{ marginLeft: 10 }}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      <div>
        <h3>Carrito</h3>
        {cart.map((item, idx) => (
          <div key={idx}>
            {item.name} - ${item.price.toFixed(2)}
          </div>
        ))}
        {cart.length > 0 && (
          <button onClick={handleBuy} style={{ marginTop: 10, padding: '8px 20px' }}>
            Comprar todo
          </button>
        )}
      </div>
    </div>
  );
};

export default BuyPage;
