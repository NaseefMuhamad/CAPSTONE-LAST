// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // New import
import Root from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container); // Create root
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);