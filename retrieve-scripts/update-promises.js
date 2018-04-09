const inputFolder = '/home/lulis/Documents/UFPE/Mestrado/Projeto/static-analysis/project-analysis/statistics/data/test/input';
const outputFolder = '/home/lulis/Documents/UFPE/Mestrado/Projeto/static-analysis/project-analysis/statistics/data/test/output';
var fs = require('fs');

function listFiles(dir, filelist) {
    var files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function (file) {
        if (fs.statSync(dir + '/' + file).isDirectory()) {
            filelist = listFiles(dir + '/' + file, filelist);
        } else {
            filelist.push(file);
        }
    });
    return filelist;
}

const listOfFilenames = listFiles(inputFolder, []);
// const listOfFilepaths = []

for (var i = 0; i < listOfFilenames.length; i++) {
    // listOfFilepaths.push(inputFolder + "/" + listOfFilenames[i])
    var filepath = inputFolder + "/" + listOfFilenames[i];
    var lines = fs.readFileSync(filepath).toString().split("\n");
    var newContent = lines[0] + '\n';
    for (var j = 1; j < lines.length; j++) {
        var tokens = lines[j].split(',');
        // promiseNumberOfPromises 16
        // promiseNumberOfPromiseThens 17
        // promiseNumberOfPromiseRaces 25
        // promiseNumberOfPromiseAll 26
        tokens[16] = parseInt(tokens[16]) + parseInt(tokens[17]) + parseInt(tokens[25]) + parseInt(tokens[26]);
        newContent += tokens.toString() + '\n'
    }
    fs.writeFileSync(outputFolder + '/' + listOfFilenames[i], newContent)
    // console.log(newContent)
}