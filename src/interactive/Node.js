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
    return className
  }
  render() {
    return (
      <div className={"node " + this.GenerateClass()}
        onMouseEnter={this.HandleMouseEnter}
        onMouseDown={this.HandleMouseDown}
        onMouseUp={this.HandleMouseUp}
      >
        r{this.props.row},c{this.props.col}<br/>
        f:{this.props.f},
        h:{this.props.h},
        g:{this.props.g},
      </div>
    );
  }
}

// this.state.node ? 'blockNode' : 'emptyNode' 