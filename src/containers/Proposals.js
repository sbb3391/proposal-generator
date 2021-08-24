import React, { Component } from 'react';
import { BrowserRouter as Route } from "react-router-dom";
import { NavLink } from "react-router-dom";

class Proposals extends Component {

  state = { proposals: [] }

  componentDidMount() {
    fetch("http://localhost:3000/proposals")
    .then( resp => resp.json())
    .then( json => {
      this.setState({proposals: json})
    })
  }

  renderProposalCards = () => {
    if (this.state.proposals.length > 0) {
      return this.state.proposals.map( proposal => {
        return(
          <div className="w-1/6 h-36 border-2 border-black rounded-md flex flex-col place-items-center">
            <NavLink to={`/proposals/${proposal.id}`} exact>
              <h1 className="cuursor-pointer" id={proposal.id} onClick={this.handleProposalClick}>{proposal.customer_name}</h1>
            </NavLink>
          </div>
        )
      })
    }
  }

  render() {
    return (
      <div className="px-8 py-8">
        {this.renderProposalCards()}
      </div>
    );
  }
}

export default Proposals;