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
        return(<EnginePick key='2' updateStep={this.updateStep} step={"main unit"} />)
      default:
        return(<PickModel key='error'/>)
    }
  }

  render() {
    return (
      <div className="bg-blue-100 w-full h-full flex">
          {this.renderComponent()}
      </div>
    );
  }
}

export default NewMachine;