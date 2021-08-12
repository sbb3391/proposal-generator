import React, { Component, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';

const CompleteButton = ({machineAssemblies}) => {
  const history = useHistory()

  const createMachine = () => {
    const data = {
      model: {
        id: machineAssemblies[0].model_id
      }
    }

    fetch('http://localhost:3000/machines', {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(json => {
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
    addAllAssemblies: assemblies => dispatch({type: 'ADD_ALL_ASSEMBLIES', assemblies: assemblies}),
    addAssembly: assembly => dispatch({type: 'ADD_ASSEMBLY', assembly: assembly}),
    removeClickedId: () => dispatch({type: 'REMOVE_CLICKED_ID', id: ""})
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(CompleteButton);
