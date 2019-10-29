import React from 'react';

import Header from './layout/Header.js';
import PathFinderGrid from './interactive/PathFinderGrid.js';
import './App.css';


function App() {
  return (
    <div className="App">
      <Header/>
      <PathFinderGrid/>
    </div>
  );
}

export default App;
