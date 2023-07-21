import './App.css';
import { Header } from "./header/Header";
import { Content } from "./content/Content";
import { SavePopup } from './savepopup/SavePopup';
import React, { useState } from 'react';

function App() {
  const [folders, setFolders] = useState([]);
  const [showSavePopup, setShowSavePopup] = useState(false);

  function saveButtonClicked() {
    setShowSavePopup(true);
  }

  function savePopupClose() {
    setShowSavePopup(false);
  }

  function saveFolders(filename) {
    const data = JSON.stringify(folders, null, '\t');
    const fileName = `${filename}.djinni`;
    const type = 'text/plain';
    var file = new Blob([data], {type: type});
    var a = document.createElement("a"), url = URL.createObjectURL(file);
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
        setShowSavePopup(false);
    }, 0); 
  }

  return (
    <div className="App">
      {showSavePopup && <SavePopup savePopupClose={savePopupClose} savePopupClicked={saveFolders}/>}
      <Header setFolders={setFolders} saveButtonClicked={saveButtonClicked}/>
      <Content folders={folders} setFolders={setFolders}/>
    </div>
  );
}

export default App;
