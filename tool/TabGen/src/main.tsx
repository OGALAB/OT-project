import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';

const mount = () => {
  if (!document.body) return setTimeout(mount, 50);
  
  const div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.createRoot(div).render(<App />);
};

mount();