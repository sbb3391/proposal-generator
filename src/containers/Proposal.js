import React, { Component } from 'react';
import { fetchProposal } from '../actions/fetchProposal'
import { connect } from 'react-redux';
import Machine from './Machine'
import ProposalOverview from '../components/ProposalOverview'
import { saveProposalMachine } from '../actions/saveProposalMachine'
import GraphicLoading from '../components/GraphicLoading'

class Proposal extends Component {

  componentDidMount() {
    this.props.fetchProposal(this.props.match.params.id)
  }

  renderMachines = () => {
    if (Object.keys(this.props.proposal).length > 0 ) {
      return this.props.machines.map( machine => {
        return <Machine machine={machine} changePrice={this.props.changeProposalMachineItemPrice} 
        saveMachine={this.props.saveProposalMachine} addMachine={null} match={this.props.match} proposal={true}/>
      })
    }
  }

  render() {
    console.log("Proposal", "Proposal Rendered")
    if (this.props.requesting) {
      return(
        <div className="w-full h-full flex items-center content-center justify-center place-content-center place-items-center">
          <GraphicLoading />
        </div>
      )
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
    machines: state.proposal.machines,
    proposal: state.proposal,
    requesting: state.proposal.requesting
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Proposal);