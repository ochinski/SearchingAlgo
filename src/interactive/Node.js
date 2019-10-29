import React from 'react';
import './node.css';

export default class Node extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      node : 0,
      isWall : this.props.isWall
    }
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
  render() {
    return (
      <div id="node" className={this.props.isWall ? 'isWall' : ''}
        onMouseEnter={this.HandleMouseEnter}
        onMouseDown={this.HandleMouseDown}
        onMouseUp={this.HandleMouseUp}
      >
      </div>
    );
  }
}

// this.state.node ? 'blockNode' : 'emptyNode' 