import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import BuyPage from './Pages/BuyPage';
import CreatePage from './Pages/CreatePage';

const path = window.location.pathname;

const root = ReactDOM.createRoot(document.getElementById('root')!);

if (path === '/buy') {
  root.render(<BuyPage />);
} else if (path === '/create') {
  root.render(<CreatePage />);
} else {
  root.render(<App />);
}

