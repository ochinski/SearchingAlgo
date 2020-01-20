import React from 'react';
import './node.css';

export default class Node extends React.Component {
  constructor(props){
    super(props);
  }
  HandleMouseEnter = () => {
    this.props.onMouseEnter(this.props.row, this.props.col);
  }
  HandleMouseDown = () => {
    this.props.onMouseDown(this.props.row, this.props.col);
  }
  HandleMouseUp = () => {
    this.props.onMouseUp();
  }
  GenerateClass = () => {
    var className = this.props.isWall ? 'isWall' : '';
    className += this.props.isStart ? 'isStart' : '';
    className += this.props.isEnd ? 'isEnd' : '';
    className += this.props.isPath ? ' isPath' : '';
    className += this.props.openSet ? ' openSet' : '';
    className += this.props.closedSet ? ' closedSet' : '';
    return className
  }
  render() {
    return (
      <div  className={"node " + this.GenerateClass()}
        onMouseEnter={this.HandleMouseEnter}
        onMouseDown={this.HandleMouseDown}
        onMouseUp={this.HandleMouseUp}
      >
        {this.props.dist}
      </div>
    );
  }
}

// this.state.node ? 'blockNode' : 'emptyNode' 