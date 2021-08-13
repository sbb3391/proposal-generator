import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Navbar extends Component {

  makePdf = (docDefinition) => {
    pdfMake.createPdf(docDefinition).open();
  }

  docDefinition = {
    content: [
      {
      text: 'This paragraph uses header style and extends the alignment property',
      style: 'header',
      alignment: 'center'
      }
    ]
  }
  
  render() {
    debugger;
    return (
      <div className="flex space-x-10 justify-center py-4">
        <NavLink className="text-xl bg-blue-200 px-3 py-1" activeClassName="text-xl bg-blue-500 px-3 py-1" to='/' exact>Home</NavLink>
        <NavLink className="text-xl bg-blue-200 px-3 py-1" activeClassName="text-xl bg-blue-500 px-3 py-1" to="/new_machine">New Machine</NavLink>
        <NavLink className="text-xl bg-blue-200 px-3 py-1" activeClassName="text-xl bg-blue-500 px-3 py-1" to="/edit">Edit Proposal</NavLink>
        <button onClick={() => this.makePdf(this.docDefinition)}>Make PDF</button>
      </div>
    );
  }
  }

export default Navbar;