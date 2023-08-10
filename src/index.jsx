import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
window.ResizeObserver = ResizeObserver;

/**
 * Main
 */
(function () {
  'use strict';
}());

const htmlRoot = document.getElementById('root');
const root = ReactDOM.createRoot(htmlRoot);

root.render(
  <App/>
);