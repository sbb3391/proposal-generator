import React, { Component } from 'react';
import numeral from 'numeral';
import { machinePdf } from '../pdf/machinePdf'
import { connect } from 'react-redux';

class MachineOverview extends Component {

  renderSaveChangesButton = totalPrice => { 
    if (this.props.machine.sellingPrice !== totalPrice && this.props.machineType !== "preview") {

      return(<button onClick={() => this.props.saveMachine(this.props.machine)} className="border border-black rounded-md w-36 mx-auto bg-green-500 text-white bold cursor-pointer">Save Changes</button>)
    }
  }

  render() {
    console.log("Machine Overview Rerendering")
    let priceArray = [];

    if (this.props.machine.assemblies.length > 0) {
      this.props.machine.assemblies.forEach(assembly => assembly.items.forEach( item => priceArray.push(item.unitPrice)))
    }

    debugger;
    const totalPrice = numeral(priceArray.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)).format('000.00')
    
    return (
      <>
        <h1 className="text-center">Machine Overview</h1>
        <h1 className="text-center">Total Price: {numeral(totalPrice).format('$0,0.00')}</h1>
        <button onClick={() => machinePdf(this.props.machine)} className="border border-black rounded-md w-36 mx-auto">Generate PDF</button>
        { this.renderSaveChangesButton(totalPrice)}
      </>
    );
  }
}

const mapStateToProps = (state) => (
  {
  }
)

const mapDispatchToProps = (dispatch) => (
  {
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(MachineOverview);