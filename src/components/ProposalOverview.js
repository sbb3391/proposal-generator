import React, { Component } from 'react';
import { proposalPdf } from '../pdf/proposalPdf'
import PopWindow from '../containers/PopWindow'
import { renderToString } from 'react-dom/server'

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

  renderPopWindow = () => {
    // How can I render this <PopWindow /> component without maninpulating the Dom directly? The challenge is that I want to 
    // place this component at the root of the DOM tree (App Div)
    const App = document.querySelector(".App")
    App.classList.add("overflow-hidden", "filter", "blur-md")
    let popWindow = renderToString(<PopWindow />)

    App.insertAdjacentHTML("afterend", popWindow)

    popWindow = document.querySelector("#popWindow")
    popWindow.addEventListener("click", function() {
      App.classList.remove("overflow-hidden", "filter", "blur-md")
      popWindow.remove()
    })
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
        <button onClick={this.renderPopWindow} className="border-black border-2 rounded-md p-2">Edit Pricing Options</button>
      </div>
      </>
    );
  }
}

export default ProposalOverview;