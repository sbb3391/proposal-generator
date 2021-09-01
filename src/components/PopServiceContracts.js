import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

class PopServiceContracts extends Component {

  handleServiceChange = (event) => {
    const machine = this.props.proposal.machines.find( machine => machine.machineId == event.target.dataset.machineId)
    machine[event.target.dataset.class] = event.target.value

    this.props.updateServiceContract(machine)
  }

  renderMachinesServiceInfo = () => {
    if (this.props.proposal.machines ) {
      
      return this.props.proposal.machines.map( machine => {
        return(
          <div className="flex flex-col w-4/5 mx-auto border-grey-200 border-2 rounded-md space-y-3 py-3">
            <h1 className="text-center">{machine.assemblies.find( assembly => assembly.assembly_type === "engine").name}</h1>
            <div className="flex w-full space-x-3 justify-center">
              <label>Color Click</label>
              <input type="number" className="w-32 border-black border-2 rounded-md pl-2" data-machine-id={machine.machineId} data-class="colorClick"
              onChange={this.handleServiceChange} value={machine.colorClick} />
              <label>Annual Volume</label>
              <input type="number" className="w-32 border-black border-2 rounded-md pl-2" data-machine-id={machine.machineId} data-class="annualColorVolume"
              onChange={this.handleServiceChange} value={machine.annualColorVolume}  />
            </div>
            <div className="flex w-full space-x-3 justify-center">
              <label>Mono Click</label>
              <input type="number" className="w-32 border-black border-2 rounded-md pl-2" data-machine-id={machine.machineId} data-class="monoClick"
              onChange={this.handleServiceChange} value={machine.monoClick} />
              <label>Annual Volume</label>
              <input type="number" className="w-32 border-black border-2 rounded-md pl-2" data-machine-id={machine.machineId} data-class="annualMonoVolume"
              onChange={this.handleServiceChange} value={machine.annualMonoVolume} />
            </div>
            <div className="w-full h-24 text-center">
              <textarea placeholder="Service comments for this machine..."className="w-11/12 h-full border-grey block mx-auto border-2 rounded-md">
  
              </textarea>
            </div>
          </div>
        )
      })
    }
  }

  render() {
    return (
      <div>
        <div className="flex flex-col w-full h-full mx-auto space-y-5 py-8">
          {this.renderMachinesServiceInfo()}
        </div>
      </div>
      
    );
  }
}

const mapStateToProps = state => (
  {
    proposal: state.proposal
  }
)

const mapDispatchToProps = dispatch => (
  {
    updateServiceContract: (machine) => dispatch({type: "UPDATE_SERVICE_CONTRACT", machine: machine})
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(PopServiceContracts);