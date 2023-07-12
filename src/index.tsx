import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
window.ResizeObserver = ResizeObserver;


const htmlRoot = document.getElementById('root') as Element;
const root = ReactDOM.createRoot(htmlRoot);
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);