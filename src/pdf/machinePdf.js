import { buildQueries } from "@testing-library/react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import numeral from 'numeral';
import htmlToPdfmake from "html-to-pdfmake"
import {createCanvas, loadImage} from 'canvas'
import { defaults } from "autoprefixer";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const machinePdf = (machine) => {
  function waitForImageToLoad() {  
    return new Promise(resolve => {
      setTimeout(() => {
        machineImageURI = getBase64Image(machineImage)
        resolve(machineImageURI)
      }, 2000)
    });
  }
  
  function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL
  }

  let machineImage = new Image();
  let machineImageURI, dd
  machineImage.crossOrigin = 'anonymous'
  let url = machine.image_url + "?somethingsomething"
  machineImage.src = url

  return waitForImageToLoad().then( resp => {
    let body = [
      [],
      []
    ];
  
    machine.assemblies.forEach((assembly) => {
      let columnIndex = machine.assemblies.indexOf(assembly) % 2 !== 0 ? 1 : 0;
  
      let newAssembly;
      newAssembly = { text: assembly.name, fontSize: 16, color: "blue", bold: true, margin: [20, 0] };
  
      body[columnIndex].push(newAssembly);
  
      body[columnIndex].push({ type: "square", ul: [], margin: [0, 0, 0, 20] });
  
      assembly.items.forEach(item => {
        body[columnIndex][body[columnIndex].length - 1].ul.push({ text: item.description, fontSize: 10, margin: [7, 0, 0, 0] });
      });
    });
  
    let mainComponentsTable = [
      []
    ];
  
    machine.assemblies.forEach((assembly) => {
      let newAssembly = { text: assembly.name, fontSize: 12, alignment: "center", margin: [5, 5, 5, 5] };
      switch (mainComponentsTable[mainComponentsTable.length - 1].length) {
        case 0:
          mainComponentsTable[mainComponentsTable.length - 1].push(newAssembly);
          break;
        case 1:
          mainComponentsTable[mainComponentsTable.length - 1].push(newAssembly);
          break;
        case 2:
          let newRow = [];
          newRow.push(newAssembly);
          mainComponentsTable.push(newRow);
  
          if (machine.assemblies.indexOf(assembly) === machine.assemblies.length - 1 && mainComponentsTable[mainComponentsTable.length - 1].length === 1) {
            mainComponentsTable[mainComponentsTable.length - 1].push({ text: "", border: [true, true, false, false] });
          }
          break;
      }
    });
  
    // handles the creation of the maintanance for each machine
    let serviceArr = [];
    let serviceTable = [
      {
        table: {
          widths: [110, 110],
          alignment: "center",
        }
      }
    ];
  
    if (machine.colorClick) {
      serviceArr.push([
        { text: "Color Impression:", margin: [0, 10, 0, 0], border: [false, false, false, false] },
        { text: `${machine.colorClick} per impression`, margin: [0, 10, 0, 0], border: [false, false, false, false], fontSize: 10 }
      ]);
    } else {
      serviceArr.push([
        { text: "Color Impression:", margin: [0, 10, 0, 0], border: [false, false, false, false] },
        { text: `N/A`, margin: [0, 10, 0, 0], border: [false, false, false, false], fontSize: 10 }
      ]);
    }
  
    if (machine.monoClick) {
      serviceArr.push([
        { text: "Mono Impression:", margin: [0, 0, 0, 10], border: [false, false, false, false] },
        { text: `${machine.monoClick} per impression`, margin: [0, 0, 0, 10], border: [false, false, false, false], fontSize: 10 }
      ]);
    } else {
      serviceArr.push([
        { text: "Mono Impression:", margin: [0, 0, 0, 10], border: [false, false, false, false] },
        { text: `N/A`, margin: [0, 0, 0, 10], border: [false, false, false, false], fontSize: 10 }
      ]);
    }
  
    serviceTable[0].table.body = serviceArr;
  
    const machineName = machine.assemblies.find(assembly => assembly.assembly_type === "engine").name;
  
    const totalPrice = machine.sellingPrice;
  
    let pricingTable = [
      {
        table: {
          widths: [140, 80],
          alignment: "center",
          body: [
            [{ text: "Purchase:", border: [false, false, false, false], fontSize: 10, margin: [0, 10, 0, 0] }, { text: `${numeral(totalPrice).format('$0,0.00')}`, border: [false, false, false, false], fontSize: 10, margin: [0, 10, 0, 0] }],
            [{ text: "48 Month Fair Market", border: [false, false, false, false], fontSize: 10 }, { text: `${numeral(totalPrice * .0224).format('$0,0.00')}/mo`, border: [false, false, false, false], fontSize: 10 }],
            [{ text: "60 Month Fair Market", border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 10] }, { text: `${numeral(totalPrice * .0205).format('$0,0.00')}/mo`, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 10] }]
          ]
        }
      }
    ];
  
    dd = {
      content: [
        {
          svg: `<svg width="525" height="40">
                  <rect rx="10" ry="10" width="525" height="40"
                  style="fill:blue;stroke:black;;opacity:0.5" />
                  <text  x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Verdana" font-size="20" bold="true" fill="white">${machineName}</text>
            </svg>`
        },
        {
          image: resp,
          alignment: "center",
          width: 500,
          margin: [0, 40, 0, 40]
        }, 
        {
          svg: `<svg width="525" height="30">
                  <rect rx="10" ry="10" width="525" height="30"
                  style="fill:blue;stroke:black;;opacity:0.5" />
                  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Verdana" font-size="18" bold="true" fill="white">Included Components</text>
            </svg>`,
          margin: [0, 0, 0, 20]
        },
        {
          margin: [0, 0, 0, 20],
          table: {
            body: mainComponentsTable,
            widths: [250, 250],
          },
        },
        {
          columns: [
            [
              {
                svg: `<svg width="260" height="30">
                        <rect rx="10" ry="10" width="250" height="30"
                        style="fill:blue;stroke:black;;opacity:0.5" />
                        <text  x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Verdana" font-size="18" bold="true" fill="white">Maintance Details</text>
                  </svg>`,
                margin: [0, 0, 0, 10],
              },
              {
                table: {
                  alignment: "center",
                  body: [
                    serviceTable
                  ]
                },
                margin: [4, 0, 0, 0]
              }
            ],
            [
              {
                svg: `<svg width="260" height="30">
                        <rect rx="10" ry="10" width="250" height="30"
                        style="fill:blue;stroke:black;;opacity:0.5" />
                        <text x="22%" y="75%" font-family="Verdana" font-size="18" bold="true" fill="white">Equipment Pricing</text>
                  </svg>`,
                margin: [4, 0, 0, 10]
              },
              {
                table: {
                  alignment: "center",
                  body: [
                    pricingTable
                  ]
                },
                margin: [4, 0, 0, 0]
              }
            ]
          ]
        },
        {
          pageBreak: "before",
          svg: `<svg width="525" height="40">
          <rect rx="10" ry="10" width="525" height="40"
          style="fill:blue;stroke:black;;opacity:0.5" />
          <text  x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Verdana" font-size="20" bold="true" fill="white">Component Detail</text>
    </svg>`,
          margin: [0, 0, 0, 40]
        },
        {
          margin: [20, 0],
          columns: body,
          pageBreak: "after"
        }
      ],
    };

    return dd
  })
}


export { machinePdf }