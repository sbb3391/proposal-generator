import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const pdf = (machine) => {

  // let itemsTable = {
  //   table: {
  //     body: [
  //       [{text: 'All of the items in this configuration', colSpan: 2}],
  //       []
  //     ]
  //   }
  // }


  let body = [
    [
      
    ]
  ]

  machine.assemblies.forEach( (assembly) => {
    let newAssembly; 
    switch (body[body.length - 1].length) {
      case 0:
        newAssembly = {
          stack: [
            {text: assembly.name, fontSize: 8, margin: [0, 20, 0, 0]}
          ]
        }
        
        if (assembly.items.length > 1) {
          newAssembly.stack.push( { ul: [] } )
          
          assembly.items.forEach( item => {
            newAssembly.stack[1].ul.push(item.description)
          })
        }

        body[body.length - 1].push(newAssembly);
        break
      case 1:
        newAssembly = {
          stack: [
            {text: assembly.name, fontSize: 8, margin: [0, 20, 0, 0]}
          ]
        }
        
        if (assembly.items.length > 1) {
          newAssembly.stack.push( { ul: [] } )
          
          assembly.items.forEach( item => {
            newAssembly.stack[1].ul.push(item.description)
          })
        }
        
        body[body.length - 1].push(newAssembly)
        break
      case 2:
        newAssembly = {
          stack: [
            {text: assembly.name, fontSize: 8, margin: [0, 20, 0, 0]}
          ]
        }
  
        if (assembly.items.length > 1) {
          newAssembly.stack.push( { ul: [] } )
          
          assembly.items.forEach( item => {
            newAssembly.stack[1].ul.push(item.description)
          })
        }
        

        let newRow = []
        newRow.push(newAssembly)
        body.push(newRow)
        
        if (machine.assemblies.indexOf(assembly) === machine.assemblies.length - 1 && body[body.length - 1].length === 1) {
          body[body.length - 1].push(["a placeholder to finish table"])
        }
        break
    }
  })
  debugger;

  let dd = {
    content: [
      {
        text: 'This paragraph uses header style and extends the alignment property',
        style: 'header',
        alignment: 'center'
      },
      {
        table: {
          widths: [250, 250],
          body: body
        },
        layout: 'noBorders'
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


  console.log(body)

  pdfMake.createPdf(dd).open();

}

export { pdf }