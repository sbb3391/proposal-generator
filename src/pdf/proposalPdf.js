import { createPdf } from 'pdfmake/build/pdfmake';
import { machinePdf } from './machinePdf'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

const proposalPdf = (machinesArray, type) => {

  function waitForDd(machine) {  
    return new Promise(resolve => {
      let machineDd = machinePdf(machine)
      setTimeout(() => {
        resolve(machineDd)
      }, 2000)
    });
  }

  function addCoverPage() {
    let coverDd = {
      content: [
        
      ]
    }


    return coverDd
  }

  let dd = {
    content: [
    ]
  }
  
  // push all machine information into proposal
  machinesArray.map( machine => {
    waitForDd(machine).then( resp => {
      resp.content.forEach( i => {
        dd.content.push(i)
      })
    })
  })

  // add summary page
  
  if (type === "preview") {
    dd = {
      ...dd,
      watermark: { text: 'Preview', angle: 70 }
    }
  } else {
    // add cover page and final page
  }

  setTimeout(() => {
    pdfMake.createPdf(dd).open()
  }, 5000)
}

export { proposalPdf }