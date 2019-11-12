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
    for (let row = 0; row < 8; row++) { 
      var newRow = []; // initialize 1D array
      for (let col = 0; col < 8; col++) {
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
      aStarPath : false,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isClearSelected !== prevProps.isClearSelected && !this.state.isClear) {
      this.GenerateNewGrid();
      this.props.SetClear();
    }
    if (this.props.isStartSearch !== prevProps.isStartSearch && this.state.isStartSet && this.state.isEndSet) {
      var girdPathfinding = AStart(this.state.nodeArray,this.state.isStart, this.state.isEnd);
      if (girdPathfinding.length === 0){
      } else {
        this.GeneratePathGrid(girdPathfinding)
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

  HandleMouseUp = () => {
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

  GeneratePathGrid = (aStarPath) => {
    const newNodeArray = [];
    const nodeSize = this.state.nodeSize;
    for (let row = 0; row < 8; row++) { 
      const newRow = []; 
      for (let col = 0; col < 8; col++) {
        let tmpNode = this.state.nodeArray[row][col];
        for (let i = 0;  i < aStarPath.length; i++) {
          if (aStarPath[i].row === row && aStarPath[i].col === col) {
            let newPathNode = {
              ...tmpNode,
              isPath : true,
            }
            tmpNode = newPathNode;
          }
        }
        newRow.push(tmpNode); 
      }
      newNodeArray.push(newRow); 
    } 
    this.setState({ nodeArray : newNodeArray});
  }

  GenerateNewGrid = () => {
    const newNodeArray = [];
    const nodeSize = this.state.nodeSize;

    // get window inner hieght + width based on browser size (onstart) and remove 50px from height due to header
    let screenWidth = window.innerWidth - 120;
    let screenHieght = window.innerHeight - 90;

    // get max amount of nodes based on node size
    const whNodes =  [Math.trunc(screenWidth / nodeSize),Math.trunc(screenHieght / nodeSize)];

    for (let row = 0; row < 8; row++) { 
      const newRow = []; 
      for (let col = 0; col < 8; col++) {
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
      console.log('final: ', nodeArray);
      return (
        <div id="grid">
          {nodeArray.map((rowMap, rowIdx) => {
            return (
              <div class="row">
                {rowMap.map((node,nodeIdx) => {
                  const {row,col, isStart, isEnd, isWall, isPath,f,g,h} = node;
                  return (
                    <Node
                      h = {h}
                      f = {f}
                      g = {g}
                      isPath = {isPath}
                      isWall = {isWall}
                      isStart = {isStart}
                      isEnd = {isEnd}
                      row = {row}
                      col = {col}
                      onMouseEnter = {this.HandleMouseEnter}
                      onMouseDown = {this.HandleMouseDown}
                      onMouseUp = {this.HandleMouseUp}
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
    isPath : false,
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