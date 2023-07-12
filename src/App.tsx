import logo from './logo.svg';
import './App.css';
import { Header } from "./header/Header";
import { Content } from "./content/Content";
import React from 'react';

function App() {
  return (
    <div className="App">
      <Header/>
      <Content/>
    </div>
  );
}

export default App;
