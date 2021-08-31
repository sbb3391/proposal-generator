import React, { Component } from 'react';
import ReactLoading from 'react-loading';

class GraphicLoading extends Component {
  render() {
    return (
      <>
        <ReactLoading type="spin" color="#333EFF" height='20%' width='20%' />
      </>
    );
  }
}

export default GraphicLoading;
