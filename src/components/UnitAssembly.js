import React, { Component } from 'react';
import { connect } from 'react-redux';

class UnitAssembly extends Component {
  renderAssembliesAndItems = () => {
    debugger;
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
      <div>
        
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {}
)

const mapStateToProps = (state) => (
  {assemblies: state}
)

export default connect(mapDispatchToProps, mapStateToProps)(UnitAssembly);