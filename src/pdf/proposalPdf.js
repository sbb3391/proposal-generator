import { createPdf } from 'pdfmake/build/pdfmake';
import { machinePdf } from './machinePdf'

const proposalPdf = (machinesArray) => {

    const dd = {
      content: [
        {
          svg: `<svg width="200" height="200"
                    xmlns="http://www.w3.org/2000/svg">
                    <svg>
                      <image href="mdn_logo_only_color.png" height="200" width="200"/>
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