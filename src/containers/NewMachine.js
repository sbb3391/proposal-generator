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
    } else if (this.props.type === "preview") {
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
    switch (this.state.step) {
      case 'pickMachine':
        return(<PickModel key='1' updateStep={this.updateStep}/>)
      case 'pickEngine':
        return(<EnginePick match={this.props.match} key='2' updateStep={this.updateStep} step={"main unit"} nextStep={"pickPaper"} prevStep={"pickMachine"} type={this.props.type}/>)
      case 'pickPaper':
        return(<EnginePick match={this.props.match} key='3' updateStep={this.updateStep} step={"paper handling"} nextStep={"pickOutput"} prevStep={"pickEngine"} type={this.props.type}/>)
      case 'pickOutput':
        return(<EnginePick match={this.props.match} key='4' updateStep={this.updateStep} step={"paper output"} nextStep={"pickFinishing"} prevStep={"pickPaper"} type={this.props.type}/>)  
      case 'pickFinishing':
        return(<EnginePick match={this.props.match} key='5' updateStep={this.updateStep} step={"finishing"} nextStep={"pickController"} prevStep={"pickOutput"} type={this.props.type}/>)
      case 'pickController':
        return(<EnginePick match={this.props.match} key='6' updateStep={this.updateStep} step={"controller"} nextStep={"submit"} prevStep={"pickFinishing"} type={this.props.type}/>)
      default:
        return(<PickModel key='error'/>)
    }
  }

  render() {
    debugger;
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