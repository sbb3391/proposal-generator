import { buildQueries } from "@testing-library/react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import numeral from 'numeral';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const pdf = (machine, totalPrice) => {
  debugger;

  let body = [
    [],
    []
  ]

  machine.assemblies.forEach( (assembly) => {
    let columnIndex = machine.assemblies.indexOf(assembly) % 2 !== 0 ? 0 : 1

    let newAssembly; 
    newAssembly = {text: assembly.name, fontSize: 16, color: "blue", bold: true}
    
    body[columnIndex].push(newAssembly);

    body[columnIndex].push( { type: "square", ul: [], margin: [0,0,0, 20] } )
    
    assembly.items.forEach( item => {
      body[columnIndex][body[columnIndex].length -1].ul.push({text: item.description, fontSize: 10, margin: [7, 0, 0, 0]})
    })
  })

  let mainComponentsTable = [
    [

    ]
  ]

  machine.assemblies.forEach( (assembly) => {
    let newAssembly = {text: assembly.name, fontSize: 12, alignment: "center", margin: [5,5,5,5] }
    switch (mainComponentsTable[mainComponentsTable.length - 1].length) {
      case 0:
        mainComponentsTable[mainComponentsTable.length - 1].push(newAssembly);
        break
      case 1:
        mainComponentsTable[mainComponentsTable.length - 1].push(newAssembly)
        break
      case 2:
        let newRow = []
        newRow.push(newAssembly)
        mainComponentsTable.push(newRow)
        
        if (machine.assemblies.indexOf(assembly) === machine.assemblies.length - 1 && mainComponentsTable[mainComponentsTable.length - 1].length === 1) {
          mainComponentsTable[mainComponentsTable.length - 1].push({text: "", border: [true, true, false, false]})
        }
        break
    }
  })

  const machineName = machine.assemblies.find( assembly => assembly.assembly_type === "engine").name
  
  let dd = {
    content: [
      {
        svg: `<svg width="525" height="40">
                <rect rx="10" ry="10" width="525" height="40"
                style="fill:blue;stroke:black;;opacity:0.5" />
                <text x='${Math.floor(((machineName).length / 48) * 100)}%'  y="57%" font-family="Verdana" font-size="20" bold="true" fill="white">${machineName}</text>
         </svg>`  
      },
      {
        image: "data:image/jpeg;base64,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",
        alignment: "center",
        width: 500,
        margin: [0, 40, 0, 40]
      },
      {
        svg: `<svg width="525" height="30">
                <rect rx="10" ry="10" width="525" height="30"
                style="fill:blue;stroke:black;;opacity:0.5" />
                <text x="35%" y="75%" font-family="Verdana" font-size="18" bold="true" fill="white">Included Components</text>
         </svg>`,
         margin: [0, 0, 0, 20]
      },
      {
        margin: [0,0,0,20],
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
                      <text x="22%" y="75%" font-family="Verdana" font-size="18" bold="true" fill="white">Maintance Details</text>
               </svg>`,
               margin: [0, 0, 0, 10],
            },
            {
              table: {
                widths: [240],
                alignment: "center",
                body: [
                  ["Add Machine to Proposal to Add Maintanance Details"]
                ]
              }
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
                widths: [140, 90],
                body: [
                  [{text: "Purchase:", border: [true, true, false, false], fontSize: 10}, {text: `${numeral(totalPrice).format('$0,0.00')}`, fontSize: 10}],
                  [{text: "36 Month $1 Out:", border: [true, false, false, false], fontSize: 10}, {text: `${numeral(totalPrice * .0334).format('$0,0.00')}/mo`, fontSize: 10}],
                  [{text: "36 Month Fair Market", border: [true, false, false, false], fontSize: 10}, {text: `${numeral(totalPrice * .0303).format('$0,0.00')}/mo`, fontSize: 10}],
                  [{text: "48 Month $1 Out:", border: [true, false, false, false], fontSize: 10}, {text: `${numeral(totalPrice * .0265).format('$0,0.00')}/mo`, fontSize: 10}],
                  [{text: "48 Month Fair Market", border: [true, false, false, false], fontSize: 10}, {text: `${numeral(totalPrice * .0224).format('$0,0.00')}/mo`, fontSize: 10}],
                  [{text: "60 Month $1 Out:", border: [true, false, false, false], fontSize: 10}, {text: `${numeral(totalPrice * .0215).format('$0,0.00')}/mo`, fontSize: 10}],
                  [{text: "60 Month Fair Market", border: [true, false, false, true], fontSize: 10}, {text: `${numeral(totalPrice * .0205).format('$0,0.00')}/mo`, fontSize: 10}]
                ]
              },
              margin: [4,0,0,0]
            }
          ]
        ]
      },
      {
        pageBreak: "before",
        text: 'Component Detail',
        style: 'header',
        alignment: 'center',
        fontSize: 24,
        margin: [0,0,0,30]
      },
      {
        columns: body
      },
      {
        pageBreak: "before",
        text: "new page"
      }
      
    ]
  }

  //   let dd = {
  //   content: [
  //     {
  //       text: 'This paragraph uses header style and extends the alignment property',
  //       style: 'header',
  //       alignment: 'center'
  //     },
  //     {
  //       table: {
  //         widths: [250, 250],
  //         body: [
  //           [{
  //             stack: [
  //               {text: "C14000", fontSize: 8, margin: [0, 20, 0, 0]},
  //               {ul: [
  //                 "Engine", "Power Filter 120", "Power Filter 220"
  //               ]}
  //             ]
  //           },
  //           {
  //             stack: [
  //               {text: "C14000", fontSize: 8, margin: [0, 20, 0, 0]},
  //               {ul: [
  //                 "Engine", "Power Filter 120", "Power Filter 220"
  //               ]}
  //             ]
  //           }],
  //           [{
  //             stack: [
  //               {text: "C14000", fontSize: 8, margin: [0, 20, 0, 0]},
  //               {ul: [
  //                 "Engine", "Power Filter 120", "Power Filter 220", "Engine", "Power Filter 120", "Power Filter 220"
  //               ]}
  //             ]
  //           },
  //           {
  //             stack: [
  //               {text: "C14000", fontSize: 8, margin: [0, 20, 0, 0]},
  //               {ul: [
  //                 "Engine", "Power Filter 120", "Power Filter 220"
  //               ]}
  //             ]
  //           }],
  //           [{
  //             stack: [
  //               {text: "C14000", fontSize: 8, margin: [0, 20, 0, 0]},
  //               {ul: [
  //                 "Engine", "Power Filter 120", "Power Filter 220", "Engine", "Power Filter 120", "Power Filter 220"
  //               ]}
  //             ]
  //           },
  //           {
  //             stack: [
  //               {text: "C14000", fontSize: 8, margin: [0, 20, 0, 0]},
  //               {ul: [
  //                 "Engine", "Power Filter 120", "Power Filter 220"
  //               ]}
  //             ]
  //           }]
  //         ]
  //       },
  //       layout: 'noBorders'
  //     }
      
  //   ]
  // }

  pdfMake.createPdf(dd).open();

}

export { pdf }