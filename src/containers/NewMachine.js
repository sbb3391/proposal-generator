import React, { Component } from 'react';
import PickModel from '../components/PickModel'


class NewMachine extends Component {

  state = {
    step: "pick_machine"
  }

  renderComponent = () => {
    switch (this.state.step) {
      case 'pick_machine':
        return(<PickModel />)
      default:
        return(<PickModel />)
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