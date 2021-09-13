import React, { Component } from 'react';
import numeral from 'numeral';
import { machinePdf } from '../pdf/machinePdf'
import { connect } from 'react-redux';
import { editMachine } from '../actions/editMachine'
import { useHistory } from 'react-router-dom'

const MachineOverview = (props) => {

  const history = useHistory();

  const renderSaveChangesButton = totalPrice => { 
    if (props.machine.showSave && props.machineType !== "preview") {

      return(<button onClick={() => props.saveMachine(props.machine)} className="border border-black rounded-md w-36 mx-auto bg-green-500 text-white bold cursor-pointer">Save Changes</button>)
    }
  }

  const renderSaveMachinePreviewButton = () => {
    if (props.machineType === "preview") {
      return(<button onClick={() => props.toggleMachineSave(props.machine, props.saveMachine)} className="border border-black rounded-md w-36 mx-auto bg-green-500 text-white bold cursor-pointer">Save Machine</button>)
    }
  }

  const editButtonClick = (event) => {
    const machine = props.machine

    if (props.machineType === "preview") {
      history.pushState('/machines/preview/edit')
      props.testing()
    } else {
      props.editMachine(machine, props.history, props.machineType) 
    }
  }

  let priceArray = [];

  if (props.machine.assemblies.length > 0) {
    props.machine.assemblies.forEach(assembly => assembly.items.forEach( item => priceArray.push(item.unitPrice)))
  }

  const totalPrice = numeral(priceArray.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)).format('000.00')
  
  return (
    <>
      <h1 className="text-center">Machine Overview</h1>
      <h1 className="text-center">Total Price: {numeral(totalPrice).format('$0,0.00')}</h1>
      <button onClick={() => machinePdf(props.machine)} className="border border-black rounded-md w-36 mx-auto">Generate PDF</button>
      <button onClick={editButtonClick} className="border border-black rounded-md w-36 mx-auto bg-red-500 text-white bold cursor-pointer">Edit Machine</button>
      { renderSaveChangesButton(totalPrice)}
      { renderSaveMachinePreviewButton() }
    </>
  );
}

const mapStateToProps = (state) => (
  {
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    editMachine: (machine, history, machineType) => dispatch(editMachine(machine, history, machineType)),
    testing: () => dispatch({type: "TESTING"}),
    toggleMachineSave: (machine, saveMachine) => dispatch({type: "TOGGLE_MACHINE_SAVE", machine: machine, saveMachine: saveMachine}),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(MachineOverview);