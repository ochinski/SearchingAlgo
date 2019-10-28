import React from 'react';
import Node from './Node.js';
import './grid.css';

export default class Grid extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nodeSize : 20,
      nodeArray : [],
    }
  }
  GenerateGrid = () => {
    const newNodeArray = [];

    const nodeSize = this.state.nodeSize;
    var grid = new Array(2);
    var displayGrid = [];
    let emptyNode = 0;
    let screenWidth = window.innerWidth;
    let screenHieght = window.innerHeight - 50;
    let whNodes =  [Math.trunc(screenWidth / nodeSize),Math.trunc(screenHieght / nodeSize)];
    for (let x = 0; x < whNodes[0]; x++) { 
      grid[x] = new Array(2); 
    } 
    for (let x = 0; x < whNodes[0]; x++) {
      for (let y = 0; y < whNodes[1]; y++) {
        newNodeArray.push (
          <Node/>
        )
      }
    }
    return newNodeArray;
  }
  render() {
    return (
      <div id="grid">
        {this.GenerateGrid()}
      </div>
    );
  }
}

