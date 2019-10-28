import React from 'react';

import Header from './layout/Header.js';
import Grid from './interactive/Grid.js';
import './App.css';


function App() {
  const resetClicked = 0;
  handleClear = () => {
    resetClicked = 1;
  }
  return (
    <div className="App">
      <Header handleClear = {this.handleClear}/>
      <Grid reset = {this.resetClicked}/>
    </div>
  );
}

export default App;
