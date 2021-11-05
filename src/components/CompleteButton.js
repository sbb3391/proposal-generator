import React from 'react';
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import {createMachine} from '../actions/fetches'

const CompleteButton = (props) => {
  const history = useHistory()

  return (
    <>
      <button id="complete-button" className="bg-green-500 text-white text-2xl p-2 h-12 text-center rounded-md" onClick={() => createMachine(props, history)}>{props.value}</button>
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
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(CompleteButton);
