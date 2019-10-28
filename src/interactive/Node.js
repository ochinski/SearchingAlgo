import React from 'react';
import './node.css';

export default class Node extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      node : 0,
    }
  }
  nodeClick = (e) => {
    console.log('clicked');
    if (this.state.node === 0) {
      this.setState({
        node : 1
      })
    }
  }
  render() {
    return (
      <div id="node" class={this.state.node ? 'blockNode' : 'emptyNode'} onClick={this.nodeClick}>
        {this.state.node}
      </div>
    );
  }
}
