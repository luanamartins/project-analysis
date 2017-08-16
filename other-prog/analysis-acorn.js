var acorn = require('acorn');
var fs = require('fs');

var filepath = '';


function parseFromFile(filepath) {
    fs.readFile(filepath, 'utf-8', function (err, program) {
        if (err) {
            console.log(err);
        }
        var ast = acorn.parse(program, {
            ecmaVersion: 7,
            sourceType: 'module'
        });

        console.log(ast);
    });
}