import React, { Component } from 'react';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { connect } from 'react-redux'
pdfMake.vfs = pdfFonts.pdfMake.vfs;


const data = {
  content
}


const pdf = () => {
    return data
}

export default pdf;