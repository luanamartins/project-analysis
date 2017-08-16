var jsp = require("uglify-js").parser;
var fs = require('fs');

var filepath = '';

function parseFromFile(filepath) {
    fs.readFile(filepath, 'utf-8', function (err, fileContents) {
        var ast = jsp.parse(fileContents); // parse code and get the initial AST
        console.log(ast);
    });
}