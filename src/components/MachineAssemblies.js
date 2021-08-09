import React, { Component } from 'react';
import UnitAssembly from './UnitAssembly'

class MachineAssemblies extends Component {
  render() {
    return (
      <>
        <UnitAssembly assemblyName="main unit"/>
        <UnitAssembly assemblyName="paper handling"/>
        <UnitAssembly assemblyName="paper output"/>
        <UnitAssembly assemblyName="finishing"/>
        <UnitAssembly assemblyName="controller"/>
      </>
    );
  }
}

export default MachineAssemblies;