import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom'
import MachineOverview from '../components/MachineOverview'
import MachinePricing from '../components/MachinePricing'

class Machine extends Component {

  componentDidMount() {
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

  render() {
    if ( this.props.machine.assemblies.length === 0 ) {
      return <h1>Waiting</h1>
    } else {
      return (
        <div className="w-full h-full flex justify-around">
          <MachinePricing machine={this.props.machine} changeItemPrice={this.props.changePrice} />
          <div className="w-1/3 h-full flex place-items-center space-y-3">
            <div className="flex flex-col h-1/3 w-full">
              <MachineOverview machineAssemblies={this.props.machine.assemblies} />
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => (
  {}
)
const mapDispatchToProps = dispatch => (
  {
    addMachine: machine => dispatch({type: 'ADD_MACHINE', machine: machine}),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Machine);