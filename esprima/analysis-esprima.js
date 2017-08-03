//var program = 'const answer = 42';
// var tokens = esprima.tokenize(program);
// console.log(tokens);
// [ { type: 'Keyword', value: 'const' },
//   { type: 'Identifier', value: 'answer' },
//   { type: 'Punctuator', value: '=' },
//   { type: 'Numeric', value: '42' } ]

var esprima = require('esprima');
var fs = require('fs');

var filepath = 'input/program-all-promises.js';

function parseFromFile(filepath) {
    fs.readFile(filepath, 'utf-8', function (err, program) {
        if (err) {
            console.log(err);
        }

        var programParsed = esprima.parse(program, {loc: true, range: true});

        fs.writeFile("output/output-all-promises.txt", JSON.stringify(programParsed, null, 4), function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });

    });
}

parseFromFile(filepath);

function parse(program){
    var programParsed = esprima.parse(program);
    console.log(JSON.stringify(programParsed));
}

function tokenize(program){
    var tokens = esprima.tokenize(program);
    console.log(tokens);
}


