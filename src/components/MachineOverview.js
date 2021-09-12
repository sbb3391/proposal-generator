import React, { Component } from 'react';
import numeral from 'numeral';
import { machinePdf } from '../pdf/machinePdf'
import { connect } from 'react-redux';
import { editMachine } from '../actions/editMachine'
import { NavLink } from "react-router-dom";

class MachineOverview extends Component {

  renderSaveChangesButton = totalPrice => { 
    if (this.props.machine.showSave && this.props.machineType !== "preview") {

      return(<button onClick={() => this.props.saveMachine(this.props.machine)} className="border border-black rounded-md w-36 mx-auto bg-green-500 text-white bold cursor-pointer">Save Changes</button>)
    }
  }

  renderSaveMachinePreviewButton = () => {
    if (this.props.machineType === "preview") {
      return(<button onClick={() => this.props.toggleMachineSave(this.props.machine, this.props.saveMachine)} className="border border-black rounded-md w-36 mx-auto bg-green-500 text-white bold cursor-pointer">Save Machine</button>)
    }
  }

  editButtonClick = (event) => {
    const machine = this.props.machine

    if (this.props.machineType === "preview") {
      window.history.pushState({}, "", '/machines/preview/edit')
      this.props.testing()
    } else {
      this.props.editMachine(machine, this.props.history, this.props.machineType) 
    }
  }

  render() {
    debugger;
    let priceArray = [];

    if (this.props.machine.assemblies.length > 0) {
      this.props.machine.assemblies.forEach(assembly => assembly.items.forEach( item => priceArray.push(item.unitPrice)))
    }

    const totalPrice = numeral(priceArray.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)).format('000.00')
    
    return (
      <>
        <h1 className="text-center">Machine Overview</h1>
        <h1 className="text-center">Total Price: {numeral(totalPrice).format('$0,0.00')}</h1>
        <button onClick={() => machinePdf(this.props.machine)} className="border border-black rounded-md w-36 mx-auto">Generate PDF</button>
        <button onClick={this.editButtonClick} className="border border-black rounded-md w-36 mx-auto bg-red-500 text-white bold cursor-pointer">Edit Machine</button>
        { this.renderSaveChangesButton(totalPrice)}
        { this.renderSaveMachinePreviewButton() }
      </>
    );
  }
}

const mapStateToProps = (state) => (
  {
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    editMachine: (machine, history, machineType) => dispatch(editMachine(machine, history, machineType)),
    testing: () => dispatch({type: "TESTING"}),
    toggleMachineSave: (machine, saveMachine) => dispatch({type: "TOGGLE_MACHINE_SAVE", machine: machine, saveMachine: saveMachine})
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(MachineOverview);