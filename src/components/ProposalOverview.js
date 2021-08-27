import React, { Component } from 'react';
import { proposalPdf } from '../pdf/proposalPdf'
import { renderToString } from 'react-dom/server'
import { connect } from 'react-redux';

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

  render() {
    return (
      <>
      <div>
        <h1>Total Cost:</h1>
      </div>
      <div>
        <button onClick={this.createPdf} className="border-black border-2 rounded-md p-2">Open PDF</button>
      </div>
      <div>
        <button onClick={this.props.togglePopWindow} className="border-black border-2 rounded-md p-2">Edit Pricing Options</button>
      </div>
      </>
    );
  }
}

const mapStateToProps = state => (
  {}
)

const mapDispatchToProps = dispatch => (
  {
    togglePopWindow: () => dispatch({type: 'TOGGLE_POP_WINDOW'})
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(ProposalOverview);