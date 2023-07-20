import './App.css';
import { Header } from "./header/Header";
import { Content } from "./content/Content";
import React, { useState } from 'react';

function App() {
  const [folders, setFolders] = useState([]);

  return (
    <div className="App">
      <Header setFolders={setFolders}/>
      <Content folders={folders}/>
    </div>
  );
}

export default App;
