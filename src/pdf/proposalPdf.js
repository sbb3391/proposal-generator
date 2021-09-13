import { createPdf } from 'pdfmake/build/pdfmake';
import { machinePdf } from './machinePdf'

const proposalPdf = (machinesArray, type) => {

    let dd = {
      content: [
      ]
    }

  machinesArray.map( machine => {
    machinePdf(machine).content.forEach( i => {
      dd.content.push(i)
    })
  })

  if (type === "preview") {
    dd = {
      ...dd,
      watermark: { text: 'Preview', angle: 70 }
    }
    debugger;
  }

  return dd
}

export { proposalPdf }