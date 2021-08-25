import React, { Component } from 'react';
import { connect } from 'react-redux';
import PartsForAssembly from './PartsForAssembly'
import MachineAssemblies from './MachineAssemblies'
import StatusButton from './statusButton'
import CompleteButton from './CompleteButton'
import { fetchAssemblies } from '../actions/fetchAssemblies'



class EnginePick extends Component {

  state = {
    selectedParts: [],
    activeAssemblyId: null
  }

  componentDidMount() {
    // only fetch once, on the first render to get all the assemblies
    if (this.props.allAssemblies.length === 0) {
      this.props.fetchAssemblies(this.props.modelId)
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

    if (stepAssemblies.length > 0 ) {
      return stepAssemblies.map( assembly => {
        return(
          <div className="relative assembly bg-blue-200 w-40 h-36 flex flex-col place-items-center justify-center border rounded-md mr-2 mb-2 mt-5" id={assembly.id}>
            <h1 className="text-center font-bold cursor-pointer text-md hover:underline" id={assembly.id} onClick={this.handleAdd}>{assembly.name}</h1>
            <span className="absolute right-1 bottom-1 text-md cursor-pointer text-lg transform duration-75 hover:-translate-y-1">&#128712;</span>
          </div>
        )
      })
    } else {
      return(
        <div className="place-self-center w-3/4 h-18 mx-auto">
          <h1 className="text-5xl text-center">No Additional Options Available</h1>
        </div>
      )
    }

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

  renderCompleteButton = () => {
    if (this.props.remainingPickOneGroupIds.length === 0 ) {
      return <CompleteButton />
    }

    const button = document.querySelector("#complete-button")

    if (button) {
    }

    // window.onload(
    //   setIn
    // )
    // setInterval(() => {
    //   this.moveButtonUp(completeButton)
    // }, 500)
      
  }

  moveButtonUp = (button) => {
    button.class = "moving-button"

    setTimeout(() => button.class = "static-button", 200)
  }

  returnHTMLCheckmark = (argument) => {
    if (argument) {
      return "\u2705";
    } else {
      return "\u2610";
    }
  } 

  titleCase = (str) => {
    return str
        .split(' ')
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}
  
  renderPickOneGroups = () => {
    const pickOnes = this.props.allAssemblies.filter( assembly => assembly.assembly_type === this.props.step && assembly.pick_one_group )

    if ( pickOnes.length > 0 )
    return(
      <>
        <span className="text-center">Pick one of the following:</span>
        <div className="flex justify-center space-x-8">
          {
            pickOnes.map( assembly => {
              const findAssemblyInMachineAssemblies = this.props.machineAssemblies.find( machineAssembly => machineAssembly === assembly ) 
  
              return(
                <div className="flex space-x-2 border-2 border-grey-200 rounded-md p-2">
                  <span>{this.returnHTMLCheckmark(findAssemblyInMachineAssemblies)}</span>
                  <span className="text-xs w-36">{assembly.name}</span>
                </div>
              )
            })
          }
        </div>
      </>
    )
  }



  render() {
    debugger;
    if (this.props.requesting) {
      return <h1>Please wait - assemblies loading!</h1>
    } else {
      return (
        <div className="w-full h-full relative flex flex-col">
          <div className="absolute z-10 w-full mx-auto h-full flex">
            <div className="flex flex-col w-2/3 h-full space-y-5 place-items-center">
              <div className="mt-4 flex space-x-4">
                <StatusButton text="main unit"/>
                <span className="text-4xl">&#x2192;</span>
                <StatusButton text="paper handling"/>
                <span className="text-4xl">&#x2192;</span>
                <StatusButton text="paper output"/>
                <span className="text-4xl">&#x2192;</span>
                <StatusButton text="finishing"/>
                <span className="text-4xl">&#x2192;</span>
                <StatusButton text="controller"/>
                {this.renderCompleteButton()}
              </div>
              <h1 className="text-2xl text-center h-8 mt-4">{this.titleCase(this.props.step)}:</h1>
              <div className="w-2/3 h-12 flex flex-col justify-center space-x-8 space-y-1">
                {this.renderPickOneGroups()}
              </div>
              <div className="flex w-5/6 h-1/2 pt-4">
                <div className="flex place-items-center">
                  <span className="text-6xl cursor-pointer" onClick={() => this.props.updateStep(this.props.prevStep)}>&#129184;</span>
                </div>
                <div className="w-4/5 flex flex-wrap mx-auto" id="select-assemblies">
                  {this.renderAssemblies()}
                </div>
                  {this.renderNextButton()}
              </div>
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
}

const mapStateToProps = state => (
  {
    modelId: state.modelId,
    clickedId: state.clickedAssemblyId,
    allAssemblies: state.model.allAssemblies,
    remainingAssemblies: state.model.remainingAssemblies,
    remainingPickOneGroupIds: state.model.remainingPickOneGroupIds,
    machineAssemblies: state.machine.assemblies,
    requesting: state.requesting
  }
)

const mapDispatchToProps = dispatch => (
  {
    fetchAssemblies: (modelId) => dispatch(fetchAssemblies(modelId)),
    addAssembly: assembly => dispatch({type: 'ADD_ASSEMBLY', assembly: assembly}),
    removeClickedId: () => dispatch({type: 'REMOVE_CLICKED_ID', id: ""})
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(EnginePick)
