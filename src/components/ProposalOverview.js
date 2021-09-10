import React, { Component } from 'react';
import { proposalPdf } from '../pdf/proposalPdf'
import { renderToString } from 'react-dom/server'
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";

// required for PDFMake
import { buildQueries } from "@testing-library/react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import numeral from 'numeral';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class ProposalOverview extends Component {
  createPdf = () => {
    if (this.props.proposal.machines) {
      pdfMake.createPdf(proposalPdf(this.props.proposal.machines)).open()
    }
  }

  pricing = () => {
    const purchase = this.props.proposal.sellingPrice
    return(
      <div className="flex flex-col w-full place-self-center">
        <span className="text-sm">Purchase: {numeral(purchase).format('$0,0.00')} </span>
        <span className="text-sm">60 Month Lease: {numeral(purchase * .0205).format('$0,0.00')}/month</span>
        <span className="text-sm">48 Month Lease: {numeral(purchase * .0226).format('$0,0.00')}/month</span>
      </div>
    )
  }

  render() {
    return (
      <>
      <div>
        {this.props.proposal.machines ? this.pricing() : null}
      </div>
      <div>
        <button onClick={this.createPdf} className="border-black border-2 rounded-md p-2">Open PDF</button>
      </div>
      <div>
        <button onClick={this.props.togglePopWindow} className="border-black border-2 rounded-md p-2">Edit Pricing Options</button>
      </div>
      <div>
        <NavLink to={`/proposals/${this.props.match.params.id}/machine/new`}>
          <button className="border-black border-2 rounded-md p-2">Add Machine</button>
        </NavLink>
      </div>
      </>
    );
  }
}

const mapStateToProps = state => (
  {
    proposal: state.proposal
  }
)

const mapDispatchToProps = dispatch => (
  {
    togglePopWindow: () => dispatch({type: 'TOGGLE_POP_WINDOW'})
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(ProposalOverview);