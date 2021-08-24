import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom'
import MachineOverview from '../components/MachineOverview'
import MachinePricing from '../components/MachinePricing'

class Machine extends Component {

  componentDidMount() {
    if ( !this.props.machine ) {
      fetch(`http://localhost:3000/machines/${this.props.match.params.id}`)
      .then(resp => resp.json())
      .then( json => {
  
        json.assemblies.forEach( assembly => assembly.items.forEach( i => {
          i.unitPrice = i.branchFloor
        }))
  
        const x = json
  
        this.props.addMachine(x)
      })
    }
  }

  render() {
    debugger;
    return (
      <div className="w-full h-full flex justify-around">
        <MachinePricing machine={ this.props.machine ? this.props.machine : this.props.storeMachine } changeItemPrice={this.props.changeItemPrice} />
        <div className="w-1/3 h-full flex flex-col space-y-3">
          <MachineOverview machineAssemblies={ this.props.machine ? this.props.machine.assemblies : this.props.storeMachine.assemblies } />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    storeMachine: state.machine
  }
)

const mapDispatchToProps = dispatch => (
  {
    addMachine: machine => dispatch({type: 'ADD_MACHINE', machine: machine}),
    changeItemPrice: item => dispatch({type: 'CHANGE_ITEM_PRICE', item: item})
  }
)



export default connect(mapStateToProps, mapDispatchToProps)(Machine);