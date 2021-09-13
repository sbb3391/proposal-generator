import { createPdf } from 'pdfmake/build/pdfmake';
import { machinePdf } from './machinePdf'

const proposalPdf = (machinesArray) => {

    const dd = {
      content: [
        {
          svg: `<svg x="0" y="0" width="100%" height="100%">
                  <svg x="0" y="0" width="100%" height="100%">
                    <foreignobject width="100%" height="100%">
                  <img width="100%" src="https://upload.wikimedia.org/wikipedia/commons/a/a0/SG100344.JPG" />
            </foreignobject>
          </svg>
        </svg>`
        }
      ]
    }

  machinesArray.map( machine => {
    machinePdf(machine).content.forEach( i => {
      dd.content.push(i)
    })
  })

  return dd
}

export { proposalPdf }