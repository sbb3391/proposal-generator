import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

export function test() {
  let machineImage = new Image();
  let machineImageURI, docDefinition
  machineImage.src = 'https://machine-images-bucket.s3.us-east-2.amazonaws.com/machine-images/1-12-22-24-26-29-31-32-33-35-36.png'
  machineImage.crossOrigin = 'anonymous'

  setTimeout(() => {
    machineImageURI = getBase64Image(machineImage)
  }, 2000)

  setTimeout(() => {
    docDefinition = {
      content: [
        {
          text: 'PDF Generated with Image from external URL',
          fontSize : 20
        },
        {
          image: machineImageURI,
          alignment: "center",
          width: 500,
          margin: [0, 40, 0, 40]
        }        
      ]
    };
  }, 3000)

  function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL
  }

  return setTimeout(() => {
    pdfMake.createPdf(docDefinition).open()
  }, 4000)
}