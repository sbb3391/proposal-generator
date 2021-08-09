import React, { Component } from 'react';
import PickModel from '../components/PickModel'
import EnginePick from '../components/EnginePick'


class NewMachine extends Component {

  state = {
    step: "pickMachine"
  }

  updateStep = (newStep) => {
    this.setState({
      step: newStep
    })
  }

  renderComponent = () => {
    switch (this.state.step) {
      case 'pickMachine':
        return(<PickModel key='1' updateStep={this.updateStep}/>)
      case 'pickEngine':
        return(<EnginePick key='2' updateStep={this.updateStep} step={"main unit"} nextStep={"pickPaper"} prevStep={"pickMachine"} />)
      case 'pickPaper':
        return(<EnginePick key='3' updateStep={this.updateStep} step={"paper handling"} nextStep={"pickOutput"} prevStep={"pickEngine"}/>)
      case 'pickOutput':
        return(<EnginePick key='4' updateStep={this.updateStep} step={"output"} nextStep={"pickFinishing"} prevStep={"pickPaper"}/>)  
      case 'pickFinishing':
        return(<EnginePick key='5' updateStep={this.updateStep} step={"finishing"} nextStep={"pickController"} prevStep={"pickOutput"}/>)
      case 'pickController':
        return(<EnginePick key='6' updateStep={this.updateStep} step={"controller"} nextStep={"submit"} prevStep={"pickFinishing"} />)
      default:
        return(<PickModel key='error'/>)
    }
  }

  render() {
    return (
      <div className="w-full h-full flex">
          {this.renderComponent()}
      </div>
    );
  }
}

export default NewMachine;