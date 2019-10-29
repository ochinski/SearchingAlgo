import React from 'react';
import Node from './Node.js';
import './pathFinderGrid.css';

export default class PathFinderGrid extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nodeSize : 20,
      nodeArray : [],
    }
  }
  // Generate a dynamic grid
  GenerateGrid = () => {
    const newNodeArray = [];
    const nodeSize = this.state.nodeSize;

    // get window inner hieght + width based on browser size (onstart) and remove 50px from height due to header
    let screenWidth = window.innerWidth - 120;
    let screenHieght = window.innerHeight - 90;

    // get max amount of nodes based on node size
    const whNodes =  [Math.trunc(screenWidth / nodeSize),Math.trunc(screenHieght / nodeSize)];

    // begin creating the 2D array representing the grid
    for (let row = 0; row < whNodes[0]; row++) { 
      const newRow = []; // initialize 1D array
      for (let col = 0; col < whNodes[1]; col++) {
        newRow.push([]); // initalize 2D array
      }
      newNodeArray.push(newRow); // push into newNodeArray
    } 
    // this.setState(
    //   {nodeArray : newNodeArray}, // set nodeArray state with the new 2D array based on viewport.
    //   this.DisplayNodes
    //   // this.DisplayNodes  // call function once completed
    // );
    return this.DisplayNodes(newNodeArray);
  }
  DisplayNodes = newNodeArray => {
    // const {nodeArray} = this.state; // get the node array from state
    // console.log(nodeArray);
    return (
      <div id="grid">
        {newNodeArray.map((row, rowIdx) => {
          return (
            <div>
              {row.map((node,nodeIdx) => <Node/>)}
            </div>
          )
        })}
      </div>
    )
  }
  render() {
    return (
      <div id="grid-wrapper">
        {this.GenerateGrid()}
      </div>
    )
  }
}

