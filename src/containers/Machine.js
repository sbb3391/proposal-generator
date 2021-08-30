import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom'
import MachineOverview from '../components/MachineOverview'
import MachinePricing from '../components/MachinePricing'

class Machine extends Component {

  componentDidMount() {

    // we don't want to fetch for a machine if we're viewing a proposal. The machines are generated
    // in Proposal component and are already in the redux store
    if ( !this.props.proposal ) {
      fetch(`http://localhost:3000/machines/${this.props.match.params.id}`)
      .then(resp => resp.json())
      .then( json => {
        this.props.addMachine(json)
      })
    }
  }

  render() {
    if ( this.props.machine.assemblies.length === 0 ) {
      return <h1>Waiting</h1>
    } else if (this.props.machine.requesting) {
      debugger;
      return(
        <div className="w-full h-full flex justify-around">
          <div className="w-3/5 mx-auto py-10 my-3 border-2 border-grey-200 rounded-lg text-center">
            <h1>Machine Loading...</h1>
          </div>
          <div className="w-1/3 h-full flex place-items-center space-y-3">
            <div className="flex flex-col space-y-3 h-1/3 w-full">
              <h1>Machine Loading...</h1>
            </div>
          </div>
        </div>     
      )       
    } else {
      return (
        <div className="w-full h-full flex justify-around">
          <MachinePricing machine={this.props.machine} changeItemPrice={this.props.changePrice} />
          <div className="w-1/3 h-full flex place-items-center space-y-3">
            <div className="flex flex-col space-y-3 h-1/3 w-full">
              <MachineOverview machine={this.props.machine} saveMachine={this.props.saveMachine}/>
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