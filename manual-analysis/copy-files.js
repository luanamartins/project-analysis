var fs = require('fs');
const path = require('path');

function copyFiles() {

    var repoName = 'brackets';

    var toCopy = '/home/lulis/Documents/UFPE/Mestrado/Projeto/static-analysis/project-analysis/manual-analysis/to-copy.txt';
    var inputFolder = '/home/lulis/Documents/UFPE/Mestrado/Projeto/static-analysis/project-analysis/manual-analysis/repos/' + repoName;
    const outputFolder = '/home/lulis/Documents/UFPE/Mestrado/Projeto/static-analysis/project-analysis/manual-analysis/copiedFiles/' + repoName;

    var files = fs.readFileSync(toCopy).toString().split("\n");

    for (var i = 0; i < files.length; i++) {

        var target = outputFolder + '/' + files[i].replace(/\//g , "-");

        // var filename = path.basename(files[i]);
        // var filepath = path.dirname(files[i]);

        var source = inputFolder + files[i];

        if (!fs.existsSync(outputFolder)){
            fs.mkdirSync(outputFolder);
        }

        console.log(source);
        fs.writeFileSync(target, fs.readFileSync(source));
    }
}

copyFiles();
