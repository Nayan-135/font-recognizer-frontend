import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';  // Changed from globals.css to match index1
import './styles/themes.css'; // Keep themes.css if needed

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);