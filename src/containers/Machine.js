import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom'
import MachineOverview from '../components/MachineOverview'
import MachinePricing from '../components/MachinePricing'
// import Loading from '../components/Loading'
import GraphicLoading from '../components/GraphicLoading'
import { fetchMachine } from "../actions/fetches"

class Machine extends Component {

  componentDidMount() {

    let addMachine = this.props.addMachine

    // we don't want to fetch for a machine if we're viewing a proposal. The machines are generated
    // in Proposal component and are already in the redux store
    if ( this.props.machineType === "machine" ) {
      fetchMachine(this.props.match.params.id, addMachine)
    }
  }

  render() {
    if (this.props.machine.requesting) {
      return(
        <div className="w-full h-full flex justify-around">
          <div className="w-3/5 mx-auto py-10 my-3 border-2 border-grey-200 rounded-lg text-center flex items-center justify-center">
            <GraphicLoading />
          </div>
          <div className="w-1/3 h-full flex place-items-center space-y-3">
            <div className="flex flex-col space-y-3 h-1/3 w-full justify-center items-center">
              <GraphicLoading />
            </div>
          </div>
        </div>     
      ) 
    } else {
      return (
        <div className="w-full h-full flex justify-around">
          <MachinePricing machine={this.props.machine} changeItemPrice={this.props.changePrice} machineType={this.props.machineType} />
          <div className="w-1/3 h-full flex place-items-center space-y-3">
            <div className="flex flex-col space-y-3 h-1/3 w-full">
              <MachineOverview history={this.props.history} match={this.props.match} machine={this.props.machine} saveMachine={this.props.saveMachine} machineType={this.props.machineType}/>
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