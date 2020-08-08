const PDFDocument = require('pdfkit');
const fs = require('fs');
const { CanvasRenderService } = require('chartjs-node-canvas');

const width = 400; //px
const height = 400; //px
const canvasRenderService = new CanvasRenderService(width, height, (ChartJS) => { });

(async () => {
    const configuration = {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: (value) => '$' + value
                    }
                }]
            }
        }
    };
    //const image = await canvasRenderService.renderToBuffer(configuration);
    const dataUrl = await canvasRenderService.renderToDataURL(configuration);
    //const stream = canvasRenderService.renderToStream(configuration);

    //console.log(dataUrl)
    var doc = new PDFDocument();

    doc.fontSize(25).text('Here is some vector graphics...');
    // and some justified text wrapped into columns
  doc
  .text('And here is some wrapped text...')
  .font('Times-Roman', 13)
  .moveDown()
  .image( dataUrl)
  .moveDown()
  .text('Hello world!')
  .text('ABCD', {
    width: 402,
    align: 'justify',
    indent: 30,
    columns: 2,
    height: 300,
    ellipsis: true
  });

  doc.pipe(fs.createWriteStream('output.pdf'));
  doc.end();



})();
