import { createPdf } from 'pdfmake/build/pdfmake';
import { machinePdf } from './machinePdf'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

const proposalPdf = (machinesArray, type) => {
  
  let dd = {
    styles: {
      backPage: {
        fontSize: 8,
        alignment: "center",
        margin: [0,0,0,5]
      }
    }, 
    content: [
    ]
  }

  function waitForDd(machine) {  
    return new Promise(resolve => {
      machinePdf(machine)
      .then( resp => {
        resolve(resp)
      })
    });
  }

  function waitForImageToLoad(imageFunction, pageToAdd) {
    return new Promise(resolve => {
      imageFunction()
      .then( resp => {
        pageToAdd(resp)
        .then(() => {
          resolve()
        })
      })
    });
  }

  function coverPageImageURI() {
    return new Promise(resolve => {
      let machineImage = new Image();
      machineImage.crossOrigin = 'anonymous'
      machineImage.src = 'https://machine-images-bucket.s3.us-east-2.amazonaws.com/machine-images/Cover+Picture.png'

      machineImage.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = machineImage.width;
        canvas.height = machineImage.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(machineImage, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL)
      }
    })
  }

  function backPageImageURI() {
    return new Promise(resolve => {
      let machineImage = new Image();
      machineImage.crossOrigin = 'anonymous'
      machineImage.src = 'https://machine-images-bucket.s3.us-east-2.amazonaws.com/machine-images/KM+Image.png'

      machineImage.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = machineImage.width;
        canvas.height = machineImage.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(machineImage, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL)
      }
    })
  }

  function addCoverPage(uri) {
    return new Promise( resolve => {
      let coverDd = {
        content: [
          {
            text: "Proposal Presented To:",
            fontSize: 20,
            bold: true,
            italics: true,
            margin: [0,0,0,10]
          },
          {
            text: `${machinesArray[0].customer}`,
            fontSize: 48,
            bold: true,
            italics: true,
            margin: [0,0,0,30]
          },
          {
            image: uri,
            alignment: "center",
            pageBreak: "after",
            width: 550,
          }
        ]
      }
  
      let i = coverDd.content.length - 1
  
      for (i; i >= 0; i--) {
        dd.content.unshift(coverDd.content[i])
      }
  
      resolve()
    })
  }

  function addBackPage(uri) {
    return new Promise( resolve => {
      let backDd = {
        content: [
          {
            image: uri,
            width: 250,
            alignment: "center",
            margin: [0, 225,0,175]
          },
          {
            text: "Please direct questions to:",
            bold: true,
            margin: [0,0,0,12],
            alignment: "center",
          },
          {
            text: "Sam Bequette",
            style: "backPage"
          },
          {
            text: "Senior Account Executive - Commercial Print",
            style: "backPage"
          },
          {
            text: "Konica Minolta Business Solutions USA, Inc.",
            style: "backPage"
          },
          {
            text: "875 Greentree Rd",
            style: "backPage"
          },
          {
            text: "Bldg 7, Fl 9",
            style: "backPage"
          },
          {
            text: "Pittsburgh, PA 15220",
            style: "backPage"
          },
          {
            text: "(724) 599 - 0212",
            style: "backPage"
          },
          {
            text: "sbequette@kmbs.konicaminolta.us",
            style: "backPage"
          }
        ] 
      }
  
      let i = 0
      for (i; i <= backDd.content.length ; i++) {
        dd.content.push(backDd.content[i])
      }
      resolve()
    })
  }

  function addMachinePages() {
    return new Promise(resolve => {
      machinesArray.map( machine => {
        waitForDd(machine)
        .then( resp => {
          resp.content.forEach( i => {
            dd.content.push(i)
          })
          resolve()
        })
      })
    })
  }

  
  // add summary page
  
  if (type === "preview") {
    dd = {
      ...dd,
      watermark: { text: 'Preview', angle: 70 }
    }
  } else {
    // add cover page
    waitForImageToLoad(coverPageImageURI, addCoverPage)
    // add machine pages
    .then( () => addMachinePages())
    // add final page 
    .then( (resp) => {
      waitForImageToLoad(backPageImageURI, addBackPage)
      .then( () => {
        pdfMake.createPdf(dd).open()
      })
    })
  }

}

export { proposalPdf }