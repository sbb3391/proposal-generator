import { machinePdf } from './machinePdf'

const proposalPdf = (machinesArray) => {

  const dd = {
    content: []
  }

  machinesArray.map( machine => {
    machinePdf(machine).content.forEach( i => {
      dd.content.push(i)
    })
  })

  return dd
}

export { proposalPdf }