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
        console.log("log")
        return(<EnginePick key='2' updateStep={this.updateStep} step={"main unit"} nextStep={"pickPaper"} prevStep={"pickMachine"} />)
      case 'pickPaper':
        return(<EnginePick key='3' updateStep={this.updateStep} step={"paper handling"} nextStep={"pickFinishing"} prevStep={"pickEngine"}/>)
      case 'pickFinishing':
        return(<EnginePick key='4' updateStep={this.updateStep} step={"finishing"} nextStep={"pickController"} prevStep={"pickPaper"}/>)
      case 'pickController':
        return(<EnginePick key='5' updateStep={this.updateStep} step={"controller"} nextStep={""} prevStep={"pickFinishing"} />)
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