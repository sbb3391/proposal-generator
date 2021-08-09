import React, { Component } from 'react';
import { connect } from 'react-redux';
import PartsForAssembly from './PartsForAssembly'
import MachineAssemblies from './MachineAssemblies'
import StatusButton from './statusButton'
import CompleteMachine from './CompleteMachine'

class EnginePick extends Component {

  state = {
    selectedParts: [],
    activeAssemblyId: null
  }

  componentDidMount() {
    // only fetch once, on the first render to get all the assemblies
    if (this.props.allAssemblies.length === 0) {
      fetch(`http://localhost:3000/models/${this.props.modelId}/assemblies`)
      .then(resp => resp.json())
      .then(json => {
        debugger;
        this.props.addAllAssemblies(json)
      })
    }
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
        <div className="relative assembly bg-blue-200 w-40 h-36 flex flex-col place-items-center justify-center border rounded-md mr-2 mb-2" id={assembly.id}>
          <h1 className="text-center font-bold cursor-pointer text-md hover:underline" id={assembly.id} onClick={this.handleAdd}>{assembly.name}</h1>
          <span className="absolute right-1 bottom-1 text-md cursor-pointer text-lg transform duration-75 hover:-translate-y-1">&#128712;</span>
        </div>
      )
    })
  }

  renderNextButton = () => {
    if (this.props.nextStep === "submit") {

    } else {
      return(
        <div className="flex place-items-center">
          <span className="text-6xl cursor-pointer" onClick={() => this.props.updateStep(this.props.nextStep)}>&#129185;</span>
        </div>
        // <button onClick={() => this.props.updateStep(this.props.nextStep)} className="border border-black rounded-md w-36">Next</button>
      ) 
    }
  }

  render() {
    return (
      <div className="w-full h-full relative flex flex-col">
        <div className="absolute z-10 w-full mx-auto h-full flex">
          <div className="flex flex-col w-2/3 h-full space-y-10 place-items-center">
            <div className="mt-4 flex space-x-8">
              <StatusButton text="main unit"/>
              <span className="text-4xl">&#x2192;</span>
              <StatusButton text="paper handling"/>
              <span className="text-4xl">&#x2192;</span>
              <StatusButton text="paper output"/>
              <span className="text-4xl">&#x2192;</span>
              <StatusButton text="finishing"/>
              <span className="text-4xl">&#x2192;</span>
              <StatusButton text="controller"/>
            </div>
            <h1 className="text-2xl text-center h-8">Select {this.props.step} Assemblies:</h1>
            <div className="flex w-5/6 h-1/2">
              <div className="flex place-items-center">
                <span className="text-6xl cursor-pointer" onClick={() => this.props.updateStep(this.props.prevStep)}>&#129184;</span>
              </div>
              <div className="w-4/5 flex flex-wrap space mx-auto" id="select-assemblies">
                {this.renderAssemblies()}
              </div>
                {this.renderNextButton()}
            </div>
            < CompleteMachine />
          </div>
          <div className="w-1/4 mx-auto h-full flex flex-col border-2 border-grey-400 rounded-md overflow-auto py-4 space-y-2" id="selected-items">
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
