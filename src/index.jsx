import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import OBR from '@owlbear-rodeo/sdk';
import { MemoizedPlayer } from './player/Player';
import{ getPluginId } from './getPluginId'
window.ResizeObserver = ResizeObserver;

/**
 * Main
 */
(function () {
  'use strict';

  function init() {
      // Load YouTube library
      var tag = document.createElement('script');

      tag.src = 'https://www.youtube.com/iframe_api';

      var first_script_tag = document.getElementsByTagName('script')[0];

      first_script_tag.parentNode.insertBefore(tag, first_script_tag);
  }


  if (window.addEventListener) {
      window.addEventListener('load', init);
  } else if (window.attachEvent) {
      window.attachEvent('onload', init);
  }
}());

const htmlRoot = document.getElementById('root');
const root = ReactDOM.createRoot(htmlRoot);

let playerRole = "";

OBR.onReady(async () => {
  if (playerRole === "") {
    const newPlayerRole = await OBR.player.getRole();
    playerRole = newPlayerRole;
  }
});

root.render(
  <App/>
);