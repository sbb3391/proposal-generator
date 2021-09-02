import React, { Component } from 'react';
import PickModel from '../components/PickModel'
import EnginePick from '../components/EnginePick'
import { connect } from 'react-redux';



class NewMachine extends Component {

  getStartingStep = () => {
    if (this.props.type === "new") {
      return "pickMachine"
    } else if (this.props.type === "edit" ) {
      return "pickEngine"
    }
  }

  state = {
    step: this.getStartingStep()
  }


  updateStep = (newStep) => {
    this.setState({
      step: newStep
    })
  }

  renderComponent = () => {
    console.log("NewMachine Renders")
    switch (this.state.step) {
      case 'pickMachine':
        return(<PickModel key='1' updateStep={this.updateStep}/>)
      case 'pickEngine':
        return(<EnginePick key='2' updateStep={this.updateStep} step={"main unit"} nextStep={"pickPaper"} prevStep={"pickMachine"} type={this.props.type}/>)
      case 'pickPaper':
        return(<EnginePick key='3' updateStep={this.updateStep} step={"paper handling"} nextStep={"pickOutput"} prevStep={"pickEngine"} type={this.props.type}/>)
      case 'pickOutput':
        return(<EnginePick key='4' updateStep={this.updateStep} step={"paper output"} nextStep={"pickFinishing"} prevStep={"pickPaper"} type={this.props.type}/>)  
      case 'pickFinishing':
        return(<EnginePick key='5' updateStep={this.updateStep} step={"finishing"} nextStep={"pickController"} prevStep={"pickOutput"} type={this.props.type}/>)
      case 'pickController':
        return(<EnginePick key='6' updateStep={this.updateStep} step={"controller"} nextStep={"submit"} prevStep={"pickFinishing"} type={this.props.type}/>)
      default:
        return(<PickModel key='error'/>)
    }
  }

  render() {
    console.log("NewMachine Renders")
    return (
      <div className="w-full h-full flex">
          {this.renderComponent()}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    store: state
  }
)

const mapDispatchToProps = dispatch => (
  {
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(NewMachine);