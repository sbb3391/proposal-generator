import React, { Component } from 'react';
import { connect } from 'react-redux';
import PartsForAssembly from './PartsForAssembly'
import MachineAssemblies from './MachineAssemblies'

class EnginePick extends Component {

  state = {
    selectedParts: [],
    activeAssemblyId: null
  }

  componentDidMount() {
    fetch(`http://localhost:3000/models/${this.props.modelId}/assemblies`)
    .then(resp => resp.json())
    .then(json => {
      this.props.addAllAssemblies(json)
    })
  
  }

  removeWindow = () => {
    this.props.removeClickedId()
  }

  handleAdd = (e) => {
    // getting the index of the clicked assembly in the array of all assemblies in state
    const clickedAssemblyId = e.target.id

    this.props.addAssembly(this.props.allAssemblies.find( assembly => assembly.id == clickedAssemblyId))
  }

  renderPartsForAssembly = () => {
    if (this.props.clickedId) {
      const assemblies = this.props.allAssemblies
      const selectedAssembly = assemblies.find( assembly => assembly.id == this.props.clickedId)

      const requiredItems = selectedAssembly.items.filter( item => item.required !== false)
      
      // if the selected assembly has one or more unrequired items
      if (requiredItems.length !== selectedAssembly.items.length) {
        return(<PartsForAssembly assemblyId={this.props.clickedId} removeWindow={this.removeWindow} step={this.props.step}/>)
      }
    }
  }

  renderAssemblies = () => {
    const stepAssemblies = this.props.remainingAssemblies.filter( assembly => assembly.assembly_type === this.props.step)

    return stepAssemblies.map( assembly => {
      return(
        <div className="assembly bg-blue-200 w-1/6 h-36 flex flex-col place-items-center justify-center border rounded-md mr-2 mb-2" id={assembly.id}>
          <h1 className="text-center font-bold cursor-pointer text-md" id={assembly.id} onClick={this.handleAdd}>{assembly.name}</h1>
          <div className="flex space-x-1 mt-2">
            <button className="border border-black rounded-md text-xs p-1">What's This?</button>
          </div>
        </div>
      )
    })
  }

  renderNextButton = () => {
    if (this.props.nextStep === "submit") {

    } else {
      return(
        <button onClick={() => this.props.updateStep(this.props.nextStep)} className="border border-black rounded-md w-36">Next</button>
      ) 
    }
  }

  render() {
    return (
      <div className="w-full h-full relative flex flex-col">
        <div className="absolute z-10 w-full mx-auto h-full flex">
          <div className="flex flex-col w-2/3 h-full space-y-16 place-items-center">
            <div className="mt-4 flex space-x-8">
              <button className="border border-black rounded-lg p-2">Main Unit</button>
              <span className="text-4xl">&#x2192;</span>
              <button className="border border-black rounded-lg p-2">Paper Handling</button>
              <span className="text-4xl">&#x2192;</span>
              <button className="border border-black rounded-lg p-2">Paper Output</button>
              <span className="text-4xl">&#x2192;</span>
              <button className="border border-black rounded-lg p-2">Finishing</button>
              <span className="text-4xl">&#x2192;</span>
              <button className="border border-black rounded-lg p-2">Print Controller</button>
            </div>
            <h1 className="text-2xl text-center">Select {this.props.step} Assemblies:</h1>
            <div className="w-5/6 flex flex-wrap space" id="select-assemblies">
              {this.renderAssemblies()}
            </div>
            <div className="flex space-x-4">
              <button onClick={() => this.props.updateStep(this.props.prevStep)} className="border border-black rounded-md w-36">Previous</button>
              {this.renderNextButton()}
            </div>
          </div>
          <div className="w-1/4 h-full mx-auto h-full flex flex-col border border-black" id="selected-items">
            <MachineAssemblies />
          </div>

        </div>
        {this.renderPartsForAssembly()}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    modelId: state.modelId,
    clickedId: state.clickedAssemblyId,
    allAssemblies: state.model.allAssemblies,
    remainingAssemblies: state.model.remainingAssemblies
  }
)

const mapDispatchToProps = dispatch => (
  {
    addAllAssemblies: assemblies => dispatch({type: 'ADD_ALL_ASSEMBLIES', assemblies: assemblies}),
    addAssembly: assembly => dispatch({type: 'ADD_ASSEMBLY', assembly: assembly}),
    removeClickedId: () => dispatch({type: 'REMOVE_CLICKED_ID', id: ""})
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(EnginePick)
