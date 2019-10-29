import React from 'react';

import Header from './layout/Header.js';
import PathFinderGrid from './interactive/PathFinderGrid.js';
import './App.css';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isStartSelected : false,
      isEndSelected : false
    }
  }
  HandleButtonClick = event => {
    if (event.target.name === "isStartSelected" && this.state.isEndSelected === false) {
      this.setState({isStartSelected : !this.state.isStartSelected});
    }
    if (event.target.name === "isEndSelected" && this.state.isStartSelected === false) {
      this.setState({isEndSelected : !this.state.isEndSelected});
    }
  }
  render() {
    return (
      <div className="App">
        <React.Fragment>
          <Header
            HandleButtonClick = {this.HandleButtonClick}
            isStartSelected = {this.state.isStartSelected}
            isEndSelected = {this.state.isEndSelected}
          />
        </React.Fragment>
        <PathFinderGrid 
          nodeSize = {30}
        />
      </div>
    );
  }
}


