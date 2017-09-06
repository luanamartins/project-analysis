const fs = require('fs');
const excel = require('excel4node');

function copyFile(src, dest) {
    let readStream = fs.createReadStream(src);
    readStream.once('error', (err) => {
        console.log(err);
    });
    readStream.once('end', () => {
        console.log('done copying');
    });
    readStream.pipe(fs.createWriteStream(dest));
}

function readFileSync(filepath) {
    return fs.readFileSync(filepath, 'utf8');
}

function writeCsvFile(filename, fields, data) {
    var json2csv = require('json2csv');
    const extension = '.csv';
    // var fields = ['field1', 'field2', 'field3'];
    //
    // var myData = [
    //     {
    //         "field1": "t",
    //         "field2": "t",
    //         "field3": "t"
    //     }
    // ];

    var filepath = path.join(filename, extension);
    var csv = json2csv({ data: data, fields: fields });
    fs.writeFile(filepath, csv, function(err) {
        if (err) throw err;
        console.log('file saved');
    });
}

function createWorkbook(){
    return new excel.Workbook();
}

function createStyle(workbook){
    return workbook.createStyle({
        font: {
            color: '#000000',
            size: 12
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -'
    });
}

function writeSheet(sheet, titles, data, style){
    var i;
    var row = 1;
    var column = 1;
    for(i = 0; i < titles.length; i++){
        sheet.cell(row, column).string(titles[i]).style(style);
        column++;
    }

    column = 1;
    row = 2;
    for(i = 0; i < data.length; i++) {
        sheet.cell(row, column).string(data[i]).style(style);
        row++;
    }
}

function writeWorkbook(workbook, filename){
    var filenameExt = filename + '.xlsx';
    workbook.write(filenameExt);
}

function writeXlsFile(filename){
    // Require library
    var excel = require('excel4node');

// Create a new instance of a Workbook class
    var workbook = new excel.Workbook();

// Add Worksheets to the workbook
    var worksheet = workbook.addWorksheet('Yes');
    var worksheet2 = workbook.addWorksheet('Sheet 2');

// Create a reusable style
    var style = workbook.createStyle({
        font: {
            color: '#000000',
            size: 12
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -'
    });

// Set value of cell A1 to 100 as a number type styled with paramaters of style
    worksheet.cell(1,1).number(100).style(style);

// Set value of cell B1 to 300 as a number type styled with paramaters of style
    worksheet.cell(1,2).number(200).style(style);

// Set value of cell C1 to a formula styled with paramaters of style
   // worksheet.cell(1,3).formula('A1 + B1').style(style);

// Set value of cell A2 to 'string' styled with paramaters of style
    worksheet.cell(2,1).string('string').style(style);

// Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
    worksheet.cell(3,1).bool(true).style(style).style({font: {size: 14}});

    workbook.write(filename + '.xlsx');
}

// writeXlsFile('file2');


module.exports = {
    copyFile: copyFile,
    readFileSync: readFileSync,
    writeCsvFile: writeCsvFile,

    createWorkbook: createWorkbook,
    createStyle: createStyle,
    writeSheet: writeSheet,
    writeWorkbook: writeWorkbook
}