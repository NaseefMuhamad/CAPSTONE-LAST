// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root'; // Import from new file
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);