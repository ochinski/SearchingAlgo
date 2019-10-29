import React from 'react';

import Header from './layout/Header.js';
import PathFinderGrid from './interactive/PathFinderGrid.js';
import './App.css';


function App() {
  return (
    <div className="App">
      <Header/>
      <PathFinderGrid nodeSize = {30}/>
    </div>
  );
}

export default App;
