import React, { Component } from 'react';
import { connect } from 'react-redux';

class UnitAssembly extends Component {

  renderAssembliesAndItems = () => {
    const filteredAssemblies = this.props.assemblies.filter( assembly => assembly.assembly_type == this.props.assemblyName)

    return filteredAssemblies.map( assembly => {
      return(
        <div>
          <h1>{assembly.name}</h1>
        </div>
      )
    })
  }

  render() {
    return (
      <>
        {this.renderAssembliesAndItems()}
      </>
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