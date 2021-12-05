import React, { Component } from 'react';
import { proposalPdf } from '../pdf/proposalPdf'
import { renderToString } from 'react-dom/server'
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import { deleteProposal } from '../actions/fetches'
import { useHistory } from 'react-router-dom'

// required for PDFMake
import { buildQueries } from "@testing-library/react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import numeral from 'numeral';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ProposalOverview = (props) => {
  const history = useHistory();

  const createPdf = () => {
    if (props.proposal.machines) {
      pdfMake.createPdf(proposalPdf(props.proposal.machines)).open()
    }
  }

  const pricing = () => {
    const purchase = props.proposal.sellingPrice
    return(
      <div className="flex flex-col w-full place-self-center">
        <span className="text-sm">Purchase: {numeral(purchase).format('$0,0.00')} </span>
        <span className="text-sm">60 Month Lease: {numeral(purchase * .0205).format('$0,0.00')}/month</span>
        <span className="text-sm">48 Month Lease: {numeral(purchase * .0226).format('$0,0.00')}/month</span>
      </div>
    )
  }

  const deleteAProposal = (event) => {
    const proposalId = event.target.id

    deleteProposal(proposalId)
    .then( () => {
      history.push('/customers')
    })
  }

  return (
    <>
    <div>
      {props.proposal.machines ? pricing() : null}
    </div>
    <div>
      <button onClick={createPdf} className="border-black border-2 rounded-md p-2">Open PDF</button>
    </div>
    <div>
      <button onClick={props.togglePopWindow} className="border-black border-2 rounded-md p-2">Edit Pricing Options</button>
    </div>
    <div>
      <NavLink to={`/proposals/${props.match.params.id}/machine/new`}>
        <button className="border-black border-2 rounded-md p-2">Add Machine</button>
      </NavLink>
    </div>
    <div>
      <button onClick={(event) => deleteAProposal(event)} id={props.proposal.id} className="border-black border-2 rounded-md p-2 bg-red-500 text-white bold cursor-pointer">Delete Proposal</button>
    </div>
    </>
  );
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