import React from 'react';
import './grid.css';

export default class Grid extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        nodeSize : 10,
        gridNodes : 0,
      }
  }
  GenerateGrid = () => {
    const newGridNodes = this.state.gridNodes;
    const nodeSize = this.state.nodeSize;
    let screenWidth = window.innerWidth;
    let screenHieght = window.innerHeight;
    let whNodes =  [Math.trunc(screenWidth / nodeSize),Math.trunc(screenHieght / nodeSize)];
    for (let x = 0; x < whNodes[x]; x++) {
      
    }
    return <span>{whNodes[0]} x {whNodes[1]}</span>
  }
  render() {
    return (
      <div id="grid">
        {this.GenerateGrid()}
      </div>
    );
  }
}

