import React, { Component } from 'react';
import UnitAssembly from './UnitAssembly'

class MachineAssemblies extends Component {
  render() {
    return (
      <>
        <UnitAssembly step={this.props.step} assemblyName ="engine" />
        <UnitAssembly step={this.props.step} assemblyName="main unit"/>
        <UnitAssembly step={this.props.step} assemblyName="paper handling"/>
        <UnitAssembly step={this.props.step} assemblyName="paper output"/>
        <UnitAssembly step={this.props.step} assemblyName="finishing"/>
        <UnitAssembly step={this.props.step} assemblyName="controller"/>
      </>
    );
  }
}

export default MachineAssemblies;