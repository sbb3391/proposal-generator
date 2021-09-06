import React, { Component } from 'react';
import { connect } from 'react-redux';

class MachineSave extends Component {
  closeMachineSave = (event) => {
    debugger;
    if (event.target.id === "machine-save" ) {
      this.props.toggleMachineSave()
    }
  }

  render() {
    return (
      <div onClick={this.closeMachineSave} id="machine-save" className="flex w-full h-full relative z-20">
        <div className="w-1/2 h-2/3 mx-auto border-black border-2 place-self-center bg-white py-4">
          <div>
            
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {}
)

const mapDispatchToProps = dispatch => (
  {
    toggleMachineSave: () => dispatch({type: 'TOGGLE_MACHINE_SAVE'})
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(MachineSave);