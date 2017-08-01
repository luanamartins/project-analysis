const ASTSource = require("ast-source").default;
var fs = require('fs');
const estraverse = require("estraverse");


var filepath = '';

function parseFromFile (filepath) {
    var source = new ASTSource(fs.readFileSync(filepath, "utf-8"), {
        filePath: filepath
    });
    var output = source.transform(transform).output();
    console.log(output);
}