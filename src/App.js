import React, { useState } from 'react';
import './App.css';
import SignatureWebViewer from './SignatureWebViewer';

const App = () => {
  const [pdfUrl, setPdfUrl] = useState()

  const onButtonClick = () => {
    setPdfUrl("/files/test-file.pdf")
  }

  return (
    <div className="App">
      <div className="header">React sample</div>
      <button style={{ padding: "20px" }} onClick={onButtonClick}>Load document</button>
      <SignatureWebViewer pdfUrl={pdfUrl} />
    </div>
  );
};

export default App;
