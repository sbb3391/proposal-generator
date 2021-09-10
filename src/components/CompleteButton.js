import React from 'react';
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';

const CompleteButton = (props) => {
  const history = useHistory()


  const createMachine = () => {
    const data = {
      model: {
        id: props.machineAssemblies[0].model_id,
        assemblies: props.machineAssemblies
      }
    }

    debugger;
    fetch(`${props.fetchUrl}`, {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(json => {
      props.dispatch(json)
      history.push(`${props.newUrl}`)
    })
  }
  return (
    <>
      <button id="complete-button" className="bg-green-500 text-white text-2xl p-2 h-12 text-center rounded-md" onClick={createMachine}>{props.value}</button>
    </>
  );
}


const mapStateToProps = state => (
  {
    machineAssemblies: state.machine.assemblies,
    state: state
  }
)

const mapDispatchToProps = dispatch => (
  {
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(CompleteButton);
