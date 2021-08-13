import React, { Component } from 'react';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


const data = {
  content
}


class Pdf extends Component {
  render() {
    return data
  }
}

export default Pdf;