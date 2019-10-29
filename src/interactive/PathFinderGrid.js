import React from 'react';
import Node from './Node.js';
import './pathFinderGrid.css';

export default class PathFinderGrid extends React.Component {
  constructor(props){
    super(props);
    const newNodeArray = [];
    const nodeSize = props.nodeSize;

    // get window inner hieght + width based on browser size (onstart) and remove 50px from height due to header
    let screenWidth = window.innerWidth - 120;
    let screenHieght = window.innerHeight - 90;

    // get max amount of nodes based on node size
    const whNodes =  [Math.trunc(screenWidth / nodeSize),Math.trunc(screenHieght / nodeSize)];

    // begin creating the 2D array representing the grid
    for (let row = 0; row < whNodes[0]; row++) { 
      const newRow = []; // initialize 1D array
      for (let col = 0; col < whNodes[1]; col++) {
        newRow.push(createNode(col,row)); // initalize 2D array
      }
      newNodeArray.push(newRow); // push into newNodeArray
    } 
    this.state = {
      nodeSize : nodeSize,
      nodeArray : newNodeArray,
      isMouseDown : false,
    }
  }
  HandleMouseEnter = (row,col) => {
    if (this.state.isMouseDown){
      const newNodeArray = nodeArrayWithWalls(this.state.nodeArray,row,col)
      this.setState({
        nodeArray : newNodeArray
      })
    }
  }
  HAndleMouseUp = () => {
    this.setState({isMouseDown : false})
  }
  HandleMouseDown = (row,col) => {
    const newNodeArray = nodeArrayWithWalls(this.state.nodeArray,row,col)
    this.setState({
      nodeArray : newNodeArray, 
      isMouseDown : true
    })
  }
  DisplayNodes = () => {
    const {nodeArray} = this.state; // get the node array from state
    return (
      <div id="grid">
        {nodeArray.map((row, rowIdx) => {
          return (
            <div>
              {row.map((node,nodeIdx) => {
                const {row,col,isWall} = node;
                return (
                  <Node
                    isWall = {isWall}
                    row = {row}
                    col = {col}
                    onMouseEnter = {this.HandleMouseEnter}
                    onMouseDown = {this.HandleMouseDown}
                    onMouseUp = {this.HAndleMouseUp}
                  />
                );
              })}
          </div>
          )
        })}
      </div>
    )
  }
  render() {
    return (
      <div id="grid-wrapper">
        {this.DisplayNodes()}
      </div>
    )
  }
}

const createNode = (col, row) => {
  return {
    col,
    row,
    isWall : false,
  }
}

const nodeArrayWithWalls = (nodeArray, row, col) => {
  const newNodeArray = nodeArray;
  const node = newNodeArray[row][col];
  const newNode = {
    ...node,
    isWall : true,
  };
  newNodeArray[row][col] = newNode;
  return newNodeArray;
}
  // Generate a dynamic grid
  // GenerateGrid = () => {
    // const newNodeArray = [];
    // const nodeSize = this.state.nodeSize;

    // // get window inner hieght + width based on browser size (onstart) and remove 50px from height due to header
    // let screenWidth = window.innerWidth - 120;
    // let screenHieght = window.innerHeight - 90;

    // // get max amount of nodes based on node size
    // const whNodes =  [Math.trunc(screenWidth / nodeSize),Math.trunc(screenHieght / nodeSize)];

    // // begin creating the 2D array representing the grid
    // for (let row = 0; row < whNodes[0]; row++) { 
    //   const newRow = []; // initialize 1D array
    //   for (let col = 0; col < whNodes[1]; col++) {
    //     newRow.push([]); // initalize 2D array
    //   }
    //   newNodeArray.push(newRow); // push into newNodeArray
    // } 
    // this.setState(
    //   {nodeArray : newNodeArray}, // set nodeArray state with the new 2D array based on viewport.
    //   this.DisplayNodes
    //   // this.DisplayNodes  // call function once completed
    // );
    // return this.DisplayNodes(newNodeArray);
  // }