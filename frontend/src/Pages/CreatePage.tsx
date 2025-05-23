import React, { useState } from 'react';

const CreatePage: React.FC = () => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    stock: '',
    location: '',
    durability_score: '',
    price: '',
  });

  const [service, setService] = useState({
    name: '',
    description: '',
    price: '',
    available: true,
  });

  const [test, setTest] = useState({
    testerId: '',
    productId: '',
    reaction: '',
    rating: '',
    survivalStatus: true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    group: string
  ) => {
    const { name, value, type } = e.target;
    let finalValue: any = value;

    if (type === 'checkbox') {
      finalValue = (e.target as HTMLInputElement).checked;
    }

    if (group === 'product') setProduct({ ...product, [name]: finalValue });
    if (group === 'service') setService({ ...service, [name]: finalValue });
    if (group === 'test') setTest({ ...test, [name]: finalValue });
  };

  const postData = async (data: any, endpoint: string) => {
    try {
      const cleanData = {
        ...data,
        stock: Number(data.stock),
        durability_score: Number(data.durability_score),
        price: Number(data.price),
        rating: Number(data.rating),
      };

      const response = await fetch(`http://localhost:3001/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanData),
      });

      if (!response.ok) throw new Error('Error al crear');
      alert('Creado exitosamente');
    } catch (error) {
      alert('Hubo un error al enviar los datos.');
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* Producto */}
      <div style={{ ...styles.absoluteBox, top: 50, left: 50 }}>
        <div style={styles.card}>
          <h2>Crear Producto</h2>
          <input name="name" placeholder="Nombre" value={product.name} onChange={(e) => handleInputChange(e, 'product')} />
            <select name="category" value={product.category} onChange={(e) => handleInputChange(e, 'product')}>
                <option value="">Selecciona categoría</option>
                <option value="Lipstick">Lipstick</option>
                <option value="Foundation">Foundation</option>
                <option value="Eyeshadow">Eyeshadow</option>
                <option value="Mascara">Mascara</option>
                <option value="Blush">Blush</option>
                <option value="Highlighter">Highlighter</option>
            </select>

          <input name="stock" placeholder="Stock" value={product.stock} onChange={(e) => handleInputChange(e, 'product')} />
          <input name="location" placeholder="Ubicación" value={product.location} onChange={(e) => handleInputChange(e, 'product')} />
          <input name="durability_score" placeholder="Durabilidad (1-10)" value={product.durability_score} onChange={(e) => handleInputChange(e, 'product')} />
          <input name="price" placeholder="Precio" value={product.price} onChange={(e) => handleInputChange(e, 'product')} />
          <button onClick={() => postData(product, 'products')}>Crear Producto</button>
        </div>
      </div>

      {/* Servicio */}
      <div style={{ ...styles.absoluteBox, top: 530, left: 50 }}>
        <div style={styles.card}>
          <h2>Crear Servicio</h2>
          <input name="name" placeholder="Nombre" value={service.name} onChange={(e) => handleInputChange(e, 'service')} />
          <textarea name="description" placeholder="Descripción" value={service.description} onChange={(e) => handleInputChange(e, 'service')} />
          <input name="price" placeholder="Precio" value={service.price} onChange={(e) => handleInputChange(e, 'service')} />
          <label>
            Disponible:
            <input name="available" type="checkbox" checked={service.available} onChange={(e) => handleInputChange(e, 'service')} />
          </label>
          <button onClick={() => postData(service, 'services')}>Crear Servicio</button>
        </div>
      </div>

      {/* Prueba */}
      <div style={{ ...styles.absoluteBox, top: 50, left: 410 }}>
        <div style={styles.card}>
          <h2>Crear Prueba</h2>
          <input name="testerId" placeholder="ID Tester" value={test.testerId} onChange={(e) => handleInputChange(e, 'test')} />
          <input name="productId" placeholder="ID Producto" value={test.productId} onChange={(e) => handleInputChange(e, 'test')} />
          <textarea name="reaction" placeholder="Reacción" value={test.reaction} onChange={(e) => handleInputChange(e, 'test')} />
          <input name="rating" placeholder="Calificación (1-10)" value={test.rating} onChange={(e) => handleInputChange(e, 'test')} />
          <label>
            ¿Sobrevivió?
            <input name="survivalStatus" type="checkbox" checked={test.survivalStatus} onChange={(e) => handleInputChange(e, 'test')} />
          </label>
          <button onClick={() => postData(test, 'product-tests')}>Crear Prueba</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.2)',
    padding: 20,
    width: 300,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    color: 'white',
  } as React.CSSProperties,
  absoluteBox: {
    position: 'absolute',
  } as React.CSSProperties,
};

export default CreatePage;
