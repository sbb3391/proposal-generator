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
      }, 3000)
    });
  }

  let dd = {
    content: [
    ]
  }

  machinesArray.map( machine => {
    waitForDd(machine).then( resp => {
      resp.content.forEach( i => {
        dd.content.push(i)
      })
    })
  })

  if (type === "preview") {
    dd = {
      ...dd,
      watermark: { text: 'Preview', angle: 70 }
    }
  }

  setTimeout(() => {
    pdfMake.createPdf(dd).open()
  }, 5000)
}

export { proposalPdf }