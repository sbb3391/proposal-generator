import React, { Component } from 'react';
import { fetchProposal } from '../actions/fetchProposal'
import { connect } from 'react-redux';
import Machine from './Machine'
import ProposalOverview from '../components/ProposalOverview'
import { saveProposalMachine } from '../actions/saveProposalMachine'

class Proposal extends Component {

  componentDidMount() {
    this.props.fetchProposal(this.props.match.params.id)
  }

  renderMachines = () => {
    if (Object.keys(this.props.proposal).length > 0 ) {
      return this.props.proposal.machines.map( machine => {
        return <Machine machine={machine} changePrice={this.props.changeProposalMachineItemPrice} 
        saveMachine={this.props.saveProposalMachine} addMachine={null} match={this.props.match} proposal={true}/>
      })
    }
  }

  render() {
    if (this.props.requesting) {
      return <h1>please wait. Proposal loading....</h1>
    } else {
      return (
        <div className="w-full h-full flex flex-col">
          <div className="border-black border-2 w-11/12 h-1/6 flex mx-auto rounded-md justify-around items-center content-center">
            <ProposalOverview />
          </div>
          <div className="w-11/12 h-5/6">
            { this.renderMachines() }
          </div>
        </div>
      );
    }
  }

}

const mapDispatchToProps = dispatch => (
  {
    fetchProposal: (proposalId) => dispatch(fetchProposal(proposalId)),
    changeProposalMachineItemPrice: item => dispatch({type: 'CHANGE_PROPOSAL_MACHINE_ITEM_PRICE', item: item}),
    saveProposalMachine: machine => dispatch(saveProposalMachine(machine))
  }
)

const mapStateToProps = state => (
  { 
    proposal: state.proposal,
    requesting: state.requesting
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Proposal);