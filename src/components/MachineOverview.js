import React, { Component } from 'react';
import numeral from 'numeral';
import Pdf from './Pdf'

class MachineOverview extends Component {
  render() {

    let priceArray = [];

    if (this.props.machineAssemblies.length > 0) {
      this.props.machineAssemblies.forEach(assembly => assembly.items.forEach( item => priceArray.push(item.branchFloor)))
    }

    const totalPrice = priceArray.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
    // const SellingTotal 
    return (
      <>
        <h1 className="text-center">Machine Overview</h1>
        <h1 className="text-center">Total Price: {numeral(totalPrice).format('$0,0.00')}</h1>
        <button onClick={this.generatePdf}>Generate PDF</button>
      </>
    );
  }
}

export default MachineOverview;