// let input = ['dom/a', 'dom/cb', 'dom/b']
let fs = require('fs');
let text = fs.readFileSync('/home/lulis/Documents/UFPE/Mestrado/Projeto/static-analysis/project-analysis/retrieve-scripts/to-sort.txt').toString('utf-8');
let input = text.split('\n');

let filteredList = input.filter(function (item) {
    let lastPos = item.lastIndexOf('/') + 1;
    const repoName = item.substring(lastPos);
    console.log(repoName);
    return repoName;
});

const dataToWrite = filteredList.join('\r\n');

fs.writeFile('output-sort.txt', dataToWrite, function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});

// console.log(filteredList.sort());