import React, { Component } from 'react';

class PopServiceContracts extends Component {
  renderMachinesServiceInfo = () => {
    return this.props.proposal.machines.map( machine => {
      return(
        <div className="flex flex-col w-2/3 mx-auto border-grey-200 border-2 rounded-md space-y-3 py-3">
          <h1 className="text-center">{machine.assemblies.find( assembly => assembly.assembly_type === "engine").name}</h1>
          <div className="flex w-full space-x-3 justify-center">
            <label>Color Click</label>
            <input type="number" className="w-32 border-black border-2 rounded-md" />
            <label>Annual Volume</label>
            <input type="number" className="w-32 border-black border-2 rounded-md"  />
          </div>
          <div className="flex w-full space-x-3 justify-center">
            <label>Mono Click</label>
            <input type="number" className="w-32 border-black border-2 rounded-md" ></input>
            <label>Annual Volume</label>
            <input type="number" className="w-32 border-black border-2 rounded-md" ></input>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="flex flex-col w-full h-full mx-auto space-y-5 pt-8">
        {this.renderMachinesServiceInfo()}
      </div>
    );
  }
}

export default PopServiceContracts;