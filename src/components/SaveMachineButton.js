import React from 'react';
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';

const SaveMachineButton = ({machineAssemblies, machine}) => {
  const history = useHistory()

  const createMachine = () => {
    const data = {
      model: {
        id: machineAssemblies[0].model_id,
        assemblies: machineAssemblies
      }
    }

    fetch('https://proposals-api.herokuapp.com/machines', {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(json => {
      machine(json)
      history.push(`/machines/${json.id}`)
    })
  }
  return (
    <>
      <span className="text-4xl">&#x2192;</span>
      <button id="complete-button" className="static-button" onClick={createMachine}>Complete</button>
    </>
  );
}


const mapStateToProps = state => (
  {
    machineAssemblies: state.machine.assemblies
  }
)

const mapDispatchToProps = dispatch => (
  {
    machine: machine => dispatch({type: 'ADD_MACHINE', machine: machine})
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(SaveMachineButton);