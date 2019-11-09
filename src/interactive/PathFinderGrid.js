import React from 'react';

import Node from './Node.js';
import AStart from '../algo/astar.js';

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
    // for (let row = 0; row < whNodes[0]; row++) { 
      for (let row = 0; row < 5; row++) { 
      const newRow = []; // initialize 1D array
      // for (let col = 0; col < whNodes[1]; col++) {
        for (let col = 0; col < 5; col++) {
        newRow.push(createNode(row,col)); // initalize 2D array
      }
      newNodeArray.push(newRow); // push into newNodeArray
    } 
    this.state = {
      nodeSize : nodeSize,
      nodeArray : newNodeArray,
      isMouseDown : false,
      isStartSet : false,
      isStart : {
        row : null,
        col : null
      },
      isEndSet : false,
      isEnd : {
        row : null,
        col : null
      },
      isGoalSet : false,
      isClear : true,
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.isClearSelected !== prevProps.isClearSelected && !this.state.isClear) {
      this.GenerateNewGrid();
      this.props.SetClear();
    }
    if (this.props.isStartSearch !== prevProps.isStartSearch && this.state.isStartSet && this.state.isEndSet) {
      var GirdPathfinding = AStart(this.state.nodeArray,this.state.isStart, this.state.isEnd);
      if (GirdPathfinding === false){
        console.log('failed')
      } else {
        this.setState({nodeArray : GirdPathfinding})
      }
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
    if (this.state.isClear) {
      this.setState({
        isClear : false
      })
    }
    if (this.props.isStartSelected && !this.state.isStartSet) {
      const newNodeArray = nodeArrayWithStart(this.state.nodeArray,row,col)
      let startNode = {
        row : row,
        col : col
      }
      this.setState({
        nodeArray : newNodeArray, 
        isMouseDown : true,
        isStartSet : true,
        isStart : startNode
        
      })
    } else if (this.props.isEndSelected && !this.state.isEndSet) {
      const newNodeArray = nodeArrayWithEnd(this.state.nodeArray,row,col)
      let endNode = {
        row : row,
        col : col
      }
      this.setState({
        nodeArray : newNodeArray, 
        isMouseDown : true,
        isEndSet : true,
        isEnd : endNode,
      })
    } else {
      const newNodeArray = nodeArrayWithWalls(this.state.nodeArray,row,col)
      this.setState({
        nodeArray : newNodeArray, 
        isMouseDown : true
      })
    }
  }
  GenerateNewGrid = () => {
    const newNodeArray = [];
    const nodeSize = this.state.nodeSize;

    // get window inner hieght + width based on browser size (onstart) and remove 50px from height due to header
    let screenWidth = window.innerWidth - 120;
    let screenHieght = window.innerHeight - 90;

    // get max amount of nodes based on node size
    const whNodes =  [Math.trunc(screenWidth / nodeSize),Math.trunc(screenHieght / nodeSize)];

    // begin creating the 2D array representing the grid
    // for (let row = 0; row < whNodes[0]; row++) { 
    for (let row = 0; row < 5; row++) { 
      // initialize 1D array
      const newRow = []; 
      // for (let col = 0; col < whNodes[1]; col++) {
      for (let col = 0; col < 5; col++) {
        // initalize 2D array
        newRow.push(createNode(row,col)); 
      }
      // push into newNodeArray
      newNodeArray.push(newRow); 
    } 
    this.setState(
      {
        nodeArray : newNodeArray,
        isClear : true, 
        isStartSet : false,
        isEndSet: false,
        isGoalSet : false
      }
    );
  }
  DisplayNodes = () => {
    const {nodeArray} = this.state; // get the node array from state
    return (
      <div id="grid">
        {nodeArray.map((row, rowIdx) => {
          return (
            <div>
              {row.map((node,nodeIdx) => {
                const {row,col,isStart,isEnd, isWall} = node;
                return (
                  <Node
                    isWall = {isWall}
                    isStart = {isStart}
                    isEnd = {isEnd}
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

const createNode = (row, col) => {
  return {
    row,
    col,
    isStart : false,
    isEnd : false,
    isWall : false,
  }
}

const nodeArrayWithStart = (nodeArray, row, col) => {
  const newNodeArray = nodeArray;
  const node = newNodeArray[row][col];
  const newNode = {
    ...node,
    isStart : true,
  };
  newNodeArray[row][col] = newNode;
  return newNodeArray;
}


const nodeArrayWithEnd = (nodeArray, row, col) => {
  const newNodeArray = nodeArray;
  const node = newNodeArray[row][col];
  const newNode = {
    ...node,
    isEnd : true,
  };
  newNodeArray[row][col] = newNode;
  return newNodeArray;
}

const nodeArrayWithWalls = (nodeArray, row, col) => {
  const newNodeArray = nodeArray;
  const node = newNodeArray[row][col];
  if (!node.isStart && !node.isEnd) {
    const newNode = {
      ...node,
      isWall : true,
    };
    newNodeArray[row][col] = newNode;
    return newNodeArray;
  } else {
    const newNode = {
      ...node
    };
    newNodeArray[row][col] = newNode;
    return newNodeArray;
  }

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