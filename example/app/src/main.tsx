import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';

const root: HTMLElement | undefined = document.getElementById('root') ?? undefined;

if (root === undefined) {
  throw new Error('Undefined html root element');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
