import React, { Component } from 'react';
import { connect } from 'react-redux';

class StatusButton extends Component {

  render() {
    const remainingAssembliesOfThisType = this.props.remainingAssemblies.filter( assembly => assembly.assembly_type == this.props.text)
    const remainingAssembliesBelongingToPickOneGroup = remainingAssembliesOfThisType.filter( assembly => assembly.pick_one_group )

    const style = {}

    this.props.text === this.props.step ? style.borderWidth = "6px" : style.borderWidth = "thin"

    return (
      <>
        { remainingAssembliesBelongingToPickOneGroup.length === 0 ?
          <button className="cursor-default border border-black rounded-lg p-2 text-white bg-green-500 font-bold" style={style}>{this.props.text}</button> :
          <button className="cursor-default border border-black rounded-lg p-2 text-white bg-red-500 font-bold" style={style}>{this.props.text}</button> 
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