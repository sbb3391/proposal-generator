import React, { Component } from 'react';
import { connect } from 'react-redux';

class StatusButton extends Component {
  render() {
    const AssembliesOfThisType = this.props.machineAssemblies.filter( assembly => assembly.assembly_type == this.props.text)

    return (
      <>
        { AssembliesOfThisType.length > 0 ?
          <button className="border border-black rounded-lg p-2 bg-green-500 text-white font-bold">{this.props.text}</button> :
          <button className="border border-black rounded-lg p-2 bg-red-500 text-white font-bold">{this.props.text}</button>
        }
        
      </>
    );
  }
}


const mapDispatchToProps = (dispatch) => (
  {}
)

const mapStateToProps = (state) => (
  {machineAssemblies: state.machine.assemblies}
)

export default connect(mapStateToProps, mapDispatchToProps)(StatusButton);