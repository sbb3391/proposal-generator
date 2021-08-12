import React, { Component } from 'react';
import { connect } from 'react-redux';

class StatusButton extends Component {
  render() {
    const remainingAssembliesOfThisType = this.props.remainingAssemblies.filter( assembly => assembly.assembly_type == this.props.text)
    const remainingAssembliesBelongingToPickOneGroup = remainingAssembliesOfThisType.filter( assembly => assembly.pick_one_group )

    return (
      <>
        { remainingAssembliesBelongingToPickOneGroup.length === 0 ?
          <button className="cursor-default border border-black rounded-lg p-2 bg-green-500 text-white font-bold">{this.props.text}</button> :
          <button className="cursor-default border border-black rounded-lg p-2 bg-red-500 text-white font-bold">{this.props.text}</button> 
        }
        
      </>
    );
  }
}


const mapDispatchToProps = (dispatch) => (
  {}
)

const mapStateToProps = (state) => (
  {
    machineAssemblies: state.machine.assemblies,
    remainingAssemblies: state.model.remainingAssemblies
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(StatusButton);