import React, { Component } from 'react';

class Proposals extends Component {

  componentDidMount() {
    fetch("http://localhost:3000/proposals")
    .then( resp => resp.json())
    .then( json => {
      debugger;
    })
  }

  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default Proposals;