import React from 'react';

import Header from './layout/Header.js';
import PathFinderGrid from './interactive/PathFinderGrid.js';
import './App.css';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      algoSelected : 'astar',
      actionSelected : 'block',
      isStartSelected : false,
      isEndSelected : false,
      isClearSelected : false,
      isStartSearch: false,
    }
  }
  HandleAlgoChange = event => {
    switch (event.target.value) {
      case 'astar' :
        this.SwitchAlgo('astar');
        break;
      case 'dijkstra':
        this.SwitchAlgo('dijkstra');
        break;
    }
  }
  HandleButtonClick = event => {
    switch (event.target.name){
      case 'isStartSelected' :
        this.SwitchAction('start');
        break;
      case 'isEndSelected':
        this.SwitchAction('end');
        break;
      case 'isClearSelected':
        this.SwitchAction('clear');
        break;
      case 'isStartSearch':
        this.SwitchAction('search');
        break;
    }
    console.log(this.state);
    // if (event.target.name === "isStartSelected") {
    //   this.setState({
    //     actionSelected : 'start'
    //   })
    // }
    // if (event.target.name === "isStartSelected" && this.state.isEndSelected === false) {
    //   this.setState({isStartSelected : !this.state.isStartSelected});
    // }
    // if (event.target.name === "isEndSelected" && this.state.isStartSelected === false) {
    //   this.setState({isEndSelected : !this.state.isEndSelected});
    // }
    // if (event.target.name === "isClearSelected" && this.state.isClearSelected === false) {
    //   this.setState({isClearSelected : !this.state.isClearSelected});
    // }
    // if (event.target.name === "isStartSearch" && this.state.isEndSelected === false && this.state.isStartSelected === false) {
    //   this.setState({isStartSearch : !this.state.isStartSearch});
    // }
  }
  SwitchAlgo = (algo) => {
    this.setState({
      algoSelected : algo
    })
  }
  SwitchAction = (action) => {
    this.setState({
      actionSelected : action
    })
  }

  SetClear = () => {
    this.setState({isClearSelected : false})
  }
  
  render() {
    return (
      <div className="App">
        <React.Fragment>
          <Header
            HandleAlgoChange = {this.HandleAlgoChange}
            HandleButtonClick = {this.HandleButtonClick}
            isStartSelected = {this.state.isStartSelected}
            isEndSelected = {this.state.isEndSelected}
            isClearSelected = {this.state.isClearSelected}
          />
        </React.Fragment>
        <PathFinderGrid 
          algo = {this.state.algoSelected}
          action = {this.state.actionSelected}
          isClearSelected = {this.state.isClearSelected}
          SetClear = {this.SetClear}
          isStartSelected = {this.state.isStartSelected}
          isEndSelected = {this.state.isEndSelected}
          isStartSearch = {this.state.isStartSearch}
          nodeSize = {30}
        />
      </div>
    );
  }
}


