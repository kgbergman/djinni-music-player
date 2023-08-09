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

  function init() {
  }


  if (window.addEventListener) {
      window.addEventListener('load', init);
  } else if (window.attachEvent) {
      window.attachEvent('onload', init);
  }
}());

const htmlRoot = document.getElementById('root');
const root = ReactDOM.createRoot(htmlRoot);

root.render(
  <App/>
);