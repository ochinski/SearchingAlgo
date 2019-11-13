import React from 'react';

import Header from './layout/Header.js';
import PathFinderGrid from './interactive/PathFinderGrid.js';
import './App.css';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isStartSelected : false,
      isEndSelected : false,
      isClearSelected : false,
      isStartSearch: false,
    }
  }
  
  HandleButtonClick = event => {
    if (event.target.name === "isStartSelected" && this.state.isEndSelected === false) {
      this.setState({isStartSelected : !this.state.isStartSelected});
    }
    if (event.target.name === "isEndSelected" && this.state.isStartSelected === false) {
      this.setState({isEndSelected : !this.state.isEndSelected});
    }
    if (event.target.name === "isClearSelected" && this.state.isClearSelected === false) {
      this.setState({isClearSelected : !this.state.isClearSelected});
    }
    if (event.target.name === "isStartSearch" && this.state.isEndSelected === false && this.state.isStartSelected === false) {
      this.setState({isStartSearch : !this.state.isStartSearch});
    }
  }

  SetClear = () => {
    this.setState({isClearSelected : false})
  }
  
  render() {
    return (
      <div className="App">
        <React.Fragment>
          <Header
            HandleButtonClick = {this.HandleButtonClick}
            isStartSelected = {this.state.isStartSelected}
            isEndSelected = {this.state.isEndSelected}
            isClearSelected = {this.state.isClearSelected}
          />
        </React.Fragment>
        <PathFinderGrid 
          isClearSelected = {this.state.isClearSelected}
          SetClear = {this.SetClear}
          isStartSelected = {this.state.isStartSelected}
          isEndSelected = {this.state.isEndSelected}
          isStartSearch = {this.state.isStartSearch}
          nodeSize = {20}
        />
      </div>
    );
  }
}


