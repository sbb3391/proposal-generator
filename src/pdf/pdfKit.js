import PDFDocument from 'pdfkit';
const blobStream  = require('blob-stream');

const doc = new PDFDocument;
const stream = doc.pipe(blobStream());

doc.pipe(fs.createWriteStream('/path/to/file.pdf')); // write to PDF
doc.pipe(res);                                       // HTTP response


doc.end();
stream.on('finish', function() {
  iframe.src = stream.toBlobURL('application/pdf');
});