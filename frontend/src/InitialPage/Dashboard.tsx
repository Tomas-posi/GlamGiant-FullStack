import React, { useState } from 'react';
import OrdersList from '../Pages/OrdersList';
import CreateProductTest from '../Pages/CreateProductTest';
import ProductTestsList from '../Pages/ProductTestsList';


const Dashboard: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('loggedUser') || '{}');
  const role = user?.role || '';
  const isTestSubject = user?.testSubject || false;

  const isEmployeeOrAdmin = role === 'Empleado' || role === 'Admin';
  const isAdmin = role === 'Admin';
  const canSeeTestCalendar = isTestSubject || isEmployeeOrAdmin;

  const [selectedSection, setSelectedSection] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    window.location.href = '/';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1c1c1c, #2b2b2b)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 50,
      paddingBottom: 50
    }}>
      <h1 style={{ marginBottom: 30 }}>Bienvenido, {user.name}</h1>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        width: '100%',
        maxWidth: 400
      }}>
        <button className="modern-button" onClick={() => window.location.href = '/buy'}>
          🛒 Comprar
        </button>

        <button className="modern-button" onClick={() => setSelectedSection('servicios')}>
          💅 Servicios
        </button>

        {canSeeTestCalendar && (
          <button className="modern-button" onClick={() => setSelectedSection('calendario')}>
            📆 Ver calendario de pruebas
          </button>
        )}

        {isEmployeeOrAdmin && (
          <button className="modern-button" onClick={() => (window.location.href = '/create')}>
            🧪 Crear pruebas, productos servicios
          </button>
        )}

        {isEmployeeOrAdmin && (
          <button className="modern-button" onClick={() => setSelectedSection('ordenes')}>
            📦 Ver órdenes
          </button>
        )}

        {isAdmin && (
          <button className="modern-button" onClick={() => setSelectedSection('modificaciones')}>
            ⚙️ Modificaciones
          </button>
        )}

        <button className="modern-button" onClick={handleLogout} style={{ backgroundColor: '#ff5e5e' }}>
          🚪 Cerrar sesión
        </button>
      </div>

      <div style={{ marginTop: 40, width: '90%', maxWidth: 800 }}>
        {selectedSection === 'crear' && (
          <CreateProductTest />
          )}

        {selectedSection === 'servicios' && (
          <p>💅 Aquí se mostrarán los servicios disponibles.</p>
        )}
        {selectedSection === 'calendario' && (
          <ProductTestsList />
          )}

        {selectedSection === 'ordenes' && (
          <div>
            <OrdersList />
            </div>
          )}
        {selectedSection === 'modificaciones' && (
          <p>⚙️ Opciones de modificación avanzadas.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

