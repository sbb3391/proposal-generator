import React, { Component } from 'react';
import { connect } from 'react-redux';

class UnitAssembly extends Component {

  renderAssembliesAndItems = () => {
    const filteredAssemblies = this.props.assemblies.filter( assembly => assembly.assembly_type == this.props.assemblyName)

    return filteredAssemblies.map( assembly => {
      return(
        <div className="px-1 w-11/12 mx-auto border rounded-md bg-blue-100 flex flex-col">
          <h3>{assembly.name}</h3>
          {assembly.items.map( item => {
            return(
              <span className="text-xs pl-4">{item.description}</span>
            )
          })}
        </div>
      )
    })
  }

  render() {
    return (
      <div className="flex flex-col space-y-1 pt-2">
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