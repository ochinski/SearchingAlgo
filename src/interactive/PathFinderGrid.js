import React from 'react';

import Node from './Node.js';
import AStart from '../algo/astar.js';
import Dijkstra from '../algo/dijkstra.js';

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
    for (let row = 0; row < whNodes[1]; row++) { 
      var newRow = []; // initialize 1D array
      for (let col = 0; col < whNodes[0]; col++) {
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
    if (this.props.action !== prevProps.action && !this.state.isClear && this.props.action === 'clear') {
      this.GenerateNewGrid();
      this.props.SetClear();
    }
    if (this.props.action !== prevProps.action && this.state.isStartSet && this.state.isEndSet && this.props.action === 'search') {
      if (this.props.algo === "astar") {
        var girdPathfinding = AStart(this.state.nodeArray,this.state.isStart, this.state.isEnd);
      } else if (this.props.algo === "dijkstra") {
        var girdPathfinding = Dijkstra(this.state.nodeArray,this.state.isStart);
      }
      // if (girdPathfinding.length === 0){
      // } else {
        // this.GeneratePathGrid(girdPathfinding[0])
        // this.GeneratePathGrid(girdPathfinding)
        this.AnimateAstar(girdPathfinding);
      // }
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
    if (this.props.action === 'start' && !this.state.isStartSet) {
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
    } else if (this.props.action === 'end' && !this.state.isEndSet) {
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
  
  DelaySetState = (i, curNodeArray,newNodeArray,lastNode,path) => {
    setTimeout(
      function () {
        curNodeArray[newNodeArray[i].row][newNodeArray[i].col].closedSet = true;
        this.setState({nodeArray : curNodeArray})
        if ((i + 1) == lastNode) {
          this.GeneratePathGrid(path)
        }
      }
      .bind(this),
      60 * i
      );  
  }

  AnimateAstar = (girdPathfinding) => {
    const newNodeArray = girdPathfinding[2][0];
    console.log(newNodeArray);
    const curNodeArray = this.state.nodeArray;
    var newNode = null;

    for (var i = 0; i < newNodeArray.length; i++) {
      this.DelaySetState(i,curNodeArray,newNodeArray,newNodeArray.length,girdPathfinding[0]);
    }
    
  }

  GeneratePathGrid = (aStarPath) => {
    const newNodeArray = [];
    const nodeSize = this.state.nodeSize;
      // get window inner hieght + width based on browser size (onstart) and remove 50px from height due to header
      let screenWidth = window.innerWidth - 120;
      let screenHieght = window.innerHeight - 90;
  
      // get max amount of nodes based on node size
      const whNodes =  [Math.trunc(screenWidth / nodeSize),Math.trunc(screenHieght / nodeSize)];

        
    for (let row = 0; row < whNodes[1]; row++) { 
      const newRow = []; 
      for (let col = 0; col < whNodes[0]; col++) {
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

    for (let row = 0; row < whNodes[1]; row++) { 
      const newRow = []; 
      for (let col = 0; col < whNodes[0]; col++) {
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
      var counter_openset = 0;
      var counter_closedSet = 0;
      var counter_path = 0;
      // console.log('final: ', nodeArray);
      return (
        <div id="grid">
          {nodeArray.map((rowMap, rowIdx) => {
            
            return (
              <div class="row">
                {rowMap.map((node,nIndex) => {
                  const {row,col, isStart, isEnd, isWall, isPath,openSet, closedSet,dist} = node;
                  if (openSet) {
                    counter_openset++;
                  }
                  if (closedSet){
                    counter_closedSet++;
                  }
                  if (isPath){
                    counter_path++;
                  }
                  return (
                    <Node
                      dist = {dist}
                      counter_openset = {counter_openset}
                      counter_closedSet = {counter_closedSet}
                      counter_path = {counter_path}
                      index={nIndex}
                      openSet = {openSet}
                      closedSet = {closedSet}
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
    openSet : false,
    closedSet : false,
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