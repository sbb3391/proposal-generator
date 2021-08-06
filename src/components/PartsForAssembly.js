import React, { Component } from 'react';

class PartsForAssembly extends Component {

  componentDidMount() {
    fetch(`http://localhost:3000/assemblies/${this.props.assemblyId}/items`)
    .then(resp => resp.json())
    .then(json => {
      debugger;
    })
  }


  render() {
    return (
      <div className="relative z-20 w-full h-full bg-red-100 flex place-items-center">
        <div className="w-1/2 h-4/5 mx-auto flex flex-col">
          <h1 className="w-2/3 mx-auto text-center">Select Parts:</h1>
        </div>
        
      </div>
    );
  }
}

export default PartsForAssembly;