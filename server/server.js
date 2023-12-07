const { PDFNet } = require('@pdftron/pdfnet-node');  // you may need to set up NODE_PATH environment variable to make this work.

const main = async() => {
    const inputPath = './test.pdf';
    const outputFilePath = "./test-opt2.pdf"

    try {
        const doc = await PDFNet.PDFDoc.createFromFilePath(inputPath);
        const fl = await PDFNet.Flattener.create();
        await fl.process(doc, PDFNet.Flattener.Mode.e_fast);
        await PDFNet.Optimizer.optimize(doc);

        const opts = new PDFNet.PDFDoc.ViewerOptimizedOptions();

        // Optimize pdf
        await doc.saveViewerOptimized(outputFilePath, opts);
    } catch (err) {
      console.log(err);
    }
};

// add your own license key as the second parameter, e.g. in place of 'YOUR_LICENSE_KEY'.
PDFNet.runWithCleanup(main, 'demo:1688980534792:7c60a78b03000000001da33a1a245b69027dfbfba34d81e76179f3d122').catch(function(error) {
  console.log('Error: ' + JSON.stringify(error));
}).then(function(){ PDFNet.shutdown(); });