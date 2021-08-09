import React, { Component } from 'react';
import { connect } from 'react-redux';

class UnitAssembly extends Component {

  removeAssemblyFromMachine = () => {
    debugger;
  }

  renderAssembliesAndItems = () => {
    const filteredAssemblies = this.props.assemblies.filter( assembly => assembly.assembly_type == this.props.assemblyName)

    return filteredAssemblies.map( assembly => {
      return(
        <div className="px-1 w-11/12 mx-auto border rounded-md bg-blue-100 flex flex-col">
          { assembly.required_assembly ? <h3>{assembly.name}</h3> : 
            <h3 className="hover:text-color-red-500 cursor-pointer hover:underline hover:text-red-500" onClick={this.removeAssemblyFromMachine}>{assembly.name}</h3>
          }
          {assembly.items.map( item => {
            return(
              <div className="flex space-x-2">
                { item.required ? <span className="w-8"></span> : <span className="text-xs pl-4 cursor-pointer">&#10060;</span> }
                <span className="text-xs">{item.description}</span>
              </div>

            )
          })}
        </div>
      )
    })
  }

  render() {
    return (
      <div className="flex flex-col pt-2 space-y-1">
        <h1 className="text-center pl-2 underline mb-1">{this.props.assemblyName}</h1>
        {this.renderAssembliesAndItems()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {}
)

const mapStateToProps = (state) => (
  {assemblies: state.machine.assemblies}
)

export default connect(mapStateToProps, mapDispatchToProps)(UnitAssembly);