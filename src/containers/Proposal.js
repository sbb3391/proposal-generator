import React, { Component } from 'react';
import { fetchProposal } from '../actions/fetchProposal'
import { connect } from 'react-redux';
import Machine from './Machine'
import ProposalOverview from '../components/ProposalOverview'


class Proposal extends Component {

  componentDidMount() {
    this.props.fetchProposal(this.props.match.params.id)
  }

  render() {
    if (this.props.requesting) {
      return <h1>please wait. Proposal loading....</h1>
    } else {
      return (
        <div className="w-full h-full flex flex-col">
          <div className="py-8 border-black border-2 w-11/12 h-1/6 flex mx-auto rounded-md justify-around">
            <ProposalOverview proposal={this.props.proposal} />
          </div>
        </div>
      );
    }
  }

}

const mapDispatchToProps = dispatch => (
  {
    fetchProposal: (proposalId) => dispatch(fetchProposal(proposalId)),
  }
)

const mapStateToProps = state => (
  { proposal: state.proposal,
    requesting: state.requesting
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Proposal);