import React, { Component } from 'react';
import { BrowserRouter as Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import GraphicLoading from '../components/GraphicLoading'

class Proposals extends Component {

  state = { proposals: [] }

  componentDidMount() {
    fetch("https://proposals-api.herokuapp.com/proposals")
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
              <h1 className="cursor-pointer" id={proposal.id} onClick={this.handleProposalClick}>{proposal.customer_name}</h1>
            </NavLink>
          </div>
        )
      })
    } else {
      return(
        <div className="w-full h-full flex items-center content-center justify-center place-content-center place-items-center">
          <GraphicLoading />
        </div>
      )
    }
  }

  render() {
    return (
      <div className="px-8 py-8 w-full h-full">
        {this.renderProposalCards()}
      </div>
    );
  }
}

export default Proposals;