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
      const stepAssemblies = json.filter( assembly => assembly.assembly_type === this.props.step)

      this.setState({
        selectAssemblies: stepAssemblies
      })
    })
  
  }

  removeWindow = () => {
    this.setState({
      activeAssemblyId: null
    })
  }

  handleAdd = (e) => {
    this.setState({
      activeAssemblyId: e.target.id
    })
  }

  renderPartsForAssembly = () => {
    if (this.state.activeAssemblyId) {
      return(<PartsForAssembly assemblyId={this.state.activeAssemblyId} removeWindow={this.removeWindow} step={this.props.step}/>)
    }
  }


  renderAssemblies = () => {
    return this.state.selectAssemblies.map( assembly => {
      return(
        <div className="assembly bg-blue-200 w-1/6 h-32 flex place-items-center justify-center cursor-pointer border rounded-md" id={assembly.id} onClick={this.handleAdd}>
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
            <div className="mt-4 flex space-x-8">
              <button className="border border-black rounded-lg p-2">Main Unit</button>
              <span className="text-4xl">&#x2192;</span>
              <button className="border border-black rounded-lg p-2">Paper Handling</button>
              <span className="text-4xl">&#x2192;</span>
              <button className="border border-black rounded-lg p-2">Finishing</button>
              <span className="text-4xl">&#x2192;</span>
              <button className="border border-black rounded-lg p-2">Print Controller</button>
            </div>
            <h1 className="text-2xl text-center h-12">Select {this.props.step} Assemblies:</h1>
            <div className="w-3/4 flex flex-wrap space-x-6" id="select-assemblies">
              {this.renderAssemblies()}
            </div>
            <div className="flex space-x-4">
              <button onClick={() => this.props.updateStep(this.props.prevStep)} className="border border-black rounded-md w-36">Previous</button>
              <button onClick={() => this.props.updateStep(this.props.nextStep)} className="border border-black rounded-md w-36">Next</button>
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
