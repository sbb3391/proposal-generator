import React, { Component } from 'react';
import { connect } from 'react-redux';
import PartsForAssembly from '../components/PartsForAssembly'

class EnginePick extends Component {

  state = {
    selectAssemblies: [],
    selectedParts: [],
    activeAssemblyId: null
  }

  componentDidMount() {
    console.log("mounted")
    fetch(`http://localhost:3000/models/${this.props.modelId}/assemblies`)
    .then(resp => resp.json())
    .then(json => {
      const mainUnitAssemblies = json.filter( assembly => assembly.assembly_type === "main unit")

      this.setState({
        selectAssemblies: mainUnitAssemblies
      })
    })
  
  }

  handleAdd = (e) => {
    debugger;
    this.setState({
      activeAssemblyId: e.target.id
    })
  }

  renderPartsForAssembly = () => {
    if (this.state.activeAssemblyId) {
      return(<PartsForAssembly assemblyId={this.state.activeAssemblyId}/>)
    }
  }


  renderAssemblies = () => {
    return this.state.selectAssemblies.map( assembly => {
      return(
        <div className="assembly bg-blue-200 w-1/6 h-32 flex place-items-center justify-center cursor-pointer" id={assembly.id} onClick={this.handleAdd}>
          <h1 className="text-center font-bold" id={assembly.id}>{assembly.name}</h1>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="w-full h-full relative flex flex-col">
        <div className="absolute z-10 w-11/12 mx-auto h-3/4 flex">
          <div className="flex flex-col space-y-16 place-items-center">
            <h1 className="text-2xl text-center pt-8">Select Assemblies:</h1>
            <div className="w-3/4 flex flex-wrap space-x-6" id="select-assemblies">
              {this.renderAssemblies()}
            </div>
          </div>
          <div className="w-1/4 h-full" id="selected-items">

          </div>

        </div>
        {this.renderPartsForAssembly()}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {modelId: state.modelId}
)

const mapDispatchToProps = dispatch => (
  {}
)



export default connect(mapStateToProps, mapDispatchToProps)(EnginePick)
