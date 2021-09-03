import React, { Component } from 'react';
import { connect } from 'react-redux';

class UnitAssembly extends Component {

  removeAssemblyFromMachine = (event) => {
     const assembly = this.props.assemblies.find( assembly => assembly.id == event.target.dataset.assemblyId)

     this.props.removeAssembly(assembly, this.props.step)
  }

  removeItemFromAssembly = (event) => {
    const assemblyId = event.target.dataset.assemblyId
    const itemId = event.target.id

    const assembly = this.props.assemblies.find( assembly => assembly.id == assemblyId)

    this.props.removeItem(assembly, itemId)
  }

  toggleItemView = (event) => {
    event.target.parentElement.parentElement.querySelector(".items-container").classList.toggle("hidden")
  }

  renderAssembliesAndItems = () => {
    const filteredAssemblies = this.props.assemblies.filter( assembly => assembly.assembly_type == this.props.assemblyName)

    return filteredAssemblies.map( assembly => {
      return(
        <div className="px-1 pb-2 w-full mx-auto flex flex-col space-y-1">
          <div className="flex space-x-2">
            <span className="show cursor-pointer" onClick={this.toggleItemView}>&#9650;</span>
            { assembly.required_assembly ? <h3 className="mb-2 font-bold border rounded-md bg-blue-100 pl-1">{assembly.name} ({assembly.items.length} Items)</h3> : 
              <h3 data-assembly-id={assembly.id} className="mb-2 font-bold border rounded-md bg-blue-100 hover:text-color-red-500 cursor-pointer hover:underline hover:text-red-500 pl-1" onClick={this.removeAssemblyFromMachine}>{assembly.name} ({assembly.items.length} Items)</h3>
            }
          </div>
          <div className="items-container flex flex-col hidden">
            {assembly.items.map( item => {
              return(
                <div className="flex space-x-2">
                  { item.required ? <span className="inline-block align-top">&#9734;</span> : <span id={item.itemId} data-assembly-id={assembly.id} onClick={this.removeItemFromAssembly} className="text-xs cursor-pointer">&#10060;</span> }
                  <span className="text-xs">{item.description}</span>
                </div>

              )
            })}
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="w-11/12 mx-auto flex flex-col pt-2 space-y-1 border-2 border-grey-200 rounded-md">
        <h1 className="text-center pl-2 underline mb-1">{this.props.assemblyName}</h1>
        {this.renderAssembliesAndItems()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    removeAssembly: (assembly, step) => dispatch({type: "REMOVE_ASSEMBLY", assembly: assembly, step: step}),
    removeItem: (assembly, itemId) => dispatch({type: "REMOVE_ITEM", assembly: assembly, itemId: itemId})
  }
)

const mapStateToProps = (state) => (
  {assemblies: state.machine.assemblies}
)

export default connect(mapStateToProps, mapDispatchToProps)(UnitAssembly);