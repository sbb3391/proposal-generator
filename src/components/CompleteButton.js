import React from 'react';
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';

const CompleteButton = ({machineAssemblies, previewMachine}) => {
  const history = useHistory()

  const createMachine = () => {
    const data = {
      model: {
        id: machineAssemblies[0].model_id,
        assemblies: machineAssemblies
      }
    }

    fetch('http://localhost:3000/machines/preview', {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(json => {
      previewMachine(json)
      history.push(`/machines/preview`)
    })
  }
  return (
    <>
      <button id="complete-button" className="bg-green-500 text-white text-2xl p-2 h-12 text-center rounded-md" onClick={createMachine}>Complete Machine</button>
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
    previewMachine: machine => dispatch({type: 'PREVIEW_MACHINE', machine: machine})
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(CompleteButton);
